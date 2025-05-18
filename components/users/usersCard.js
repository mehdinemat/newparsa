const {
  VStack,
  Avatar,
  HStack,
  Divider,
  Text,
  Button,
} = require("@chakra-ui/react");

const UsersCard = ({ t, item }) => {
  return (
    <VStack>
      <Avatar w={"100px"} h={"100px"} />
      <Text>
        {item?.first_name} {item?.last_name}
      </Text>
      <HStack>
        <Text>{item?.question_count} {t("question")}</Text>
        <Divider height={"20px"} orientation="vertical" />
        <Text color={"#29CCCC"}>{item?.answer_count} {t("answer")}</Text>
      </HStack>
      <Button bgColor={"#29CCCC"} fontWeight={"normal"}>
        {t("view_profile")}
      </Button>
    </VStack>
  );
};

export default UsersCard;
