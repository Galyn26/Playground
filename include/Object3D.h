#pragma once
#include <string>
#include <iostream>

class Object3D {
public:
    Object3D(const std::string& name);
    const std::string& getName() const;
    void render() const; // placeholder

private:
    std::string name;
};
