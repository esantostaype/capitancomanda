import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(request: any) {
  try {
    const data = await request.formData();
    const image = data.get('image');
    if (!image) {
      return NextResponse.json("No se ha subido ninguna imagen", { status: 400 });
    }
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Usa la carpeta /tmp en lugar de public
    const tempFilePath = path.join('/tmp', image.name);
    await writeFile(tempFilePath, buffer).catch(error => {
      console.error("Error writing file:", error);
      return NextResponse.json("Error writing file", { status: 500 });
    });

    const response = await cloudinary.uploader.upload(tempFilePath);

    return NextResponse.json({
      message: "Image subida",
      url: response.secure_url
    });
  } catch (error) {
    console.error("Error in POST route:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
