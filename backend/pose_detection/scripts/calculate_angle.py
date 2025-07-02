# In your scripts/calculate_joint_angle.py or a similar utility file

import math
import numpy as np # It's easier and safer with numpy

def calculate_angle(a, b, c):
    """
    Calculates the angle at point b (the vertex).
    The vectors are created as ba and bc.
    
    Args:
        a (tuple): Coordinates of the first point.
        b (tuple): Coordinates of the vertex (e.g., the shoulder).
        c (tuple): Coordinates of the third point.
        
    Returns:
        float: The angle in degrees at vertex b.
    """
    # Convert points to numpy arrays
    a = np.array(a)
    b = np.array(b)
    c = np.array(c)
    
    # Create vectors pointing away from the vertex b
    # ba = a - b
    # bc = c - b
    ba = a - b
    bc = c - b
    
    # Calculate the dot product and the cosine of the angle
    cosine_angle = np.dot(ba, bc) / (np.linalg.norm(ba) * np.linalg.norm(bc))
    
    # Calculate the angle in radians and convert to degrees
    angle = np.arccos(cosine_angle)
    
    return np.degrees(angle)