import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

export default function EditIssueButton({ issueId }: { issueId: number }) {
  return (
    <Button>
      <Link
        href={`/issues/${issueId}/edit`}
        className="flex items-center justify-center w-full gap-2"
      >
        <Pencil2Icon />
        Edit Issue
      </Link>
    </Button>
  );
}
