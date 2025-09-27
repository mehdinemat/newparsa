import { Badge, Divider, HStack, Text, VStack, Wrap } from "@chakra-ui/react";
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
      {/* <Image src="/minquestion.png" w={'23px'} height={'32px'} mt={'10px'} mr={'10px'} /> */}
      <VStack w={"100%"} alignItems={"start"} gap={"15px"} >
        <Text

          fontSize={"18px"}
          w="full"
          whiteSpace="normal"
          lineHeight={"taller"}
          textAlign={"justify"}
        >
          {data?.content}
        </Text>

        <Divider borderColor={'#00000017'} />
        <HStack w={"100%"} justifyContent={'space-between'}>
          <Wrap spacing="8px" w={"100%"}>
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
                borderRadius={'5px'}
                fontStyle={'light'}
                px="8px" // optional: add some horizontal padding
              >
                {item?.name}
              </Badge>
            ))}
          </Wrap>

          <HStack w={'100%'} justifyContent={'center'}>

            {data?.source && (
              <HStack>
                {/* <Avatar size={"sm"} /> */}
                <Text color={"#999999"} w={"140px"}>
                  {data?.source}
                </Text>
              </HStack>
            )}
          </HStack>

          <HStack justifyContent={"end"} w={"100%"} >
            <HStack color={'#999999'}>
              <GiBigDiamondRing fontSize={"20px"} />
              <Text fontSize={"12px"} w={"max-content"}>
                {data?.like_count}
                {t("like")}
              </Text>
            </HStack>
            <HStack color={'#999999'}>
              <IoCheckmark fontSize={"20px"} />
              <Text fontSize={"12px"} w={"max-content"}>
                {data?.answer_count} {t("answer")}
              </Text>
            </HStack>
            <HStack color={'#999999'}>
              <IoEyeOutline fontSize={"20px"} />
              <Text fontSize={"12px"} w={"max-content"}>
                {data?.view_count} {t("view")}
              </Text>
            </HStack>
            <HStack></HStack>
          </HStack>



          {/* <HStack w={"100%"} justifyContent={"end"}>
            <Text w={"150px"} color={"gray.400"}>
              {moment(data?.created_at).format("hh:mm:ss jYYYY/jMM/jDD")}
            </Text>
          </HStack> */}
        </HStack>
      </VStack>
    </HStack>
  );
};

export default QuestionCard;
