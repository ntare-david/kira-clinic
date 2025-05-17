// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Import Swiper if it is not already available globally
  if (typeof Swiper === "undefined") {
    console.error("Swiper is not defined. Make sure to include the Swiper library.")
  }

  // Preloader
  window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader")
    if (preloader) {
      preloader.classList.add("fade-out")
      setTimeout(() => {
        preloader.style.display = "none"
      }, 500)
    }
  })

  // Sticky Header
  const header = document.querySelector("header")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("sticky")
    } else {
      header.classList.remove("sticky")
    }
  })

  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".mobile-menu-toggle")
  const mobileNav = document.querySelector(".mobile-nav")

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active")
      mobileNav.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking on a link
  const mobileNavLinks = document.querySelectorAll(".mobile-nav a")
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("active")
      menuToggle.classList.remove("active")
    })
  })

  // Hero Slider
  if (typeof Swiper !== "undefined" && document.querySelector(".hero-swiper")) {
    const heroSwiper = new Swiper(".hero-swiper", {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      speed: 800,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
    })
  }

  // Testimonial Slider
  if (typeof Swiper !== "undefined" && document.querySelector(".testimonial-swiper")) {
    const testimonialSwiper = new Swiper(".testimonial-swiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
      speed: 600,
    })
  }

  // Animate counters
  const counters = document.querySelectorAll(".stat-number")

  function animateCounter(counter) {
    const target = +counter.getAttribute("data-count")
    const duration = 2000
    const step = (target / duration) * 10
    let current = 0

    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        clearInterval(timer)
        counter.innerText = target
      } else {
        counter.innerText = Math.floor(current)
      }
    }, 10)
  }

  // Use Intersection Observer to trigger counter animation when visible
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )

    counters.forEach((counter) => {
      observer.observe(counter)
    })
  } else {
    // Fallback for browsers that don't support Intersection Observer
    counters.forEach((counter) => {
      counter.innerText = counter.getAttribute("data-count")
    })
  }

  // Back to Top Button
  const backToTopBtn = document.querySelector(".back-to-top")

  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("active")
      } else {
        backToTopBtn.classList.remove("active")
      }
    })

    backToTopBtn.addEventListener("click", (e) => {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Modal Functionality
  const appointmentBtns = document.querySelectorAll(".btn-appointment")
  const modal = document.getElementById("appointmentModal")
  const closeModal = document.querySelector(".close-modal")

  if (appointmentBtns.length > 0 && modal) {
    appointmentBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault()
        modal.classList.add("active")
        document.body.style.overflow = "hidden"
      })
    })

    if (closeModal) {
      closeModal.addEventListener("click", () => {
        modal.classList.remove("active")
        document.body.style.overflow = "auto"
      })
    }

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active")
        document.body.style.overflow = "auto"
      }
    })
  }

  // Form Submission with validation
  const appointmentForm = document.getElementById("appointmentForm")
  const modalAppointmentForm = document.getElementById("modalAppointmentForm")
  const contactForm = document.getElementById("contactForm")

  function validateForm(form) {
    let isValid = true
    const inputs = form.querySelectorAll("input[required], select[required], textarea[required]")

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        input.style.borderColor = "var(--error-color)"
        isValid = false
      } else {
        input.style.borderColor = "var(--border-color)"
      }

      // Email validation
      if (input.type === "email" && input.value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailPattern.test(input.value)) {
          input.style.borderColor = "var(--error-color)"
          isValid = false
        }
      }

      // Phone validation
      if (input.type === "tel" && input.value) {
        const phonePattern = /^[0-9+\-\s$$$$]{7,15}$/
        if (!phonePattern.test(input.value)) {
          input.style.borderColor = "var(--error-color)"
          isValid = false
        }
      }
    })

    return isValid
  }

  if (appointmentForm) {
    appointmentForm.addEventListener("submit", (e) => {
      e.preventDefault()
      if (validateForm(appointmentForm)) {
        alert("Appointment request submitted successfully! We will contact you shortly.")
        appointmentForm.reset()
      } else {
        alert("Please fill in all required fields correctly.")
      }
    })
  }

  if (modalAppointmentForm) {
    modalAppointmentForm.addEventListener("submit", (e) => {
      e.preventDefault()
      if (validateForm(modalAppointmentForm)) {
        alert("Appointment request submitted successfully! We will contact you shortly.")
        modalAppointmentForm.reset()
        modal.classList.remove("active")
        document.body.style.overflow = "auto"
      } else {
        alert("Please fill in all required fields correctly.")
      }
    })
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()
      if (validateForm(contactForm)) {
        alert("Your message has been sent successfully! We will get back to you soon.")
        contactForm.reset()
      } else {
        alert("Please fill in all required fields correctly.")
      }
    })
  }

  // Newsletter Form
  const newsletterForm = document.querySelector(".newsletter-form")

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const emailInput = newsletterForm.querySelector("input[type='email']")
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (emailInput.value && emailPattern.test(emailInput.value)) {
        alert("Thank you for subscribing to our newsletter!")
        newsletterForm.reset()
      } else {
        alert("Please enter a valid email address.")
        emailInput.style.borderColor = "var(--error-color)"
      }
    })
  }

  // Add smooth scrolling to all links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href")

      // Skip if it's just "#" or empty
      if (href === "#" || !href) return

      const target = document.querySelector(href)
      if (target) {
        e.preventDefault()

        const headerHeight = document.querySelector("header").offsetHeight
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Add Google Map to contact page
  const mapContainer = document.querySelector(".map-container")
  if (mapContainer) {
    // Replace with an iframe for Google Maps
    mapContainer.innerHTML = `
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7583995636766!2d30.32699!3d-1.9441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwNTYnMzguOCJTIDMwwrAxOSczNy4yIkU!5e0!3m2!1sen!2sus!4v1621436761619!5m2!1sen!2sus" 
        allowfullscreen="" 
        loading="lazy">
      </iframe>
    `
  }

  // Add animation to elements when they come into view
  if ("IntersectionObserver" in window) {
    const animatedElements = document.querySelectorAll(
      ".service-card, .team-member, .value-item, .mission-card, .vision-card, .contact-info-card, .social-connect, .contact-form",
    )

    const animationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
            animationObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    animatedElements.forEach((element) => {
      element.style.opacity = "0"
      element.style.transform = "translateY(20px)"
      element.style.transition = "opacity 0.6s ease, transform 0.6s ease"
      animationObserver.observe(element)
    })
  }
})
