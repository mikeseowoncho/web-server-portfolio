import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";

// 1. 목록 조회 (GET)
export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("=== MONGODB GET ERROR ===", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 2. 신규 카트리지 저장 (POST)
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const newProject = await Project.create(body);
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("=== MONGODB POST ERROR ===", error); // <- 여기에 있어야 함
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 3. 카트리지 삭제 (DELETE)
export async function DELETE(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await Project.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("=== MONGODB DELETE ERROR ===", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
