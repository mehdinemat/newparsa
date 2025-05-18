import { Avatar, Badge, HStack, Text, VStack } from "@chakra-ui/react";
import moment from "moment-jalaali";
import { useRouter } from "next/router";
import { GiBigDiamondRing } from "react-icons/gi";
import { IoCheckmark, IoEyeOutline } from "react-icons/io5";

const QuestionMCard = ({ data, t }) => {
  const router = useRouter();

  const handleQuestionRouter = (id) => {
    router.push(`/question_answer?id=${id}`);
  };
  const handleClickTags = (item) => {
    router.replace(`/questions/tag/${item?.id}/${item?.name}`);
  };

  return (
    <VStack
      w={"calc( 100vw - 50px )"}
      alignItems={"start"}
      borderBottom={"1px solid #E2E8F0"}
      gap={"20px"}
      mb={"10px"}
      pb={"20px"}
      onClick={(e) => handleQuestionRouter(data?.id)}
      cursor={"pointer"}
    >
      <HStack alignItems={"start"} gap={"10px"}>
        <HStack color={"#999999"}>
          <GiBigDiamondRing fontSize={"20px"} />
          <Text fontSize={"16px"}>
            {data?.like_count} {t("like")}
          </Text>
        </HStack>
        <HStack color={"#999999"}>
          <IoCheckmark fontSize={"20px"} />
          <Text fontSize={"16px"}>
            {data?.answer_count} {t("answer")}
          </Text>
        </HStack>
        <HStack color={"#999999"}>
          <IoEyeOutline fontSize={"20px"} />
          <Text fontSize={"16px"}>
            {data?.view_count} {t("view")}
          </Text>
        </HStack>
        <HStack></HStack>
      </HStack>
      <VStack w={"100%"} alignItems={"start"} gap={"20px"}>
        <Text
          fontSize={"15px"}
          w="100%"
          whiteSpace="normal"
          lineHeight={"taller"}
          textAlign={"justify"}
        >
          {data?.content}
        </Text>
        <HStack>
          {data?.tags?.map((item, index) => (
            <Badge
              onClick={(e) => handleClickTags(item)}
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
        <HStack w={"100%"}>
          {data?.source && (
            <HStack>
              <Avatar size={"sm"} />
              <Text color={"gray.700"} w={"140px"}>
                {data?.source}
              </Text>
            </HStack>
          )}
          {/* <Divider
            orientation="vertical"
            w={"5px"}
            borderColor={"gray.400"}
            height={"40px"}
          />
          */}

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
    </VStack>
  );
};

export default QuestionMCard;
