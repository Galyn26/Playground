#include "Object3D.h"
#include <iostream>

Object3D::Object3D(const std::string& name) : name(name) {}

void Object3D::render() const {
    std::cout << "Rendering object: " << name
              << " at (" << transform.x << ", " << transform.y << ", " << transform.z << ")\n";
}

Transform& Object3D::getTransform() { return transform; }

const std::string& Object3D::getName() const { return name; }
