import { NextRequest, NextResponse } from "next/server";
import { EXTERNAL_PATH_TO_OPERATOR_ICONS } from "@/lib/paths";
import { compareTwoOperators } from "./utils";
import fs from 'fs';
import path from 'path';
import { getDayOperatorId } from "./utils";

export const GET_Icon = async (_: Request, { params }: { params: { id: string } }): Promise<NextResponse> => {
    const id = params.id
    const fullPath = path.join(process.cwd(), ...EXTERNAL_PATH_TO_OPERATOR_ICONS, id + '.webp')
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

export const POST_Operator_Guess = async (req: NextRequest, _: NextResponse): Promise<NextResponse> => {
    const body = await req.json();
    const guess = body.id;
    const timestamp = body.timestamp;

    const todayId = getDayOperatorId(new Date(timestamp));

    if (todayId === guess) {
        const response = new NextResponse(JSON.stringify(compareTwoOperators(todayId, guess)), 
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
        const response = new NextResponse(JSON.stringify(compareTwoOperators(todayId, guess)), 
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