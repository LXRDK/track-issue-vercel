// import { Skeleton } from "@nextui-org/react";
import { Box, Card, Flex, Skeleton as SkRad } from "@radix-ui/themes";
import { Skeleton } from "../../components/";

const LoadingIssueDetailPage = () => {
  return (
    <Box className="max-w-lg">
      <Skeleton />
      <Flex className="space-x-3" my="2">
        <Skeleton width={"5rem"} />

        <Skeleton width={"8rem"} />
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;
