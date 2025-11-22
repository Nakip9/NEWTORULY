'use strict';

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

const navToggleEvent = function (elem) {
  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function () {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
    });
  }
}

navToggleEvent(navElemArr);
navToggleEvent(navLinks);

navLinks.forEach((link, index) => {
  link.style.setProperty("--nav-delay", `${index * 60}ms`);
});



/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

if (header && goTopBtn) {
  window.addEventListener("scroll", function () {

    if (window.scrollY >= 200) {
      header.classList.add("active");
      goTopBtn.classList.add("active");
    } else {
      header.classList.remove("active");
      goTopBtn.classList.remove("active");
    }

  });
}

/**
 * scroll animations
 */

const animatedElements = document.querySelectorAll("[data-animate]");

const revealOnScroll = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      revealOnScroll.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2
});

animatedElements.forEach((element) => revealOnScroll.observe(element));


/**
 * telegram contact form
 */

const contactForm = document.querySelector("[data-telegram-form]");

if (contactForm) {
  const statusElement = contactForm.querySelector(".form-status");
  const submitButton = contactForm.querySelector("button[type='submit']");

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone") || "N/A";
    const message = formData.get("message");

    const token = contactForm.dataset.telegramToken;
    const chatId = contactForm.dataset.telegramChatId;

    if (!token || !chatId || token.includes("YOUR_TELEGRAM") || chatId.includes("YOUR_CHAT_ID")) {
      statusElement.textContent = "Set your Telegram bot token and chat ID in the form attributes.";
      statusElement.style.color = "crimson";
      return;
    }

    const telegramMessage = `New inquiry from ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`;

    submitButton.disabled = true;
    statusElement.textContent = "Sending...";
    statusElement.style.color = "var(--gunmetal)";

    try {
      const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramMessage
        })
      });

      if (!response.ok) {
        throw new Error("Failed to reach Telegram");
      }

      statusElement.textContent = "Thanks! Your message is on its way to our team.";
      statusElement.style.color = "green";
      contactForm.reset();
    } catch (error) {
      statusElement.textContent = "We could not send your message. Please try again.";
      statusElement.style.color = "crimson";
    } finally {
      submitButton.disabled = false;
    }
  });
}