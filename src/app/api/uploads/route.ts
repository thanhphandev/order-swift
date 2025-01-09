import { pinata } from "@/lib/config";
import { NextResponse, NextRequest } from "next/server";

export const config = {
    api: {
        bodyParser: false,
    }
}

export async function POST(request: NextRequest){
    try {
        const data = await request.formData();
        const file: File | null = data.get('file') as unknown as File;
        const uploadData = await pinata.upload.file(file)
        const url = await pinata.gateways.createSignedURL({
            cid: uploadData.cid,
            expires: 80000
        }).optimizeImage({
            width: 1200,
            height: 720,
            format: "webp"
          })
        return NextResponse.json(url, {status: 200})
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: "Failed to upload image"}, {status: 500})
    }
}