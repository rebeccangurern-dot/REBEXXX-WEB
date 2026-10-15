/**
 * High-end Web Audio API ambient synthesis engine for REBEXXX unreleased demo previews.
 * Synthesizes rich, atmospheric analog chords, velvet sub-bass, and melodic arpeggios
 * entirely in-browser with zero external asset dependencies or dead audio links.
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentTrackId: string = 'track-uh-huh';
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private timerId: number | null = null;
  private step: number = 0;
  private volume: number = 0.75;
  private listeners: Set<(state: { isPlaying: boolean; currentTrackId: string; currentTime: number }) => void> =
    new Set();
  private currentTime: number = 0;
  private intervalTimer: number | null = null;

  public subscribe(listener: (state: { isPlaying: boolean; currentTrackId: string; currentTime: number }) => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((fn) =>
      fn({
        isPlaying: this.isPlaying,
        currentTrackId: this.currentTrackId,
        currentTime: this.currentTime,
      })
    );
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.8;

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public getAnalyserData(): Uint8Array {
    if (!this.analyser) {
      return new Uint8Array(32);
    }
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }

  public play(trackId?: string) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    if (trackId && trackId !== this.currentTrackId) {
      this.currentTrackId = trackId;
      this.currentTime = 0;
    }

    this.stopPattern();
    this.isPlaying = true;
    this.step = 0;

    // Start pattern loop
    this.startPattern(this.currentTrackId);

    // Track simulated seconds
    if (this.intervalTimer) window.clearInterval(this.intervalTimer);
    this.intervalTimer = window.setInterval(() => {
      if (this.isPlaying) {
        this.currentTime += 1;
        this.notify();
      }
    }, 1000);

    this.notify();
  }

  public pause() {
    this.isPlaying = false;
    this.stopPattern();
    if (this.intervalTimer) {
      window.clearInterval(this.intervalTimer);
      this.intervalTimer = null;
    }
    this.notify();
  }

  public togglePlay(trackId?: string) {
    if (this.isPlaying && (!trackId || trackId === this.currentTrackId)) {
      this.pause();
    } else {
      this.play(trackId || this.currentTrackId);
    }
  }

  private stopPattern() {
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  private startPattern(trackId: string) {
    if (!this.ctx || !this.masterGain) return;

    const bpm =
      trackId === 'track-uh-huh'
        ? 104
        : trackId === 'track-01'
        ? 78
        : trackId === 'track-02'
        ? 96
        : 64;
    const intervalMs = (60 / bpm / 2) * 1000; // 8th note grid

    this.scheduleStep(trackId);
    this.timerId = window.setInterval(() => {
      this.step++;
      this.scheduleStep(trackId);
    }, intervalMs);
  }

  private scheduleStep(trackId: string) {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;

    const now = this.ctx.currentTime;

    if (trackId === 'track-uh-huh') {
      // "UH HUH" - Sensual Bass Bounce, Syncopated Groove, Catchy Pop Hooks
      const step16 = this.step % 16;

      // Punchy syncopated bass line
      if (step16 === 0) {
        this.triggerSubBass(65.41, now, 0.45); // C2
      } else if (step16 === 3) {
        this.triggerSubBass(77.78, now, 0.35); // Eb2
      } else if (step16 === 6) {
        this.triggerSubBass(87.31, now, 0.45); // F2
      } else if (step16 === 10) {
        this.triggerSubBass(98.0, now, 0.35); // G2
      } else if (step16 === 14) {
        this.triggerSubBass(58.27, now, 0.3); // Bb1
      }

      // Harmonic chords on backbeats
      if (step16 === 2 || step16 === 8) {
        this.triggerChord([261.63, 311.13, 392.0, 466.16], now, 0.6, 'rhodes'); // Cm7
      } else if (step16 === 12) {
        this.triggerChord([220.0, 261.63, 329.63, 392.0], now, 0.5, 'rhodes'); // Am7b5
      }

      // Vocal-style synth hook stabs
      if (step16 === 4) {
        this.triggerLead(523.25, now, 0.25); // C5 "Uh"
      } else if (step16 === 5) {
        this.triggerLead(622.25, now, 0.4); // Eb5 "Huh"
      } else if (step16 === 13) {
        this.triggerLead(466.16, now, 0.3); // Bb4
      }

      // Rhythmic hats and snare click
      if (step16 % 2 === 0) {
        this.triggerSoftPerc(now, step16 % 4 === 2 ? 0.12 : 0.05);
      }
    } else if (trackId === 'track-01') {
      // "LATE NIGHT NAIROBI" - Velvet Sub & Lush Minor 9 Rhodes
      const barStep = this.step % 16;
      // Chords change every 8 steps: Dm9 -> Bbmaj7
      if (barStep === 0) {
        this.triggerChord([146.83, 220.0, 261.63, 329.63, 392.0], now, 3.2, 'rhodes'); // D3, A3, C4, E4, G4
        this.triggerSubBass(73.42, now, 1.8); // D2 sub
      } else if (barStep === 8) {
        this.triggerChord([116.54, 174.61, 233.08, 293.66, 349.23], now, 3.2, 'rhodes'); // Bb2, F3, Bb3, D4, F4
        this.triggerSubBass(58.27, now, 1.8); // Bb1 sub
      }

      // Soft melodic top line every 4 steps
      if (barStep === 4) {
        this.triggerLead(440.0, now, 0.8); // A4
      } else if (barStep === 12) {
        this.triggerLead(523.25, now, 0.9); // C5
      }

      // Subtle warm hi-hat click
      if (barStep % 2 === 0) {
        this.triggerSoftPerc(now, barStep % 4 === 2 ? 0.08 : 0.04);
      }
    } else if (trackId === 'track-02') {
      // "ECHOES OF VELVET" - Hypnotic Arpeggio & Dark Filter Sweeps
      const arpStep = this.step % 8;
      const notes = [185.0, 220.0, 277.18, 369.99, 440.0, 369.99, 277.18, 220.0]; // F#m scale
      this.triggerArp(notes[arpStep], now, 0.25);

      if (arpStep === 0) {
        this.triggerSubBass(46.25, now, 1.2); // F#1
      } else if (arpStep === 4) {
        this.triggerSubBass(55.0, now, 1.2); // A1
      }

      if (arpStep % 2 === 1) {
        this.triggerSoftPerc(now, 0.09);
      }
    } else {
      // "THE 100,000 DOLLS" - Celestial Music Box Bells & Analog Ambient Pad
      const bellStep = this.step % 12;
      const bellFreqs = [554.37, 659.25, 830.61, 1108.73, 987.77, 830.61]; // C#5, E5, G#5, C#6...
      if (bellStep % 2 === 0) {
        const freq = bellFreqs[(bellStep / 2) % bellFreqs.length];
        this.triggerBell(freq, now, 2.0);
      }

      if (bellStep === 0) {
        this.triggerChord([138.59, 207.65, 277.18, 415.3], now, 4.5, 'celestial');
        this.triggerSubBass(69.3, now, 3.5);
      }
    }
  }

  private triggerSubBass(freq: number, time: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, time);

    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.45, time + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + duration);
  }

  private triggerChord(freqs: number[], time: number, duration: number, type: 'rhodes' | 'celestial') {
    if (!this.ctx || !this.masterGain) return;

    freqs.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      const filter = this.ctx!.createBiquadFilter();

      osc.type = type === 'rhodes' ? (idx % 2 === 0 ? 'sine' : 'triangle') : 'sine';
      osc.frequency.setValueAtTime(freq, time);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(type === 'rhodes' ? 1200 : 800, time);
      filter.frequency.exponentialRampToValueAtTime(type === 'rhodes' ? 400 : 300, time + duration);

      const peakGain = (0.28 / freqs.length) * (1 - idx * 0.08);
      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(peakGain, time + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(time);
      osc.stop(time + duration);
    });
  }

  private triggerLead(freq: number, time: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(freq * 1.2, time);

    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.12, time + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + duration);
  }

  private triggerArp(freq: number, time: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, time);
    filter.frequency.exponentialRampToValueAtTime(300, time + duration);

    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.15, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + duration);
  }

  private triggerBell(freq: number, time: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.14, time + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + duration);
  }

  private triggerSoftPerc(time: number, vol: number) {
    if (!this.ctx || !this.masterGain) return;
    const bufferSize = this.ctx.sampleRate * 0.04;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(4000, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(vol, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.04);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(time);
  }

  public getState() {
    return {
      isPlaying: this.isPlaying,
      currentTrackId: this.currentTrackId,
      currentTime: this.currentTime,
    };
  }
}

export const audioEngine = new AudioEngine();
