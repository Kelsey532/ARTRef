/* ==========================================================================
   ArtRef Studio — Client-Side SPA Router, Color Extractor & Interactive Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------------------------
    // 1. MASTER REFERENCE DATASET
    // ----------------------------------------------------------------------
    const references = [
        {
            id: 1,
            title: "Dramatic Chiaroscuro Male Pose",
            category: "anatomy",
            categoryLabel: "Anatomy & Poses",
            angle: "three-quarter",
            angleLabel: "3/4 View",
            gender: "male",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80",
            photographer: "Albert Dera",
            res: "3744 x 5616 px",
            popularScore: 98,
            date: "2026-05-10"
        },
        {
            id: 2,
            title: "Dynamic High Contrast Female Figure",
            category: "anatomy",
            categoryLabel: "Anatomy & Poses",
            angle: "front",
            angleLabel: "Front View",
            gender: "female",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
            photographer: "Joseph Gardner",
            res: "4000 x 6000 px",
            popularScore: 95,
            date: "2026-06-15"
        },
        {
            id: 3,
            title: "Side Profile Facial Expression",
            category: "expressions",
            categoryLabel: "Expressions",
            angle: "side",
            angleLabel: "Side Profile",
            gender: "female",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80",
            photographer: "Jurica Koletić",
            res: "3840 x 5760 px",
            popularScore: 91,
            date: "2026-07-01"
        },
        {
            id: 4,
            title: "Cinematic Warm Rim Light Portrait",
            category: "lighting",
            categoryLabel: "Lighting & Shadows",
            angle: "three-quarter",
            angleLabel: "3/4 View",
            gender: "male",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
            photographer: "Christian Buehner",
            res: "4000 x 6000 px",
            popularScore: 89,
            date: "2026-04-20"
        },
        {
            id: 5,
            title: "Expressive Hand Study & Foreshortening",
            category: "hands",
            categoryLabel: "Hands & Feet",
            angle: "dynamic",
            angleLabel: "Dynamic Angle",
            gender: "female",
            image: "https://images.unsplash.com/photo-1581579438747-1dc8d1e05fec?auto=format&fit=crop&w=1200&q=80",
            photographer: "Alexander Andrews",
            res: "3600 x 4800 px",
            popularScore: 97,
            date: "2026-07-12"
        },
        {
            id: 6,
            title: "Flowing Silk Fabric & Drapery Folds",
            category: "drapery",
            categoryLabel: "Drapery/Clothing",
            angle: "front",
            angleLabel: "Front View",
            gender: "female",
            image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
            photographer: "Dom Hill",
            res: "4160 x 6240 px",
            popularScore: 92,
            date: "2026-03-18"
        },
        {
            id: 7,
            title: "Atmospheric Foggy Mountain Landscape",
            category: "landscapes",
            categoryLabel: "Landscapes",
            angle: "dynamic",
            angleLabel: "Landscape View",
            gender: "environment",
            image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
            photographer: "Kal visual",
            res: "5472 x 3648 px",
            popularScore: 96,
            date: "2026-02-14"
        },
        {
            id: 8,
            title: "Intense Gaze Portrait Study",
            category: "expressions",
            categoryLabel: "Expressions",
            angle: "front",
            angleLabel: "Front View",
            gender: "female",
            image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
            photographer: "Averie Woodard",
            res: "3744 x 5616 px",
            popularScore: 94,
            date: "2026-06-30"
        },
        {
            id: 9,
            title: "Volumetric Neon Night Lighting",
            category: "lighting",
            categoryLabel: "Lighting & Shadows",
            angle: "side",
            angleLabel: "Side Profile",
            gender: "male",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",
            photographer: "Stefan Stefancik",
            res: "4000 x 6000 px",
            popularScore: 88,
            date: "2026-05-25"
        },
        {
            id: 10,
            title: "Layered Heavy Coat Drapery Study",
            category: "drapery",
            categoryLabel: "Drapery/Clothing",
            angle: "three-quarter",
            angleLabel: "3/4 View",
            gender: "male",
            image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1200&q=80",
            photographer: "Harsh Kushwaha",
            res: "3456 x 5184 px",
            popularScore: 85,
            date: "2026-01-10"
        }
    ];

    // Saved Favorites State
    let savedIds = JSON.parse(localStorage.getItem('artref_saved') || '[]');

    // ----------------------------------------------------------------------
    // 2. CLIENT-SIDE SPA ROUTER
    // ----------------------------------------------------------------------
    const pageViews = document.querySelectorAll('.page-view');
    const navRoutes = document.querySelectorAll('.nav-route');

    function navigateToPage(targetPageId) {
        pageViews.forEach(page => {
            if (page.id === `page-${targetPageId}`) {
                page.classList.add('active');
            } else {
                page.classList.remove('active');
            }
        });

        navRoutes.forEach(route => {
            const target = route.getAttribute('data-target');
            if (target === targetPageId) {
                route.classList.add('active');
            } else {
                route.classList.remove('active');
            }
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Trigger page-specific initializations
        if (targetPageId === 'library') renderLibraryGallery();
        if (targetPageId === 'studio') initStudioWorkspace();
        if (targetPageId === 'saved') renderSavedPage();
    }

    document.addEventListener('click', (e) => {
        const route = e.target.closest('.nav-route');
        if (route) {
            e.preventDefault();
            const target = route.getAttribute('data-target');
            const cat = route.getAttribute('data-cat');
            if (cat) {
                document.getElementById('libCatSelect').value = cat;
            }
            navigateToPage(target);
        }
    });

    // Handle hash routing
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.replace('#', '');
        if (hash) navigateToPage(hash);
    });

    // ----------------------------------------------------------------------
    // 3. HOME PAGE FEATURED SPOTLIGHT
    // ----------------------------------------------------------------------
    const homeFeaturedGrid = document.getElementById('homeFeaturedGrid');
    const homeSearchInput = document.getElementById('homeSearchInput');
    const homeSearchBtn = document.getElementById('homeSearchBtn');

    function renderHomeFeatured() {
        if (!homeFeaturedGrid) return;
        homeFeaturedGrid.innerHTML = '';
        const featured = references.slice(0, 3);

        featured.forEach(item => {
            const isSaved = savedIds.includes(item.id);
            const card = document.createElement('div');
            card.className = 'ref-card';
            card.innerHTML = `
                <div class="ref-img-wrapper">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="ref-badges">
                        <span class="card-badge">${item.categoryLabel}</span>
                        <span class="card-badge">${item.angleLabel}</span>
                    </div>
                    <div class="ref-overlay">
                        <div class="overlay-top-actions">
                            <button class="card-icon-btn ${isSaved ? 'saved' : ''}" data-action="save" data-id="${item.id}">
                                <i class="fa-${isSaved ? 'solid' : 'regular'} fa-bookmark"></i>
                            </button>
                            <button class="card-icon-btn" data-action="open-studio" data-id="${item.id}">
                                <i class="fa-solid fa-flask"></i>
                            </button>
                        </div>
                        <div class="overlay-bottom-info">
                            <div class="card-title">${item.title}</div>
                            <div class="card-author">Photo by ${item.photographer}</div>
                        </div>
                    </div>
                </div>
            `;
            homeFeaturedGrid.appendChild(card);
        });
    }

    if (homeSearchBtn) {
        homeSearchBtn.addEventListener('click', () => {
            const query = homeSearchInput.value;
            document.getElementById('libSearchInput').value = query;
            navigateToPage('library');
        });
    }

    // ----------------------------------------------------------------------
    // 4. LIBRARY GALLERY & MULTI-FILTERS
    // ----------------------------------------------------------------------
    const libraryMasonryGrid = document.getElementById('libraryMasonryGrid');
    const libSearchInput = document.getElementById('libSearchInput');
    const libCatSelect = document.getElementById('libCatSelect');
    const libAngleSelect = document.getElementById('libAngleSelect');
    const libSortSelect = document.getElementById('libSortSelect');

    function renderLibraryGallery() {
        if (!libraryMasonryGrid) return;

        const q = libSearchInput.value.toLowerCase().trim();
        const cat = libCatSelect.value;
        const angle = libAngleSelect.value;
        const sort = libSortSelect.value;

        let filtered = references.filter(item => {
            if (q !== '' && !item.title.toLowerCase().includes(q) && !item.photographer.toLowerCase().includes(q)) return false;
            if (cat !== 'all' && item.category !== cat) return false;
            if (angle !== 'all' && item.angle !== angle) return false;
            return true;
        });

        if (sort === 'popular') filtered.sort((a, b) => b.popularScore - a.popularScore);
        if (sort === 'latest') filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        if (sort === 'random') filtered.sort(() => Math.random() - 0.5);

        libraryMasonryGrid.innerHTML = '';

        if (filtered.length === 0) {
            libraryMasonryGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
                    <i class="fa-solid fa-folder-open" style="font-size: 3rem; color: var(--accent-violet-light); margin-bottom: 1rem;"></i>
                    <h3>No Matching References Found</h3>
                    <p>Try resetting filters or search terms.</p>
                </div>
            `;
            return;
        }

        filtered.forEach(item => {
            const isSaved = savedIds.includes(item.id);
            const card = document.createElement('div');
            card.className = 'ref-card';
            card.innerHTML = `
                <div class="ref-img-wrapper">
                    <img src="${item.image}" alt="${item.title}" loading="lazy">
                    <div class="ref-badges">
                        <span class="card-badge">${item.categoryLabel}</span>
                        <span class="card-badge">${item.angleLabel}</span>
                    </div>
                    <div class="ref-overlay">
                        <div class="overlay-top-actions">
                            <button class="card-icon-btn ${isSaved ? 'saved' : ''}" data-action="save" data-id="${item.id}">
                                <i class="fa-${isSaved ? 'solid' : 'regular'} fa-bookmark"></i>
                            </button>
                            <button class="card-icon-btn" data-action="open-studio" data-id="${item.id}">
                                <i class="fa-solid fa-flask"></i>
                            </button>
                        </div>
                        <div class="overlay-bottom-info">
                            <div class="card-title">${item.title}</div>
                            <div class="card-author">Photo by ${item.photographer}</div>
                        </div>
                    </div>
                </div>
            `;
            libraryMasonryGrid.appendChild(card);
        });
    }

    [libSearchInput, libCatSelect, libAngleSelect, libSortSelect].forEach(elem => {
        if (elem) elem.addEventListener('change', renderLibraryGallery);
        if (elem === libSearchInput) elem.addEventListener('input', renderLibraryGallery);
    });

    // Card Action Event Delegation
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.card-icon-btn');
        if (!btn) return;
        const action = btn.getAttribute('data-action');
        const id = parseInt(btn.getAttribute('data-id'));

        if (action === 'save') {
            toggleSaveReference(id);
        } else if (action === 'open-studio') {
            document.getElementById('studioArtSelect').value = id;
            navigateToPage('studio');
        }
    });

    // ----------------------------------------------------------------------
    // 5. STUDIO WORKBENCH & COLOR PALETTE EXTRACTOR
    // ----------------------------------------------------------------------
    const studioArtSelect = document.getElementById('studioArtSelect');
    const studioImg = document.getElementById('studioImg');
    const studioGrayscaleToggle = document.getElementById('studioGrayscaleToggle');
    const studioGridToggle = document.getElementById('studioGridToggle');
    const studioGridSize = document.getElementById('studioGridSize');
    const gridSizeBlock = document.getElementById('gridSizeBlock');
    const studioGridSvg = document.getElementById('studioGridSvg');
    const studioFlipToggle = document.getElementById('studioFlipToggle');
    const studioContrastToggle = document.getElementById('studioContrastToggle');
    const studioBlurRange = document.getElementById('studioBlurRange');
    const studioBlurVal = document.getElementById('studioBlurVal');
    const studioResetBtn = document.getElementById('studioResetBtn');
    const swatchesRow = document.getElementById('swatchesRow');
    const extractPaletteBtn = document.getElementById('extractPaletteBtn');

    function populateStudioSelect() {
        studioArtSelect.innerHTML = '';
        references.forEach(item => {
            const opt = document.createElement('option');
            opt.value = item.id;
            opt.textContent = `${item.title} (${item.categoryLabel})`;
            studioArtSelect.appendChild(opt);
        });
    }

    function initStudioWorkspace() {
        populateStudioSelect();
        const selectedId = parseInt(studioArtSelect.value || references[0].id);
        loadStudioArtwork(selectedId);
    }

    function loadStudioArtwork(id) {
        const item = references.find(r => r.id === id);
        if (!item) return;

        studioImg.crossOrigin = "Anonymous";
        studioImg.src = item.image;

        studioImg.onload = () => {
            extractColorPalette();
            renderStudioGrid();
        };

        applyStudioFilters();
    }

    studioArtSelect.addEventListener('change', (e) => {
        loadStudioArtwork(parseInt(e.target.value));
    });

    function applyStudioFilters() {
        let filters = '';
        if (studioGrayscaleToggle.checked) filters += 'grayscale(100%) ';
        if (studioContrastToggle.checked) filters += 'contrast(180%) brightness(110%) ';
        const blur = parseInt(studioBlurRange.value);
        if (blur > 0) filters += `blur(${blur}px) `;

        studioImg.style.filter = filters.trim();
        studioImg.style.transform = studioFlipToggle.checked ? 'scaleX(-1)' : 'scaleX(1)';
    }

    function renderStudioGrid() {
        if (!studioGridToggle.checked) {
            studioGridSvg.style.display = 'none';
            gridSizeBlock.style.display = 'none';
            return;
        }

        studioGridSvg.style.display = 'block';
        gridSizeBlock.style.display = 'block';
        studioGridSvg.innerHTML = '';

        const divisions = parseInt(studioGridSize.value);
        const step = 100 / divisions;

        for (let i = 1; i < divisions; i++) {
            const vLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            vLine.setAttribute('x1', `${i * step}%`);
            vLine.setAttribute('y1', '0%');
            vLine.setAttribute('x2', `${i * step}%`);
            vLine.setAttribute('y2', '100%');
            vLine.setAttribute('stroke', 'rgba(168, 85, 247, 0.6)');
            vLine.setAttribute('stroke-width', '2');
            vLine.setAttribute('stroke-dasharray', '4 2');
            studioGridSvg.appendChild(vLine);

            const hLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            hLine.setAttribute('x1', '0%');
            hLine.setAttribute('y1', `${i * step}%`);
            hLine.setAttribute('x2', '100%');
            hLine.setAttribute('y2', `${i * step}%`);
            hLine.setAttribute('stroke', 'rgba(168, 85, 247, 0.6)');
            hLine.setAttribute('stroke-width', '2');
            hLine.setAttribute('stroke-dasharray', '4 2');
            studioGridSvg.appendChild(hLine);
        }
    }

    // Color Palette Extractor Algorithm
    function extractColorPalette() {
        swatchesRow.innerHTML = '';
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 150;
            canvas.height = 150;

            ctx.drawImage(studioImg, 0, 0, 150, 150);
            const imgData = ctx.getImageData(0, 0, 150, 150).data;

            const colorMap = {};
            for (let i = 0; i < imgData.length; i += 16) {
                const r = imgData[i];
                const g = imgData[i + 1];
                const b = imgData[i + 2];
                // Quantize
                const qr = Math.round(r / 32) * 32;
                const qg = Math.round(g / 32) * 32;
                const qb = Math.round(b / 32) * 32;

                const hex = "#" + ((1 << 24) + (qr << 16) + (qg << 8) + qb).toString(16).slice(1);
                colorMap[hex] = (colorMap[hex] || 0) + 1;
            }

            const sortedHex = Object.keys(colorMap).sort((a, b) => colorMap[b] - colorMap[a]).slice(0, 6);

            sortedHex.forEach(hex => {
                const pill = document.createElement('div');
                pill.className = 'color-swatch-pill';
                pill.innerHTML = `
                    <span class="swatch-color-box" style="background: ${hex};"></span>
                    <span>${hex.toUpperCase()}</span>
                `;
                pill.addEventListener('click', () => {
                    navigator.clipboard.writeText(hex);
                    showToast('Color Copied', `Hex code ${hex.toUpperCase()} copied to clipboard!`);
                });
                swatchesRow.appendChild(pill);
            });
        } catch (e) {
            // Fallback swatches if CORS restricts cross-origin canvas reading
            const fallbackHex = ['#7c3aed', '#10b981', '#06b6d4', '#f59e0b', '#1e293b', '#f43f5e'];
            fallbackHex.forEach(hex => {
                const pill = document.createElement('div');
                pill.className = 'color-swatch-pill';
                pill.innerHTML = `
                    <span class="swatch-color-box" style="background: ${hex};"></span>
                    <span>${hex.toUpperCase()}</span>
                `;
                pill.addEventListener('click', () => {
                    navigator.clipboard.writeText(hex);
                    showToast('Color Copied', `Hex code ${hex.toUpperCase()} copied to clipboard!`);
                });
                swatchesRow.appendChild(pill);
            });
        }
    }

    extractPaletteBtn.addEventListener('click', extractColorPalette);

    [studioGrayscaleToggle, studioFlipToggle, studioContrastToggle].forEach(t => {
        if (t) t.addEventListener('change', applyStudioFilters);
    });

    studioGridToggle.addEventListener('change', renderStudioGrid);
    studioGridSize.addEventListener('change', renderStudioGrid);

    studioBlurRange.addEventListener('input', (e) => {
        studioBlurVal.textContent = `${e.target.value}px`;
        applyStudioFilters();
    });

    studioResetBtn.addEventListener('click', () => {
        studioGrayscaleToggle.checked = false;
        studioGridToggle.checked = false;
        studioFlipToggle.checked = false;
        studioContrastToggle.checked = false;
        studioBlurRange.value = 0;
        studioBlurVal.textContent = '0px';
        applyStudioFilters();
        renderStudioGrid();
    });

    // ----------------------------------------------------------------------
    // 6. GESTURE PRACTICE STUDIO PAGE LOGIC
    // ----------------------------------------------------------------------
    const gestureTimePills = document.getElementById('gestureTimePills');
    const startGestureSessionBtn = document.getElementById('startGestureSessionBtn');
    const gestureSetupCard = document.getElementById('gestureSetupCard');
    const gestureActiveStage = document.getElementById('gestureActiveStage');
    const gestureActiveImg = document.getElementById('gestureActiveImg');
    const gestureCountDisplay = document.getElementById('gestureCountDisplay');
    const gestureClockText = document.getElementById('gestureClockText');
    const gestureRingProgress = document.getElementById('gestureRingProgress');
    const gesturePlayPause = document.getElementById('gesturePlayPause');
    const gestureNext = document.getElementById('gestureNext');
    const gestureGrayscale = document.getElementById('gestureGrayscale');
    const gestureFlip = document.getElementById('gestureFlip');
    const gestureStop = document.getElementById('gestureStop');

    let gestureInterval = 60;
    let secondsRemaining = 60;
    let gestureTimerId = null;
    let isTimerActive = false;
    let gestureList = [];
    let gestureIdx = 0;
    let isGestureGray = false;
    let isGestureFlipped = false;

    gestureTimePills.addEventListener('click', (e) => {
        if (e.target.classList.contains('time-pill')) {
            gestureTimePills.querySelectorAll('.time-pill').forEach(p => p.classList.remove('active'));
            e.target.classList.add('active');
            gestureInterval = parseInt(e.target.getAttribute('data-time'));
        }
    });

    startGestureSessionBtn.addEventListener('click', () => {
        const cat = document.getElementById('gestureCatSelect').value;
        gestureList = references.filter(r => cat === 'all' || r.category === cat);
        if (gestureList.length === 0) return;

        gestureList.sort(() => Math.random() - 0.5);
        gestureIdx = 0;

        gestureSetupCard.style.display = 'none';
        gestureActiveStage.style.display = 'flex';

        loadGesturePose();
    });

    function loadGesturePose() {
        if (gestureIdx >= gestureList.length) gestureIdx = 0;

        const item = gestureList[gestureIdx];
        gestureActiveImg.src = item.image;
        gestureCountDisplay.textContent = `Image ${gestureIdx + 1} of ${gestureList.length}`;

        secondsRemaining = gestureInterval;
        updateClockUI();
        startTimer();
    }

    function updateClockUI() {
        const m = Math.floor(secondsRemaining / 60);
        const s = secondsRemaining % 60;
        gestureClockText.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

        const offset = 276 - (secondsRemaining / gestureInterval) * 276;
        gestureRingProgress.style.strokeDashoffset = offset;
    }

    function startTimer() {
        clearInterval(gestureTimerId);
        isTimerActive = true;
        gesturePlayPause.querySelector('i').className = 'fa-solid fa-pause';

        gestureTimerId = setInterval(() => {
            if (secondsRemaining > 0) {
                secondsRemaining--;
                updateClockUI();
            } else {
                playChime();
                gestureIdx++;
                loadGesturePose();
            }
        }, 1000);
    }

    function pauseTimer() {
        clearInterval(gestureTimerId);
        isTimerActive = false;
        gesturePlayPause.querySelector('i').className = 'fa-solid fa-play';
    }

    gesturePlayPause.addEventListener('click', () => {
        if (isTimerActive) pauseTimer();
        else startTimer();
    });

    gestureNext.addEventListener('click', () => {
        gestureIdx++;
        loadGesturePose();
    });

    gestureGrayscale.addEventListener('click', () => {
        isGestureGray = !isGestureGray;
        gestureGrayscale.classList.toggle('active', isGestureGray);
        gestureActiveImg.style.filter = isGestureGray ? 'grayscale(100%)' : 'none';
    });

    gestureFlip.addEventListener('click', () => {
        isGestureFlipped = !isGestureFlipped;
        gestureFlip.classList.toggle('active', isGestureFlipped);
        gestureActiveImg.style.transform = isGestureFlipped ? 'scaleX(-1)' : 'scaleX(1)';
    });

    gestureStop.addEventListener('click', () => {
        pauseTimer();
        gestureActiveStage.style.display = 'none';
        gestureSetupCard.style.display = 'block';
    });

    function playChime() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.frequency.setValueAtTime(880, ctx.currentTime);
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.5);
        } catch (e) {}
    }

    // ----------------------------------------------------------------------
    // 7. SAVED COLLECTIONS PAGE
    // ----------------------------------------------------------------------
    const savedMasonryGrid = document.getElementById('savedMasonryGrid');
    const savedPageCount = document.getElementById('savedPageCount');
    const navSavedBadge = document.getElementById('navSavedBadge');

    function updateSavedStateUI() {
        localStorage.setItem('artref_saved', JSON.stringify(savedIds));
        navSavedBadge.textContent = savedIds.length;
        if (savedPageCount) savedPageCount.textContent = savedIds.length;
    }

    function renderSavedPage() {
        updateSavedStateUI();
        if (!savedMasonryGrid) return;
        savedMasonryGrid.innerHTML = '';

        const savedItems = references.filter(r => savedIds.includes(r.id));

        if (savedItems.length === 0) {
            savedMasonryGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
                    <i class="fa-regular fa-bookmark" style="font-size: 3rem; color: var(--accent-violet-light); margin-bottom: 1rem;"></i>
                    <h3>Your Saved Reference Collection is Empty</h3>
                    <p>Click the bookmark icon on any reference in the Library to save it here.</p>
                </div>
            `;
            return;
        }

        savedItems.forEach(item => {
            const card = document.createElement('div');
            card.className = 'ref-card';
            card.innerHTML = `
                <div class="ref-img-wrapper">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="ref-badges">
                        <span class="card-badge">${item.categoryLabel}</span>
                    </div>
                    <div class="ref-overlay">
                        <div class="overlay-top-actions">
                            <button class="card-icon-btn saved" data-action="save" data-id="${item.id}">
                                <i class="fa-solid fa-bookmark"></i>
                            </button>
                            <button class="card-icon-btn" data-action="open-studio" data-id="${item.id}">
                                <i class="fa-solid fa-flask"></i>
                            </button>
                        </div>
                        <div class="overlay-bottom-info">
                            <div class="card-title">${item.title}</div>
                            <div class="card-author">Photo by ${item.photographer}</div>
                        </div>
                    </div>
                </div>
            `;
            savedMasonryGrid.appendChild(card);
        });
    }

    function toggleSaveReference(id) {
        if (savedIds.includes(id)) {
            savedIds = savedIds.filter(i => i !== id);
            showToast('Removed from Saved', 'Item removed from your saved shelf.');
        } else {
            savedIds.push(id);
            showToast('Saved Reference', 'Item added to your study collection.');
        }
        updateSavedStateUI();
        renderHomeFeatured();
        renderLibraryGallery();
        renderSavedPage();
    }

    document.getElementById('launchSavedGestureBtn').addEventListener('click', () => {
        if (savedIds.length === 0) {
            showToast('Collection Empty', 'Save references first to practice with your collection.');
            return;
        }
        gestureList = references.filter(r => savedIds.includes(r.id));
        navigateToPage('gesture');
        gestureSetupCard.style.display = 'none';
        gestureActiveStage.style.display = 'flex';
        gestureIdx = 0;
        loadGesturePose();
    });

    // ----------------------------------------------------------------------
    // 8. COLOR TOOLS (3D LIGHT DIRECTION VISUALIZER)
    // ----------------------------------------------------------------------
    const lightAngleSlider = document.getElementById('lightAngleSlider');
    const shadedSphere = document.getElementById('shadedSphere');

    if (lightAngleSlider && shadedSphere) {
        lightAngleSlider.addEventListener('input', (e) => {
            const angle = parseInt(e.target.value);
            const rad = (angle * Math.PI) / 180;
            const x = Math.round(50 + 35 * Math.cos(rad));
            const y = Math.round(50 + 35 * Math.sin(rad));

            shadedSphere.style.background = `radial-gradient(circle at ${x}% ${y}%, #cbd5e1 0%, #1e293b 55%, #05070c 100%)`;
        });
    }

    // ----------------------------------------------------------------------
    // 9. TOAST NOTIFICATION & THEME
    // ----------------------------------------------------------------------
    const toast = document.getElementById('toast');
    const toastText = document.getElementById('toastText');

    function showToast(title, msg) {
        toastText.textContent = `${title} — ${msg}`;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3500);
    }

    const themeToggleBtn = document.getElementById('themeToggleBtn');
    let isDarkTheme = true;

    themeToggleBtn.addEventListener('click', () => {
        isDarkTheme = !isDarkTheme;
        document.documentElement.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
        themeToggleBtn.querySelector('i').className = isDarkTheme ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
        showToast('Theme Updated', `Switched to ${isDarkTheme ? 'Cyber Obsidian' : 'Light Studio'} mode.`);
    });

    // Initialize Page
    renderHomeFeatured();
    updateSavedStateUI();
});
