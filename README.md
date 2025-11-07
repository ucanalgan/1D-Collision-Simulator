# 1D Collision Simulator

An interactive web-based physics simulator for visualizing and analyzing one-dimensional elastic collisions between two objects. Built with vanilla JavaScript and modern UI design using Tailwind CSS.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🎯 Features

- **Real-time Physics Simulation**: Watch objects collide with accurate elastic collision physics
- **Interactive Controls**: Easily adjust mass and velocity for both objects
- **Live Velocity Tracking**: Monitor current velocities in real-time during simulation
- **Collision Counter**: Track the number of collisions between objects
- **Conservation Laws Verification**:
  - Momentum conservation (Initial vs Final)
  - Kinetic energy conservation (Initial vs Final)
- **Wall Collisions**: Objects bounce off boundaries with realistic physics
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode Support**: Automatic dark/light theme based on system preferences
- **Modern UI**: Clean, professional interface with smooth animations

## 🚀 Demo

Simply open `index.html` in any modern web browser to start the simulation!


### Light Mode
The simulator features a clean, professional interface with clear visualization of collision physics.



### Dark Mode
Automatically adapts to your system's dark mode preference for comfortable viewing.

## 🛠️ Technologies Used

- **HTML5 Canvas**: For rendering animated collision visualizations
- **Vanilla JavaScript**: Pure JS with no dependencies for physics calculations
- **Tailwind CSS**: Modern, responsive UI framework
- **Google Fonts**: Space Grotesk font family
- **Material Icons**: Clean, recognizable icons for UI elements

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/1d-collision-simulator.git
```

2. Navigate to the project directory:
```bash
cd 1d-collision-simulator
```

3. Open `index.html` in your web browser:
```bash
# On Windows
start index.html

# On macOS
open index.html

# On Linux
xdg-open index.html
```

**No build process required!** The simulator runs entirely in the browser.

## 📖 Usage

### Basic Steps

1. **Enter Object Properties**:
   - Set the mass (kg) for Object 1 and Object 2
   - Set the velocity (m/s) for both objects
     - Positive velocity = moving right
     - Negative velocity = moving left

2. **Start Simulation**:
   - Click the "Start Simulation" button
   - Watch the objects move and collide in real-time

3. **Observe Results**:
   - Monitor live velocities during animation
   - Track collision count
   - Verify conservation laws in the results panel

4. **Reset**: Click "Reset" to clear all inputs and start over

### Example Scenarios

**Head-on Collision:**
- Object 1: mass = 2 kg, velocity = 5 m/s
- Object 2: mass = 3 kg, velocity = -5 m/s

**Same Direction Chase:**
- Object 1: mass = 1 kg, velocity = 10 m/s
- Object 2: mass = 2 kg, velocity = 3 m/s

**Equal Mass Exchange:**
- Object 1: mass = 2 kg, velocity = 5 m/s
- Object 2: mass = 2 kg, velocity = -5 m/s
- *Result: Velocities are perfectly exchanged!*

## 🔬 Physics Behind the Simulation

### Elastic Collision Formulas

For two objects with masses `m₁` and `m₂`, and initial velocities `v₁` and `v₂`:

**Final velocity of Object 1:**
```
v₁f = ((m₁ - m₂) × v₁ + 2 × m₂ × v₂) / (m₁ + m₂)
```

**Final velocity of Object 2:**
```
v₂f = ((m₂ - m₁) × v₂ + 2 × m₁ × v₁) / (m₁ + m₂)
```

### Conservation Laws

**Momentum Conservation:**
```
p_initial = m₁ × v₁ + m₂ × v₂
p_final = m₁ × v₁f + m₂ × v₂f

p_initial = p_final ✓
```

**Kinetic Energy Conservation:**
```
KE_initial = ½ × m₁ × v₁² + ½ × m₂ × v₂²
KE_final = ½ × m₁ × v₁f² + ½ × m₂ × v₂f²

KE_initial = KE_final ✓
```

### Collision Detection

The simulator uses **relative velocity** to accurately detect collisions:
- Checks if objects are overlapping
- Verifies they are approaching each other (not separating)
- Prevents duplicate collision detection
- Handles multiple sequential collisions correctly

## 📁 Project Structure

```
1d-collision-simulator/
│
├── index.html          # Main HTML file with Tailwind CSS
├── script.js           # Physics engine and animation logic
├── style.css          # Old CSS file (now replaced by Tailwind)
└── README.md          # This file
```

### Key Files

**index.html**
- Responsive UI layout
- Input forms for object properties
- Canvas for visualization
- Results display panels

**script.js**
- `calculateCollision()`: Elastic collision physics
- `animate()`: Real-time canvas rendering
- `validate()`: Input validation
- Collision detection with relative velocity
- Wall boundary handling

## 🎨 UI Features

### Color Coding
- **Object 1**: Cyan (`#17A2B8`)
- **Object 2**: Orange (`#FD7E14`)
- **Primary Accent**: Blue (`#137fec`)

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Dark Mode
Automatically detects system preferences using `prefers-color-scheme`.

## 🧪 Technical Details

### Performance
- 60 FPS animation using `requestAnimationFrame`
- Efficient canvas rendering
- No external libraries (lightweight & fast)

### Browser Compatibility
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

### Input Validation
- Masses must be positive (> 0)
- All fields must contain valid numbers
- User-friendly error messages

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Ideas for Contributions
- [ ] Add coefficient of restitution slider (elastic to inelastic)
- [ ] Implement velocity-time graphs
- [ ] Add preset collision scenarios
- [ ] Export simulation data as CSV
- [ ] Add pause/resume functionality
- [ ] Multiple object collisions (3+ objects)
- [ ] Add sound effects on collision

## 📝 License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2024 1D Collision Simulator

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```



## 📧 Contact

Project Link: [https://github.com/ucanalgan/1d-collision-simulator](https://github.com/yourusername/1d-collision-simulator)


