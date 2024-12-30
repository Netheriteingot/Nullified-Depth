from PIL import Image, ImageDraw

def create_particle_image(color, symbol, filename):
    # Create a new 64x64 image with a transparent background
    img = Image.new("RGBA", (64, 64), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Draw a circle
    draw.ellipse((16, 16, 48, 48), fill=color)

    # Draw the symbol in the center
    draw.text((28, 28), symbol, fill=(255, 255, 255))

    # Save the image
    img.save(filename)

# Create images for electron, proton, and neutron
create_particle_image((0, 0, 255), "*", "electron.ico")  # Blue for electron
create_particle_image((255, 0, 0), "+", "proton.ico")    # Red for proton
create_particle_image((0, 255, 0), "0", "neutron.ico")   # Green for neutron