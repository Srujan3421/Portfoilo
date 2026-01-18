// Sticky Header
window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    header.classList.toggle("scrolled", window.scrollY > 0);
});

// Mobile Menu
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links a");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    hamburger.classList.toggle("toggle");
});

// Close menu when link is clicked
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove("open");
        hamburger.classList.remove("toggle");
    });
});

// Smooth Scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Play once
        }
    });
}, observerOptions);

// Select elements to animate
// We'll target major sections and cards
const hiddenElements = document.querySelectorAll('.hero-content, .section-title, .about-content, .skill-card, .project-card, .education-card, .contact-container');
hiddenElements.forEach((el) => {
    el.classList.add('hidden-el');
    observer.observe(el);
});

// 3D Tilt Effect for Project Cards & Skills
const tiltElements = document.querySelectorAll('.project-card, .skill-card');

tiltElements.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xPct = x / rect.width;
        const yPct = y / rect.height;

        const xRotation = (yPct - 0.5) * 10 * -1; // Reduced tilt for cards
        const yRotation = (xPct - 0.5) * 10;

        card.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Magnetic/Tilt Effect for Profile Image
const profile = document.querySelector('.profile-wrapper');
if (profile) {
    profile.addEventListener('mousemove', (e) => {
        const rect = profile.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xPct = x / rect.width;
        const yPct = y / rect.height;

        const xRotation = (yPct - 0.5) * 20 * -1;
        const yRotation = (xPct - 0.5) * 20;

        profile.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(1.05)`;
        profile.style.animation = 'none'; // Pause float

        const img = profile.querySelector('img');
        if (img) {
            img.style.transform = `translateX(${(xPct - 0.5) * 15}px) translateY(${(yPct - 0.5) * 15}px)`;
        }
    });

    profile.addEventListener('mouseleave', () => {
        profile.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        profile.style.animation = 'floatProfile 6s ease-in-out infinite';

        const img = profile.querySelector('img');
        if (img) {
            img.style.transform = 'translate(0, 0)';
        }
    });
}
