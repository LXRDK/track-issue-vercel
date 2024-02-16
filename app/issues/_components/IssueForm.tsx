"use client";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
// import SimpleMDE from "react-simplemde-editor";
import { Button, Callout, Select, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { IssueSchema } from "@/app/ValidationSchemas";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue, Status } from "@prisma/client";
import { z } from "zod";

type IssueFormData = z.infer<typeof IssueSchema>;
const IssueForm = ({ issue }: { issue?: Issue }) => {
  const [stat, setStat] = useState<Status | string>();
  const [isSubmitting, setSubmitting] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(IssueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const onSubmit = async (data: {
    title: string;
    description: string;
    status?: string;
  }) => {
    const dataM = { ...data, status: stat };

    try {
      setSubmitting(true);

      if (issue) await axios.patch(`/api/issues/${issue.id}`, dataM);
      else await axios.post("/api/issues", data);

      router.push(`/issues`);
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("un expected");
    }
  };
  const statuses: { label: string; value?: Status }[] = [
    { label: "Open", value: "OPEN" },
    { label: "Closed", value: "CLOSED" },
    { label: "In progress", value: "IN_PROGRESS" },
  ];

  return (
    <div className="max-w-lg">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root>
          <TextField.Input
            placeholder="Title"
            className=""
            {...register("title")}
            defaultValue={issue?.title}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <div className="flex flex-col space-y-4">
          {issue && (
            <Select.Root
              defaultValue={issue?.status}
              onValueChange={(status) => {
                setStat(status);
              }}
            >
              <Select.Trigger className="w-40"></Select.Trigger>
              <Select.Content>
                {statuses.map((status) => (
                  <Select.Item key={status.label} value={status.value || ""}>
                    {" "}
                    {status.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          )}

          <ErrorMessage>{errors.description?.message}</ErrorMessage>

          <Button disabled={isSubmitting}>
            {!isSubmitting ? "Submit" : <Spinner />}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default IssueForm;
