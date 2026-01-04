#pragma once
#include "Renderer.h"
#include "SearchEngine3D.h"

class Engine {
public:
    Engine();
    void run();

private:
    bool running;
    Renderer renderer;
    SearchEngine3D searchEngine;

    void update();
    void render();
};
