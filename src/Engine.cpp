#include "Engine.h"
#include <thread>
#include <chrono>
#include <iostream>

Engine::Engine() : running(true) {
    Object3D cube("Cube");
    Object3D sphere("Sphere");

    searchEngine.addObject(&cube);
    searchEngine.addObject(&sphere);

    renderer.addObject(&cube);
    renderer.addObject(&sphere);
}

void Engine::run() {
    int frameCount = 0;

    while (running) {
        update();
        render();

        std::this_thread::sleep_for(std::chrono::milliseconds(500));
        frameCount++;

        if (frameCount >= 5) running = false;
    }
}

void Engine::update() {
    // Simple animation: move each object along x-axis
    for (auto* obj : searchEngine.getObjects()) {
        obj->getTransform().x += 1.0f;
    }
}

void Engine::render() {
    renderer.renderFrame();
}
