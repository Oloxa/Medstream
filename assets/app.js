/**
 * MedStream Global - Enterprise Surgical & Medical Masterclass Video Archive
 * Vanilla JS Application Controller (Zero External Dependencies)
 */

(function () {
  'use strict';

  // --- Theme Management ---
  const THEME_KEY = 'medstream_theme';

  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme ? savedTheme : (systemPrefersDark ? 'dark' : 'light');
    
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    if (newTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem(THEME_KEY, newTheme);
  }

  // --- Ranking Panel Tab Switching & Dynamic Data ---
  const rankingData = {
    day: [
      { rank: 1, title: "Robotic-Assisted Laparoscopic Cholecystectomy (Calot's Triangle)", hits: "14,890 views", score: "9.9", area: "Johns Hopkins", cat: "General" },
      { rank: 2, title: "Microvascular Decompression for Trigeminal Neuralgia", hits: "12,410 views", score: "9.8", area: "Mayo Clinic", cat: "Neurosurgery" },
      { rank: 3, title: "Total Knee Arthroplasty with Navigation-Guided Balancing", hits: "11,150 views", score: "9.7", area: "Charité Berlin", cat: "Orthopedics" },
      { rank: 4, title: "Off-Pump Coronary Artery Bypass Grafting (OPCAB)", hits: "9,820 views", score: "9.6", area: "Cleveland Clinic", cat: "Cardiothoracic" },
      { rank: 5, title: "Endoscopic Submucosal Dissection (ESD) for Gastric Lesions", hits: "8,940 views", score: "9.5", area: "Tokyo Med Univ", cat: "General" },
      { rank: 6, title: "Anterior Cervical Discectomy and Fusion (ACDF C5-C6)", hits: "7,630 views", score: "9.5", area: "Karolinska Inst", cat: "Neurosurgery" },
      { rank: 7, title: "Laparoscopic Donor Nephrectomy Transperitoneal Approach", hits: "6,910 views", score: "9.4", area: "Oxford Health", cat: "General" },
      { rank: 8, title: "Complex Pediatric Tetralogy of Fallot Complete Repair", hits: "6,200 views", score: "9.4", area: "Boston Children's", cat: "Cardiothoracic" },
      { rank: 9, title: "Arthroscopic Rotator Cuff Double-Row Suture Bridge", hits: "5,840 views", score: "9.3", area: "Hospital Spec Surg", cat: "Orthopedics" },
      { rank: 10, title: "Vascular Reconstruction in Retroperitoneal Sarcoma", hits: "5,120 views", score: "9.2", area: "MD Anderson", cat: "General" }
    ],
    week: [
      { rank: 1, title: "Microvascular Decompression for Trigeminal Neuralgia", hits: "84,320 views", score: "9.8", area: "Mayo Clinic", cat: "Neurosurgery" },
      { rank: 2, title: "Robotic-Assisted Laparoscopic Cholecystectomy", hits: "79,150 views", score: "9.9", area: "Johns Hopkins", cat: "General" },
      { rank: 3, title: "Off-Pump Coronary Artery Bypass Grafting (OPCAB)", hits: "68,400 views", score: "9.6", area: "Cleveland Clinic", cat: "Cardiothoracic" },
      { rank: 4, title: "Total Knee Arthroplasty with Navigation-Guided Balancing", hits: "62,900 views", score: "9.7", area: "Charité Berlin", cat: "Orthopedics" },
      { rank: 5, title: "Aortic Root Remodeling & Valve-Sparing Reimplantation", hits: "55,230 views", score: "9.8", area: "Toronto Gen", cat: "Cardiothoracic" },
      { rank: 6, title: "Awake Craniotomy for Eloquent Cortex Glioma Resection", hits: "49,100 views", score: "9.7", area: "UCSF Health", cat: "Neurosurgery" },
      { rank: 7, title: "Laparoscopic Sleeve Gastrectomy with Hiatal Hernia Repair", hits: "44,800 views", score: "9.3", area: "Cleveland Clinic", cat: "General" },
      { rank: 8, title: "Reverse Total Shoulder Arthroplasty in Massive Cuff Tear", hits: "39,500 views", score: "9.4", area: "Mayo Clinic", cat: "Orthopedics" },
      { rank: 9, title: "Whipple Procedure: Pancreaticoduodenectomy En Bloc", hits: "36,200 views", score: "9.9", area: "Heidelberg Univ", cat: "General" },
      { rank: 10, title: "Corneal Endothelial Keratoplasty (DMEK Masterclass)", hits: "31,800 views", score: "9.1", area: "Moorfields Eye", cat: "General" }
    ],
    month: [
      { rank: 1, title: "Whipple Procedure: Pancreaticoduodenectomy En Bloc", hits: "340,900 views", score: "9.9", area: "Heidelberg Univ", cat: "General" },
      { rank: 2, title: "Robotic-Assisted Laparoscopic Cholecystectomy", hits: "312,400 views", score: "9.9", area: "Johns Hopkins", cat: "General" },
      { rank: 3, title: "Awake Craniotomy for Eloquent Cortex Glioma Resection", hits: "288,100 views", score: "9.7", area: "UCSF Health", cat: "Neurosurgery" },
      { rank: 4, title: "Off-Pump Coronary Artery Bypass Grafting (OPCAB)", hits: "245,600 views", score: "9.6", area: "Cleveland Clinic", cat: "Cardiothoracic" },
      { rank: 5, title: "Microvascular Decompression for Trigeminal Neuralgia", hits: "229,800 views", score: "9.8", area: "Mayo Clinic", cat: "Neurosurgery" },
      { rank: 6, title: "Total Hip Arthroplasty Direct Anterior Approach", hits: "198,300 views", score: "9.5", area: "Hospital Spec Surg", cat: "Orthopedics" },
      { rank: 7, title: "Robotic Radical Prostatectomy with Nerve-Sparing", hits: "174,200 views", score: "9.6", area: "Memorial Sloan", cat: "General" },
      { rank: 8, title: "Complex Pediatric Tetralogy of Fallot Complete Repair", hits: "162,100 views", score: "9.4", area: "Boston Children's", cat: "Cardiothoracic" },
      { rank: 9, title: "Endovascular Aneurysm Repair (EVAR) Complex Neck", hits: "148,900 views", score: "9.3", area: "St Thomas Hosp", cat: "General" },
      { rank: 10, title: "Cochlear Implant Microsurgical Insertion Technique", hits: "135,400 views", score: "9.2", area: "Hannover Med", cat: "General" }
    ],
    all: [
      { rank: 1, title: "Robotic-Assisted Laparoscopic Cholecystectomy", hits: "1,840,000 views", score: "9.9", area: "Johns Hopkins", cat: "General" },
      { rank: 2, title: "Whipple Procedure: Pancreaticoduodenectomy En Bloc", hits: "1,620,000 views", score: "9.9", area: "Heidelberg Univ", cat: "General" },
      { rank: 3, title: "Awake Craniotomy for Eloquent Cortex Glioma Resection", hits: "1,450,000 views", score: "9.7", area: "UCSF Health", cat: "Neurosurgery" },
      { rank: 4, title: "Off-Pump Coronary Artery Bypass Grafting (OPCAB)", hits: "1,290,000 views", score: "9.6", area: "Cleveland Clinic", cat: "Cardiothoracic" },
      { rank: 5, title: "Total Knee Arthroplasty with Navigation-Guided Balancing", hits: "1,180,000 views", score: "9.7", area: "Charité Berlin", cat: "Orthopedics" },
      { rank: 6, title: "Microvascular Decompression for Trigeminal Neuralgia", hits: "1,040,000 views", score: "9.8", area: "Mayo Clinic", cat: "Neurosurgery" },
      { rank: 7, title: "Aortic Root Remodeling & Valve-Sparing Reimplantation", hits: "960,000 views", score: "9.8", area: "Toronto Gen", cat: "Cardiothoracic" },
      { rank: 8, title: "Total Hip Arthroplasty Direct Anterior Approach", hits: "880,000 views", score: "9.5", area: "Hospital Spec Surg", cat: "Orthopedics" },
      { rank: 9, title: "Robotic Radical Prostatectomy with Nerve-Sparing", hits: "820,000 views", score: "9.6", area: "Memorial Sloan", cat: "General" },
      { rank: 10, title: "Endoscopic Pituitary Adenoma Transsphenoidal Resection", hits: "750,000 views", score: "9.6", area: "Karolinska Inst", cat: "Neurosurgery" }
    ]
  };

  function initRankingPanel() {
    const rankContainer = document.querySelector('[data-list="rank"]');
    if (!rankContainer) return;

    const timeButtons = rankContainer.querySelectorAll('[data-rank]');
    const catButtons = rankContainer.querySelectorAll('.rank-cat-btn');
    const listElement = rankContainer.querySelector('.ranking-list');

    let currentPeriod = 'day';
    let currentCategory = 'all';

    function renderRankingList() {
      if (!listElement) return;
      let items = rankingData[currentPeriod] || rankingData.day;
      
      if (currentCategory !== 'all') {
        items = items.filter(it => it.cat.toLowerCase() === currentCategory.toLowerCase());
      }

      listElement.innerHTML = items.slice(0, 10).map((item, idx) => `
        <li class="ranking-item">
          <span class="rank-num">${idx + 1}</span>
          <div class="rank-item-info">
            <a href="detail.html" class="rank-item-title" title="${item.title}">${item.title}</a>
            <div class="rank-item-meta">
              <span data-f="vod_area">${item.area}</span>
              <span>•</span>
              <span data-f="vod_hits" class="rank-hits">${item.hits}</span>
              <span>•</span>
              <span data-f="vod_score">★ ${item.score}</span>
            </div>
          </div>
        </li>
      `).join('');
    }

    timeButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        timeButtons.forEach(b => b.classList.remove('on'));
        this.classList.add('on');
        currentPeriod = this.getAttribute('data-rank') || 'day';
        renderRankingList();
      });
    });

    catButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        catButtons.forEach(b => b.classList.remove('on'));
        this.classList.add('on');
        currentCategory = this.getAttribute('data-cat') || 'all';
        renderRankingList();
      });
    });

    renderRankingList();
  }

  // --- Multi-Line Stream Sources & Episode Tab Switching ---
  function initPlaylistTabs() {
    const playlistSection = document.querySelector('.playlist-section');
    if (!playlistSection) return;

    const lineTabs = playlistSection.querySelectorAll('.line-tab-btn');
    const panes = playlistSection.querySelectorAll('.line-content-pane');

    lineTabs.forEach(tab => {
      tab.addEventListener('click', function () {
        const targetLine = this.getAttribute('data-line');
        
        lineTabs.forEach(t => t.classList.remove('on'));
        this.classList.add('on');

        panes.forEach(pane => {
          if (pane.getAttribute('data-line-content') === targetLine) {
            pane.classList.add('on');
          } else {
            pane.classList.remove('on');
          }
        });

        // Update player angle simulation
        if (window.MedStreamPlayer && window.MedStreamPlayer.setCameraAngle) {
          window.MedStreamPlayer.setCameraAngle(targetLine);
        }
      });
    });

    // Episode selection click logic
    playlistSection.addEventListener('click', function (e) {
      const epBtn = e.target.closest('.ep-btn');
      if (!epBtn) return;

      const currentPane = epBtn.closest('.line-content-pane');
      if (currentPane) {
        currentPane.querySelectorAll('.ep-btn').forEach(b => b.classList.remove('on'));
      }
      epBtn.classList.add('on');

      const epNum = epBtn.querySelector('.ep-num')?.textContent || 'Module';
      const epTitle = epBtn.getAttribute('data-title') || epNum;
      
      if (window.MedStreamPlayer && window.MedStreamPlayer.setModule) {
        window.MedStreamPlayer.setModule(epNum, epTitle);
      }
    });
  }

  // --- Interactive Medical Video Player Simulator ---
  function initMedicalPlayer() {
    const canvas = document.getElementById('surgicalCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let isPlaying = true;
    let currentAngle = 'line1';
    let currentModuleName = 'Module 01: Pre-Op Anatomical Landmarks & Trocar Placement';
    let elapsedSeconds = 248; // 04:08
    let playbackSpeed = 1.0;
    let isMuted = false;

    const playPauseBtn = document.getElementById('playerPlayPause');
    const timeDisplay = document.getElementById('playerTime');
    const progressBar = document.getElementById('playerProgress');
    const progressFilled = document.getElementById('playerProgressFilled');
    const speedBtn = document.getElementById('playerSpeed');
    const muteBtn = document.getElementById('playerMute');
    const fullscreenBtn = document.getElementById('playerFullscreen');
    const moduleBadge = document.getElementById('playerModuleBadge');

    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        canvas.width = rect.width * (window.devicePixelRatio || 1);
        canvas.height = rect.height * (window.devicePixelRatio || 1);
        ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
      }
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Pulse / ECG wave generator
    let ecgTick = 0;
    const ecgBuffer = [];
    for (let i = 0; i < 150; i++) ecgBuffer.push(50);

    function getNextEcgSample() {
      ecgTick = (ecgTick + 1) % 60;
      if (ecgTick === 20) return 20; // P wave
      if (ecgTick === 28) return 55; // Q
      if (ecgTick === 30) return 5;  // R spike
      if (ecgTick === 33) return 75; // S dip
      if (ecgTick === 42) return 30; // T wave
      return 50 + (Math.sin(ecgTick * 0.1) * 2);
    }

    let animFrame;
    function renderFrame() {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      if (w === 0 || h === 0) {
        animFrame = requestAnimationFrame(renderFrame);
        return;
      }

      // Background
      ctx.fillStyle = '#060a12';
      ctx.fillRect(0, 0, w, h);

      if (currentAngle === 'line1') {
        // Line 1: 4K Surgical Field View
        // Surgical cavity glow
        const radGrad = ctx.createRadialGradient(w * 0.5, h * 0.52, 40, w * 0.5, h * 0.52, Math.min(w, h) * 0.45);
        radGrad.addColorStop(0, '#7f1d1d');
        radGrad.addColorStop(0.4, '#450a0a');
        radGrad.addColorStop(0.8, '#1e1b4b');
        radGrad.addColorStop(1, '#090d16');
        ctx.fillStyle = radGrad;
        ctx.fillRect(0, 0, w, h);

        // Surgical tools animation
        const toolOsc = Math.sin(Date.now() * 0.002);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        
        // Laparoscopic Grasper Left
        ctx.beginPath();
        ctx.moveTo(w * 0.1, h * 0.9);
        ctx.lineTo(w * 0.42 + (toolOsc * 15), h * 0.5 + (toolOsc * 10));
        ctx.stroke();

        // Electrocautery Hook Right
        ctx.strokeStyle = '#0284c7';
        ctx.beginPath();
        ctx.moveTo(w * 0.9, h * 0.9);
        ctx.lineTo(w * 0.54 - (toolOsc * 12), h * 0.48 - (toolOsc * 8));
        ctx.stroke();

        // Calot's Triangle / Tissue indicator
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(w * 0.4 - 20, h * 0.38 - 20, 140, 100);
        ctx.setLineDash([]);
        
        ctx.fillStyle = '#38bdf8';
        ctx.font = '11px sans-serif';
        ctx.fillText('Critical View of Safety (CVS)', w * 0.4 - 15, h * 0.38 - 26);

      } else if (currentAngle === 'line2') {
        // Line 2: Endoscopic / Laparoscopic Feed
        ctx.fillStyle = '#020617';
        ctx.fillRect(0, 0, w, h);

        // Circular endoscopic mask
        ctx.save();
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, Math.min(w, h) * 0.42, 0, Math.PI * 2);
        ctx.clip();

        const endoGrad = ctx.createRadialGradient(w * 0.5, h * 0.5, 30, w * 0.5, h * 0.5, Math.min(w, h) * 0.42);
        endoGrad.addColorStop(0, '#991b1b');
        endoGrad.addColorStop(0.6, '#3b0764');
        endoGrad.addColorStop(1, '#020617');
        ctx.fillStyle = endoGrad;
        ctx.fillRect(0, 0, w, h);

        // Endoscopic Crosshair & Depth Grids
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(w / 2, 0); ctx.lineTo(w / 2, h);
        ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2);
        ctx.stroke();
        ctx.restore();

        // Scope Ring
        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, Math.min(w, h) * 0.42, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#38bdf8';
        ctx.font = '12px ui-monospace, monospace';
        ctx.fillText('ENDO-OPTIC 4K HDR • 30° RIGID SCOPE', 24, 36);

      } else {
        // Line 3: Vital Signs & OR Monitor Overlay
        ctx.fillStyle = '#020617';
        ctx.fillRect(0, 0, w, h);

        // Telemetry Grid
        ctx.strokeStyle = 'rgba(30, 41, 59, 0.6)';
        ctx.lineWidth = 1;
        for (let x = 0; x < w; x += 40) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
        }
        for (let y = 0; y < h; y += 40) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
        }

        // Live ECG Trace
        if (isPlaying) {
          ecgBuffer.shift();
          ecgBuffer.push(getNextEcgSample());
        }

        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        const stepX = (w * 0.6) / ecgBuffer.length;
        for (let i = 0; i < ecgBuffer.length; i++) {
          const px = 30 + (i * stepX);
          const py = (h * 0.3) + (ecgBuffer[i] - 50);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();

        // OR Monitor Metrics Cards
        ctx.fillStyle = '#22c55e';
        ctx.font = 'bold 28px ui-monospace, monospace';
        ctx.fillText('HR: 72 bpm', 30, h * 0.2);

        ctx.fillStyle = '#38bdf8';
        ctx.fillText('SpO2: 99%', w * 0.68, h * 0.2);

        ctx.fillStyle = '#eab308';
        ctx.fillText('NIBP: 118/76', 30, h * 0.6);

        ctx.fillStyle = '#ec4899';
        ctx.fillText('ETCO2: 36 mmHg', w * 0.68, h * 0.6);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '13px sans-serif';
        ctx.fillText('Anesthesia Station • Draeger Perseus A500', 30, h * 0.85);
      }

      // Live Timestamp & Watermark Overlay
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.font = '12px ui-monospace, monospace';
      const camLabel = currentAngle === 'line1' ? 'CAM 1 [4K MAIN OR]' : (currentAngle === 'line2' ? 'CAM 2 [LAPAROSCOPE]' : 'CAM 3 [VITAL TELEMETRY]');
      ctx.fillText(camLabel, w - 180, 30);

      if (isPlaying) {
        elapsedSeconds += (0.016 * playbackSpeed);
      }

      // Update UI time string
      if (timeDisplay) {
        const mins = Math.floor(elapsedSeconds / 60).toString().padStart(2, '0');
        const secs = Math.floor(elapsedSeconds % 60).toString().padStart(2, '0');
        timeDisplay.textContent = `${mins}:${secs} / 34:15`;
        if (progressFilled) {
          const pct = Math.min(100, (elapsedSeconds / (34 * 60 + 15)) * 100);
          progressFilled.style.width = `${pct}%`;
        }
      }

      animFrame = requestAnimationFrame(renderFrame);
    }

    renderFrame();

    // Controls Event Listeners
    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        playPauseBtn.innerHTML = isPlaying
          ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg> Pause`
          : `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg> Play`;
      });
    }

    if (progressBar) {
      progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const pct = Math.max(0, Math.min(1, clickX / rect.width));
        elapsedSeconds = pct * (34 * 60 + 15);
      });
    }

    if (speedBtn) {
      const speeds = [1.0, 1.25, 1.5, 2.0, 0.75];
      let speedIdx = 0;
      speedBtn.addEventListener('click', () => {
        speedIdx = (speedIdx + 1) % speeds.length;
        playbackSpeed = speeds[speedIdx];
        speedBtn.textContent = `${playbackSpeed}x`;
      });
    }

    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        isMuted = !isMuted;
        muteBtn.innerHTML = isMuted
          ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path></svg> Unmute`
          : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg> Audio`;
      });
    }

    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', () => {
        const playerEl = document.querySelector('.player');
        if (!playerEl) return;
        if (!document.fullscreenElement) {
          playerEl.requestFullscreen?.().catch(() => {});
        } else {
          document.exitFullscreen?.().catch(() => {});
        }
      });
    }

    // Expose global bridge
    window.MedStreamPlayer = {
      setCameraAngle: function (angleKey) {
        currentAngle = angleKey;
      },
      setModule: function (modNum, title) {
        currentModuleName = `${modNum}: ${title}`;
        if (moduleBadge) {
          moduleBadge.textContent = currentModuleName;
        }
        elapsedSeconds = (parseInt(modNum.replace(/\D/g, ''), 10) || 1) * 85;
      }
    };
  }

  // --- Search & Filter Page Interactivity ---
  function initSearchPage() {
    const searchForm = document.getElementById('searchPageForm');
    const searchInput = document.getElementById('searchPageInput');
    const resultsContainer = document.querySelector('[data-list="vod"]');
    const emptyState = document.getElementById('searchEmptyState');
    const clearBtn = document.getElementById('searchClearBtn');
    const filterOptions = document.querySelectorAll('.filter-opt');
    const searchCountSpan = document.getElementById('searchResultCount');

    if (!searchInput || !resultsContainer) return;

    function applyFilter() {
      const query = (searchInput.value || '').trim().toLowerCase();
      const activeFilters = {
        specialty: document.querySelector('[data-filter-type="specialty"].on')?.getAttribute('data-val') || 'all',
        year: document.querySelector('[data-filter-type="year"].on')?.getAttribute('data-val') || 'all',
        accred: document.querySelector('[data-filter-type="accred"].on')?.getAttribute('data-val') || 'all'
      };

      const cards = resultsContainer.querySelectorAll('.vod-card');
      let visibleCount = 0;

      cards.forEach(card => {
        const title = (card.querySelector('.vod-title')?.textContent || '').toLowerCase();
        const surgeon = (card.querySelector('.vod-surgeon-line')?.textContent || '').toLowerCase();
        const category = (card.getAttribute('data-class') || '').toLowerCase();
        const year = (card.getAttribute('data-year') || '').toLowerCase();
        const accred = (card.getAttribute('data-accred') || '').toLowerCase();

        const matchesQuery = !query || title.includes(query) || surgeon.includes(query) || category.includes(query);
        const matchesSpec = activeFilters.specialty === 'all' || category.includes(activeFilters.specialty.toLowerCase());
        const matchesYear = activeFilters.year === 'all' || year === activeFilters.year;
        const matchesAccred = activeFilters.accred === 'all' || accred.includes(activeFilters.accred.toLowerCase());

        if (matchesQuery && matchesSpec && matchesYear && matchesAccred) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (searchCountSpan) {
        searchCountSpan.textContent = visibleCount;
      }

      if (emptyState) {
        if (visibleCount === 0) {
          emptyState.classList.add('show');
          resultsContainer.style.display = 'none';
        } else {
          emptyState.classList.remove('show');
          resultsContainer.style.display = '';
        }
      }
    }

    if (searchForm) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        applyFilter();
      });
    }

    searchInput.addEventListener('input', applyFilter);

    filterOptions.forEach(opt => {
      opt.addEventListener('click', function () {
        const parentRow = this.closest('.filter-options');
        if (parentRow) {
          parentRow.querySelectorAll('.filter-opt').forEach(b => b.classList.remove('on'));
        }
        this.classList.add('on');
        applyFilter();
      });
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        filterOptions.forEach(b => {
          if (b.getAttribute('data-val') === 'all') b.classList.add('on');
          else b.classList.remove('on');
        });
        applyFilter();
      });
    }

    // Check URL params for ?q=
    const params = new URLSearchParams(window.location.search);
    const initialQuery = params.get('q');
    if (initialQuery) {
      searchInput.value = initialQuery;
      applyFilter();
    }
  }

  // --- Collapsible Synopsis in detail.html ---
  function initCollapsibleSynopsis() {
    const toggleBtn = document.getElementById('synopsisToggleBtn');
    const textBlock = document.getElementById('synopsisText');
    if (!toggleBtn || !textBlock) return;

    toggleBtn.addEventListener('click', function () {
      const isCollapsed = textBlock.classList.contains('collapsed');
      if (isCollapsed) {
        textBlock.classList.remove('collapsed');
        toggleBtn.innerHTML = `<span>Collapse Clinical Protocol</span> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"></polyline></svg>`;
      } else {
        textBlock.classList.add('collapsed');
        toggleBtn.innerHTML = `<span>Read Full Clinical Protocol & Case Notes</span> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
      }
    });
  }

  // --- Mobile Navigation Menu Toggle ---
  function initMobileNav() {
    const toggleBtn = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (!toggleBtn || !navLinks) return;

    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // --- DOM Ready Initializer ---
  function initApp() {
    initTheme();

    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', toggleTheme);
    }

    initMobileNav();
    initRankingPanel();
    initPlaylistTabs();
    initMedicalPlayer();
    initSearchPage();
    initCollapsibleSynopsis();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
