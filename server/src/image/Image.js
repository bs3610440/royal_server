import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import sharp from "sharp";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CloudName,
  api_key: process.env.CloudKey,
  api_secret: process.env.ApiKey,
});

export const uploadProfileImg = async (img) => {
  try {
   const optimizedBuffer = await sharp(img)
            .resize(1080, 720, { fit: 'inside', withoutEnlargement: true })
            .jpeg({ quality: 80, mozjpeg: true }).toBuffer();


        const uploadResult = await cloudinary.uploader.upload(
            `data:image/jpeg;base64,${optimizedBuffer.toString('base64')}`,
            { resource_type: 'auto', quality: 'auto',  folder: 'course' });

    return uploadResult;
  } 
  catch (err) {console.log(err.message);}
};
