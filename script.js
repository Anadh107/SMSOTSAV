const eventData = {
    'Sports': [
        { name: '100m Race', price: '₹100', form: 'https://forms.gle/link1' },
        { name: '200m Race', price: '₹100', form: 'https://forms.gle/link2' },
        { name: 'Shot Put', price: '₹150', form: 'https://forms.gle/link3' },
        { name: 'Long Jump', price: '₹150', form: 'https://forms.gle/link4' }
    ],
    'Cultural': [
        { name: 'Solo Dance', price: '₹200', form: 'https://forms.gle/link5' },
        { name: 'Group Dance', price: '₹500', form: 'https://forms.gle/link6' }
    ],
    'Technical': [
        { name: 'Hackathon', price: '₹300', form: 'https://forms.gle/link7' },
        { name: 'Coding Contest', price: '₹200', form: 'https://forms.gle/link8' }
    ]
};


function openEventPage(category) {
    const page = document.getElementById('event-page');
    const title = document.getElementById('page-category-title');
    const container = document.getElementById('event-list-body');
    
    title.innerText = category.toUpperCase();
    container.innerHTML = ''; // Clear old list

    eventData[category].forEach(event => {
        const row = `
            <div class="event-row">
                <div class="event-info">
                <span class="event-name">${event.name}</span>
                <span class="event-price">${event.price}</span>
                </div>
                <div class="action-btns">
                    <button class="rules-btn" onclick="openRules('${event.name}')">RULES</button>
                    <a href="${event.form}" target="_blank" class="reg-btn">REGISTER NOW</a>
                </div>
            </div>
        `;
        container.innerHTML += row;
    });

    page.classList.add('active');
}

function closeEventPage() {
    document.getElementById('event-page').classList.remove('active');
    document.getElementById('star-night-content').style.display = "none";
}


function openRules(eventName) {
    document.getElementById('rules-event-name').innerText = eventName + " RULES";
    document.getElementById('rules-page').classList.add('active');
}

function closeRulesPage() {
    document.getElementById('rules-page').classList.remove('active');
}

function openStarNight() {
    const page = document.getElementById('event-page');
    const title = document.getElementById('page-category-title');
    const eventList = document.getElementById('event-list-body');
    const starContent = document.getElementById('star-night-content');

    title.innerText = "STAR NIGHT";
    eventList.innerHTML = "";
    starContent.style.display = "block";

    page.classList.add('active');
}
