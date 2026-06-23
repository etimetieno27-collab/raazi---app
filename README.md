# raazi---app

A beautiful and responsive digital clock application that displays the current time in multiple time zones around the world.

## 🌍 Features

- **Real-time Clock Updates**: Displays current time with seconds updating every second
- **Multiple Time Zones**: Shows time for 12 major cities across different continents
- **Beautiful UI**: Modern gradient design with smooth animations and hover effects
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Date & Day Display**: Shows the date and day of the week for each timezone
- **UTC Offset Information**: Displays timezone offset for quick reference

## 🌐 Supported Time Zones

1. **New York** (America/New_York)
2. **Los Angeles** (America/Los_Angeles)
3. **Toronto** (America/Toronto)
4. **London** (Europe/London)
5. **Paris** (Europe/Paris)
6. **Dubai** (Asia/Dubai)
7. **Mumbai** (Asia/Kolkata)
8. **Bangkok** (Asia/Bangkok)
9. **Hong Kong** (Asia/Hong_Kong)
10. **Singapore** (Asia/Singapore)
11. **Tokyo** (Asia/Tokyo)
12. **Sydney** (Australia/Sydney)

## 📁 Project Structure

```
raazi---app/
├── index.html      # Main HTML structure
├── style.css       # Styling and responsive design
├── script.js       # Clock logic and time zone functionality
└── README.md       # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies or installations required

### Installation & Usage

1. Clone or download this repository
2. Open `index.html` in your web browser
3. The clock will automatically start displaying current times for all time zones

```bash
# Simply open the file
open index.html
# or
firefox index.html
```

## 💻 Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with gradients, animations, and flexbox/grid
- **JavaScript (Vanilla)**: Pure JavaScript for time zone handling and DOM updates

## 🎨 Design Highlights

- **Gradient Background**: Purple gradient for an attractive visual appeal
- **Glass Morphism**: Subtle transparency effects on clock cards
- **Smooth Animations**: Hover effects and pulsing animations
- **Mobile Responsive**: Automatically adjusts layout for different screen sizes
- **Professional Typography**: Monospace font for accurate time display

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above (3-4 columns)
- **Tablet**: 768px to 1199px (2-3 columns)
- **Mobile**: Below 768px (1 column)

## ⚙️ How It Works

1. **Time Zone Conversion**: Uses JavaScript's `Intl.DateTimeFormat` API to convert time
2. **Live Updates**: Updates every second using `setInterval()`
3. **UTC Offset**: Dynamically retrieves timezone offset information
4. **Responsive Grid**: CSS Grid automatically adjusts based on screen size

## 🔧 Customization

### Add More Time Zones

Edit the `timezones` array in `script.js`:

```javascript
const timezones = [
    { name: 'Your City', timezone: 'Your/Timezone' },
    // Add more...
];
```

### Change Colors

Modify the gradient in `style.css`:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add more time zones
- Improve the design
- Optimize the code
- Report bugs

## 📧 Support

If you have any questions or suggestions, feel free to open an issue or contact the repository owner.

---

**Made with ❤️ by etimetieno27-collab**