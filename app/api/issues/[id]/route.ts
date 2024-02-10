import { IssueSchema } from "@/app/ValidationSchemas";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import delay from "delay";
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const validation = IssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });
  const issue = await prisma?.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: "invalid Issue" }, { status: 404 });
  const updatedIssue = await prisma?.issue.update({
    where: { id: issue.id },
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  delay(2000);
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
