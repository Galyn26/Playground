#include <iostream>
#include "Object3D.h"
#include "SearchEngine3D.h"
#include "Renderer.h"

int main() {
    std::cout << "Hello Interactive 3D Search Engine\n";

    SearchEngine3D searchEngine;
    Renderer renderer;

    Object3D cube("Cube");
    Object3D sphere("Sphere");

    // Pass pointers, not objects
    searchEngine.addObject(&cube);
    searchEngine.addObject(&sphere);

    renderer.addObject(&cube);
    renderer.addObject(&sphere);

    // Simulate update loop
    for (int frame = 0; frame < 5; frame++) {
        for (auto* obj : searchEngine.getObjects()) {
            obj->getTransform().x += 1.0f;  // use -> for pointer access
        }

        renderer.renderFrame();
    }

    return 0;
}
