/**
 * Fogo — The Calm, Modular & Intelligent Productivity Dashboard
 * Interactive JavaScript Engine (Workspaces, Real-time Clock, Web Audio, Themes, RAM Calc)
 */

document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initWorkspaces();
  initThemeHarmonizer();
  initAudioSoundscapes();
  initRamCalculator();
  initAiBriefing();
  initWidgetFilter();
  initByocTabs();
  initFaqAccordion();
  initMobileNav();
  initInstallModal();
});

/* -------------------------------------------------------------
   1. Real-Time Multi-Style Clock Engine
   ------------------------------------------------------------- */
let currentClockStyle = 'modern-minimal';
let is24Hour = false;

function initClock() {
  updateClock();
  setInterval(updateClock, 1000);

  // Clock style pill buttons
  const clockButtons = document.querySelectorAll('[data-clock-style]');
  clockButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      clockButtons.forEach(b => b.classList.remove('bg-purple-600', 'text-white', 'active-clock'));
      clockButtons.forEach(b => b.classList.add('bg-blueGray-800', 'text-blueGray-300'));
      btn.classList.add('bg-purple-600', 'text-white', 'active-clock');
      btn.classList.remove('bg-blueGray-800', 'text-blueGray-300');

      currentClockStyle = btn.getAttribute('data-clock-style');
      renderClockStyle();
      updateClock();
    });
  });

  // 12/24 hour toggle
  const toggle24 = document.getElementById('toggle-24h');
  if (toggle24) {
    toggle24.addEventListener('click', () => {
      is24Hour = !is24Hour;
      toggle24.textContent = is24Hour ? '24H Active' : '12H Active';
      toggle24.classList.toggle('bg-purple-600', is24Hour);
      toggle24.classList.toggle('bg-blueGray-700', !is24Hour);
      updateClock();
    });
  }
}

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  if (!is24Hour) {
    hours = hours % 12 || 12;
  }
  const hoursStr = String(hours).padStart(2, '0');

  // Date String
  const options = { weekday: 'long', month: 'short', day: 'numeric' };
  const dateStr = now.toLocaleDateString('en-US', options);

  // Update Swiss Dial Hands if active
  const secHand = document.getElementById('swiss-sec');
  const minHand = document.getElementById('swiss-min');
  const hourHand = document.getElementById('swiss-hour');
  if (secHand && minHand && hourHand) {
    const secDeg = (now.getSeconds() / 60) * 360;
    const minDeg = ((now.getMinutes() + now.getSeconds() / 60) / 60) * 360;
    const hourDeg = (((now.getHours() % 12) + now.getMinutes() / 60) / 12) * 360;
    secHand.style.transform = `rotate(${secDeg}deg)`;
    minHand.style.transform = `rotate(${minDeg}deg)`;
    hourHand.style.transform = `rotate(${hourDeg}deg)`;
  }

  // Update text clock displays
  const clockDigits = document.getElementById('clock-digits');
  const clockAmpm = document.getElementById('clock-ampm');
  const clockDate = document.getElementById('clock-date');

  if (clockDate) clockDate.textContent = dateStr;

  if (clockDigits) {
    if (currentClockStyle === 'retro-flip') {
      clockDigits.innerHTML = `
        <span class="flip-digit">${hoursStr}</span>
        <span class="clock-colon-pulse text-purple-400 mx-1">:</span>
        <span class="flip-digit">${minutes}</span>
        <span class="text-xs text-blueGray-400 ml-2 font-mono">${ampm}</span>
      `;
    } else if (currentClockStyle === 'fashion-stack') {
      clockDigits.innerHTML = `
        <div class="flex flex-col items-center leading-none">
          <span class="text-4xl md:text-5xl font-black">${hoursStr}</span>
          <span class="text-4xl md:text-5xl font-black text-purple-400">${minutes}</span>
        </div>
      `;
    } else if (currentClockStyle === 'cyber-hud') {
      clockDigits.innerHTML = `[${hoursStr}:${minutes}:${seconds}]`;
    } else {
      clockDigits.innerHTML = `${hoursStr}<span class="clock-colon-pulse text-purple-400">:</span>${minutes}`;
    }
  }

  if (clockAmpm && currentClockStyle !== 'retro-flip' && currentClockStyle !== 'cyber-hud') {
    clockAmpm.textContent = is24Hour ? '' : ampm;
  }
}

function renderClockStyle() {
  const container = document.getElementById('hero-clock-container');
  const swissContainer = document.getElementById('swiss-dial-container');
  if (!container) return;

  // Remove existing clock style classes
  const classes = [
    'clock-modern-minimal', 'clock-retro-flip', 'clock-cyber-hud',
    'clock-editorial-luxe', 'clock-synth-neon', 'clock-fashion-stack',
    'clock-glass-capsule', 'clock-nixie-tube', 'clock-matrix-code',
    'clock-aurora-gradient'
  ];
  container.classList.remove(...classes);

  if (currentClockStyle === 'swiss-dial') {
    container.classList.add('hidden');
    if (swissContainer) swissContainer.classList.remove('hidden');
  } else {
    container.classList.remove('hidden');
    if (swissContainer) swissContainer.classList.add('hidden');
    container.classList.add(`clock-${currentClockStyle}`);
  }
}

/* -------------------------------------------------------------
   2. Multi-Dashboard Workspaces Engine
   ------------------------------------------------------------- */
const workspaceData = {
  work: {
    title: "💼 Work Workspace",
    badge: "Alt + 1",
    greeting: "Good morning, Alex. You have 3 strategic reviews today.",
    tagline: "High-focus corporate agenda, 2-way task sync, market pulse & AI morning executive briefing.",
    briefing: "Board deck review at 10:30 AM with design leads. 4 priority tasks awaiting review in Notion. S&P 500 futures up +0.4%.",
    widgets: ['ai-briefing', 'agenda', 'tasks', 'stocks']
  },
  personal: {
    title: "🌴 Personal Workspace",
    badge: "Alt + 2",
    greeting: "Unwind & explore. The evening is yours.",
    tagline: "Clean bookmarks hub, 24/7 Lo-Fi player, vacation countdown, and 4-day environmental forecast.",
    briefing: "Tokyo trip departure in 14 days! Current forecast in Kyoto: 22°C with sunny skies. Lo-Fi chill session playing live.",
    widgets: ['lofi-player', 'bookmarks', 'countdown', 'weather']
  },
  study: {
    title: "📚 Study & Deep Focus",
    badge: "Alt + 3",
    greeting: "Deep work mode active. Distractions suppressed.",
    tagline: "Pomodoro focus timer, acoustic zen soundscapes, quick scratchpad, and Wikipedia instant bang search.",
    briefing: "Pomodoro cycle 2/4 ready. Zen bamboo acoustic resonance calibrated. 3 active research notes saved locally in browser.",
    widgets: ['pomodoro', 'notes', 'soundscapes', 'search-bang']
  },
  trading: {
    title: "📈 Financial Trading",
    badge: "Alt + 4",
    greeting: "Markets open in 24 minutes. Global indices green.",
    tagline: "Live interactive SVG asset charts, net worth P&L tracker, crypto ticker tape, and world clocks.",
    briefing: "Portfolio net worth: $148,250 (+3.4% 24h). Bitcoin testing $64,200 support. London & Tokyo clocks synced with 18ms latency.",
    widgets: ['chart', 'portfolio', 'watchlist', 'world-clocks']
  }
};

function initWorkspaces() {
  const workspaceButtons = document.querySelectorAll('[data-workspace]');
  workspaceButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const ws = btn.getAttribute('data-workspace');
      switchWorkspace(ws);
    });
  });

  // Global Keyboard Shortcuts (Alt + 1, 2, 3, 4)
  window.addEventListener('keydown', (e) => {
    if (e.altKey && ['1', '2', '3', '4'].includes(e.key)) {
      e.preventDefault();
      const keys = { '1': 'work', '2': 'personal', '3': 'study', '4': 'trading' };
      switchWorkspace(keys[e.key]);
    }
  });
}

function switchWorkspace(wsKey) {
  const data = workspaceData[wsKey];
  if (!data) return;

  // Update active button state
  document.querySelectorAll('[data-workspace]').forEach(b => {
    const isTarget = b.getAttribute('data-workspace') === wsKey;
    b.classList.toggle('bg-purple-600', isTarget);
    b.classList.toggle('text-white', isTarget);
    b.classList.toggle('shadow-lg', isTarget);
    b.classList.toggle('bg-blueGray-800', !isTarget);
    b.classList.toggle('text-blueGray-400', !isTarget);
  });

  // Update Dashboard Preview Content
  const wsTitle = document.getElementById('preview-ws-title');
  const wsTagline = document.getElementById('preview-ws-tagline');
  const wsGreeting = document.getElementById('preview-greeting');
  const wsAiBriefing = document.getElementById('preview-ai-text');
  const wsBadge = document.getElementById('preview-ws-badge');

  if (wsTitle) wsTitle.textContent = data.title;
  if (wsTagline) wsTagline.textContent = data.tagline;
  if (wsGreeting) wsGreeting.textContent = data.greeting;
  if (wsAiBriefing) wsAiBriefing.textContent = data.briefing;
  if (wsBadge) wsBadge.textContent = data.badge;

  // Animate preview cards
  const previewBox = document.getElementById('dashboard-preview-box');
  if (previewBox) {
    previewBox.classList.add('opacity-80', 'scale-[0.99]');
    setTimeout(() => {
      previewBox.classList.remove('opacity-80', 'scale-[0.99]');
    }, 200);
  }

  // Toggle dynamic widget sections in the preview
  document.querySelectorAll('[data-ws-widget]').forEach(w => {
    const widgetType = w.getAttribute('data-ws-widget');
    if (data.widgets.includes(widgetType)) {
      w.classList.remove('hidden');
    } else {
      w.classList.add('hidden');
    }
  });
}

/* -------------------------------------------------------------
   3. 22 Visual Themes Harmonizer Studio
   ------------------------------------------------------------- */
const themesList = [
  { id: 'obsidian-dark', name: 'Obsidian Dark', accent: '#8b5cf6', font: 'Plus Jakarta Sans', desc: 'Modern violet glow & deep obsidian frosted glass' },
  { id: 'nordic-glacier', name: 'Nordic Glacier', accent: '#38bdf8', font: 'Space Grotesk', desc: 'Crisp cyan ice & minimalist geometric lines' },
  { id: 'cyberpunk-2077', name: 'Cyberpunk 2077', accent: '#00f0ff', font: 'JetBrains Mono', desc: 'Futuristic neon grid & high-contrast terminal' },
  { id: 'emerald-luxury', name: 'Emerald Luxury', accent: '#10b981', font: 'Cinzel Serif', desc: 'Regal serif typography & deep emerald frosted cards' },
  { id: 'amber-sunset', name: 'Amber Sunset', accent: '#f59e0b', font: 'Outfit', desc: 'Warm golden twilight with smooth curved cards' },
  { id: 'tokyo-lo-fi', name: 'Tokyo Lo-Fi', accent: '#a78bfa', font: 'Plus Jakarta Sans', desc: 'Soft anime lavender vibes & relaxing atmosphere' },
  { id: 'deep-cosmos', name: 'Deep Cosmos', accent: '#c084fc', font: 'Space Grotesk', desc: 'Nebula glow with cosmic precision' },
  { id: 'retro-synthwave', name: 'Retro Synthwave', accent: '#f43f5e', font: 'JetBrains Mono', desc: '80s laser magenta & neon wireframe energy' },
  { id: 'zen-bamboo', name: 'Zen Bamboo', accent: '#4ade80', font: 'Cinzel Serif', desc: 'Calm green sanctuary & mindful tranquility' },
  { id: 'monochrome-clean', name: 'Monochrome Clean', accent: '#ffffff', font: 'Space Grotesk', desc: 'High-contrast black & crisp white typography' },
  { id: 'developer-studio', name: 'Developer Studio', accent: '#22c55e', font: 'JetBrains Mono', desc: 'Monospace hacker terminal with carbon texture' },
  { id: 'carbon-stealth', name: 'Carbon Stealth', accent: '#ef4444', font: 'JetBrains Mono', desc: 'Matte black stealth supercar styling' }
];

function initThemeHarmonizer() {
  const container = document.getElementById('theme-picker-grid');
  if (!container) return;

  container.innerHTML = '';
  themesList.forEach((theme, index) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = `p-3.5 rounded-xl border text-left transition-all duration-200 group relative ${
      index === 0 ? 'border-purple-500 bg-blueGray-800/90 shadow-lg' : 'border-blueGray-700/60 bg-blueGray-800/40 hover:border-blueGray-500 hover:bg-blueGray-800/80'
    }`;
    card.setAttribute('data-select-theme', theme.id);

    card.innerHTML = `
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center space-x-2">
          <span class="w-4 h-4 rounded-full shadow-md transition-transform group-hover:scale-110" style="background-color: ${theme.accent}"></span>
          <span class="font-semibold text-sm text-white">${theme.name}</span>
        </div>
        <span class="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-blueGray-900 text-blueGray-400 border border-blueGray-700">${theme.font}</span>
      </div>
      <p class="text-xs text-blueGray-400 line-clamp-1">${theme.desc}</p>
    `;

    card.addEventListener('click', () => {
      applyTheme(theme);
      container.querySelectorAll('[data-select-theme]').forEach(c => {
        c.classList.remove('border-purple-500', 'bg-blueGray-800/90', 'shadow-lg');
        c.classList.add('border-blueGray-700/60', 'bg-blueGray-800/40');
      });
      card.classList.add('border-purple-500', 'bg-blueGray-800/90', 'shadow-lg');
      card.classList.remove('border-blueGray-700/60', 'bg-blueGray-800/40');
    });

    container.appendChild(card);
  });
}

function applyTheme(theme) {
  const target = document.getElementById('dashboard-preview-box');
  if (target) {
    target.setAttribute('data-theme', theme.id);
  }

  const badge = document.getElementById('current-theme-badge');
  if (badge) {
    badge.textContent = `Theme: ${theme.name}`;
    badge.style.borderColor = theme.accent;
    badge.style.color = theme.accent;
  }
}

/* -------------------------------------------------------------
   4. Web Audio API Focus Soundscape Synthesizer
   ------------------------------------------------------------- */
let audioCtx = null;
let isAudioPlaying = false;
let masterGain = null;
const audioChannels = {
  rain: { gain: null, node: null, vol: 0.5 },
  waves: { gain: null, node: null, vol: 0.3 },
  bowl: { gain: null, node: null, vol: 0.4 },
  forest: { gain: null, node: null, vol: 0.2 }
};

function initAudioSoundscapes() {
  const playBtn = document.getElementById('toggle-soundscapes-btn');
  const masterSlider = document.getElementById('master-volume');
  const vinylDisc = document.getElementById('vinyl-disc');
  const eqVisualizer = document.getElementById('eq-visualizer');

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (!isAudioPlaying) {
        startSoundscapes();
        playBtn.innerHTML = '<i class="fas fa-pause mr-2"></i> Pause Mixer';
        playBtn.classList.remove('bg-purple-600');
        playBtn.classList.add('bg-emerald-600');
        if (vinylDisc) vinylDisc.classList.add('vinyl-spinning');
        if (eqVisualizer) eqVisualizer.classList.remove('opacity-30');
      } else {
        stopSoundscapes();
        playBtn.innerHTML = '<i class="fas fa-play mr-2"></i> Play Soundscape';
        playBtn.classList.add('bg-purple-600');
        playBtn.classList.remove('bg-emerald-600');
        if (vinylDisc) vinylDisc.classList.remove('vinyl-spinning');
        if (eqVisualizer) eqVisualizer.classList.add('opacity-30');
      }
    });
  }

  if (masterSlider) {
    masterSlider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      if (masterGain && audioCtx) {
        masterGain.gain.setValueAtTime(val, audioCtx.currentTime);
      }
      const label = document.getElementById('master-vol-label');
      if (label) label.textContent = `${Math.round(val * 100)}%`;
    });
  }

  // Channel Volume Sliders
  ['rain', 'waves', 'bowl', 'forest'].forEach(ch => {
    const slider = document.getElementById(`slider-${ch}`);
    if (slider) {
      slider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        audioChannels[ch].vol = val;
        if (audioChannels[ch].gain && audioCtx) {
          audioChannels[ch].gain.gain.setValueAtTime(val, audioCtx.currentTime);
        }
      });
    }
  });

  // Preset Blends Buttons
  const presetButtons = document.querySelectorAll('[data-sound-preset]');
  presetButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const preset = btn.getAttribute('data-sound-preset');
      applySoundPreset(preset);
      presetButtons.forEach(b => b.classList.remove('border-purple-500', 'text-white'));
      btn.classList.add('border-purple-500', 'text-white');
    });
  });
}

function startSoundscapes() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  masterGain = audioCtx.createGain();
  const masterSlider = document.getElementById('master-volume');
  const masterVal = masterSlider ? parseFloat(masterSlider.value) : 0.7;
  masterGain.gain.setValueAtTime(masterVal, audioCtx.currentTime);
  masterGain.connect(audioCtx.destination);

  // 1. Rain Synthesizer (Filtered Pink Noise)
  const bufferSize = audioCtx.sampleRate * 2;
  const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    b3 = 0.86650 * b3 + white * 0.3104856;
    b4 = 0.55000 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.0168980;
    output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
    b6 = white * 0.115926;
  }

  const rainSrc = audioCtx.createBufferSource();
  rainSrc.buffer = noiseBuffer;
  rainSrc.loop = true;

  const rainFilter = audioCtx.createBiquadFilter();
  rainFilter.type = 'lowpass';
  rainFilter.frequency.setValueAtTime(850, audioCtx.currentTime);

  const rainGain = audioCtx.createGain();
  rainGain.gain.setValueAtTime(audioChannels.rain.vol, audioCtx.currentTime);
  rainSrc.connect(rainFilter);
  rainFilter.connect(rainGain);
  rainGain.connect(masterGain);
  rainSrc.start();
  audioChannels.rain.node = rainSrc;
  audioChannels.rain.gain = rainGain;

  // 2. Waves Synthesizer (LFO modulated filtered noise)
  const waveSrc = audioCtx.createBufferSource();
  waveSrc.buffer = noiseBuffer;
  waveSrc.loop = true;

  const waveFilter = audioCtx.createBiquadFilter();
  waveFilter.type = 'bandpass';
  waveFilter.frequency.setValueAtTime(400, audioCtx.currentTime);
  waveFilter.Q.setValueAtTime(1.5, audioCtx.currentTime);

  const waveGain = audioCtx.createGain();
  waveGain.gain.setValueAtTime(audioChannels.waves.vol, audioCtx.currentTime);

  // LFO for surf swelling
  const lfo = audioCtx.createOscillator();
  lfo.frequency.setValueAtTime(0.12, audioCtx.currentTime); // slow swell
  const lfoGain = audioCtx.createGain();
  lfoGain.gain.setValueAtTime(280, audioCtx.currentTime);
  lfo.connect(lfoGain);
  lfoGain.connect(waveFilter.frequency);
  lfo.start();

  waveSrc.connect(waveFilter);
  waveFilter.connect(waveGain);
  waveGain.connect(masterGain);
  waveSrc.start();
  audioChannels.waves.node = waveSrc;
  audioChannels.waves.gain = waveGain;

  // 3. Singing Bowl Harmony (gentle overtone sine chord)
  const bowlGain = audioCtx.createGain();
  bowlGain.gain.setValueAtTime(audioChannels.bowl.vol * 0.25, audioCtx.currentTime);
  const freqs = [216, 432, 648];
  freqs.forEach(f => {
    const osc = audioCtx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(f, audioCtx.currentTime);
    osc.connect(bowlGain);
    osc.start();
  });
  bowlGain.connect(masterGain);
  audioChannels.bowl.gain = bowlGain;

  isAudioPlaying = true;
}

function stopSoundscapes() {
  if (audioCtx) {
    audioCtx.suspend();
  }
  isAudioPlaying = false;
}

function applySoundPreset(preset) {
  const presets = {
    'zen-garden': { rain: 0.1, waves: 0.0, bowl: 0.7, forest: 0.6 },
    'rainy-forest': { rain: 0.8, waves: 0.2, bowl: 0.2, forest: 0.7 },
    'deep-focus': { rain: 0.3, waves: 0.4, bowl: 0.8, forest: 0.3 },
    'ocean-surf': { rain: 0.0, waves: 0.9, bowl: 0.3, forest: 0.1 }
  };
  const settings = presets[preset];
  if (!settings) return;

  ['rain', 'waves', 'bowl', 'forest'].forEach(ch => {
    audioChannels[ch].vol = settings[ch];
    const slider = document.getElementById(`slider-${ch}`);
    if (slider) slider.value = settings[ch];
    if (audioChannels[ch].gain && audioCtx) {
      audioChannels[ch].gain.gain.setValueAtTime(settings[ch], audioCtx.currentTime);
    }
  });
}

/* -------------------------------------------------------------
   5. Interactive RAM Calculator
   ------------------------------------------------------------- */
function initRamCalculator() {
  const slider = document.getElementById('ram-tab-slider');
  const tabDisplay = document.getElementById('calc-tab-count');
  const ramDisplay = document.getElementById('calc-ram-saved');
  const cpuDisplay = document.getElementById('calc-cpu-speed');
  const batteryDisplay = document.getElementById('calc-battery-boost');

  if (!slider) return;

  slider.addEventListener('input', (e) => {
    const tabs = parseInt(e.target.value, 10);
    if (tabDisplay) tabDisplay.textContent = `${tabs} Tabs`;

    // Average Chrome tab consumes approx 45MB to 85MB RAM
    const mbSaved = Math.round(tabs * 52);
    let ramText = `${mbSaved} MB`;
    if (mbSaved >= 1000) {
      ramText = `${(mbSaved / 1024).toFixed(1)} GB`;
    }

    if (ramDisplay) ramDisplay.textContent = ramText;

    // CPU load percentage estimate
    const cpuPct = Math.min(88, Math.round(tabs * 0.6 + 12));
    if (cpuDisplay) cpuDisplay.textContent = `~${cpuPct}% Less CPU Spikes`;

    // Battery boost estimate
    const batteryHrs = (tabs * 0.025).toFixed(1);
    if (batteryDisplay) batteryDisplay.textContent = `+${batteryHrs} hrs`;
  });
}

/* -------------------------------------------------------------
   6. AI Executive Briefing Tone Switcher
   ------------------------------------------------------------- */
const aiTones = {
  crisp: {
    title: "Executive & Crisp",
    text: "Review 10:30 AM product roadmap with directors. 3 high-impact deliverables due before EOD. Equity futures pointing green (+0.52%).",
    tag: "Sharp & Boardroom Ready"
  },
  motivational: {
    title: "Motivational & Energizing",
    text: "Today is a high-leverage day! Your calendar is structured for deep focus blocks this afternoon. Take a breath and build momentum.",
    tag: "Inspiring & High-Vibe"
  },
  analytical: {
    title: "Concise & Analytical",
    text: "Calendar: 2.5 hrs meetings. Tasks: 4 unresolved P0 tickets. Weather: 21°C / AQI 24 (Optimal). S&P 500 RSI: 58.2 Neutral.",
    tag: "Metric-Forward & Direct"
  }
};

function initAiBriefing() {
  const buttons = document.querySelectorAll('[data-ai-tone]');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tone = btn.getAttribute('data-ai-tone');
      const data = aiTones[tone];
      if (!data) return;

      buttons.forEach(b => {
        b.classList.remove('bg-purple-600', 'text-white');
        b.classList.add('bg-blueGray-800', 'text-blueGray-400');
      });
      btn.classList.add('bg-purple-600', 'text-white');
      btn.classList.remove('bg-blueGray-800', 'text-blueGray-400');

      const textEl = document.getElementById('briefing-card-text');
      const tagEl = document.getElementById('briefing-card-tag');
      if (textEl) textEl.textContent = data.text;
      if (tagEl) tagEl.textContent = data.tag;
    });
  });
}

/* -------------------------------------------------------------
   7. Bento Widget Registry Filter
   ------------------------------------------------------------- */
function initWidgetFilter() {
  const filterBtns = document.querySelectorAll('[data-widget-filter]');
  const widgetCards = document.querySelectorAll('[data-widget-category]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const category = btn.getAttribute('data-widget-filter');

      filterBtns.forEach(b => {
        b.classList.remove('bg-purple-600', 'text-white');
        b.classList.add('bg-blueGray-800', 'text-blueGray-400');
      });
      btn.classList.add('bg-purple-600', 'text-white');
      btn.classList.remove('bg-blueGray-800', 'text-blueGray-400');

      widgetCards.forEach(card => {
        const cardCat = card.getAttribute('data-widget-category');
        if (category === 'all' || cardCat.includes(category)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* -------------------------------------------------------------
   8. BYOC (Bring Your Own Code) Tabs
   ------------------------------------------------------------- */
const byocSnippets = {
  neon: `/* ✨ Neon Clock Glow CSS */
.fogo-hero-clock {
  color: #a855f7 !important;
  text-shadow: 0 0 20px rgba(168, 85, 247, 0.8),
               0 0 40px rgba(168, 85, 247, 0.4);
}`,
  scrim: `/* ☀️ Ultra-Clear Scrim CSS */
.fogo-wallpaper-scrim {
  background: transparent !important;
  backdrop-filter: none !important;
}`,
  cyan: `/* 💎 Cyan Bento Outlines */
.fogo-widget-card {
  border: 1px solid rgba(6, 182, 212, 0.4) !important;
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.15) !important;
}`,
  altk: `// 📋 Alt+K Shortcut to Search
window.addEventListener('keydown', (e) => {
  if (e.altKey && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    document.querySelector('#fogo-search-input')?.focus();
  }
});`
};

function initByocTabs() {
  const tabs = document.querySelectorAll('[data-byoc-tab]');
  const codeBox = document.getElementById('byoc-code-box');

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const key = tab.getAttribute('data-byoc-tab');
      if (byocSnippets[key] && codeBox) {
        codeBox.textContent = byocSnippets[key];
      }
      tabs.forEach(t => {
        t.classList.remove('border-purple-500', 'text-purple-400');
        t.classList.add('border-transparent', 'text-blueGray-400');
      });
      tab.classList.add('border-purple-500', 'text-purple-400');
      tab.classList.remove('border-transparent', 'text-blueGray-400');
    });
  });
}

/* -------------------------------------------------------------
   9. FAQ Accordion
   ------------------------------------------------------------- */
function initFaqAccordion() {
  const faqButtons = document.querySelectorAll('[data-faq-toggle]');
  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-chevron');
      if (!content) return;

      const isOpen = !content.classList.contains('hidden');
      document.querySelectorAll('[data-faq-content]').forEach(c => c.classList.add('hidden'));
      document.querySelectorAll('.faq-chevron').forEach(i => i.classList.remove('rotate-180'));

      if (!isOpen) {
        content.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180');
      }
    });
  });
}

/* -------------------------------------------------------------
   10. Mobile Navigation Menu
   ------------------------------------------------------------- */
function initMobileNav() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}

/* -------------------------------------------------------------
   11. Installation Modal
   ------------------------------------------------------------- */
function initInstallModal() {
  const openButtons = document.querySelectorAll('[data-open-install]');
  const modal = document.getElementById('install-modal');
  const closeBtn = document.getElementById('close-install-modal');

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) modal.classList.remove('hidden');
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    });
  }
}
