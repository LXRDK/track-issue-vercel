"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "Closed", value: "CLOSED" },
  { label: "In progress", value: "IN_PROGRESS" },
];
const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <Select.Root
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status) params.append("status", status);
        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!);
        const query = params.size ? "?" + params.toString() : "";

        router.push("/issues" + query);
      }}
    >
      <Select.Trigger placeholder="Filter by Status"></Select.Trigger>
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item
            key={status.label}
            defaultValue={searchParams.get("status")?.toString() || "ALL"}
            value={status.value || "All" || searchParams.get("status")}
          >
            {" "}
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
