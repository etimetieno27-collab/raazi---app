// List of time zones to display
const timezones = [
    { name: 'New York', timezone: 'America/New_York' },
    { name: 'London', timezone: 'Europe/London' },
    { name: 'Paris', timezone: 'Europe/Paris' },
    { name: 'Tokyo', timezone: 'Asia/Tokyo' },
    { name: 'Sydney', timezone: 'Australia/Sydney' },
    { name: 'Dubai', timezone: 'Asia/Dubai' },
    { name: 'Singapore', timezone: 'Asia/Singapore' },
    { name: 'Hong Kong', timezone: 'Asia/Hong_Kong' },
    { name: 'Mumbai', timezone: 'Asia/Kolkata' },
    { name: 'Bangkok', timezone: 'Asia/Bangkok' },
    { name: 'Los Angeles', timezone: 'America/Los_Angeles' },
    { name: 'Toronto', timezone: 'America/Toronto' }
];

// Function to format time with leading zeros
function formatTime(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

// Function to get the day of the week
function getDayOfWeek(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
}

// Function to format date
function formatDate(date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}

// Function to get UTC offset
function getUTCOffset(timezone) {
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        timeZoneName: 'short'
    });
    const parts = formatter.formatToParts(new Date());
    const tzName = parts.find(part => part.type === 'timeZoneName');
    return tzName ? tzName.value : '';
}

// Function to create clock card HTML
function createClockCard(tzData) {
    return `
        <div class="clock-card">
            <div class="timezone-name">${tzData.name}</div>
            <div class="digital-time" id="time-${tzData.timezone}">--:--:--</div>
            <div class="day-of-week" id="day-${tzData.timezone}">-</div>
            <div class="date-display" id="date-${tzData.timezone}">-</div>
            <div class="offset" id="offset-${tzData.timezone}">-</div>
        </div>
    `;
}

// Function to update all clocks
function updateClocks() {
    timezones.forEach(tzData => {
        // Get current time in the specific timezone
        const now = new Date();
        const timeString = now.toLocaleString('en-US', {
            timeZone: tzData.timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        const dateString = now.toLocaleString('en-US', {
            timeZone: tzData.timezone,
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        const dayString = now.toLocaleString('en-US', {
            timeZone: tzData.timezone,
            weekday: 'long'
        });

        // Get UTC offset
        const tzDate = new Date(now.toLocaleString('en-US', { timeZone: tzData.timezone }));
        const offset = getUTCOffset(tzData.timezone);

        // Update DOM
        document.getElementById(`time-${tzData.timezone}`).textContent = timeString;
        document.getElementById(`date-${tzData.timezone}`).textContent = dateString;
        document.getElementById(`day-${tzData.timezone}`).textContent = dayString;
        document.getElementById(`offset-${tzData.timezone}`).textContent = offset;
    });
}

// Initialize clocks on page load
document.addEventListener('DOMContentLoaded', function() {
    const grid = document.querySelector('.clocks-grid');
    
    // Create clock cards
    timezones.forEach(tzData => {
        grid.innerHTML += createClockCard(tzData);
    });

    // Update clocks immediately
    updateClocks();

    // Update clocks every second
    setInterval(updateClocks, 1000);
});