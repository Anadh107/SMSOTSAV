/* ================= EVENT DATA ================= */

const eventData = {
    Sports: [
        { name: '100m Race', price: '₹100', form: 'https://forms.gle/link1' },
        { name: '200m Race', price: '₹100', form: 'https://forms.gle/link2' },
        { name: 'Shot Put', price: '₹150', form: 'https://forms.gle/link3' },
        { name: 'Long Jump', price: '₹150', form: 'https://forms.gle/link4' }
    ],
    Cultural: [
        { name: 'Solo Dance', price: '₹200', form: 'https://forms.gle/link5' },
        { name: 'Group Dance', price: '₹500', form: 'https://forms.gle/link6' }
    ],
    Technical: [
        { name: 'Hackathon', price: '₹300', form: 'https://forms.gle/link7' },
        { name: 'Coding Contest', price: '₹200', form: 'https://forms.gle/link8' }
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
                <span class="event-price">${event.price}</span>
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

    document.getElementById("event-page").classList.add("active");
    document.body.classList.add("event-open"); // 👈 ADD THIS
}

function closeEventPage() {
    const page = document.getElementById('event-page');
    const starContent = document.getElementById('star-night-content');

    if (page) page.classList.remove('active');
    if (starContent) starContent.style.display = "none";

    history.pushState({}, "", window.location.pathname);

    document.getElementById("event-page").classList.remove("active");
    document.body.classList.remove("event-open"); // 👈 ADD THIS
}



/* ================= RULES PAGE ================= */

function openRules(eventName) {
    const rulesTitle = document.getElementById('rules-event-name');
    const rulesPage = document.getElementById('rules-page');

    if (!rulesTitle || !rulesPage) return;

    rulesTitle.innerText = `${eventName} RULES`;
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

// Handle browser back button (mobile / desktop)
window.addEventListener("popstate", function () {
    const eventPage = document.getElementById("event-page");

    if (eventPage && eventPage.classList.contains("active")) {
        closeEventPage();
    }
});
