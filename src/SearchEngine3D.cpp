#pragma once
#include <vector>
#include <string>
#include "Object3D.h"

class SearchEngine3D {
public:
    void addObject(Object3D* obj);   // pointer version
    void search(const std::string& query) const;
    std::vector<Object3D*>& getObjects();

private:
    std::vector<Object3D*> objects;  // store pointers
};
