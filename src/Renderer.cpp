#include "Renderer.h"
#include <iostream>

void Renderer::addObject(const Object3D& obj) {
    sceneObjects.push_back(obj);
}

void Renderer::renderFrame() const {
    std::cout << "--- Rendering Frame ---" << std::endl;

    for (const auto& obj : sceneObjects) {
        obj.render(); // placeholder for OpenGL later
    }
}
