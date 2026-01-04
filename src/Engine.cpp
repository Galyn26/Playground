#include "Engine.h"
#include <iostream>
#include <GLFW/glfw3.h>
#include <OpenGL/gl3.h>
#define GL_SILENCE_DEPRECATION



Engine::Engine() {
    if (!glfwInit()){
        std::cerr << "Failed to initialize GLFW\n";
        return;
    }

    window = glfwCreateWindow(800, 600, "3D Search Engine", nullptr, nullptr);
    if (!window) {
        std::cerr << "Failed to create GLFW window\n";
        glfwTerminate();
        return;
}

    glfwMakeContextCurrent(window);
    glEnable(GL_DEPTH_TEST);
}

Engine::~Engine() {
    glfwDestroyWindow(window);
    glfwTerminate();
}

void Engine::run() {
   
    while (!glfwWindowShouldClose(window)) {
        processInput();
        update();
        render();

        glfwSwapBuffers(window);
        glfwPollEvents();
    }
}

void Engine::processInput() {
    if (glfwGetKey(window, GLFW_KEY_ESCAPE) == GLFW_PRESS) {
        glfwSetWindowShouldClose(window, true);
    }
}

void Engine::update() {
    
    static float lasttime = glfwGetTime();
    float currenttime = glfwGetTime();
    float deltaTime = currenttime - lasttime;
    lasttime = currenttime;
    
    for (auto* obj : searchEngine.getObjects()) {
        obj->getTransform().x += 1.0f;
    }
}

void Engine::render() {
    renderer.renderFrame();
}
