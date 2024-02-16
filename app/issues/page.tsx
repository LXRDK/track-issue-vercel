import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";

import IssueStatusBadge from "../components/IssueStatusBadge";
import Link from "../components/Link";
import IssueActions from "./IssueActions";
<<<<<<< HEAD
import { Issue, Status } from "@prisma/client";
=======
import { Status } from "@prisma/client";
>>>>>>> bacec75b4928611751d21452b640384c31a62123

interface Props {
  searchParams: { status: Status };
}

const Issues = async ({ searchParams }: Props) => {
<<<<<<< HEAD
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    {
      label: "Issue",
      value: "title",
    },
    {
      label: "Status",
      value: "status",
      className: "hidden md:table-cell",
    },
    {
      label: "Created",
      value: "createdAt",
      className: "hidden md:table-cell w-fit",
    },
    {
      label: "Updated ",
      value: "updatedAt",
      className: "hidden md:table-cell",
    },
  ];
  const statuses = Object.values(Status);

=======
  console.log(searchParams.status);
  const statuses = Object.values(Status);
  console.log(statuses);
>>>>>>> bacec75b4928611751d21452b640384c31a62123
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((col) => (
              <Table.ColumnHeaderCell
                key={col.label}
                className={col.className}
                justify={"center"}
              >
                {col.label}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell justify={"center"} width={"10rem"} className="">
                <Link
                  // color="violet"
                  // className="font-bold"
                  href={`/issues/${issue.id}`}
                >
                  {issue.title}
                </Link>
                <div className="block md:hidden ">
                  {" "}
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell
                className="hidden md:table-cell"
                justify={"center"}
                width={"10rem"}
              >
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell
                width={"10rem"}
                className="hidden md:table-cell w-fit"
              >
                {issue.createdAt.toDateString()}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell" width={"10rem"}>
                {issue.updatedAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};
export const dynamic = "force-dynamic";
export default Issues;
