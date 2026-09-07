(() => {
  "use strict";

  const loader = document.getElementById("loader");
  const counter = document.getElementById("loadPercent");
  let n = 0;

  const tick = () => {
    n += Math.floor(Math.random() * 9) + 3;
    if (n >= 100) {
      n = 100;
      counter.textContent = "100%";
      setTimeout(() => {
        loader.classList.add("done");
        document.body.classList.add("loaded");
        revealHero();
      }, 450);
      return;
    }
    counter.textContent = `${String(n).padStart(2, "0")}%`;
    setTimeout(tick, 65 + Math.random() * 70);
  };

  const revealHero = () => {
    document.querySelectorAll(".hero-cinematic .reveal, .hero-cinematic .reveal-word")
      .forEach((el, i) => setTimeout(() => el.classList.add("visible"), 120 + i * 90));
  };

  window.addEventListener("load", () => setTimeout(tick, 150));

  // Scroll reveals with staggered timing.
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });

  document.querySelectorAll(".reveal, .reveal-word").forEach((el, i) => {
    el.style.transitionDelay = `${Math.min((i % 5) * 70, 280)}ms`;
    observer.observe(el);
  });

  // Reveal content that is already in the viewport on initial load.
  // This prevents large empty reserved areas before the first scroll event.
  requestAnimationFrame(() => {
    document.querySelectorAll(".reveal, .reveal-word").forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight * .96 && r.bottom > 0) el.classList.add("visible");
    });
  });

  // Fail-safe: never leave sections blank if an observer is delayed by file:// hosting or cached assets.
  setTimeout(() => {
    document.querySelectorAll(".reveal, .reveal-word").forEach((el, i) => {
      if (!el.classList.contains("visible") && !el.closest(".hero-cinematic")) {
        setTimeout(() => el.classList.add("visible"), Math.min(i * 25, 500));
      }
    });
  }, 900);

  // Smooth magnetic cursor matching the creative-developer presentation style.
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;

  addEventListener("mousemove", e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = `${mx}px`; dot.style.top = `${my}px`;
  });

  const cursorLoop = () => {
    rx += (mx - rx) * .16;
    ry += (my - ry) * .16;
    ring.style.left = `${rx}px`; ring.style.top = `${ry}px`;
    requestAnimationFrame(cursorLoop);
  };
  cursorLoop();

  document.querySelectorAll("a, button, .skill-tile").forEach(el => {
    el.addEventListener("mouseenter", () => ring.classList.add("active"));
    el.addEventListener("mouseleave", () => ring.classList.remove("active"));
  });

  // Parallax on the hero title — subtle, no libraries required.
  const hero = document.querySelector(".hero-cinematic");
  const title = document.querySelector(".hero-title");
  if (hero && title && matchMedia("(pointer:fine)").matches) {
    hero.addEventListener("mousemove", e => {
      const x = (e.clientX / innerWidth - .5) * 8;
      const y = (e.clientY / innerHeight - .5) * 5;
      title.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
    hero.addEventListener("mouseleave", () => title.style.transform = "");
  }

  // Active navigation state.
  const sections = [...document.querySelectorAll("main section[id]")];
  const navLinks = [...document.querySelectorAll(".site-nav nav a")];
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { threshold: .45 });
  sections.forEach(s => navObserver.observe(s));
})();
