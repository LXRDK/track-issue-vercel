import { Box, Card, Flex } from "@radix-ui/themes";

import { Skeleton } from "../../components/";

const LoadingNewIssuelPage = () => {
  return (
    <Box className="max-w-lg">
      <Skeleton />

      <Card className="prose" mt="4">
        <Flex className="max-w-lg gap-4">
          <Skeleton width={"5rem"} />
          <Skeleton width={"5rem"} />
          <Skeleton width={"5rem"} />
          <Skeleton width={"5rem"} />
          <Skeleton width={"5rem"} />
        </Flex>
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingNewIssuelPage;
