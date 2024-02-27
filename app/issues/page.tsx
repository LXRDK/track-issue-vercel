import prisma from "@/prisma/client";

import { Issue, Status } from "@prisma/client";
import Pagination from "../components/_Pagination";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames } from "./IssueTable";
import { Flex } from "@radix-ui/themes";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}
interface Props {
  searchParams: IssueQuery;
}
const Issues = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };
  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction={"column"} gap={"3"}>
      <IssueActions />
      <IssueTable issues={issues} searchParams={searchParams} />

      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};
export const dynamic = "force-dynamic";
export default Issues;
