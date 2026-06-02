document.addEventListener("DOMContentLoaded", () => {

    // --- 1. Luxury Preloader Cleanup Engine ---
    const preloader = document.getElementById("preloader");
    if (preloader) {
        window.addEventListener("load", () => {
            setTimeout(() => {
                preloader.style.opacity = "0";
                setTimeout(() => preloader.style.display = "none", 600);
            }, 1000); // 1 Second standard aesthetics delay
        });
        // Fallback standard clear window block
        setTimeout(() => {
            preloader.style.display = "none";
        }, 3000);
    }

    // --- 2. Mobile Navbar Menu Drawer Control Logic ---
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    const toggleMenu = () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    };

    hamburger.addEventListener("click", toggleMenu);
    navLinks.forEach(link => link.addEventListener("click", () => {
        if(hamburger.classList.contains("active")) toggleMenu();
    }));

    // --- 3. Sticky Navbar & Scroll spying logic ---
    const navbar = document.querySelector(".navbar");
    const backToTop = document.getElementById("back-to-top");
    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {
        // Sticky Header Trigger State
        if (window.scrollY > 50) {
            navbar.classList.add("sticky");
        } else {
            navbar.classList.remove("sticky");
        }

        // Floating Back-To-Top Control Block
        if (window.scrollY > 600) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

        // Active Spying Intersection Marker Pipeline
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // --- 4. Hero Full-Screen Background Auto Image Slider Engine ---
    const slides = document.querySelectorAll(".hero-slider .slide");
    let currentSlide = 0;
    const slideInterval = 5000; // Switch image every 5 seconds

    const nextSlide = () => {
        slides[currentSlide].classList.remove("active");
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add("active");
    };

    if(slides.length > 0) {
        setInterval(nextSlide, slideInterval);
    }

    // --- 5. Scroll Reveal Intersection Observer Machinery ---
    const revealElements = document.querySelectorAll(".scroll-reveal");
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // Trigger only once for performance
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(element => revealObserver.observe(element));

    // --- 6. Masonry Lightbox View Engine Modals ---
    const galleryItems = document.querySelectorAll(".gallery-item");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxClose = document.querySelector(".lightbox-close");

    galleryItems.forEach(item => {
        item.addEventListener("click", () => {
            const imgSource = item.querySelector("img").getAttribute("src");
            lightboxImg.setAttribute("src", imgSource);
            lightbox.style.display = "flex";
            document.body.style.overflow = "hidden"; // Disable scroll when active
        });
    });

    if(lightboxClose) {
        lightboxClose.addEventListener("click", () => {
            lightbox.style.display = "none";
            document.body.style.overflow = "auto";
        });
        lightbox.addEventListener("click", (e) => {
            if(e.target === lightbox) {
                lightbox.style.display = "none";
                document.body.style.overflow = "auto";
            }
        });
    }

    // --- 7. Testimonials Auto Carousel Loop Matrix ---
    const sliderTrack = document.getElementById("testimonial-slider");
    const cards = document.querySelectorAll(".testimonial-card");
    const dotsContainer = document.getElementById("slider-dots");
    let reviewIndex = 0;

    if (cards.length > 0) {
        // Build Carousel Navigation Dots
        cards.forEach((_, idx) => {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            if (idx === 0) dot.classList.add("active");
            dot.addEventListener("click", () => moveReviewToIndex(idx));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll(".dot");

        const moveReviewToIndex = (index) => {
            reviewIndex = index;
            sliderTrack.style.transform = `translateX(-${reviewIndex * 100}%)`;
            dots.forEach(d => d.classList.remove("active"));
            dots[reviewIndex].classList.add("active");
        };

        const autoCycleReviews = () => {
            let nextIndex = (reviewIndex + 1) % cards.length;
            moveReviewToIndex(nextIndex);
        };

        let reviewTimer = setInterval(autoCycleReviews, 4000);

        // Reset timer loop on interactive click actions
        dotsContainer.addEventListener("click", () => {
            clearInterval(reviewTimer);
            reviewTimer = setInterval(autoCycleReviews, 6000);
        });
    }

    // --- 8. Form Validation Submission Feedback Mock ---
    const contactForm = document.getElementById("hotel-contact-form");
    if(contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById("name").value.trim();
            const emailInput = document.getElementById("email").value.trim();

            if(nameInput === "" || emailInput === "") {
                alert("Please fill all properties correctly.");
                return;
            }

            // Elegant Notification Alert Mockup
            alert(`Thank you, Royal Guest ${nameInput}! Your reservation request/inquiry has been logged safely. Our Concierge desk will email you shortly.`);
            contactForm.reset();
        });
    }
});
