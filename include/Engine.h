#pragma once
#include "Renderer.h"
#include "SearchEngine3D.h"
#include <GLFW/glfw3.h>


class Engine {
public:
    Engine();
    ~Engine();

    void run();

private:
   GLFWwindow* window;

    void processInput();
    void update();
    void render();

    SearchEngine3D searchEngine;
    Renderer renderer;
};
