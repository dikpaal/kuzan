from .calculate_angle import calculate_angle

def analyze_form(selected_skill, landmarks):
    
    # 30 <= shoulder angle <= 80: requires hip coordinate, shoulder coordinate, and elbow coordinate
    # 170 <= elbow angle <= 180: requires shoulder coordinate, elbow coordinate, and wrist coordinate
    # 170 <= hip angle <= 180: requires shoulder coordinate, hip coordinate, and knee coordinate

    
    if selected_skill == "planche_lean":
        left_hip_coord = landmarks.get("LEFT_HIP")
        left_shoulder_coord = landmarks.get("LEFT_SHOULDER")
        left_elbow_coord = landmarks.get("LEFT_ELBOW")
        left_wrist_coord = landmarks.get("LEFT_WRIST")
        left_knee_coord = landmarks.get("LEFT_KNEE")

        # --- Use the new function with the vertex in the middle ---

        # Shoulder angle: vertex is SHOULDER
        shoulder_angle = calculate_angle(left_elbow_coord, left_shoulder_coord, left_hip_coord)
        
        # Elbow angle: vertex is ELBOW
        elbow_angle = calculate_angle(left_shoulder_coord, left_elbow_coord, left_wrist_coord)
        
        # Hip angle: vertex is HIP
        hip_angle = calculate_angle(left_shoulder_coord, left_hip_coord, left_knee_coord)
        
        if (shoulder_angle >= 30 and shoulder_angle <= 80):
            shoulder_feedback = "The shoulder angle is good."
        else:
            shoulder_feedback = f"The shoulder angle is {shoulder_angle:.2f} and is not optimal. Aim for an angle between 30 and 80 degrees."
            
        if (elbow_angle >= 170 and elbow_angle <= 180):
            elbow_feedback = "The elbow angle is good."
        else:            
            elbow_feedback = f"The elbow angle is {elbow_angle:.2f} and is not optimal. Aim for an angle between 170 and 180 degrees."
            
        if (hip_angle >= 170 and hip_angle <= 180):
            hip_feedback = "The hip angle is good."
        else:
            hip_feedback = f"The hip angle is {hip_angle:.2f} and is not optimal. Aim for an angle between 170 and 180 degrees."
        
        return f"Shoulder feedback: {shoulder_feedback}\nElbow feedback: {elbow_feedback}\nHip feedback: {hip_feedback}"
