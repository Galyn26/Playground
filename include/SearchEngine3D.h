#pragma once
#include <vector>
#include <string>
#include "Object3D.h"

class SearchEngine3D {
public:
    void addObject(const Object3D& obj);
    void search(const std::string& query) const;

private:
    std::vector<Object3D> objects;
};
