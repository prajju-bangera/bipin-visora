document.addEventListener('DOMContentLoaded', () => {
    // Load components
    const loadComponent = (id, file) => {
        return fetch(file)
            .then(response => response.text())
            .then(data => {
                const el = document.getElementById(id);
                if (el) el.innerHTML = data;
            });
    };

    initAnimations();
    initMobileMenu();

    function initMobileMenu() {
        const toggle = document.querySelector('.mobile-toggle');
        const nav = document.querySelector('.desktop-nav');
        if (toggle && nav) {
            toggle.addEventListener('click', () => {
                nav.classList.toggle('active-mobile');
            });
        }
    }

    function initAnimations() {
        gsap.registerPlugin(ScrollTrigger);

        const header = document.querySelector('.main-header');
        window.addEventListener('scroll', () => {
            if (header) {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
        });

        // Hero Content Reveal
        const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } });

        if (document.querySelector(".reveal-text")) {
            tl.from(".reveal-text", {
                y: 100,
                opacity: 0,
                stagger: 0.1,
                delay: 0.2
            });
        }

        // Header animation
        if (document.querySelector(".main-header")) {
            tl.from(".main-header", {
                y: -50,
                opacity: 0,
                duration: 0.8
            }, "-=0.5");
        }

        // Hero Decoration Persistent Floating
        if (document.querySelector(".floating-item")) {
            gsap.to(".item-1", { x: 50, y: -80, duration: 15, repeat: -1, yoyo: true, ease: "sine.inOut" });
            gsap.to(".item-2", { x: -60, y: 50, duration: 20, repeat: -1, yoyo: true, ease: "sine.inOut" });
            gsap.to(".item-3", { scale: 1.2, duration: 12, repeat: -1, yoyo: true, ease: "sine.inOut" });
        }

        // Hero Grid/Visual Scroll Parallax
        if (document.querySelector(".hero-visual-bg")) {
            gsap.to(".hero-visual-bg", {
                scrollTrigger: {
                    trigger: ".hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.5
                },
                y: 150,
                scale: 1.1,
                opacity: 0.5
            });
        }

        // Scroll animations for sections
        if (document.querySelector(".work-item")) {
            gsap.from(".work-item", {
                scrollTrigger: {
                    trigger: ".work-section",
                    start: "top 85%",
                },
                y: 40,
                stagger: 0.15,
                duration: 0.8,
                ease: "power2.out",
                clearProps: "all"
            });
        }

        // Glow mouse follow effect (Premium touch)
        const glow = document.querySelector('.bg-glow');
        if (glow) {
            window.addEventListener('mousemove', (e) => {
                gsap.to(glow, {
                    x: (e.clientX - window.innerWidth / 2) * 0.1,
                    y: (e.clientY - window.innerHeight / 2) * 0.1,
                    duration: 2,
                    ease: "power2.out"
                });
            });
        }

        // --- NEW: Work Section Background GSAP Parallax ---
        if (document.querySelector(".work-deco-item")) {
            gsap.to(".deco-1", {
                scrollTrigger: {
                    trigger: ".work-section",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5
                },
                y: 150,
                rotation: 20,
                ease: "none"
            });

            gsap.to(".deco-2", {
                scrollTrigger: {
                    trigger: ".work-section",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 2
                },
                y: -120,
                rotation: -30,
                ease: "none"
            });
        }
        // --- ENHANCED: Title Icons & Text Cinematic GSAP ---
        if (document.querySelector(".section-header")) {
            const titleTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".section-header",
                    start: "top 85%",
                }
            });

            // Icons reveal with a "lens aperture" snap
            titleTl.from(".title-icon", {
                scale: 2,
                filter: "blur(10px)",
                opacity: 0,
                duration: 0.8,
                stagger: 0.3,
                ease: "power4.out"
            });

            // Title text reveals with a sliding "film reel" effect
            titleTl.from(".section-title", {
                y: 40,
                opacity: 0,
                duration: 1,
                letterSpacing: "20px", // Dramatic compression
                ease: "expo.out"
            }, "-=0.6");

            // Subtitle fade in
            titleTl.from(".section-subtitle", {
                opacity: 0,
                y: 10,
                duration: 1
            }, "-=0.8");

            // Continuous "Vibrant Pulse" for icons
            gsap.to(".lens-icon", {
                scale: 1.15,
                filter: "drop-shadow(0 0 10px var(--primary))",
                repeat: -1,
                yoyo: true,
                duration: 1.5,
                ease: "sine.inOut"
            });

            gsap.to(".camera-icon", {
                rotation: 10,
                repeat: -1,
                yoyo: true,
                duration: 3,
                ease: "power1.inOut"
            });

            gsap.to(".phone-icon", {
                rotation: 15,
                repeat: -1,
                yoyo: true,
                duration: 2,
                ease: "sine.inOut"
            });

            gsap.to(".mail-icon", {
                y: -5,
                repeat: -1,
                yoyo: true,
                duration: 1.5,
                ease: "power1.inOut"
            });
        }

        // Work Filtering Logic
        const filterBtns = document.querySelectorAll(".filter-btn");
        const workItems = document.querySelectorAll(".work-item");

        filterBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove("active"));
                // Add active class to clicked button
                btn.classList.add("active");

                const filter = btn.dataset.filter;

                // 1. Fade out current items for a clean slate
                gsap.to(workItems, {
                    opacity: 0,
                    scale: 0.9,
                    y: 15,
                    duration: 0.3,
                    stagger: 0.05,
                    onComplete: () => {
                        // 2. Toggle display based on filter
                        const toShow = [];
                        workItems.forEach(item => {
                            if (filter === "all" || item.dataset.category === filter) {
                                item.style.display = "flex";
                                toShow.push(item);
                            } else {
                                item.style.display = "none";
                            }
                        });

                        // 3. Shuffle in the new items with a premium stagger
                        if (toShow.length > 0) {
                            gsap.fromTo(toShow, 
                                { opacity: 0, scale: 0.8, y: 30 },
                                { 
                                    opacity: 1, 
                                    scale: 1, 
                                    y: 0, 
                                    duration: 0.6, 
                                    stagger: 0.1, 
                                    ease: "power3.out",
                                    clearProps: "all"
                                }
                            );
                        }

                        // Refresh ScrollTrigger to account for layout changes
                        ScrollTrigger.refresh();
                    }
                });
            });
        });

        // Sticky Socials Visibility (Hide on Hero)
        const stickySocials = document.querySelector(".sticky-socials");
        if (stickySocials) {
            ScrollTrigger.create({
                trigger: ".hero",
                start: "bottom 30%",
                onEnter: () => stickySocials.classList.add("active"),
                onLeaveBack: () => stickySocials.classList.remove("active")
            });
        }

        // --- NEW: Tech Stack Reveal Animation ---
        if (document.querySelector(".tech-stack-section")) {
            const techGroups = document.querySelectorAll(".tech-group");
            
            techGroups.forEach(group => {
                const groupTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: group,
                        start: "top 95%", // Trigger earlier
                    }
                });

                // Cinematic Title Reveal
                groupTl.from(group.querySelector(".tech-group-title"), {
                    y: 20,
                    duration: 0.6,
                    ease: "power2.out"
                });

                // Cards Reveal with a reliable stagger
                groupTl.from(group.querySelectorAll(".tech-card"), {
                    scale: 0.9,
                    y: 30,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out"
                }, "-=0.3");
            });
        }

        // --- NEW: Contact Reveal ---
        if (document.querySelector(".contact-section")) {
            gsap.from(".contact-bar", {
                scrollTrigger: {
                    trigger: ".contact-section",
                    start: "top 95%",
                },
                y: 30,
                opacity: 0,
                stagger: 0.15,
                duration: 0.8,
                ease: "power2.out",
                clearProps: "all" // Ensure it's fully opaque and clear after anim
            });
        }
        // --- NEW: Work Pagination Logic ---
        const pageBtns = document.querySelectorAll('.page-num');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const pageCountText = document.querySelector('.page-count');
        
        let currentPage = 1;
        const totalPages = 3;

        function updatePagination() {
            pageBtns.forEach((btn, index) => {
                if (index + 1 === currentPage) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
            
            if (pageCountText) {
                pageCountText.textContent = `Page ${currentPage} of ${totalPages}`;
            }

            // Cinematic shuffle animation for page change
            const visibleItems = Array.from(document.querySelectorAll('.work-item')).filter(el => el.style.display !== 'none');
            
            gsap.to(visibleItems, {
                opacity: 0,
                scale: 0.95,
                y: 15,
                duration: 0.3,
                stagger: 0.05,
                onComplete: () => {
                    // Simulate content loading/shuffling
                    gsap.fromTo(visibleItems, 
                        { opacity: 0, scale: 0.8, y: 30 },
                        { 
                            opacity: 1, 
                            scale: 1, 
                            y: 0, 
                            duration: 0.6, 
                            stagger: 0.1, 
                            ease: "power3.out",
                            clearProps: "all"
                        }
                    );
                }
            });
        }

        pageBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                currentPage = index + 1;
                updatePagination();
            });
        });

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    updatePagination();
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentPage < totalPages) {
                    currentPage++;
                    updatePagination();
                }
            });
        }

        // --- NEW: ScrollSpy Logic ---
        const sections = ['home', 'about', 'work', 'contact'];
        sections.forEach(id => {
            ScrollTrigger.create({
                trigger: `#${id}`,
                start: "top center",
                end: "bottom center",
                onToggle: self => {
                    if (self.isActive) {
                        document.querySelectorAll('.desktop-nav a, .footer-links a').forEach(a => {
                            if (a.getAttribute('href') === `#${id}`) {
                                a.classList.add('active');
                            } else if (a.getAttribute('href').startsWith('#')) {
                                a.classList.remove('active');
                            }
                        });
                    }
                }
            });
        });

        // --- NEW: Dynamic Year Update ---
        document.querySelectorAll('.current-year').forEach(el => {
            el.textContent = new Date().getFullYear();
        });

        // --- NEW: Cinematic Smooth Scroll ---
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = this.getAttribute('href');
                if (target === '#') return;

                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: {
                        y: target,
                        autoKill: true,
                        offsetY: 70 // Adjust based on header height
                    },
                    ease: "power4.inOut"
                });

                // Close mobile menu if open
                const nav = document.querySelector('.desktop-nav');
                if (nav && nav.classList.contains('active-mobile')) {
                    nav.classList.remove('active-mobile');
                }
            });
        });

        // --- NEW: Cinematic Word-by-Word Reveal ---
        const aboutPara = document.querySelector('.about-fade-text');
        if (aboutPara) {
            // Robust regex to wrap words in spans while ignoring HTML tags
            aboutPara.innerHTML = aboutPara.innerHTML.replace(/([^\s<>]+)(?![^<]*>)/g, '<span class="word-fade" style="display:inline-block;">$1</span>');

            gsap.from(".word-fade", {
                scrollTrigger: {
                    trigger: ".about-fade-text",
                    start: "top 85%",
                },
                opacity: 0,
                y: 10,
                filter: "blur(5px)",
                stagger: 0.03,
                duration: 0.6,
                ease: "power2.out"
            });
        }

        // --- NEW: Consolidated Throw Effects ---
        const throwElements = document.querySelectorAll('.throw-left, .throw-right, .throw-top, .throw-bottom');
        throwElements.forEach(el => {
            let x = 0, y = 0, rotation = 0;
            
            if (el.classList.contains('throw-left')) { x = -100; rotation = -15; }
            if (el.classList.contains('throw-right')) { x = 100; rotation = 15; }
            if (el.classList.contains('throw-top')) { y = -100; }
            if (el.classList.contains('throw-bottom')) { y = 100; }

            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 92%",
                    toggleActions: "play none none none"
                },
                x: x,
                y: y,
                rotation: rotation,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out",
                clearProps: "all" // Ensure no transform/opacity stays after animation
            });
        });
    }

});
