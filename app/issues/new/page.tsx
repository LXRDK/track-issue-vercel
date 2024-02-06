import dynamic from "next/dynamic";

import LoadingNewIssuelPage from "./loading";
const IssueForm = dynamic(() => import("@/app/components/IssueForm"), {
  ssr: false,
  loading: () => <LoadingNewIssuelPage />,
});
const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
