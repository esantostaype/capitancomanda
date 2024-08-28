import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { Readable } from 'stream'

cloudinary.config({ 
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string, 
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string, 
  api_secret: process.env.CLOUDINARY_API_SECRET as string
})

function bufferToStream(buffer: Buffer): Readable {
  const stream = new Readable()
  stream.push(buffer)
  stream.push(null)
  return stream
}

export async function POST(request: Request): Promise<Response> {
  const data = await request.formData()
  const image = data.get('image') as File

  if (!image) {
    return NextResponse.json({ message: "No se ha subido ninguna imagen" }, { status: 400 })
  }

  const bytes = await image.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const uploadImage = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'image' },
        (error, result) => {
          if (error) {
            reject(error)
          } else {
            resolve(result)
          }
        }
      )

      bufferToStream(buffer).pipe(uploadStream)
    })
  }

  try {
    const result = await uploadImage()

    return NextResponse.json({
      message: "Imagen subida exitosamente",
      url: result.secure_url
    })
  } catch (error: any) {
    return NextResponse.json({ message: "Error al subir imagen", error: error.message }, { status: 500 })
  }
}
