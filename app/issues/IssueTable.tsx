import { Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { IssueStatusBadge } from "../components";
import SortingTablIcon from "../components/SortingTablIcon";
import NextLink from "next/link";
import { Issue, Status } from "@prisma/client";
import { IssueQuery } from "./page";

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}
const IssueTable = ({ searchParams, issues }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((col) => (
            <Table.ColumnHeaderCell
              key={col.label}
              className={col.className}
              justify={"center"}
            >
              <NextLink
                href={{
                  query: { ...searchParams, orderBy: col.value },
                }}
              >
                {col.label}
                {col.value === searchParams.orderBy && <SortingTablIcon />}
              </NextLink>
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
            <Table.Cell width={"10rem"} className="hidden md:table-cell w-fit">
              {issue.createdAt.toUTCString()}
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell" width={"10rem"}>
              {issue.updatedAt.toUTCString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default IssueTable;
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
export const columnNames = columns.map((col) => col.value);
