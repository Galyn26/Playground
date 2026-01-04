#include <iostream>
#include "Object3D.h"
#include "SearchEngine3D.h"
#include "Renderer.h"

int main() {
    std::cout << "Hello Interactive 3D Search Engine" << std::endl;

    SearchEngine3D engine;
    Renderer renderer;

    Object3D cube("Cube");
    Object3D sphere("Sphere");

    engine.addObject(cube);
    engine.addObject(sphere);

    renderer.addObject(cube);
    renderer.addObject(sphere);

    engine.search("Cube");

    renderer.renderFrame();
    
    return 0;
}
