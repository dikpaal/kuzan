import os
import cv2
import mediapipe as mp

# --- Initialization ---
# Initialize MediaPipe's Pose solution
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(static_image_mode=True, min_detection_confidence=0.5)

# Initialize MediaPipe's drawing utilities
mp_drawing = mp.solutions.drawing_utils

# --- Load and Process Image ---
# Construct the absolute path to the image
# This makes the script runnable from any directory
script_dir = os.path.dirname(os.path.abspath(__file__))
IMAGE_PATH = os.path.join(script_dir, 'test_image.jpg')

# Read the image
image = cv2.imread(IMAGE_PATH)
if image is None:
    print(f"Error: Could not read image from path: {IMAGE_PATH}")
    exit()

# MediaPipe works with RGB images, but OpenCV reads them in BGR format.
# So, we need to convert the color space.
image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

# Process the image and find the pose
print("Detecting pose...")
results = pose.process(image_rgb)

# --- Print and Draw Keypoints ---
if results.pose_landmarks:
    print("\n--- Keypoints Detected ---")
    
    # Get the image dimensions to un-normalize the coordinates
    image_height, image_width, _ = image.shape
    
    # Iterate over all detected landmarks
    for idx, landmark in enumerate(results.pose_landmarks.landmark):
        # Get the name of the landmark using the PoseLandmark enum
        landmark_name = mp_pose.PoseLandmark(idx).name
        
        # The landmark coordinates are normalized (from 0.0 to 1.0)
        # We convert them to pixel coordinates
        pixel_x = int(landmark.x * image_width)
        pixel_y = int(landmark.y * image_height)
        
        # Print the keypoint name and its coordinates
        print(f"-> {landmark_name:<20}: ({pixel_x}, {pixel_y})")

    print("\nDrawing landmarks on the image...")
    # Draw the landmarks and connections on the original BGR image
    annotated_image = image.copy()
    mp_drawing.draw_landmarks(
        annotated_image,
        results.pose_landmarks,
        mp_pose.POSE_CONNECTIONS,
        landmark_drawing_spec=mp_drawing.DrawingSpec(color=(0,255,0), thickness=2, circle_radius=2),
        connection_drawing_spec=mp_drawing.DrawingSpec(color=(0,0,255), thickness=2, circle_radius=2)
    )

    # Display the image
    cv2.imshow('MediaPipe Pose Estimation', annotated_image)
    print("Press any key to close the window.")
    cv2.waitKey(0)

else:
    print("No human pose detected in the image.")

# Clean up
cv2.destroyAllWindows()
pose.close()