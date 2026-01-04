cmake_minimum_required(VERSION 3.10)
project(Playground3D)

# Use C++17 standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Include headers from include/ folder
include_directories(${CMAKE_SOURCE_DIR}/include)

# Collect all cpp source files in src/
file(GLOB SOURCES "${CMAKE_SOURCE_DIR}/src/*.cpp")

# Create the executable
add_executable(Playground3D ${SOURCES})
