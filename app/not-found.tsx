import Link from "next/link";
import React from "react";

const notFound = () => {
  return (
    <div>
      404{" "}
      <Link href="/issues" className="text-blue-500 underline font-bold">
        {" "}
        Go back to issues
      </Link>
    </div>
  );
};

export default notFound;
