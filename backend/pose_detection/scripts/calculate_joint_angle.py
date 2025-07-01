import math

def calculate_joint_angle(point1: tuple[float, float], point2: tuple[float, float], point3: tuple[float, float]) -> float:
    """
    Calculate the angle at point2 in 2D space.
    
    Args:
        point1 (tuple): Coordinates of the first point (x1, y1).
        point2 (tuple): Coordinates of the second point (x2, y2).
        point3 (tuple): Coordinates of the third point (x3, y3).
        
    Returns:
        float: The angle in degrees.
    """
    
    # Calculate vectors
    vector1 = (point2[0] - point1[0], point2[1] - point1[1])
    vector2 = (point3[0] - point2[0], point3[1] - point2[1])
    
    # Calculate dot product and magnitudes
    dot_product = vector1[0] * vector2[0] + vector1[1] * vector2[1]
    magnitude1 = math.sqrt(vector1[0]**2 + vector1[1]**2)
    magnitude2 = math.sqrt(vector2[0]**2 + vector2[1]**2)
    
    # Calculate angle in radians and then convert to degrees
    angle_radians = math.acos(dot_product / (magnitude1 * magnitude2))
    angle_degrees = math.degrees(angle_radians)
    
    return angle_degrees