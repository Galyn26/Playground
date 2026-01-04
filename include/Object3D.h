#pragma once
#include <string>
#include "Transform.h"

class Object3D {
public:
    Object3D(const std::string& name);

    void render() const;
    Transform& getTransform();
    const std::string& getName() const;

private:
    std::string name;
    Transform transform;
};
