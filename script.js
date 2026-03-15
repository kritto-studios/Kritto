// ========================
// KRITTO PROFESSIONAL JS
// ========================

// 1️⃣ LOADER – Blooming fade-out
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if(loader){
        loader.style.transition = "opacity 0.7s ease";
        loader.style.opacity = 0;
        setTimeout(() => loader.style.display = "none", 700);
    }

    // Trigger initial bloom animation for worlds
    document.querySelectorAll(".world").forEach((world, i) => {
        setTimeout(() => {
            world.style.opacity = 1;
            world.style.transform = "translateY(0) scale(1)";
            world.style.transition = "all 0.7s cubic-bezier(0.68, -0.55, 0.27, 1.55)";
        }, i * 150);
    });
});


// 2️⃣ SMOOTH SCROLL FOR NAVIGATION
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e){
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if(target){
            target.scrollIntoView({behavior: "smooth", block: "start"});
        }
    });
});


// 3️⃣ INTERACTIVE CARDS – FLIP EFFECT
const cards = document.querySelectorAll(".card");
cards.forEach(card => {
    card.style.transformStyle = "preserve-3d";
    card.style.transition = "transform 0.8s ease";

    card.addEventListener("click", () => {
        card.classList.toggle("open");
        if(card.classList.contains("open")){
            card.style.transform = "rotateY(180deg)";
        } else {
            card.style.transform = "rotateY(0deg)";
        }
    });
});


// 4️⃣ SCROLL REVEAL – BLOOM EFFECT FOR SECTIONS
const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0) scale(1)";
            entry.target.style.transition = "all 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55)";
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll(".world, .cards-section, .gift-section, .mehedi-section, .sticker-section, .coming-soon").forEach(section => {
    section.style.opacity = 0;
    section.style.transform = "translateY(30px) scale(0.95)";
    observer.observe(section);
});


// 5️⃣ OPTIONAL: Subtle floating animation for Kritto logo
const logo = document.querySelector(".logo");
if(logo){
    let angle = 0;
    setInterval(() => {
        angle += 0.5;
        logo.style.transform = `rotate(${Math.sin(angle * 0.01) * 2}deg)`;
    }, 30);
}

// =============================
// SCROLL REVEAL FOR SECTIONS
// =============================
const sections = document.querySelectorAll('section');

const revealSection = () => {
  const triggerBottom = window.innerHeight / 5 * 4;

  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop < triggerBottom) {
      section.classList.add('visible');
      section.classList.remove('hidden');
    } else {
      section.classList.add('hidden');
      section.classList.remove('visible');
    }
  });
};

// Initialize hidden
sections.forEach(section => section.classList.add('hidden'));

// Listen to scroll
window.addEventListener('scroll', revealSection);
revealSection(); // run once on load

// =============================
// OPTIONAL: CARD HOVER ANIMATION
// =============================
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.transform = `rotateX(${-(y - rect.height/2)/20}deg) rotateY(${(x - rect.width/2)/20}deg) translateZ(10px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0) rotateY(0) translateZ(0)';
  });
});
