import numpy as np
import matplotlib.pyplot as plt
import random

# Function to generate a fractal-like network of points
def generate_structure(width, length, density=0.02, iterations=3000):
    # Create random points within the width and length
    points = []
    for _ in range(iterations):
        x = random.uniform(0, length)
        y = random.uniform(0, width)
        points.append((x, y))
    
    return points

# Function to draw the fractal-like structure
def draw_structure(points, width, length, aspect_ratio=1.6):
    fig, ax = plt.subplots(figsize=(length/100, width/100))
    
    # Set axis limits
    ax.set_xlim(0, length)
    ax.set_ylim(0, width)
    
    ax.set_aspect(aspect_ratio)
    
    # Draw the points and connect them with lines
    for i, (x1, y1) in enumerate(points):
        # Randomly pick another point to connect to
        x2, y2 = random.choice(points)
        ax.plot([x1, x2], [y1, y2], color="cyan", linewidth=0.5)
    
    # Randomly connect points, adding complexity
    for i, (x1, y1) in enumerate(points):
        for j, (x2, y2) in enumerate(points):
            if i != j:
                distance = np.sqrt((x2 - x1)**2 + (y2 - y1)**2)
                if distance < length * 0.1:  # Draw a line if points are close
                    ax.plot([x1, x2], [y1, y2], color="blue", linewidth=0.2)

    ax.set_facecolor("black")
    plt.axis('off')  # Turn off axis labels and ticks
    plt.show()

# Parameters for the size and aspect ratio
width = 250
length = 400

# Generate the structure with random points
points = generate_structure(width, length)

# Draw the structure
draw_structure(points, width, length)
