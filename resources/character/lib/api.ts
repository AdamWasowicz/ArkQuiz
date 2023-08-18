import { NextRequest, NextResponse } from "next/server";
import { EXTERNAL_PATH_TO_CHARACTER_ICONS, EXTERNAL_PATH_TO_CHARACTER_SPLASH } from "@/lib/paths";
import { compareTwoCharacters } from "./utils";
import fs from 'fs';
import path from 'path';
import { getTodayCharacterId } from "./utils";

export const GET_Icon = async (_: Request, { params }: { params: { id: string } }): Promise<NextResponse> => {
    const id = params.id
    const fullPath = path.join(process.cwd(), ...EXTERNAL_PATH_TO_CHARACTER_ICONS, id + '.webp')
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

export const GET_Splash = async (_: Request, { params }: { params: { id: string } }): Promise<NextResponse> => {
    const id = params.id
    const fullPath = path.join(process.cwd(), ...EXTERNAL_PATH_TO_CHARACTER_SPLASH, id + '.webp')
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

export const POST_Character_Guess = async (req: NextRequest, res: NextResponse): Promise<NextResponse> => {
    const todayId = getTodayCharacterId();
    const body = await req.json();
    const guess = body.id;

    if (todayId === guess) {
        const response = new NextResponse(JSON.stringify(compareTwoCharacters(todayId, guess)), 
            {
                status: 200,
                headers: {
                    'content-type': 'application/json',
                },
            }
        );
        return response;
    }
    else {
        const response = new NextResponse(JSON.stringify(compareTwoCharacters(todayId, guess)), 
            {
                status: 200,
                headers: {
                    'content-type': 'application/json',
                },
            }
        );
        return response;
    }
}