"use client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

const SortingTablIcon = () => {
  const [sort, setSort] = useState("asc");

  return (
    <div
      className="inline"
      onClick={() => (sort === "asc" ? setSort("desc") : setSort("asc"))}
    >
      {sort === "asc" ? (
        <ArrowUpIcon className="inline animate-bounce ease-in-out" />
      ) : (
        <ArrowDownIcon className="inline animate-bounce ease-in-out" />
      )}
    </div>
  );
};

export default SortingTablIcon;
