#pragma once
#include <vector>
#include "Object3D.h"

class Renderer {
public:
    void addObject(Object3D* obj);        // pointer
    void renderFrame() const;

private:
    std::vector<Object3D*> sceneObjects;  // store pointers
};
