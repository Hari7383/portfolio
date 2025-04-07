/**
* Template Name: MyResume
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

/*
// Load EmailJS and initialize with your User ID
document.addEventListener("DOMContentLoaded", function () {
  emailjs.init("SLSfI7xDhNcOfDfRn"); // Replace with your actual EmailJS User ID

  // Select the contact form
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      emailjs.sendForm("service_qhb1tbd", "template_884ldhl", this)
        .then((response) => {
          alert("✅ Message sent successfully!");
          contactForm.reset();
        })
        .catch((error) => {
          console.error("❌ Error sending message:", error);
          alert("❌ Failed to send the message. Please try again.");
        });
    });
  } else {
    console.error("❌ Contact form not found. Check your form ID.");
  }
}); */

(function () {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  // Splash Cursor

  class SplashCursor {
    constructor(options = {}) {
      // Default options
      this.options = {
        cursorSize: options.cursorSize || 10,
        particleCount: options.particleCount || 10,
        particleSize: options.particleSize || 5,
        particleSpeed: options.particleSpeed || 1,
        particleColor: options.particleColor || '#000000',
        particleLifetime: options.particleLifetime || 1000,
        clickEffect: options.clickEffect !== undefined ? options.clickEffect : true,
        moveEffect: options.moveEffect !== undefined ? options.moveEffect : true,
      };

      // Create cursor elements
      this.cursorContainer = document.createElement('div');
      this.cursorContainer.className = 'splash-cursor';
      document.body.appendChild(this.cursorContainer);

      this.cursorDot = document.createElement('div');
      this.cursorDot.className = 'splash-cursor-dot';
      this.cursorDot.style.width = `${this.options.cursorSize}px`;
      this.cursorDot.style.height = `${this.options.cursorSize}px`;
      this.cursorContainer.appendChild(this.cursorDot);

      // Particles container
      this.particles = [];

      // Mouse position
      this.mouseX = 0;
      this.mouseY = 0;
      this.prevMouseX = 0;
      this.prevMouseY = 0;

      // Initialize events
      this.init();
    }

    init() {
      // Mouse move event
      document.addEventListener('mousemove', (e) => {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;

        // Update cursor position
        this.cursorDot.style.left = `${this.mouseX}px`;
        this.cursorDot.style.top = `${this.mouseY}px`;

        // Create splash effect if enabled and mouse moved enough
        if (this.options.moveEffect &&
          Math.abs(this.mouseX - this.prevMouseX) > 10 &&
          Math.abs(this.mouseY - this.prevMouseY) > 10) {
          this.createSplash(this.mouseX, this.mouseY, 5); // Fewer particles for movement

          this.prevMouseX = this.mouseX;
          this.prevMouseY = this.mouseY;

          // if (this.options.moveEffect &&
          //   (Math.abs(this.mouseX - this.prevMouseX) > 10 || Math.abs(this.mouseY - this.prevMouseY) > 10)) {
          //   this.createSplash(this.mouseX, this.mouseY, 5);

          //   this.prevMouseX = this.mouseX;
          //   this.prevMouseY = this.mouseY;
        }
      });

      // Click event for splash
      if (this.options.clickEffect) {
        document.addEventListener('click', (e) => {
          this.createSplash(e.clientX, e.clientY, this.options.particleCount);
        });
      }

      // Animation loop
      this.animate();
    }

    createSplash(x, y, count = this.options.particleCount) {
      for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'splash-particle';

        // Random size variation
        const size = this.options.particleSize * (0.5 + Math.random());
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Set position at cursor
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        // Random color variation
        const color = this.options.particleColor;
        particle.style.backgroundColor = color;

        // Random direction
        const angle = Math.random() * Math.PI * 2;
        const speed = this.options.particleSpeed * (1 + Math.random());
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;

        // Add to DOM
        this.cursorContainer.appendChild(particle);

        // Add to particles array with properties
        this.particles.push({
          element: particle,
          x: x,
          y: y,
          vx: vx,
          vy: vy,
          life: this.options.particleLifetime,
          maxLife: this.options.particleLifetime,
          size: size
        });
      }
    }

    animate() {
      // Update particles
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];

        // Update position
        p.x += p.vx;
        p.y += p.vy;
        p.element.style.left = `${p.x}px`;
        p.element.style.top = `${p.y}px`;

        // Update life
        p.life -= 16; // Approximately 16ms per frame at 60fps

        // Scale and fade based on remaining life
        const lifeRatio = p.life / p.maxLife;
        p.element.style.opacity = lifeRatio;
        p.element.style.transform = `scale(${lifeRatio})`;

        // Remove dead particles
        if (p.life <= 0) {
          p.element.parentNode.removeChild(p.element);
          this.particles.splice(i, 1);
        }
      }

      // Continue animation loop
      requestAnimationFrame(() => this.animate());
    }
  }

  // Initialize the splash cursor when the page loads
  document.addEventListener('DOMContentLoaded', () => {
    const splashCursor = new SplashCursor({
      cursorSize: 10,
      particleCount: 15,
      particleSize: 6,
      particleSpeed: 2,
      particleColor: '#3498db', // Blue color
      particleLifetime: 800,
      clickEffect: true,
      moveEffect: true
    });
  });

  // class SplashCursor {
  //   constructor(options = {}) {
  //     // Default options
  //     this.options = {
  //       cursorSize: options.cursorSize || 10,
  //       particleCount: options.particleCount || 10,
  //       particleSize: options.particleSize || 5,
  //       particleSpeed: options.particleSpeed || 1,
  //       particleColor: options.particleColor || '#000000',
  //       particleLifetime: options.particleLifetime || 1000,
  //       clickEffect: options.clickEffect !== undefined ? options.clickEffect : true,
  //       moveEffect: options.moveEffect !== undefined ? options.moveEffect : true,
  //     };

  //     // Create cursor container
  //     this.cursorContainer = document.createElement('div');
  //     this.cursorContainer.className = 'splash-cursor';
  //     document.body.appendChild(this.cursorContainer);

  //     // Create cursor dot
  //     this.cursorDot = document.createElement('div');
  //     this.cursorDot.className = 'splash-cursor-dot';
  //     this.cursorDot.style.width = `${this.options.cursorSize}px`;
  //     this.cursorDot.style.height = `${this.options.cursorSize}px`;
  //     this.cursorContainer.appendChild(this.cursorDot);

  //     // Particle array
  //     this.particles = [];

  //     // Mouse position
  //     this.mouseX = 0;
  //     this.mouseY = 0;
  //     this.prevMouseX = 0;
  //     this.prevMouseY = 0;

  //     // Init
  //     this.init();
  //   }

  //   init() {
  //     // Mouse move
  //     document.addEventListener('mousemove', (e) => {
  //       this.handleMove(e.clientX, e.clientY);
  //     });

  //     // Touch move
  //     document.addEventListener('touchmove', (e) => {
  //       if (e.touches.length > 0) {
  //         const touch = e.touches[0];
  //         this.handleMove(touch.clientX, touch.clientY);
  //       }
  //     });

  //     // Mouse click
  //     if (this.options.clickEffect) {
  //       document.addEventListener('click', (e) => {
  //         this.createSplash(e.clientX, e.clientY, this.options.particleCount);
  //       });

  //       // Touch tap
  //       document.addEventListener('touchstart', (e) => {
  //         if (e.touches.length > 0) {
  //           const touch = e.touches[0];
  //           this.createSplash(touch.clientX, touch.clientY, this.options.particleCount);
  //         }
  //       });
  //     }

  //     this.animate();
  //   }

  //   handleMove(x, y) {
  //     this.mouseX = x;
  //     this.mouseY = y;

  //     this.cursorDot.style.left = `${this.mouseX}px`;
  //     this.cursorDot.style.top = `${this.mouseY}px`;

  //     // Trigger splash effect only on noticeable movement
  //     if (this.options.moveEffect &&
  //       (Math.abs(this.mouseX - this.prevMouseX) > 3 || Math.abs(this.mouseY - this.prevMouseY) > 3)) {
  //       this.createSplash(this.mouseX, this.mouseY, 5); // small burst for movement
  //       this.prevMouseX = this.mouseX;
  //       this.prevMouseY = this.mouseY;
  //     }
  //   }

  //   createSplash(x, y, count = this.options.particleCount) {
  //     for (let i = 0; i < count; i++) {
  //       const particle = document.createElement('div');
  //       particle.className = 'splash-particle';

  //       const size = this.options.particleSize * (0.5 + Math.random());
  //       particle.style.width = `${size}px`;
  //       particle.style.height = `${size}px`;

  //       particle.style.left = `${x}px`;
  //       particle.style.top = `${y}px`;

  //       particle.style.backgroundColor = this.options.particleColor;

  //       const angle = Math.random() * Math.PI * 2;
  //       const speed = this.options.particleSpeed * (1 + Math.random());
  //       const vx = Math.cos(angle) * speed;
  //       const vy = Math.sin(angle) * speed;

  //       this.cursorContainer.appendChild(particle);

  //       this.particles.push({
  //         element: particle,
  //         x: x,
  //         y: y,
  //         vx: vx,
  //         vy: vy,
  //         life: this.options.particleLifetime,
  //         maxLife: this.options.particleLifetime,
  //         size: size
  //       });
  //     }
  //   }

  //   animate() {
  //     for (let i = this.particles.length - 1; i >= 0; i--) {
  //       const p = this.particles[i];
  //       p.x += p.vx;
  //       p.y += p.vy;
  //       p.element.style.left = `${p.x}px`;
  //       p.element.style.top = `${p.y}px`;

  //       p.life -= 16;
  //       const lifeRatio = p.life / p.maxLife;
  //       p.element.style.opacity = lifeRatio;
  //       p.element.style.transform = `scale(${lifeRatio})`;

  //       if (p.life <= 0) {
  //         p.element.remove();
  //         this.particles.splice(i, 1);
  //       }
  //     }

  //     requestAnimationFrame(() => this.animate());
  //   }
  // }

  // // 🚀 Launch it
  // document.addEventListener('DOMContentLoaded', () => {
  //   new SplashCursor({
  //     cursorSize: 10,
  //     particleCount: 15,
  //     particleSize: 6,
  //     particleSpeed: 2,
  //     particleColor: '#3498db',
  //     particleLifetime: 800,
  //     clickEffect: true,
  //     moveEffect: true
  //   });
  // });

  // Splash Cursor end

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function (direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();