import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, Volume2, VolumeX, RotateCcw, Play, Trophy, Zap } from 'lucide-react';

interface RetroRacingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

class SoundSynthesizer {
  private ctx: AudioContext | null = null;
  private isMuted = false;
  private isMusicPlaying = false;
  private musicInterval: any = null;
  private step = 0;
  private masterGain: GainNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;

  // Engine synth nodes
  private engineOsc: OscillatorNode | null = null;
  private engineSub: OscillatorNode | null = null;
  private engineFilter: BiquadFilterNode | null = null;
  private engineGain: GainNode | null = null;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.26, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
        this.createNoiseBuffer();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private createNoiseBuffer() {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 0.5;
    this.noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = this.noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.26, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  startMusicAndEngine() {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    if (this.isMusicPlaying) return;

    this.isMusicPlaying = true;
    this.step = 0;

    // Start Engine Hum
    this.startEngine();

    // Start 16th note synthwave sequencer (~126 BPM => 119ms per 16th note)
    const stepDuration = 0.119;
    let nextStepTime = this.ctx.currentTime + 0.05;

    this.musicInterval = setInterval(() => {
      if (!this.ctx || !this.isMusicPlaying || !this.masterGain) return;
      const currentTime = this.ctx.currentTime;
      while (nextStepTime < currentTime + 0.1) {
        this.scheduleStep(this.step, nextStepTime);
        this.step = (this.step + 1) % 32;
        nextStepTime += stepDuration;
      }
    }, 40);
  }

  private startEngine() {
    if (!this.ctx || !this.masterGain) return;
    this.stopEngine();

    try {
      this.engineOsc = this.ctx.createOscillator();
      this.engineSub = this.ctx.createOscillator();
      this.engineFilter = this.ctx.createBiquadFilter();
      this.engineGain = this.ctx.createGain();

      this.engineOsc.type = 'sawtooth';
      this.engineOsc.frequency.setValueAtTime(65, this.ctx.currentTime);

      this.engineSub.type = 'triangle';
      this.engineSub.frequency.setValueAtTime(32.5, this.ctx.currentTime);

      this.engineFilter.type = 'lowpass';
      this.engineFilter.frequency.setValueAtTime(220, this.ctx.currentTime);
      this.engineFilter.Q.setValueAtTime(2.5, this.ctx.currentTime);

      this.engineGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

      this.engineOsc.connect(this.engineFilter);
      this.engineSub.connect(this.engineFilter);
      this.engineFilter.connect(this.engineGain);
      this.engineGain.connect(this.masterGain);

      this.engineOsc.start();
      this.engineSub.start();
    } catch {}
  }

  updateEngine(speedMultiplier: number, isTurning: boolean) {
    if (!this.ctx || !this.engineOsc || !this.engineSub || !this.engineFilter) return;
    try {
      const baseFreq = 58 + Math.min(60, (speedMultiplier - 1.0) * 35) + (isTurning ? 7 : 0);
      this.engineOsc.frequency.setTargetAtTime(baseFreq, this.ctx.currentTime, 0.05);
      this.engineSub.frequency.setTargetAtTime(baseFreq * 0.5, this.ctx.currentTime, 0.05);
      this.engineFilter.frequency.setTargetAtTime(180 + baseFreq * 1.5, this.ctx.currentTime, 0.05);
    } catch {}
  }

  private stopEngine() {
    if (this.engineOsc) {
      try {
        this.engineOsc.stop();
        this.engineOsc.disconnect();
      } catch {}
      this.engineOsc = null;
    }
    if (this.engineSub) {
      try {
        this.engineSub.stop();
        this.engineSub.disconnect();
      } catch {}
      this.engineSub = null;
    }
    if (this.engineFilter) {
      try {
        this.engineFilter.disconnect();
      } catch {}
      this.engineFilter = null;
    }
    if (this.engineGain) {
      try {
        this.engineGain.disconnect();
      } catch {}
      this.engineGain = null;
    }
  }

  stopMusicAndEngine() {
    this.isMusicPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
    this.stopEngine();
  }

  stopAll() {
    this.stopMusicAndEngine();
  }

  private scheduleStep(step: number, time: number) {
    if (!this.ctx || !this.masterGain) return;

    // 1. Synth Bass: 80s rolling bassline in D minor (Dm -> Bb -> C -> Am)
    let rootFreq = 73.42; // D2
    if (step >= 8 && step < 16) rootFreq = 58.27; // Bb1
    else if (step >= 16 && step < 24) rootFreq = 65.41; // C2
    else if (step >= 24) rootFreq = 55.00; // A1

    const isOctave = step % 2 === 1;
    const bassFreq = isOctave ? rootFreq * 2 : rootFreq;

    this.playBassNote(bassFreq, isOctave, time);

    // 2. Drums
    // Kick on every beat: steps 0, 4, 8, 12, 16, 20, 24, 28
    if (step % 4 === 0) {
      this.playKick(time);
    }
    // Snare on beats 2 and 4: steps 4, 12, 20, 28
    if (step % 8 === 4) {
      this.playSnare(time);
    }
    // Hi-hat on upbeat 8ths: 2, 6, 10, 14, 18, 22, 26, 30
    if (step % 2 === 0) {
      this.playHiHat(time, step % 4 === 2 ? 0.05 : 0.025);
    }

    // 3. Lead Synth Melody
    const leadNotes: { [key: number]: number } = {
      0: 293.66, // D4
      3: 349.23, // F4
      6: 440.0, // A4
      8: 587.33, // D5
      11: 523.25, // C5
      14: 440.0, // A4
      16: 392.0, // G4
      19: 440.0, // A4
      22: 349.23, // F4
      24: 329.63, // E4
      27: 349.23, // F4
      30: 293.66, // D4
    };

    if (leadNotes[step]) {
      this.playLeadNote(leadNotes[step], time);
    }
  }

  private playBassNote(freq: number, isOctave: boolean, time: number) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, time);

      filter.type = 'lowpass';
      filter.Q.setValueAtTime(3.5, time);
      filter.frequency.setValueAtTime(isOctave ? 1200 : 750, time);
      filter.frequency.exponentialRampToValueAtTime(160, time + 0.09);

      gain.gain.setValueAtTime(isOctave ? 0.13 : 0.17, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(time);
      osc.stop(time + 0.11);
    } catch {}
  }

  private playKick(time: number) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(130, time);
      osc.frequency.exponentialRampToValueAtTime(36, time + 0.07);

      gain.gain.setValueAtTime(0.26, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(time);
      osc.stop(time + 0.09);
    } catch {}
  }

  private playSnare(time: number) {
    if (!this.ctx || !this.masterGain) return;
    try {
      if (this.noiseBuffer) {
        const noise = this.ctx.createBufferSource();
        noise.buffer = this.noiseBuffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(800, time);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.12, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.11);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        noise.start(time);
        noise.stop(time + 0.12);
      }

      const tone = this.ctx.createOscillator();
      const toneGain = this.ctx.createGain();
      tone.type = 'triangle';
      tone.frequency.setValueAtTime(180, time);
      tone.frequency.exponentialRampToValueAtTime(80, time + 0.04);
      toneGain.gain.setValueAtTime(0.14, time);
      toneGain.gain.exponentialRampToValueAtTime(0.001, time + 0.045);

      tone.connect(toneGain);
      toneGain.connect(this.masterGain);

      tone.start(time);
      tone.stop(time + 0.05);
    } catch {}
  }

  private playHiHat(time: number, vol: number) {
    if (!this.ctx || !this.masterGain || !this.noiseBuffer) return;
    try {
      const noise = this.ctx.createBufferSource();
      noise.buffer = this.noiseBuffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(7000, time);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(vol, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.035);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start(time);
      noise.stop(time + 0.04);
    } catch {}
  }

  private playLeadNote(freq: number, time: number) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, time);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2400, time);
      filter.Q.setValueAtTime(2.0, time);

      gain.gain.setValueAtTime(0.06, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.14);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(time);
      osc.stop(time + 0.15);
    } catch {}
  }

  playScore() {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(659.25, this.ctx.currentTime); // E5
      osc1.frequency.exponentialRampToValueAtTime(987.77, this.ctx.currentTime + 0.08); // B5

      osc2.frequency.setValueAtTime(1318.5, this.ctx.currentTime); // E6
      osc2.frequency.exponentialRampToValueAtTime(1975.5, this.ctx.currentTime + 0.08); // B6

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.14);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.masterGain);

      osc1.start();
      osc2.start();
      osc1.stop(this.ctx.currentTime + 0.15);
      osc2.stop(this.ctx.currentTime + 0.15);
    } catch {}
  }

  playCrash() {
    this.stopMusicAndEngine();
    if (!this.ctx || !this.masterGain) return;
    try {
      if (this.noiseBuffer) {
        const noise = this.ctx.createBufferSource();
        noise.buffer = this.noiseBuffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, this.ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.45);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.28, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        noise.start();
        noise.stop(this.ctx.currentTime + 0.52);
      }

      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(25, this.ctx.currentTime + 0.45);

      oscGain.gain.setValueAtTime(0.22, this.ctx.currentTime);
      oscGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.48);

      osc.connect(oscGain);
      oscGain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.5);
    } catch {}
  }

  playStart() {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.12);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.32);
    } catch {}
  }
}

export const RetroRacingModal: React.FC<RetroRacingModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const synthRef = useRef<SoundSynthesizer | null>(null);

  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover'>('start');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('retro_racing_best') || '0', 10);
  });
  const [isMuted, setIsMuted] = useState(false);

  const requestRef = useRef<number>(0);
  const playerRef = useRef({ x: 0.5, speed: 1.0 });
  const keysRef = useRef<{ left: boolean; right: boolean }>({ left: false, right: false });
  const obstaclesRef = useRef<Array<{ x: number; y: number; speed: number; color: string }>>([]);
  const roadOffsetRef = useRef(0);

  if (!synthRef.current) {
    synthRef.current = new SoundSynthesizer();
  }

  // Handle keyboard inputs
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysRef.current.left = true;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysRef.current.right = true;
      }
      if (e.key === 'Enter' || e.key === ' ') {
        if (gameState !== 'playing') {
          startGame();
        }
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysRef.current.left = false;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysRef.current.right = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isOpen, gameState]);

  // Stop audio when modal closes
  useEffect(() => {
    if (!isOpen) {
      synthRef.current?.stopAll();
      setGameState('start');
    }
  }, [isOpen]);

  const startGame = () => {
    setScore(0);
    playerRef.current = { x: 0.5, speed: 1.0 };
    obstaclesRef.current = [];
    roadOffsetRef.current = 0;
    setGameState('playing');
    synthRef.current?.playStart();
    synthRef.current?.startMusicAndEngine();
  };

  const handleMuteToggle = () => {
    if (synthRef.current) {
      const muted = synthRef.current.toggleMute();
      setIsMuted(muted);
    }
  };

  // Main game animation loop
  useEffect(() => {
    if (!isOpen || gameState !== 'playing') {
      synthRef.current?.stopMusicAndEngine();
      return;
    }

    // Start background synth music & engine audio
    synthRef.current?.startMusicAndEngine();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localScore = score;
    let spawnTimer = 0;

    const loop = () => {
      // Update dimensions
      const width = canvas.width;
      const height = canvas.height;

      // Update Player position
      const moveSpeed = 0.022;
      if (keysRef.current.left) {
        playerRef.current.x = Math.max(0.15, playerRef.current.x - moveSpeed);
      }
      if (keysRef.current.right) {
        playerRef.current.x = Math.min(0.85, playerRef.current.x + moveSpeed);
      }

      // Update Road & obstacles
      const currentSpeed = 1.0 + Math.min(2.5, localScore / 800);
      roadOffsetRef.current = (roadOffsetRef.current + currentSpeed * 4) % 60;

      // Dynamically update audio engine pitch and RPM
      synthRef.current?.updateEngine(
        currentSpeed,
        keysRef.current.left || keysRef.current.right
      );

      // Spawn oncoming obstacle cars
      spawnTimer++;
      const spawnInterval = Math.max(35, 75 - Math.floor(localScore / 150));
      if (spawnTimer >= spawnInterval) {
        spawnTimer = 0;
        const lanes = [0.25, 0.42, 0.58, 0.75];
        const chosenLane = lanes[Math.floor(Math.random() * lanes.length)];
        const colors = ['#ec4899', '#a855f7', '#f59e0b', '#3b82f6'];
        obstaclesRef.current.push({
          x: chosenLane,
          y: 0,
          speed: 0.008 * currentSpeed,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      // Advance obstacles and check collision
      for (let i = obstaclesRef.current.length - 1; i >= 0; i--) {
        const obs = obstaclesRef.current[i];
        obs.y += obs.speed + 0.012 * currentSpeed;

        // Passed car
        if (obs.y >= 1.0) {
          obstaclesRef.current.splice(i, 1);
          localScore += 50;
          setScore(localScore);
          synthRef.current?.playScore();
          continue;
        }

        // Collision check with player (player is around y=0.82)
        const playerY = 0.82;
        const dx = Math.abs(obs.x - playerRef.current.x);
        const dy = Math.abs(obs.y - playerY);

        if (dx < 0.12 && dy < 0.09) {
          // Crash!
          synthRef.current?.playCrash();
          setGameState('gameover');
          setHighScore((prev) => {
            const nextBest = Math.max(prev, localScore);
            localStorage.setItem('retro_racing_best', nextBest.toString());
            return nextBest;
          });
          return;
        }
      }

      // Increase score by distance
      localScore += 1;
      setScore(localScore);

      // --- RENDERING ---
      // Clear screen
      ctx.fillStyle = '#06060c';
      ctx.fillRect(0, 0, width, height);

      // Synthwave sky gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.45);
      skyGrad.addColorStop(0, '#090514');
      skyGrad.addColorStop(1, '#2c0836');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height * 0.45);

      // Synthwave Retro Sun
      const horizonY = height * 0.45;
      const sunRadius = 46;
      const sunGrad = ctx.createLinearGradient(0, horizonY - sunRadius * 1.5, 0, horizonY);
      sunGrad.addColorStop(0, '#fde047');
      sunGrad.addColorStop(0.5, '#f43f5e');
      sunGrad.addColorStop(1, '#831843');
      ctx.fillStyle = sunGrad;
      ctx.beginPath();
      ctx.arc(width / 2, horizonY, sunRadius, Math.PI, 0, false);
      ctx.fill();

      // Sun stripes
      ctx.fillStyle = '#090514';
      for (let s = 1; s <= 5; s++) {
        const stripeY = horizonY - sunRadius * (s / 6);
        ctx.fillRect(width / 2 - sunRadius, stripeY, sunRadius * 2, 2.5);
      }

      // Synthwave Horizon grid
      ctx.strokeStyle = 'rgba(236, 72, 153, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      ctx.lineTo(width, horizonY);
      ctx.stroke();

      // Road geometry perspective
      const roadTopLeft = width * 0.35;
      const roadTopRight = width * 0.65;
      const roadBottomLeft = width * 0.05;
      const roadBottomRight = width * 0.95;

      // Road asphalt surface
      ctx.fillStyle = '#0b0914';
      ctx.beginPath();
      ctx.moveTo(roadTopLeft, horizonY);
      ctx.lineTo(roadTopRight, horizonY);
      ctx.lineTo(roadBottomRight, height);
      ctx.lineTo(roadBottomLeft, height);
      ctx.closePath();
      ctx.fill();

      // Glowing Cyan Border rails
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.moveTo(roadTopLeft, horizonY);
      ctx.lineTo(roadBottomLeft, height);
      ctx.moveTo(roadTopRight, horizonY);
      ctx.lineTo(roadBottomRight, height);
      ctx.stroke();
      ctx.shadowBlur = 0; // reset

      // Perspective grid horizontal lines
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.25)';
      ctx.lineWidth = 1;
      const numLines = 14;
      for (let l = 0; l < numLines; l++) {
        const progress = ((l * 50 + roadOffsetRef.current) % (numLines * 50)) / (numLines * 50);
        // Exponential perspective curve
        const curveY = horizonY + Math.pow(progress, 2.2) * (height - horizonY);
        const yRatio = (curveY - horizonY) / (height - horizonY);
        const leftX = roadTopLeft + (roadBottomLeft - roadTopLeft) * yRatio;
        const rightX = roadTopRight + (roadBottomRight - roadTopRight) * yRatio;

        ctx.beginPath();
        ctx.moveTo(leftX, curveY);
        ctx.lineTo(rightX, curveY);
        ctx.stroke();
      }

      // Center dashed road dividers
      ctx.strokeStyle = 'rgba(253, 224, 71, 0.6)';
      ctx.lineWidth = 2;
      ctx.setLineDash([12, 16]);
      ctx.lineDashOffset = -roadOffsetRef.current * 1.5;
      ctx.beginPath();
      ctx.moveTo(width / 2, horizonY);
      ctx.lineTo(width / 2, height);
      ctx.stroke();
      ctx.setLineDash([]); // reset

      // Draw Obstacle Cars
      obstaclesRef.current.forEach((obs) => {
        const yProgress = Math.pow(obs.y, 2.0);
        const drawY = horizonY + yProgress * (height - horizonY);
        const yRatio = (drawY - horizonY) / (height - horizonY);
        const roadW = (roadTopRight - roadTopLeft) + (roadBottomRight - roadBottomLeft - (roadTopRight - roadTopLeft)) * yRatio;
        const roadL = roadTopLeft + (roadBottomLeft - roadTopLeft) * yRatio;
        const drawX = roadL + obs.x * roadW;

        const carW = 16 + yRatio * 32;
        const carH = 10 + yRatio * 20;

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.fillRect(drawX - carW / 2, drawY, carW, carH * 0.4);

        // Body
        ctx.fillStyle = obs.color;
        ctx.fillRect(drawX - carW / 2, drawY - carH, carW, carH);

        // Windshield
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(drawX - carW * 0.35, drawY - carH * 0.8, carW * 0.7, carH * 0.3);

        // Rear lights
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(drawX - carW * 0.45, drawY - 4, carW * 0.25, 3);
        ctx.fillRect(drawX + carW * 0.2, drawY - 4, carW * 0.25, 3);
      });

      // Draw Player Sports Car
      const playerYRatio = 0.82;
      const playerDrawY = horizonY + Math.pow(playerYRatio, 2.0) * (height - horizonY);
      const roadWAtPlayer = (roadTopRight - roadTopLeft) + (roadBottomRight - roadBottomLeft - (roadTopRight - roadTopLeft)) * playerYRatio;
      const roadLAtPlayer = roadTopLeft + (roadBottomLeft - roadTopLeft) * playerYRatio;
      const playerDrawX = roadLAtPlayer + playerRef.current.x * roadWAtPlayer;

      const pCarW = 46;
      const pCarH = 26;

      // Cyan Underglow
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 18;
      ctx.fillStyle = 'rgba(6, 182, 212, 0.4)';
      ctx.fillRect(playerDrawX - pCarW / 2, playerDrawY - 2, pCarW, 8);
      ctx.shadowBlur = 0;

      // Player Car Body (Sleek Cyber Neon Silhouette)
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(playerDrawX - pCarW / 2, playerDrawY - pCarH, pCarW, pCarH);

      // Cabin / Roof
      ctx.fillStyle = '#09090b';
      ctx.fillRect(playerDrawX - pCarW * 0.35, playerDrawY - pCarH - 10, pCarW * 0.7, 12);

      // Rear tail-light neon strip
      ctx.fillStyle = '#f43f5e';
      ctx.shadowColor = '#f43f5e';
      ctx.shadowBlur = 10;
      ctx.fillRect(playerDrawX - pCarW * 0.45, playerDrawY - 4, pCarW * 0.9, 3);
      ctx.shadowBlur = 0;

      // Wheels
      ctx.fillStyle = '#27272a';
      ctx.fillRect(playerDrawX - pCarW / 2 - 3, playerDrawY - pCarH + 4, 3, 12);
      ctx.fillRect(playerDrawX + pCarW / 2, playerDrawY - pCarH + 4, 3, 12);

      requestRef.current = requestAnimationFrame(loop);
    };

    requestRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(requestRef.current);
      synthRef.current?.stopMusicAndEngine();
    };
  }, [isOpen, gameState]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-white/15 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.25)] flex flex-col">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🏎️</span>
            <div>
              <h2 className="text-sm font-bold text-white font-mono tracking-wider uppercase">
                {t('game.title')}
              </h2>
              <span className="text-[10px] font-mono text-pink-400 block">
                {t('game.subtitle')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {gameState === 'playing' && !isMuted && (
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-[10px] font-mono text-pink-300">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" />
                <span>SYNTH BGM ON</span>
              </div>
            )}

            <button
              onClick={handleMuteToggle}
              type="button"
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-zinc-300 hover:text-white transition-colors cursor-pointer"
              title={isMuted ? 'Unmute Audio (BGM & Engine)' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-zinc-500" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            </button>

            <button
              onClick={onClose}
              type="button"
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-zinc-300 hover:text-white transition-colors cursor-pointer"
              title={t('game.close')}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scoreboard Bar */}
        <div className="flex items-center justify-around py-3 px-6 bg-white/[0.02] border-b border-white/[0.06] text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-zinc-400">{t('game.score')}:</span>
            <span className="text-cyan-300 font-bold">{score}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-zinc-400">{t('game.best')}:</span>
            <span className="text-amber-300 font-bold">{highScore}</span>
          </div>
        </div>

        {/* Canvas Display Screen */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-black overflow-hidden flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={600}
            height={380}
            className="w-full h-full object-contain"
          />

          {/* CRT Scanline Overlay Effect */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.4) 0px, rgba(0,0,0,0.4) 1px, transparent 1px, transparent 2px)',
            }}
          />

          {/* Start Screen Overlay */}
          {gameState === 'start' && (
            <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
              <span className="text-4xl mb-3 animate-bounce">🏎️</span>
              <h3 className="text-2xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-cyan-400 to-sky-300 mb-2">
                RETRO RACER 1986
              </h3>
              <p className="text-xs font-mono text-zinc-300 mb-6 max-w-sm">
                {t('game.instructions')}
              </p>
              <button
                onClick={startGame}
                type="button"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-cyan-500 text-black font-bold font-mono text-xs tracking-wider uppercase hover:opacity-90 active:scale-95 transition-all shadow-[0_0_25px_rgba(236,72,153,0.5)] cursor-pointer flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>{t('game.start')}</span>
              </button>
            </div>
          )}

          {/* Game Over Screen Overlay */}
          {gameState === 'gameover' && (
            <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
              <h3 className="text-3xl font-bold font-mono text-pink-500 tracking-wider mb-2">
                {t('game.gameOver')}
              </h3>
              <p className="text-sm font-mono text-zinc-300 mb-2">
                {t('game.score')}: <span className="text-cyan-400 font-bold">{score}</span>
              </p>
              <p className="text-xs font-mono text-amber-400 mb-6">
                {t('game.best')}: {highScore}
              </p>
              <button
                onClick={startGame}
                type="button"
                className="px-6 py-3 rounded-xl bg-cyan-400 text-black font-bold font-mono text-xs tracking-wider uppercase hover:bg-cyan-300 active:scale-95 transition-all shadow-[0_0_25px_rgba(6,182,212,0.5)] cursor-pointer flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t('game.restart')}</span>
              </button>
            </div>
          )}
        </div>

        {/* Bottom On-Screen Controls for Mobile & Instructions */}
        <div className="p-4 bg-black/60 border-t border-white/10 flex items-center justify-between">
          <span className="text-[11px] font-mono text-zinc-400 hidden sm:inline">
            ⌨️ Left/Right Arrow or A/D to Steer · Space to Pause
          </span>

          {/* Mobile Touch Steering Buttons */}
          <div className="flex sm:hidden items-center justify-center gap-4 w-full">
            <button
              onMouseDown={() => (keysRef.current.left = true)}
              onMouseUp={() => (keysRef.current.left = false)}
              onTouchStart={() => (keysRef.current.left = true)}
              onTouchEnd={() => (keysRef.current.left = false)}
              className="flex-1 py-3 rounded-xl bg-white/[0.08] active:bg-cyan-500/30 text-white font-mono font-bold text-center border border-white/10"
            >
              ◀ LEFT
            </button>
            <button
              onMouseDown={() => (keysRef.current.right = true)}
              onMouseUp={() => (keysRef.current.right = false)}
              onTouchStart={() => (keysRef.current.right = true)}
              onTouchEnd={() => (keysRef.current.right = false)}
              className="flex-1 py-3 rounded-xl bg-white/[0.08] active:bg-cyan-500/30 text-white font-mono font-bold text-center border border-white/10"
            >
              RIGHT ▶
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
