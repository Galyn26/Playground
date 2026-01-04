#include "Renderer.h"
#include <iostream>
#include <OpenGL/gl3.h>
#include <GLFW/glfw3.h>
#define GL_SILENCE_DEPRECATION


void Renderer::addObject(Object3D* obj) {   // pointer matches header
    sceneObjects.push_back(obj);             // now works
}

void Renderer::renderFrame() const {

    glClearColor(0.1f, 0.1f, 0.15f, 1.0f);
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

    std::cout << "--- Rendering Frame ---" << std::endl;

    for (const auto* obj : sceneObjects) {  // iterate pointers
        obj->render();                       // use -> for pointer access
    }
}
