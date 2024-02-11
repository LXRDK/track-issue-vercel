"use client";
import React, { ReactNode } from "react";
import {
  QueryClient,
  QueryClientProvider as ReactQueryProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

const QueryClientProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ReactQueryProvider client={queryClient}>{children}</ReactQueryProvider>
  );
};

export default QueryClientProvider;
