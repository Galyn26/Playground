#include "Renderer.h"
#include <iostream>

void Renderer::addObject(Object3D* obj) {   // pointer matches header
    sceneObjects.push_back(obj);             // now works
}

void Renderer::renderFrame() const {
    std::cout << "--- Rendering Frame ---" << std::endl;

    for (const auto* obj : sceneObjects) {  // iterate pointers
        obj->render();                       // use -> for pointer access
    }
}
