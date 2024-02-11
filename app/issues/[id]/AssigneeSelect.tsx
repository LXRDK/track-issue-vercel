"use client";
import { Skeleton, Spinner } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();
  const [isUpdatig, setUpdating] = useState(false);
  if (isLoading) return <Skeleton width={"10rem"} />;
  if (error) return null;
  const assignIssue = async (userId: string) => {
    setUpdating(true);
    try {
      await axios.patch("/api/issues/" + issue.id, {
        assignedToUserId: userId !== "Unassigned" ? userId : null,
      });
      try {
        const user = await users?.filter((user) => user.id == userId);
        toast.success("assigned to " + user![0].name);
      } catch (err) {
        toast.success("unassigned");
      }
    } catch (err) {
      console.log(err);
      toast.error("Changes cant be made");
    }
    setUpdating(false);
  };
  return (
    <>
      <Toaster />
      <Select.Root
        defaultValue={
          issue.assignedToUserId ? issue.assignedToUserId : "Unassigned"
        }
        onValueChange={assignIssue}
        disabled={isUpdatig}
      >
        <Select.Trigger placeholder="Unassigned"></Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value={"Unassigned"}>Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {isUpdatig ? <Skeleton width={"4rem"} /> : user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};
const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });
export default AssigneeSelect;
