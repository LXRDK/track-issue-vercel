import Image from "next/image";
import Pagination from "./components/Pagination";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import { Flex } from "@radix-ui/themes";
import prisma from "@/prisma/client";

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  return (
    <Flex gap={"4"} direction={"column"}>
      <IssueSummary open={open} closed={closed} inProgress={inProgress} />
      <LatestIssues />;
    </Flex>
  );
}
