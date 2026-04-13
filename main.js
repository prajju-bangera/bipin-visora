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

    Promise.all([
        loadComponent('footer-container', 'footer.html')
    ]).then(() => {
        initAnimations();
        initMobileMenu();
    });

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
                ease: "power2.out"
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

                workItems.forEach(item => {
                    if (filter === "all" || item.dataset.category === filter) {
                        gsap.to(item, {
                            opacity: 1,
                            scale: 1,
                            display: "flex",
                            duration: 0.5,
                            ease: "power2.out"
                        });
                    } else {
                        gsap.to(item, {
                            opacity: 0,
                            scale: 0.9,
                            display: "none",
                            duration: 0.3,
                            ease: "power2.in"
                        });
                    }
                });

                // Refresh ScrollTrigger to account for layout changes
                setTimeout(() => ScrollTrigger.refresh(), 500);
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
    }

});
