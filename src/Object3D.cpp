#include "Object3D.h"

// Implementation
Object3D::Object3D(const std::string& name) : name(name) {}

const std::string& Object3D::getName() const {
    return name;
}

void Object3D::render() const {
    std::cout << "Rendering object: " << name << std::endl;
}
