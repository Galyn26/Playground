cmake_minimum_required(VERSION 3.10)
project(Playground3D)

set(CMAKE_CXX_STANDARD 17)
include_directories(include)

file(GLOB SOURCES "src/*.cpp")

add_executable(Playground3D ${SOURCES})
target_link_libraries(Playground3D PRIVATE glfw glm assimp) 
target_include_directories(Playground3D PRIVATE ${CMAKE_SOURCE_DIR}/include)
target_compile_features(Playground3D PRIVATE cxx_std_17)
target_compile_options(Playground3D PRIVATE -Wall -Wextra -Wpedantic)   
