// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Typewriter effect
const lines = [
  "Cloud Architect",
  "MLOps Engineer",
  "DevSecOps Practitioner",
  "Kubernetes Administrator",
];
const typewriterEl = document.getElementById("typewriter");

function typewriter() {
  if (!typewriterEl) return;
  let lineIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = lines[lineIndex];

    if (!deleting) {
      charIndex++;
      typewriterEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1600);
        return;
      }
    } else {
      charIndex--;
      typewriterEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        lineIndex = (lineIndex + 1) % lines.length;
      }
    }
    setTimeout(tick, deleting ? 30 : 55);
  }
  tick();
}
typewriter();

// Animated counters
const counters = document.querySelectorAll(".stat-num");
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || "";
      const isDecimal = !Number.isInteger(target);
      const duration = 1400;
      const start = performance.now();

      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;
        el.textContent = (isDecimal ? value.toFixed(1) : Math.round(value)) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.4 }
);
counters.forEach((el) => counterObserver.observe(el));

// Fade-in on scroll for cards
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealTargets = document.querySelectorAll(
  ".skill-card, .project-card, .cert-card, .learning-card, .timeline-item, .blog-card"
);

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const reveal = (el) => {
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";
  };
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal(entry.target);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  revealTargets.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    revealObserver.observe(el);
  });
  // Safety net: force visibility if the observer never fires for an element
  setTimeout(() => revealTargets.forEach(reveal), 2500);
}

// Nav active-link scroll-spy
const navAnchors = Array.from(document.querySelectorAll(".nav-links a"));
const spySections = navAnchors
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && spySections.length) {
  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = "#" + entry.target.id;
        navAnchors.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === id));
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  spySections.forEach((section) => spyObserver.observe(section));
}
