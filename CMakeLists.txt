cmake_minimum_required(VERSION 3.10)
project(Playground3D)

# C++17
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Include headers
include_directories(${CMAKE_SOURCE_DIR}/include)

# Collect all cpp files in src/
file(GLOB SOURCES "${CMAKE_SOURCE_DIR}/src/*.cpp")

# Create executable
add_executable(Playground3D ${SOURCES})

# Find OpenGL
find_package(OpenGL REQUIRED)

# Find GLFW
find_package(glfw3 3.3 REQUIRED)

# Link libraries (use keyword form consistently)
target_link_libraries(Playground3D
    PRIVATE OpenGL::GL
    PRIVATE glfw
)

