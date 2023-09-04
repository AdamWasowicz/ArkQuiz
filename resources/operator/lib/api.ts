import { NextRequest, NextResponse } from "next/server";
import { compareTwoOperators } from "./utils";
import { getDayOperatorId } from "./utils";


export const POST_Operator_Guess = async (req: NextRequest, _: NextResponse): Promise<NextResponse> => {
    const body = await req.json();
    const guess = body.id;
    const timestamp = body.timestamp;

    const todayId = getDayOperatorId(new Date(timestamp));
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