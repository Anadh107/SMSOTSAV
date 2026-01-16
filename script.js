// HARD RESET ON PAGE LOAD
window.addEventListener("load", () => {
    document.body.classList.remove("event-open");

    document.getElementById("event-page")?.classList.remove("active");
    document.getElementById("rules-page")?.classList.remove("active");
});

let studentView = false;

/* ================= EVENT DATA ================= */

const eventData = {
    Sports: [
        { name: 'Cricket', price: '₹1000 per team', form: 'https://forms.gle/Bho11RKVRYS18ZpK9' },
        { name: 'Football', price: '₹1000 per team', form: 'https://forms.gle/gQrH8PqwjGG8Px36A' },
        { name: 'Volleyball', price: '₹500 per team', form: 'https://forms.gle/MoUDaGFCWiPzBdRL7' },
        { name: 'Basketball', price: '₹500 per team', form: 'https://forms.gle/edZDBEf4d2ZZSX5g7' },
        { name: 'Tug of War', price: '₹500 per team', form: 'https://forms.gle/ZpCfDvi4akRoeqxh7' },
        { name: 'Chess', price: '₹100 per team', form: 'https://forms.gle/Ck2qETRrkovZwtA38' },
        { name: 'Carrom', price: '₹100 per team', form: 'https://forms.gle/dguamtvnJeQ6zHfcA' },
        { name: '100M Race', price: '₹200 per team', form: 'https://forms.gle/kodFd3VZw5ktkaXt8' },
        { name: '200M Race', price: '₹200 per team', form: 'https://forms.gle/pWTnSHTozRkjWxBc7' },
        { name: 'Javelin', price: '₹300 per team', form: 'https://forms.gle/FkUBai6ifDxtTvDZ9' },
        { name: 'Shot Put', price: '₹300 per team', form: 'https://forms.gle/mMaDr4sJhRYtMhXU7' }
    ],

    Cultural: [
        { name: 'Solo Singing', price: '₹100', form: 'https://forms.gle/h5PvJqh4rzdmBT9g9' },
        { name: 'Duet / Group Singing', price: '₹150 per team', form: 'https://forms.gle/fY475yAZy2KpAxx56' },
        { name: 'Solo Dance', price: '₹100', form: 'https://forms.gle/5Y2hP2XhcyhoqzdDA' },
        { name: 'Group Dance', price: '₹350 per team', form: 'https://forms.gle/t8kLG9pfZZxi6GTh7' },
        { name: 'Face-Off', price: '₹150', form: 'https://forms.gle/mJfs4zK5udvTksek7' },
        { name: 'Mono Act', price: '₹100', form: 'https://forms.gle/WvesummcSvxJ3icd9' },
        { name: 'Skit Play', price: '₹300 per team', form: 'https://forms.gle/fVzERXYvqR6aXNKP8' },
        { name: 'Fashion Show (Depicting States of India)', price: '₹200 per pair', form: 'https://forms.gle/fyLKoFHP1RjJgejx5' },
        { name: 'Stand-up / Mimicry (Solo)', price: '₹100', form: 'https://forms.gle/24yY4YvskoKh6Pop8' },
        { name: 'Stand-up / Mimicry (Group)', price: '₹150', form: 'https://forms.gle/24yY4YvskoKh6Pop8' },
        { name: 'Debate', price: '₹150', form: 'https://forms.gle/opa5WXvhRpeejoUc6' },
        { name: 'Poster Making', price: '₹100', form: 'https://forms.gle/21rAxxf5VFfJDiNe9' },
        { name: 'Reel Making (Solo)', price: '₹100', form: 'https://forms.gle/MQkfpLTFKLUnSaYn6' },
        { name: 'Reel Making (Group)', price: '₹200 per team', form: 'https://forms.gle/MQkfpLTFKLUnSaYn6' },
        { name: 'Face Painting', price: '₹150', form: 'https://forms.gle/EiBknJ1LCJ9UHEqb7' }
    ],

Technical: [
    { name: 'Hackwave (Hackathon)', price: '₹500 per team', form: 'https://forms.gle/tYNhBPkLZaRNqKtu5' },
    { name: 'RoboRumble (Robothon)', price: '₹200 per member in a team', form: 'https://forms.gle/MfvX1yezbNW4YdHR6' },
    { name: 'ByteBrawl (Coding War)', price: '₹200', form: 'https://forms.gle/UWgBhvKf4qTVyiyy7' },
    { name: 'AppSpark League (App Mania)', price: '₹200 per member (individual or team)', form: 'https://forms.gle/6qRZNgEdAxh8EHtJ7' },
    { name: 'AdFiesta (Ad Mad Show)', price: '₹500 per team', form: 'https://forms.gle/FB1foDP8cKPEwPaj7' },
    { name: 'BizQuest (Business Quiz)', price: '₹300 per team', form: 'https://forms.gle/2rSMjQsoyw7xQwwo6' },
    { name: 'VisionX Startup (Business Plan Competition)', price: '₹500 per team', form: 'https://forms.gle/fJxGzyd2L3pMPRKi8' },
    { name: 'MindMazer (Market Mania)', price: '₹500 per team', form: 'https://forms.gle/e9xdnoBa4nWNqo2x6' }
]

};

/* ================= EVENT PAGE ================= */

function openEventPage(category) {
    const page = document.getElementById('event-page');
    const title = document.getElementById('page-category-title');
    const container = document.getElementById('event-list-body');
    const starContent = document.getElementById('star-night-content');

    if (!page || !title || !container) return;

    title.innerText = category.toUpperCase();
    container.innerHTML = '';
    if (starContent) starContent.style.display = "none";

    eventData[category].forEach(event => {
        const row = document.createElement('div');
        row.className = 'event-row';

        row.innerHTML = `
            <div class="event-info">
                <span class="event-name">${event.name}</span>
                ${studentView ? "" : `<span class="event-price">${event.price}</span>`}
            </div>
            <div class="action-btns">
                <button class="rules-btn">RULES</button>
                <a href="${event.form}" target="_blank" class="reg-btn">REGISTER NOW</a>
            </div>
        `;

        row.querySelector('.rules-btn')
            .addEventListener('click', () => openRules(event.name));

        container.appendChild(row);
    });

    page.classList.add('active');

    history.pushState({ page: "event" }, "", "#event");

    history.replaceState(null, "", " "); // 👈 REMOVE #event SCROLL LOCK
    document.getElementById("event-page").classList.add("active");
    document.body.classList.add("event-open");
}

function reopenWithStudentView(category) {

    const page = document.getElementById("event-page");

    /* pehle page ko slide-out karao */
    page.classList.remove("active");
    document.body.classList.remove("event-open");

    /* thoda delay → phir slide-in */
    setTimeout(() => {
        studentView = true;
        openEventPage(category);
    }, 350); // animation timing match
}

function closeEventPage() {
    const page = document.getElementById('event-page');
    const starContent = document.getElementById('star-night-content');

    if (page) page.classList.remove('active');
    if (starContent) starContent.style.display = "none";

    history.pushState({}, "", window.location.pathname);

    document.getElementById("event-page").classList.remove("active");
    document.body.classList.remove("event-open");

    studentView = false;

}

/* ===== STUDENT NOTICE CLICK HANDLER ===== */
document.getElementById("studentNoticeLink")?.addEventListener("click", (e) => {
    e.preventDefault();

    const title = document
        .getElementById("page-category-title")
        ?.innerText.toLowerCase();

    if (!title) return;

    if (title.includes("sports")) {
        reopenWithStudentView("Sports");
    } 
    else if (title.includes("cultural")) {
        reopenWithStudentView("Cultural");
    } 
    else if (title.includes("technical")) {
        reopenWithStudentView("Technical");
    }
});

/* ================= RULES PAGE ================= */

function openRules(eventName) {
    const rulesTitle = document.getElementById('rules-event-name');
    const rulesPage = document.getElementById('rules-page');
    const rulesList = document.getElementById('rules-list');

    if (!rulesTitle || !rulesPage || !rulesList) return;

    rulesTitle.innerText = `${eventName} RULES`;
    rulesList.innerHTML = "";

    const rules = rulesData[eventName] || [];

    rules.forEach(item => {

        // HEADING (no bullet)
        if (
            item.endsWith(":") ||
            item.includes("SMSOTSAV") ||
            item.startsWith("Theme:")
        ) {
            const li = document.createElement("li");
            li.className = "rule-heading";
            li.innerText = item;
            rulesList.appendChild(li);
        }

        // BULLET POINT
        else if (item.startsWith("•")) {
            const li = document.createElement("li");
            li.className = "rule-point";
            li.innerText = item.replace("•", "").trim();
            rulesList.appendChild(li);
        }

        // NORMAL TEXT
        else {
            const li = document.createElement("li");
            li.className = "rule-text";
            li.innerText = item;
            rulesList.appendChild(li);
        }
    });

    rulesPage.classList.add('active');
}

function closeRulesPage() {
    const rulesPage = document.getElementById('rules-page');
    if (rulesPage) rulesPage.classList.remove('active');
}


/* ================= STAR NIGHT ================= */

function openStarNight() {
    const page = document.getElementById('event-page');
    const title = document.getElementById('page-category-title');
    const eventList = document.getElementById('event-list-body');
    const starContent = document.getElementById('star-night-content');

    if (!page || !title || !starContent) return;

    title.innerText = "STAR NIGHT";
    if (eventList) eventList.innerHTML = "";
    starContent.style.display = "block";

    page.classList.add('active');
    
}


/* ================= MOBILE NAVBAR (HAMBURGER) ================= */

document.addEventListener("DOMContentLoaded", function () {

    const hamburger = document.getElementById("hamburger");
    const menu = document.getElementById("mobileMenu");

    if (!hamburger || !menu) {
        console.error("Hamburger menu elements not found");
        return;
    }

    hamburger.addEventListener("click", function () {
        menu.classList.toggle("active");
    });

    // close menu on link click (mobile)
    menu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("active");
        });
    });

});

function toggleMenu() {
    const menu = document.getElementById("mobileMenu");
    menu.classList.toggle("active");
}

function closeMenu() {
    const menu = document.getElementById("mobileMenu");
    menu.classList.remove("active");
}

    /* ===== BROWSER / MOBILE BACK BUTTON FIX ===== */
window.addEventListener("popstate", () => {

    const rulesPage = document.getElementById("rules-page");
    const eventPage = document.getElementById("event-page");

    /* 1️⃣ Agar rules page open hai → pehle rules close */
    if (rulesPage && rulesPage.classList.contains("active")) {
        closeRulesPage();
        return;
    }

    /* 2️⃣ Agar event page open hai → event close */
    if (eventPage && eventPage.classList.contains("active")) {
        closeEventPage();
        return;
    }

});
