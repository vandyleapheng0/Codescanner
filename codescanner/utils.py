import cv2
from pyzbar.pyzbar import decode


# Initialize the webcam
def process_image(frame):
    # Decode barcodes in the frame
    decoded_objects = decode(frame)

    for obj in decoded_objects:
        barcode_data = obj.data.decode("utf-8")
        barcode_type = obj.type
        cv2.putText(
            frame,
            "book",
            (obj.rect.left, obj.rect.top - 10),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.9,
            (0, 255, 0),
            2,
        )
        cv2.rectangle(
            frame,
            (obj.rect.left, obj.rect.top),
            (obj.rect.left + obj.rect.width, obj.rect.top + obj.rect.height),
            (0, 255, 0),
            2,
        )
    return frame
