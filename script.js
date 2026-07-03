// ===============================
// ❤️ DATES
// ===============================

const nameDayDate = new Date("July 7, 2026 00:00:00").getTime();
const birthdayDate = new Date("July 12, 2026 00:00:00").getTime();
const anniversaryDate = new Date("July 14, 2026 00:00:00").getTime();

const reunionDate = new Date("July 12, 2026 12:00:00").getTime();


// ===============================
// 🌌 START SITE
// ===============================

function startSite() {

    document.getElementById("intro").style.display = "none";
    document.getElementById("main").classList.remove("hidden"); 
    document.querySelector(".extras").style.display = "block";
    startCountdown();
    checkUnlocks();
    setInterval(checkUnlocks, 1000);
}


// ===============================
// ⏳ COUNTDOWN
// ===============================

function startCountdown() {

    setInterval(() => {

        const now = new Date().getTime();
        const distance = reunionDate - now;

        if (distance < 0) return;

        document.getElementById("days").innerText =
            Math.floor(distance / (1000 * 60 * 60 * 24));

        document.getElementById("hours").innerText =
            Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        document.getElementById("minutes").innerText =
            Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById("seconds").innerText =
            Math.floor((distance % (1000 * 60)) / 1000);

    }, 1000);
}


// ===============================
// 🎁 GIFT BOX ALWAYS VISIBLE
// ===============================

function checkUnlocks() {
    handleGift("gift1", nameDayDate, "nameday");
    handleGift("gift2", birthdayDate, "birthday");
    handleGift("gift3", anniversaryDate, "anniversary");
}


// ===============================
// 🔒 ONLY CONTROL CLICK ACCESS
// ===============================

function handleGift(giftId, unlockTime, pageId) {

    const gift = document.getElementById(giftId);
    if (!gift) return;

    const now = new Date().getTime();

    // ALWAYS SHOW BOX
    gift.style.display = "block";

    if (now < unlockTime) {

        // 🔒 LOCKED (visible but not usable)
        gift.classList.add("locked");

        gift.onclick = () => {
            alert("🔒 This will unlock on " + new Date(unlockTime).toDateString());
        };

    } else {

        // 🔓 UNLOCKED
        gift.classList.remove("locked");

        gift.onclick = () => openPage(pageId);
    }
}


// ===============================
// 📄 OPEN LETTER (HIDDEN UNTIL CLICK + UNLOCKED)
// ===============================

function openPage(pageId) {

    const page = document.getElementById(pageId);
    const now = new Date().getTime();

    // 🔒 SAFETY CHECK (prevents manual opening)
    if (
        (pageId === "nameday" && now < nameDayDate) ||
        (pageId === "birthday" && now < birthdayDate) ||
        (pageId === "anniversary" && now < anniversaryDate)
    ) {
        alert("🔒 Not unlocked yet");
        return;
    }

    document.querySelector(".hero").style.display = "none";
    document.querySelector(".gifts").style.display = "none";
    document.querySelector(".extras").style.display = "none";

    document.querySelectorAll(".page").forEach(p => {
        p.classList.add("hidden");
    });

    page.classList.remove("hidden");

    // ✉️ envelope animation
    setTimeout(() => {
        const envelope = page.querySelector(".envelope");
        if (envelope) envelope.classList.add("open");
    }, 300);

    window.scrollTo({ top: 0, behavior: "smooth" });
}


// ===============================
// 🏠 BACK HOME
// ===============================

function goHome() {

    document.querySelector(".hero").style.display = "flex";
    document.querySelector(".gifts").style.display = "block";
    document.querySelector(".extras").style.display = "block";

    document.querySelectorAll(".page").forEach(p => {
        p.classList.add("hidden");

        const env = p.querySelector(".envelope");
        if (env) env.classList.remove("open");
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
}


// ===============================
// 💖 HEARTS
// ===============================

function createHeart() {

    const heart = document.createElement("div");
    heart.innerHTML = "❤️";

    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "100vh";
    heart.style.fontSize = "18px";
    heart.style.opacity = "0.7";
    heart.style.zIndex = "999";
    heart.style.pointerEvents = "none";

    document.body.appendChild(heart);

    let move = setInterval(() => {
        let top = parseFloat(heart.style.top);
        heart.style.top = (top - 2) + "px";

        if (top < -50) {
            clearInterval(move);
            heart.remove();
        }
    }, 30);
}

setInterval(createHeart, 500);


// ===============================
// 🚀 INIT
// ===============================

checkUnlocks();
// ===============================
// 💝 RANDOM WAIT MESSAGES
// ===============================
const waitMessages = [
    "Patience, my love! You have to wait just a little longer... ❤️",
    "No peeking! 🤫 This surprise isn't ready for you yet, beautiful.",
    "I know you can't wait, but good things come to those who wait! 😘",
    "🔒 Locked! You'll have to count down the days with me, Nelly.",
    "A special letter is resting inside... wait until the right day to read it! 🌸",
    "Not yet, my beautiful girl! Let the anticipation build up a little. 🥰",
    "Stop clicking me! You have to wait, love! 😂❤️"
];

function showCustomAlert() {
    const alertBox = document.getElementById("customAlert");
    const alertMessage = document.getElementById("alertMessage");
    
    // Pick a random message from the array
    const randomIndex = Math.floor(Math.random() * waitMessages.length);
    alertMessage.innerText = waitMessages[randomIndex];
    
    // Smoothly show it
    alertBox.classList.remove("hidden");
    setTimeout(() => {
        alertBox.classList.add("show");
    }, 10);
}

function closeAlert() {
    const alertBox = document.getElementById("customAlert");
    alertBox.classList.remove("show");
    setTimeout(() => {
        alertBox.classList.add("hidden");
    }, 400); // Wait for the fade-out transition to finish
}

// Close popup if clicking outside the glass box
window.onclick = function(event) {
    const alertBox = document.getElementById("customAlert");
    if (event.target === alertBox) {
        closeAlert();
    }
}


// ===============================
// 🔒 ONLY CONTROL CLICK ACCESS (UPDATED)
// ===============================

function handleGift(giftId, unlockTime, pageId) {

    const gift = document.getElementById(giftId);
    if (!gift) return;

    const now = new Date().getTime();

    // ALWAYS SHOW BOX
    gift.style.display = "block";

    if (now < unlockTime) {

        // 🔒 LOCKED (visible but not usable)
        gift.classList.add("locked");

        gift.onclick = () => {
            showCustomAlert(); // Custom popup instead of alert()
        };

    } else {

        // 🔓 UNLOCKED
        gift.classList.remove("locked");

        gift.onclick = () => openPage(pageId);
    }
}


// ===============================
// 📄 OPEN LETTER (UPDATED)
// ===============================

function openPage(pageId) {

    const page = document.getElementById(pageId);
    const now = new Date().getTime();

    // 🔒 SAFETY CHECK (prevents manual opening)
    if (
        (pageId === "nameday" && now < nameDayDate) ||
        (pageId === "birthday" && now < birthdayDate) ||
        (pageId === "anniversary" && now < anniversaryDate)
    ) {
        showCustomAlert(); // Custom popup instead of alert()
        return;
    }

    document.querySelector(".hero").style.display = "none";
    document.querySelector(".gifts").style.display = "none";
    document.querySelector(".extras").style.display = "none";

    document.querySelectorAll(".page").forEach(p => {
        p.classList.add("hidden");
    });

    page.classList.remove("hidden");

    // ✉️ envelope animation
    setTimeout(() => {
        const envelope = page.querySelector(".envelope");
        if (envelope) envelope.classList.add("open");
    }, 300);

    window.scrollTo({ top: 0, behavior: "smooth" });
}