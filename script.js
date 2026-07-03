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