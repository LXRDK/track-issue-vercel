import { PatchIssueSchema } from "@/app/ValidationSchemas";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import delay from "delay";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import { redirect } from "next/dist/server/api-utils";
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();

  const validation = PatchIssueSchema.safeParse(body);
  const { assignedToUserId, title, description, status } = body;
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });
  const issue = await prisma?.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: {
        id: assignedToUserId,
      },
    });
    if (!user) return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  if (!issue)
    return NextResponse.json({ error: "invalid Issue" }, { status: 404 });

  const updatedIssue = await prisma?.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      assignedToUserId,
      status: status,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: "issue not found" }, { status: 404 });

  await prisma.issue.delete({
    where: { id: issue.id },
  });
  return NextResponse.json({ Deleted: "ok" });
}
