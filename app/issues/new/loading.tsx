import Spinner from "@/app/components/Spinner";

const LoadingNewIssuelPage = () => {
  return (
    <div className="w-32 md:w-52 min-h-32 flex items-center justify-center">
      <Spinner />
    </div>
  );
};

export default LoadingNewIssuelPage;
