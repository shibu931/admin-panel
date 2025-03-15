'use server';

import path from 'path';
import fs from 'fs/promises';

export async function uploadImage(file) {  
  try {

    if (!file || !(file instanceof File)) {
      return { message: 'No image file provided or invalid file provided', status: 400 };
    }

    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);

    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const filename = `${timestamp}-${random}-${file.name}`;

    const uploadDir = path.join('/var/www/uploads');

    try {
      await fs.mkdir(uploadDir, { recursive: true });
    } catch (mkdirError) {
      console.error('Error creating directory:', mkdirError);
      return { message: 'Error creating upload directory', status: 500 };
    }

    const filePath = path.join(uploadDir, filename);

    try {
      await fs.writeFile(filePath, Buffer.from(bytes));
    } catch (writeFileError) {
      console.error('Error writing file:', writeFileError);
      return { message: 'Error saving file', status: 500 };
    }
    const publicPath = `${process.env.DOMAIN}/uploads/${filename}`;

    console.log(publicPath);
    
    return publicPath;
  } catch (error) {
    console.error('Error processing upload:', error);
    return { message: 'Error processing file upload', status: 500 };
  }
}