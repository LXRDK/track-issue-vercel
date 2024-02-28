import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}
const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const statuses: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: "Open Issue", value: open, status: "OPEN" },
    { label: "Closed Issue", value: closed, status: "CLOSED" },
    { label: "In-Progress Issue", value: inProgress, status: "IN_PROGRESS" },
  ];
  return (
    <Flex gap={"4"}>
      {statuses.map((stat) => (
        <Card key={stat.label}>
          <Flex direction={"column"} gap={"2"}>
            <Link
              href={`/issues?status=${stat.status}`}
              className="text-sm font-medium "
            >
              {stat.label}
            </Link>
            <Text size={"5"} className="font-bold">
              {stat.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
