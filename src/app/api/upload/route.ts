import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'
import { v2 as cloudinary } from 'cloudinary'
          
cloudinary.config({ 
  cloud_name: 'dq6txmetn', 
  api_key: '561382228149829', 
  api_secret: 'WU9xKJyhx0xDVshr_ZdFdOfGO3Y' 
})

export async function POST( request: any ) {
  const data = await request.formData()
  const image = data.get('image')
  if( !image ) {
    return NextResponse.json("No se ha subido ninguna imagen", { status: 400 })
  }
  const bytes = await image.arrayBuffer()
  const buffer = Buffer.from( bytes )

  const filePath = path.join( process.cwd(), "public", image.name )
  await writeFile( filePath, buffer )

  const response = await cloudinary.uploader.upload( filePath )

  return NextResponse.json({
    message: "Image Subida",
    url: response.secure_url
  })
}