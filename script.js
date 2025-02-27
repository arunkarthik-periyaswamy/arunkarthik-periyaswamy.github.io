// Active Hamburger Menu
let menuIcon = document.querySelector(".menu-icon");
let navlist = document.querySelector(".navlist");
menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("active");
    navlist.classList.toggle("active");
    document.body.classList.toggle("open");
});

// Remove Navlist on Click
navlist.addEventListener("click", () => {
    navlist.classList.remove("active");
    menuIcon.classList.remove("active");
    document.body.classList.remove("open");
});

// Rotate Text JS Code
let text = document.querySelector(".text p");
text.innerHTML = text.innerHTML.split("").map((char, i) =>
    `<b style="transform:rotate(${i * 6.3}deg">${char}</b>`
).join("");

// About Section Tab Switching
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.content').forEach(content => content.classList.remove('active'));
        
        button.classList.add('active');
        document.getElementById(button.dataset.tab).classList.add('active');
    });
});

// Portfolio Filter
var mixer = mixitup('.portfolio-gallery', {
    selectors: {
        target: '.portfolio-box'
    },
    animation: {
        duration: 500
    }
});

// Initialize SwiperJS
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    breakpoints: {
        576: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        1200: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
    }
});

// Original Skill Progress Bar (Removed, Replaced Below)
/* Note: The circular SVG skill bars are no longer used in the new design, so this section is commented out.
const first_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle");

window.addEventListener("scroll", () => {
    if (!skillsPlayed)
        skillsCounter();
});

function hasReached(el) {
    let topPosition = el.getBoundingClientRect().top;
    if (window.innerHeight >= topPosition + el.offsetHeight) return true;
    return false;
}

function updateCount(num, maxNum) {
    let currentNum = +num.innerText;
    
    if (currentNum < maxNum) {
        num.innerText = currentNum + 1;
        setTimeout(() => {
            updateCount(num, maxNum);
        }, 12);
    }
}

let skillsPlayed = false;

function skillsCounter() {
    if (!hasReached(first_skill)) return;
    skillsPlayed = true;
    sk_counters.forEach((counter, i) => {
        let target = +counter.dataset.target;
        let strokeValue = 465 - 465 * (target / 100);

        progress_bars[i].style.setProperty("--target", strokeValue);

        setTimeout(() => {
            updateCount(counter, target);
        }, 400);
    });

    progress_bars.forEach(p => p.style.animation = "progress 2s ease-in-out forwards");
}
*/

// Side Progress Bar
let calcScrollValue = () => {
    let scrollProgress = document.getElementById("progress");
    let pos = document.documentElement.scrollTop;

    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight);
    
    if (pos > 100) {
        scrollProgress.style.display = "grid";
    } else {
        scrollProgress.style.display = "none";
    }

    scrollProgress.addEventListener("click", () => {
        document.documentElement.scrollTop = 0;
    });

    scrollProgress.style.background = `conic-gradient(#fff ${scrollValue}%, #e6006d ${scrollValue}%)`;
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

// Active Menu
let menuLi = document.querySelectorAll("header ul li a");
let section = document.querySelectorAll('section');

function activeMenu() {
    let len = section.length;
    while (--len && window.scrollY + 97 < section[len].offsetTop) {}
    menuLi.forEach(sec => sec.classList.remove("active"));
    menuLi[len].classList.add("active");
}
activeMenu();
window.addEventListener("scroll", activeMenu);

// Scroll Reveal
ScrollReveal({ 
    distance: "90px",
    duration: 2000,
    delay: 200,
    // reset: true,
});

ScrollReveal().reveal('.hero-info, .main-text, .proposal, .heading', { origin: "top" });
ScrollReveal().reveal('.about-img, .fillter-buttons, .contact-info', { origin: "left" });
ScrollReveal().reveal('.about-content, .skills', { origin: "right" });
ScrollReveal().reveal('.allServices, .portfolio-gallery, .blog-box, footer, .img-hero', { origin: "bottom" });

// New Contact Form Submission Feedback
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent actual submission for demo purposes

    const feedback = document.getElementById('form-feedback');
    feedback.textContent = "Sending your message...";
    feedback.style.color = "#e6006d"; // Matches your theme

    setTimeout(() => {
        feedback.textContent = "Message sent! I'll get back to you soon.";
        feedback.style.color = "#1a3c5e";
        this.reset(); // Reset form fields
    }, 1000);
});

// New Skills Animation on Scroll
const skillItems = document.querySelectorAll('.skill-item');
let skillsAnimated = false;

function animateSkills() {
    if (skillsAnimated) return;

    const skillsSection = document.querySelector('.skills-showcase');
    const topPosition = skillsSection.getBoundingClientRect().top;

    if (window.innerHeight >= topPosition + skillsSection.offsetHeight / 2) {
        skillsAnimated = true;
        skillItems.forEach(item => {
            const progress = item.querySelector('.progress');
            const width = progress.style.width; // e.g., "95%"
            progress.style.width = "0"; // Start at 0
            setTimeout(() => {
                progress.style.width = width; // Animate to full width
            }, 200);
        });
    }
}

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);