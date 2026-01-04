#pragma once
#include <vector>
#include "Object3D.h"

class Renderer {
public:
    void addObject(const Object3D& obj);
    void renderFrame() const;

private:
    std::vector<Object3D> sceneObjects;
};
