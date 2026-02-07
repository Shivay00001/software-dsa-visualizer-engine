# Software DSA Visualizer Engine

[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.16-purple.svg)](https://www.framer.com/motion/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A **production-grade Data Structures and Algorithms (DSA) visualizer** built with React and Framer Motion. This engine provides highly performant, smooth, and interactive visualizations of complex algorithms, designed for educational and debugging purposes.

## 🚀 Features

- **Interactive Sorting**: Visualize Bubble Sort, Selection Sort, Insertion Sort, and Quick Sort with real-time speed control.
- **Graph Traversals**: Coming soon (BFS, DFS, Dijkstra).
- **Customizable Inputs**: Generate random arrays or provide your own datasets.
- **Step-by-Step Execution**: Pause, resume, and step through algorithm execution.
- **High Performance**: Optimized rendering using React state and Framer Motion layout animations.
- **Responsive UI**: Sleek, modern design that works on all screen sizes.

## 📁 Project Structure

```
software-dsa-visualizer-engine/
├── src/
│   ├── algorithms/   # Algorithm implementations (with state tracking)
│   ├── components/   # Visualizer components (Bars, Nodes, Controls)
│   ├── hooks/        # Custom visualization hooks
│   ├── styles/       # Tailwind and custom CSS
│   └── App.tsx       # Root landing and layout
├── public/           # Static assets
├── tests/            # Test suite for algorithm logic
├── Dockerfile
├── docker-compose.yml
└── package.json
```

## 🛠️ Quick Start

```bash
# Clone
git clone https://github.com/Shivay00001/software-dsa-visualizer-engine.git

# Install
npm install

# Run Dev
npm run dev
```

## 📄 License

MIT License
