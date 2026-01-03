# Playground: Interactive 3D Search Engine

## Project Vision
This project is an **interactive 3D search engine**, where users can visualize, explore, and search items in a 3D space. The goal is to combine **performance, creativity, and user feedback** into a single product-focused C++ engine.

Think of it as a 3D “shopping mall” for data, where items float, cluster, and respond interactively to user queries.

---

## Tech Stack
- **C++17/20**: Core engine and logic
- **OpenGL / SDL / Qt**: 3D rendering and interactive viewport
- **Eigen / GLM**: Math for transformations, vectors, and matrices
- **Assimp**: Optional 3D model loader
- **SQLite / JSON**: Lightweight data storage
- **Git + GitHub**: Version control and portfolio

---

## Project Roadmap

### Phase 0: Setup & Validation
- Configure compiler, libraries, and IDE (VS Code)
- Render “Hello 3D Search Engine” message

### Phase 1: Minimal 3D Viewport
- Render single 3D object (cube or sphere)
- Implement basic camera movement and rotation

### Phase 2: Load Dataset
- Load items from JSON or CSV
- Represent each item as a 3D object in the scene

### Phase 3: Search Logic
- Input search query → highlight or filter matching objects
- Implement brute-force search first, optimize later (KD-tree/Octree)

### Phase 4: Interactivity & UX
- Hover, click, or drag objects
- Smooth animations, clustering, transitions
- Optional Qt UI for search input

### Phase 5: Optional Web Frontend
- Expose engine via REST / WebSocket API
- Render 3D scene in Three.js or WebGL

---

## How to Run
1. Clone repository:
```bash
git clone https://github.com/yourusername/playground.git
