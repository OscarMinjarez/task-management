import { NextResponse } from "next/server";
import { findByOneDate } from "../tasks-services";

export async function GET(req: Request){

    try{
        const url = new URL(req.url);
        const datelimit = url.searchParams.get("date");

        if(!datelimit) throw new Error("Inserta una fecha valida");

        const tasks = await findByOneDate(new Date(datelimit));

        return NextResponse.json({

            tasks: tasks 

        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ 
            error: error.message 
        }, { status: 400 });
    }
}
