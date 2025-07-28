const {
  VStack,
  Avatar,
  HStack,
  Divider,
  Text,
  Button,
  Image,
  Badge,
} = require("@chakra-ui/react");

const UsersCard = ({ t, item, handleProfile }) => {
  return (
    <VStack>
      <VStack bgColor={'white'} padding={'8px'} borderRadius={'10px'} w={'236px'}>
        <Avatar w={"100%"} h={"211px"} borderRadius={'5px'} />
        <HStack w={'100%'} alignItems={'start'}>
          <Image src="/start.png" />
          <Text size={'14px'} fontWeight={'extrabold'}>
            {item?.first_name} {item?.last_name}
          </Text>
        </HStack>
        <HStack w={'100%'} height={'25px'}>
          <Badge colorScheme="gray" w={'100%'} py={'5px'} borderRadius={'6px'} textAlign={'center'}>
            {item?.question_count} {t("question")}
          </Badge>
          <Divider height={"20px"} orientation="vertical" />
          <Badge colorScheme="gray" w={'100%'} py={'5px'} borderRadius={'6px'} textAlign={'center'}>
            {item?.answer_count} {t("answer")}
          </Badge>
        </HStack>
      </VStack>
      <Button
        w={'236px'}
        bgColor={"#29CCCC"}
        fontWeight={"normal"}
        onClick={(e) => handleProfile(item?.username)}
        borderRadius={'10px'}
      >
        {t("view_profile")}
      </Button>
    </VStack>
  );
};

export default UsersCard;
