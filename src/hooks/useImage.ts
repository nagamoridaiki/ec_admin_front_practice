import { useState, useCallback } from 'react';
import { EventType } from '@/interfaces/event';
import { S3_BUCKET, REGION } from '@/interfaces/aws';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

export const useImage = () => {

const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

const imageUpload: EventType['onChangeInput'] = useCallback(
  async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    const fileObject = files ? files[0] : null;
    if (!fileObject) {
      console.error("No file selected");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      if (!event.target || !event.target.result) {
        console.error("FileReader did not load the file correctly.");
        return;
      }
      const imgElement = document.createElement("img");
      imgElement.src = event.target.result as string;
      await new Promise((resolve) => {
        imgElement.onload = resolve;
      });
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.error("Failed to get 2D context from canvas.");
        return;
      }
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      const maxSize = 70;
      const size = Math.min(imgElement.width, imgElement.height);
      canvas.width = maxSize;
      canvas.height = maxSize;
      ctx.drawImage(imgElement, (imgElement.width - size) / 2, (imgElement.height - size) / 2, size, size, 0, 0, maxSize, maxSize);
      canvas.toBlob(async (blob) => {
        if (!blob) {
          console.error("Failed to create blob from canvas.");
          return;
        }
        const uniqueFileName = uuidv4() + '-' + fileObject.name; // Generate a unique file name using UUID
        const resizedFile = new File([blob], uniqueFileName, {
          type: fileObject.type,
          lastModified: Date.now(),
        });
        const params = {
          ACL: 'public-read',
          Body: resizedFile,
          Bucket: S3_BUCKET,
          ContentType: resizedFile.type,
          Key: uniqueFileName,
        };

        try {
          myBucket.putObject(params as AWS.S3.PutObjectRequest)
            .on('httpUploadProgress', (evt) => {
              console.log(evt.loaded);
            })
            .send((err, data) => {
              if (err) {
                console.error("Upload Error:", err);
                throw err;
              } else {
                console.log("Upload Success", data);
                const imageUrl = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${encodeURIComponent(params.Key)}`;
                console.log("Uploaded Image URL:", imageUrl);
                setImageUrl(imageUrl);
              }
            });
        } catch (err) {
          console.error(err);
        }
      }, fileObject.type);
    };
    reader.readAsDataURL(fileObject);
  },
  [imageUrl]
);

  return {
    imageUrl,
    imageUpload
  }

}
