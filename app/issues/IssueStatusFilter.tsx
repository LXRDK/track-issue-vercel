"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import React from "react";
const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "Closed", value: "CLOSED" },
  { label: "In progress", value: "IN_PROGRESS" },
];
const IssueStatusFilter = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Filter by Status"></Select.Trigger>
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value || "All"}>
            {" "}
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;