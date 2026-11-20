(function () {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isMobileViewport = () => window.innerWidth <= 768;

      const PLATES = [
        {
          id: 'p2-a',
          src: '1000090142.jpg',
          category: 'Living / Product Campaign · Independent Concept',
          title: 'Design Your Everyday — Daylight Niche',
          note: 'Independent concept study exploring warm neutral seating, arched millwork, and filtered light.'
        },
        {
          id: 'p1',
          src: '1000090143.jpg',
          category: 'Dining / Campaign Concept · Independent Concept',
          title: 'Made for Moments — Timber Dining Study',
          note: 'Independent concept study pairing timber table geometry with soft afternoon light.'
        },
        {
          id: 'p3',
          src: '1000090144.jpg',
          category: 'Furniture / Editorial Visual · Independent Concept',
          title: 'Quiet Statement — Restrained Contrast',
          note: 'Independent concept study balancing dark accents, architectural shadow, and calm form.'
        },
        {
          id: 'p4-a',
          src: '1000090155.jpg',
          category: 'Interior / Campaign Concept · Independent Concept',
          title: 'Your Home, Reimagined — Arch & Space',
          note: 'Independent concept study framing an arched wall, low table, and quiet room balance.'
        },
        {
          id: 'p2-c',
          src: '1000090154.jpg',
          category: 'Living / Product Campaign · Independent Concept',
          title: 'Design Your Everyday — Curved Seating',
          note: 'Independent concept study highlighting curved upholstery, walnut proportions, and calm light.'
        }
      ];

      const HERO_SLIDES = [
        {
          index: 0,
          meta: 'Plate 01 · Living & Architecture Concept',
          caption: 'Daylight Niche & Walnut Composition',
          alt: 'Warm architectural living space with linen sofa, walnut coffee table, arched niche, and dappled daylight'
        },
        {
          index: 1,
          meta: 'Plate 02 · Dining & Gathering Concept',
          caption: 'Timber Table & Soft Pendant Light',
          alt: 'Warm timber dining table surrounded by upholstered chairs beneath a circular pendant light in sunlit room'
        },
        {
          index: 3,
          meta: 'Plate 03 · Interior Spatial Concept',
          caption: 'Arched Wall & Quiet Proportion',
          alt: 'Editorial interior composition with arched plaster wall, cream sofa, low walnut table, and ceramic vessels'
        }
      ];

      // Mark page ready immediately so opening view is always crisp and visible
      document.body.classList.add('is-ready');

      // Header scroll state
      const siteHeader = document.getElementById('siteHeader');
      const syncHeader = () => {
        if (!siteHeader) return;
        siteHeader.classList.toggle('scrolled', window.scrollY > 18);
      };
      window.addEventListener('scroll', syncHeader, { passive: true });
      syncHeader();

      // Smooth scrolling for anchor links with header offset
      document.addEventListener('click', (event) => {
        const anchor = event.target.closest('a[href^="#"]');
        if (!anchor) return;
        const hash = anchor.getAttribute('href');
        if (!hash || hash === '#') return;
        const target = document.querySelector(hash);
        if (!target) return;

        event.preventDefault();
        closeDrawer();
        const headerOffset = (siteHeader ? siteHeader.offsetHeight : 76) + 12;
        const topPos = target.getBoundingClientRect().top + window.scrollY - headerOffset;

        window.scrollTo({
          top: Math.max(0, topPos),
          behavior: reducedMotion ? 'auto' : 'smooth'
        });
      });

      // Back to top button
      const backToTopBtn = document.getElementById('backToTopBtn');
      if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
          window.scrollTo({
            top: 0,
            behavior: reducedMotion ? 'auto' : 'smooth'
          });
        });
      }

      // Mobile drawer
      const mobileDrawer = document.getElementById('mobileDrawer');
      const menuOpenBtn = document.getElementById('menuOpenBtn');
      const menuCloseBtn = document.getElementById('menuCloseBtn');

      function openDrawer() {
        if (!mobileDrawer || !menuOpenBtn) return;
        mobileDrawer.classList.add('open');
        mobileDrawer.setAttribute('aria-hidden', 'false');
        menuOpenBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }

      function closeDrawer() {
        if (!mobileDrawer || !menuOpenBtn) return;
        mobileDrawer.classList.remove('open');
        mobileDrawer.setAttribute('aria-hidden', 'true');
        menuOpenBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }

      if (menuOpenBtn) menuOpenBtn.addEventListener('click', openDrawer);
      if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeDrawer);

      // Hero plate switcher
      let activePlateIndex = 0;
      const heroImg = document.getElementById('heroActiveImg');
      const heroMeta = document.getElementById('heroPlateMeta');
      const heroCaption = document.getElementById('heroPlateCaption');
      const heroChips = Array.from(document.querySelectorAll('[data-hero-plate]'));

      function setHeroSlide(slideIdx) {
        const slide = HERO_SLIDES[slideIdx];
        if (!slide) return;
        const plate = PLATES[slide.index];
        if (!plate) return;

        activePlateIndex = slide.index;
        if (heroImg) {
          heroImg.src = plate.src;
          heroImg.alt = slide.alt;
        }
        if (heroMeta) heroMeta.textContent = slide.meta;
        if (heroCaption) heroCaption.textContent = slide.caption;

        heroChips.forEach((chip, idx) => {
          chip.classList.toggle('active', idx === slideIdx);
        });
      }

      heroChips.forEach((chip, idx) => {
        chip.addEventListener('click', () => setHeroSlide(idx));
      });

      // Lightbox logic
      const lightbox = document.getElementById('lightboxModal');
      const lightboxImg = document.getElementById('lightboxImg');
      const lightboxTitle = document.getElementById('lightboxTitle');
      const lightboxCategory = document.getElementById('lightboxCategory');
      const lightboxNote = document.getElementById('lightboxNote');
      const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
      const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
      const lightboxNextBtn = document.getElementById('lightboxNextBtn');
      let lastFocusedTrigger = null;

      function renderLightboxPlate(idx) {
        const normalized = ((idx % PLATES.length) + PLATES.length) % PLATES.length;
        activePlateIndex = normalized;
        const item = PLATES[normalized];
        if (!item) return;

        if (lightboxImg) {
          lightboxImg.src = item.src;
          lightboxImg.alt = item.title;
        }
        if (lightboxTitle) lightboxTitle.textContent = item.title;
        if (lightboxCategory) lightboxCategory.textContent = item.category;
        if (lightboxNote) lightboxNote.textContent = item.note;
      }

      function openLightbox(key, triggerEl) {
        if (!lightbox) return;
        lastFocusedTrigger = triggerEl || document.activeElement;
        const foundIdx = key === 'hero'
          ? activePlateIndex
          : PLATES.findIndex((p) => p.id === key);

        renderLightboxPlate(foundIdx >= 0 ? foundIdx : 0);
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        if (lightboxCloseBtn) lightboxCloseBtn.focus();
      }

      function closeLightbox() {
        if (!lightbox || !lightbox.classList.contains('open')) return;
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === 'function') {
          lastFocusedTrigger.focus();
        }
      }

      document.addEventListener('click', (event) => {
        const trigger = event.target.closest('[data-lightbox-open]');
        if (!trigger) return;
        event.preventDefault();
        openLightbox(trigger.getAttribute('data-lightbox-open'), trigger);
      });

      if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
      if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', () => renderLightboxPlate(activePlateIndex - 1));
      if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', () => renderLightboxPlate(activePlateIndex + 1));

      if (lightbox) {
        lightbox.addEventListener('click', (event) => {
          if (event.target === lightbox) closeLightbox();
        });
      }

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          closeLightbox();
          closeDrawer();
        } else if (lightbox && lightbox.classList.contains('open')) {
          if (event.key === 'ArrowLeft') renderLightboxPlate(activePlateIndex - 1);
          if (event.key === 'ArrowRight') renderLightboxPlate(activePlateIndex + 1);
        }
      });

      // Copy email action
      const copyEmailBtn = document.getElementById('copyEmailBtn');
      const copyStatus = document.getElementById('copyStatus');
      const STUDIO_EMAIL = 'trollcoretrial@gmail.com';

      if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', async () => {
          let copied = false;
          try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
              await navigator.clipboard.writeText(STUDIO_EMAIL);
              copied = true;
            }
          } catch (_) {
            copied = false;
          }

          if (!copied) {
            const temp = document.createElement('textarea');
            temp.value = STUDIO_EMAIL;
            temp.setAttribute('readonly', '');
            temp.style.position = 'absolute';
            temp.style.left = '-9999px';
            document.body.appendChild(temp);
            temp.select();
            try {
              document.execCommand('copy');
              copied = true;
            } catch (_) {
              copied = false;
            }
            document.body.removeChild(temp);
          }

          if (copyStatus) {
            copyStatus.textContent = copied
              ? 'Copied trollcoretrial@gmail.com'
              : 'trollcoretrial@gmail.com';
          }
        });
      }

      // Subtle section reveal transitions with reliable fallback
      const revealEls = Array.from(document.querySelectorAll('.reveal'));
      if (reducedMotion || !('IntersectionObserver' in window)) {
        revealEls.forEach((el) => el.classList.add('is-visible'));
      } else {
        const revealObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
        );

        revealEls.forEach((el) => revealObserver.observe(el));

        // Safety sweep so scrolled/jumped sections never remain hidden
        const sweepVisible = () => {
          const vh = window.innerHeight || 900;
          revealEls.forEach((el) => {
            if (el.classList.contains('is-visible')) return;
            const rect = el.getBoundingClientRect();
            if (rect.top < vh * 0.96) {
              el.classList.add('is-visible');
              revealObserver.unobserve(el);
            }
          });
        };
        window.addEventListener('scroll', sweepVisible, { passive: true });
        setTimeout(sweepVisible, 450);
      }

      // Subtle, bounded image parallax on desktop
      const parallaxTargets = Array.from(document.querySelectorAll('[data-parallax-speed]'));
      let parallaxTicking = false;

      function updateParallax() {
        parallaxTicking = false;
        if (reducedMotion || isMobileViewport()) {
          parallaxTargets.forEach((box) => {
            const img = box.querySelector('img');
            if (img) img.style.setProperty('--parallax-y', '0px');
          });
          return;
        }

        const vh = window.innerHeight || 900;
        parallaxTargets.forEach((box) => {
          const img = box.querySelector('img');
          if (!img) return;
          const speed = parseFloat(box.getAttribute('data-parallax-speed')) || 0.03;
          const rect = box.getBoundingClientRect();
          const centerOffset = (rect.top + rect.height * 0.5) - vh * 0.5;
          const rawShift = -centerOffset * speed;
          const clampedShift = Math.max(-14, Math.min(14, rawShift));
          img.style.setProperty('--parallax-y', `${clampedShift.toFixed(2)}px`);
        });
      }

      window.addEventListener('scroll', () => {
        if (!parallaxTicking) {
          parallaxTicking = true;
          requestAnimationFrame(updateParallax);
        }
      }, { passive: true });
      window.addEventListener('resize', updateParallax, { passive: true });
      updateParallax();

      // Restrained 3D architectural relief sculpture in hero (disabled on mobile or reduced-motion)
      const sculptureStage = document.getElementById('sculptureStage');
      if (sculptureStage && window.THREE && !reducedMotion && !isMobileViewport()) {
        try {
          const width = 124;
          const height = 124;
          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 20);
          camera.position.set(0, 0.2, 4.4);

          const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
          renderer.setSize(width, height);
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
          renderer.outputColorSpace = THREE.SRGBColorSpace;
          sculptureStage.appendChild(renderer.domElement);

          const fallback = sculptureStage.querySelector('.sculpture-fallback');
          if (fallback) fallback.style.display = 'none';

          const ambient = new THREE.AmbientLight(0xf5f2eb, 1.35);
          scene.add(ambient);

          const keyLight = new THREE.DirectionalLight(0xfffaf0, 1.8);
          keyLight.position.set(2.4, 3.2, 3.5);
          scene.add(keyLight);

          const rimLight = new THREE.DirectionalLight(0x8c8075, 0.75);
          rimLight.position.set(-2.5, -1.8, 2.0);
          scene.add(rimLight);

          const sculptureGroup = new THREE.Group();

          const baseMat = new THREE.MeshStandardMaterial({
            color: 0xebe5d9,
            roughness: 0.85,
            metalness: 0.04
          });

          const walnutMat = new THREE.MeshStandardMaterial({
            color: 0x5c4738,
            roughness: 0.58,
            metalness: 0.08
          });

          const taupeMat = new THREE.MeshStandardMaterial({
            color: 0x8c8075,
            roughness: 0.72,
            metalness: 0.06
          });

          const backPlinth = new THREE.Mesh(new THREE.BoxGeometry(1.75, 1.75, 0.16), baseMat);
          backPlinth.position.set(0, 0, -0.14);
          sculptureGroup.add(backPlinth);

          const verticalBeam = new THREE.Mesh(new THREE.BoxGeometry(0.36, 1.25, 0.24), walnutMat);
          verticalBeam.position.set(-0.34, 0.06, 0.06);
          sculptureGroup.add(verticalBeam);

          const horizontalLedge = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.28, 0.28), taupeMat);
          horizontalLedge.position.set(0.14, -0.24, 0.1);
          sculptureGroup.add(horizontalLedge);

          const upperBlock = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.56, 0.2), baseMat);
          upperBlock.position.set(0.32, 0.28, 0.04);
          sculptureGroup.add(upperBlock);

          sculptureGroup.rotation.set(0.16, -0.28, 0);
          scene.add(sculptureGroup);

          let pointerX = 0;
          let pointerY = 0;
          window.addEventListener('pointermove', (e) => {
            const nx = (e.clientX / Math.max(window.innerWidth, 1)) * 2 - 1;
            const ny = (e.clientY / Math.max(window.innerHeight, 1)) * 2 - 1;
            pointerX = nx * 0.16;
            pointerY = ny * 0.12;
          }, { passive: true });

          let rafId = 0;
          const startTime = performance.now();

          function animateRelief(now) {
            const elapsed = (now - startTime) * 0.001;
            const gentleBreath = Math.sin(elapsed * 0.65) * 0.06;
            const targetY = -0.28 + gentleBreath + pointerX;
            const targetX = 0.16 + Math.cos(elapsed * 0.5) * 0.03 - pointerY;

            sculptureGroup.rotation.y += (targetY - sculptureGroup.rotation.y) * 0.05;
            sculptureGroup.rotation.x += (targetX - sculptureGroup.rotation.x) * 0.05;

            renderer.render(scene, camera);
            rafId = requestAnimationFrame(animateRelief);
          }

          rafId = requestAnimationFrame(animateRelief);

          window.addEventListener('beforeunload', () => {
            cancelAnimationFrame(rafId);
            renderer.dispose();
          });
        } catch (_) {
          // Keep clean SVG fallback on WebGL failure
        }
      }
    })();