# Dummy FastAPI app
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
import base64
import os
import uuid # Import uuid for unique filenames
from pose_detection.pose_detector import perform_pose_detection

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/analyze")
async def analyze_photo(photo: UploadFile = File(...)):
    # Read the uploaded photo content
    contents = await photo.read()

    try:
        # Generate a unique filename for the processed image
        unique_filename = f"{uuid.uuid4()}.jpg"
        output_path = os.path.join("/Users/dikpaal/Desktop/main/code/projects/kuzan/backend/processed_images", unique_filename)

        # Perform pose detection
        processed_image_bytes, landmarks = perform_pose_detection(contents, output_path)

        # Base64 encode the processed image bytes
        processed_image_base64 = base64.b64encode(processed_image_bytes).decode("utf-8")

        # Convert landmarks to a string for analysis_text
        analysis_text = str(landmarks)

        return JSONResponse(content={
            "processed_image": processed_image_base64,
            "analysis_text": analysis_text,
            "filename": photo.filename,
            "content_type": photo.content_type,
            "message": "Photo received and processed for analysis"
        })
    except ValueError as e:
        return JSONResponse(status_code=400, content={
            "message": str(e)
        })
    except Exception as e:
        return JSONResponse(status_code=500, content={
            "message": f"An unexpected error occurred: {e}"
        })