#include "SearchEngine3D.h"
#include <iostream>

void SearchEngine3D::addObject(const Object3D& obj) {
    objects.push_back(obj);
}

void SearchEngine3D::search(const std::string& query) const {
    std::cout << "Searching for: " << query << std::endl;

    std::cout << "Objects currently in engine: ";
    for (const auto& obj : objects) {
        std::cout << obj.getName() << " ";
    }
    std::cout << std::endl;

    for (const auto& obj : objects) {
        if (obj.getName() == query) {
            std::cout << "Found object matching query: " << query << std::endl;
        }
    }
}
