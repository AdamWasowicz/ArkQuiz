import { NextResponse } from "next/server";
import { EXTERNAL_PATH_TO_CHARACTER_SPLASH_IMAGES } from "@/lib/paths";
import fs from 'fs';
import path from 'path';


export const GET = async (_: Request, { params }: { params: { id: string } }): Promise<NextResponse> => {
    const id = params.id
    const fullPath = path.join(process.cwd(), ...EXTERNAL_PATH_TO_CHARACTER_SPLASH_IMAGES, id + '.webp')
    try {
        const imageBuffer = fs.readFileSync(fullPath);

        const response = new NextResponse(imageBuffer, 
            {
                headers: {
                    'content-type': 'image/webp',
                },
            }
        );
        return response;
    }
    catch {
        return NextResponse.json({ message: 'Cannot fetch desired resource', id: id }, { status: 404 })
    }
}