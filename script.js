
// ===============================
// 🎯 IMPORTANT DATES
// ===============================
const nameDay = new Date("July 7, 2026 00:00:00").getTime();
const birthday = new Date("July 12, 2026 00:00:00").getTime();
const anniversary = new Date("July 14, 2026 00:00:00").getTime();

// Change this to when you see her again (optional)
const reunionDate = new Date("July 12, 2026 12:00:00").getTime();


// ===============================
// ⏳ COUNTDOWN TO REUNION
// ===============================
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function updateCountdown() {
    const now = new Date().getTime();
    const distance = reunionDate - now;

    if (distance < 0) return;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.innerText = days;
    hoursEl.innerText = hours;
    minutesEl.innerText = minutes;
    secondsEl.innerText = seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();


// ===============================
// 🔓 UNLOCK SYSTEM
// ===============================
function checkUnlocks() {
    const now = new Date().getTime();

    // NAME DAY
    if (now >= nameDay) {
        unlockGift("gift-nameday", "nameday");
    }

    // BIRTHDAY
    if (now >= birthday) {
        unlockGift("gift-birthday", "birthday");
    }

    // ANNIVERSARY
    if (now >= anniversary) {
        unlockGift("gift-anniversary", "anniversary");
    }
}

function unlockGift(giftId, sectionId) {
    const gift = document.getElementById(giftId);
    const section = document.getElementById(sectionId);

    if (!gift) return;

    gift.classList.remove("locked");
    gift.querySelector(".lock").innerText = "💖";
    gift.querySelector("button").disabled = false;
    gift.querySelector("button").innerText = "Open";

    gift.onclick = () => {
        document.querySelectorAll(".section").forEach(s => s.classList.add("hidden"));
        section.classList.remove("hidden");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
}

setInterval(checkUnlocks, 5000);
checkUnlocks();


// ===============================
// 💖 FLOATING HEARTS
// ===============================
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerText = "❤️";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (3 + Math.random() * 5) + "s";

    document.getElementById("hearts").appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 7000);
}

setInterval(createHeart, 500);


// ===============================
// 🎆 SMALL BIRTHDAY EFFECT
// ===============================
function birthdayEffect() {
    const now = new Date().getTime();

    if (now >= birthday && now < birthday + 86400000) {
        for (let i = 0; i < 20; i++) {
            setTimeout(createHeart, i * 100);
        }
    }
}

birthdayEffect();


// ===============================
// 🎵 OPTIONAL MUSIC AUTOPLAY
// ===============================
window.addEventListener("click", () => {
    const music = document.getElementById("music");
    if (music) {
        music.play().catch(() => {});
    }
});