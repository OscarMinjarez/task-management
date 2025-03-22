import { NextResponse } from "next/server";

export async function GET() {
    return Response.json({message: "hola"});
}

export async function POST(){
    return NextResponse.json({message: "hola"});
}

