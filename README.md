# Simple Calculator

A modern, responsive web-based calculator built with vanilla JavaScript, HTML, and CSS. This calculator provides a clean, intuitive interface for basic mathematical operations with a beautiful dark theme design.

## 🚀 Features

- **Basic Operations**: Addition (+), Subtraction (−), Multiplication (×), Division (÷)
- **Decimal Support**: Full decimal number input and calculation
- **Formula Display**: Shows the current calculation formula above the result
- **Keyboard Support**: Full keyboard input support for quick calculations
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Beautiful dark theme with glass-morphism effects
- **Error Handling**: Graceful error handling for invalid operations
- **Memory Functions**: Continues calculations from previous results

## 🎯 Usage

### Mouse/Touch Input
- Click the number buttons (0-9) to input digits
- Use the decimal point (.) for decimal numbers
- Click operators (+, −, ×, ÷) to perform calculations
- Press equals (=) to see the result
- Click AC to clear and start over

### Keyboard Input
- **Numbers**: Type 0-9 for digits
- **Decimal**: Press `.` for decimal point
- **Operators**: Use `+`, `-`, `*`, `/` for operations
- **Calculate**: Press `Enter` or `=` for result
- **Clear**: Press `Backspace` to edit or clear

## 🛠️ Technical Details

### Architecture
- **Frontend Only**: Pure HTML, CSS, and JavaScript
- **No Dependencies**: No external libraries or frameworks required
- **Modular Design**: Clean, well-organized code structure

### Security Features
- **Input Sanitization**: Whitelist-based character validation
- **Safe Evaluation**: Uses Function constructor instead of eval()
- **Error Prevention**: Handles edge cases and invalid inputs gracefully

### Browser Compatibility
- Modern browsers with ES6+ support
- Responsive design for mobile and desktop
- Cross-platform compatibility

## 📁 Project Structure

```
simple-calculator/
├── index.html          # Main HTML structure
├── style.css           # Styling and responsive design
├── script.js           # Calculator logic and functionality
├── LICENSE             # Project license
└── README.md           # This file
```

## 🎨 Design Features

- **Dark Theme**: Modern dark color scheme with cyan accents
- **Glass Morphism**: Subtle transparency effects
- **Responsive Grid**: CSS Grid layout for button arrangement
- **Smooth Animations**: Button press animations and transitions
- **Typography**: Clean, readable font with proper spacing

## 🚀 Getting Started

1. **Clone or Download** the project files
2. **Open** `index.html` in your web browser
3. **Start Calculating** immediately!

No build process, package installation, or server setup required.

## 🔧 Customization

The calculator is easily customizable through CSS variables:

```css
:root {
  --bg: #071122;        /* Background color */
  --panel: #0b1220;     /* Calculator panel color */
  --accent: #06b6d4;    /* Accent color for operators */
  --muted: #94a3b8;     /* Muted text color */
  --glass: rgba(255, 255, 255, 0.03); /* Glass effect */
}
```

## 📱 Mobile Support

The calculator is fully responsive and optimized for mobile devices:
- Touch-friendly button sizes
- Responsive grid layout
- Optimized for portrait and landscape orientations
- Smooth touch interactions

## 🤝 Contributing

Feel free to contribute to this project by:
- Reporting bugs
- Suggesting new features
- Improving the design
- Enhancing functionality

## 📄 License

This project is open source and available under the [LICENSE](LICENSE) file.

---

**Built with ❤️ using vanilla JavaScript, HTML, and CSS**

