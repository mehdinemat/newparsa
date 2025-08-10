import { Avatar, Badge, Divider, HStack, Image, Text, VStack } from "@chakra-ui/react";
import moment from "moment-jalaali";
import { useRouter } from "next/router";
import { GiBigDiamondRing } from "react-icons/gi";
import { IoCheckmark, IoEyeOutline } from "react-icons/io5";

const QuestionCard = ({ data, t, type = "question", bgColor }) => {
  const router = useRouter();

  const handleQuestionRouter = (id) => {
    router.push(`/question_answer/${id}`);
  };

  const handleClickTags = (item) => {
    router.replace(`/questions/tag/${item?.id}/${item?.name}`);
  };

  return (
    <HStack
      w={"100%"}
      alignItems={"start"}
      mb={"10px"}
      pb={"20px"}
      gap={"20px"}
      cursor={"pointer"}
      bgColor={bgColor ? bgColor : '#F7F7F7'}
      borderRadius={'13px'}
      padding={'10px'}
      onClick={(e) =>
        handleQuestionRouter(
          type == "question" ? data?.id : data?.question_id
        )
      }

    >
      <Image src="/minquestion.png" w={'23px'} height={'32px'} mt={'10px'} mr={'10px'} />
      <VStack w={"100%"} alignItems={"start"} gap={"15px"} paddingBottom={'16px'}>
        <Text

          fontSize={"18px"}
          w="full"
          whiteSpace="normal"
          lineHeight={"taller"}
          textAlign={"justify"}
        >
          {data?.content}
        </Text>
        <HStack w={'100%'} justifyContent={'space-between'}>
          <HStack>
            {data?.tags?.map((item, index) => (
              <Badge
                onClick={(e) => handleClickTags(item)}
                _hover={{ bgColor: "#29cccc38", color: "#1a7c7c" }}
                transition={".3s"}
                key={index}
                color="#16A6A6"
                bgColor="#29CCCC1A"
                height="26px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize={"14px"}
                fontWeight={"100"}
                px="8px" // optional: add some horizontal padding
              >
                {item?.name}
              </Badge>
            ))}
          </HStack>
          {data?.source && (
            <HStack>
              <Avatar size={"sm"} />
              <Text color={"#999999"} w={"140px"}>
                {data?.source}
              </Text>
            </HStack>
          )}
        </HStack>
        <Divider borderColor={'#00000017'} />
        <HStack w={"100%"} justifyContent={'space-between'}>
          <HStack w={"min-content"} alignItems={"start"}>
            <HStack color={"gray.600"}>
              <GiBigDiamondRing fontSize={"20px"} />
              <Text fontSize={"16px"} w={"max-content"}>
                {data?.like_count}
                {t("like")}
              </Text>
            </HStack>
            <HStack color={"gray.600"}>
              <IoCheckmark fontSize={"20px"} />
              <Text fontSize={"16px"} w={"max-content"}>
                {data?.answer_count} {t("answer")}
              </Text>
            </HStack>
            <HStack color={"gray.600"}>
              <IoEyeOutline fontSize={"20px"} />
              <Text fontSize={"16px"} w={"max-content"}>
                {data?.view_count} {t("view")}
              </Text>
            </HStack>
            <HStack></HStack>
          </HStack>

          <HStack w={"100%"} justifyContent={"end"}>
            <Text w={"150px"} color={"gray.400"}>
              {moment(data?.created_at).format("hh:mm:ss jYYYY/jMM/jDD")}
            </Text>
            {/* <AvatarGroup size="sm" max={2}>
              <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
              <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
              <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
              <Avatar
                name="Prosper Otemuyiwa"
                src="https://bit.ly/prosper-baba"
              />
              <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
            </AvatarGroup> */}
          </HStack>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default QuestionCard;
