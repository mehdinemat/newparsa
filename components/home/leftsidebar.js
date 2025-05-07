import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";

const LeftSidebar = ({ data, t, last }) => {
  return (
    <HStack
      w="100%"
      alignItems="start"
      borderBottom={!last && "1px solid"}
      borderColor="#EBEBEB"
      p="10px 0"
    >
      <Box
        w="60px"
        h="60px"
        bg="gray.300"
        borderRadius="10px"
        overflow="hidden"
        flexShrink={0}
      >
        <Image src={data?.logo_link} w="100%" h="100%" objectFit="cover" />
      </Box>

      <VStack w="100%" alignItems="start">
        <Text fontSize="18px">{data?.fa_source_name}</Text>
        <Text color="gray.500">
          {data?.question_count} {t("question")}
        </Text>
      </VStack>
    </HStack>
  );
};

export default LeftSidebar;
