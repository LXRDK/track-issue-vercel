"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

const NewIssuePage = () => {
  return (
    <div className="max-w-lg space-y-3">
      <TextField.Root>
        <TextField.Input placeholder="Title" className="" />
      </TextField.Root>
      <TextArea placeholder="description" />
      <Button>Submit</Button>
    </div>
  );
};

export default NewIssuePage;
