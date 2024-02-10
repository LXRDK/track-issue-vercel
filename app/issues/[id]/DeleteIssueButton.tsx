"use client";
import { Spinner } from "@/app/components";
import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, AlertDialogAction, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import delay from "delay";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const deleteIssue = () => {
    try {
      setDeleting(true);

      axios.delete("/api/issues/" + issueId);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setDeleting(false);
      setError(true);
    }
  };
  return (
    <div>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button
            disabled={isDeleting}
            color="red"
            className="flex items-center justify-center w-full gap-2"
          >
            <TrashIcon />{" "}
            <span className="whitespace-nowrap">Delete Issue</span>
            {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>Delete Issue</AlertDialog.Title>
          <AlertDialog.Description className="flex flex-col" size="2">
            <span>Are you sure to delete this issue?</span>
            <span className="text-red-600/50 drop-shadow-md">
              You can not undo this !
            </span>
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={deleteIssue}>
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            Issue can not be Deleted!
          </AlertDialog.Description>
          <Button
            mt="2"
            color="gray"
            variant="soft"
            onClick={() => setError(false)}
          >
            Ok
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
};

export default DeleteIssueButton;
