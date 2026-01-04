#include <iostream>
#include "Object3D.h"
#include "SearchEngine3D.h"

int main() {
    std::cout << "Hello Interactive 3D Search Engine" << std::endl;

    SearchEngine3D engine;

    engine.addObject(Object3D("Cube"));
    engine.addObject(Object3D("Sphere"));

    engine.search("Cube");

    return 0;
}
