// In SearchEngine3D.h
#include <vector>
#include "Object3D.h"

class SearchEngine3D {
public:
    void addObject(Object3D* obj) { objects.push_back(obj); }
    std::vector<Object3D*>& getObjects() { return objects; }

private:
    std::vector<Object3D*> objects;
};
