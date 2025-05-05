import {
  Avatar,
  AvatarGroup,
  Badge,
  HStack,
  Text,
  VStack
} from "@chakra-ui/react";
import moment from 'moment-jalaali';
import { useRouter } from "next/router";
import { HiArrowTurnDownLeft } from "react-icons/hi2";
import { IoCheckmark, IoEyeOutline } from "react-icons/io5";

const QuestionCard = ({ data , t }) => {

  const router = useRouter()

  const handleQuestionRouter = (id) => {
    router.push(`/question_answer?id=${id}`)
  }

  return (
    <HStack w={"100%"} alignItems={"start"} borderBottom={'1px solid #E2E8F0'} mb={'10px'} pb={"20px"} gap={"20px"} onClick={e => handleQuestionRouter(data?.id)} cursor={'pointer'}>
      <VStack w={"150px"} alignItems={"start"}>
        <HStack color={"gray.600"}>
          <HiArrowTurnDownLeft fontSize={"20px"} />
          <Text fontSize={"16px"} w={'max-content'}>{data?.like_count}{t('like')}</Text>
        </HStack>
        <HStack color={"gray.600"}>
          <IoCheckmark fontSize={"20px"} />
          <Text fontSize={"16px"} w={'max-content'}>{data?.answer_count} {t('answer')}</Text>
        </HStack>
        <HStack color={"gray.600"}>
          <IoEyeOutline fontSize={"20px"} />
          <Text fontSize={"16px"} w={'max-content'}>{data?.view_count} {t('view')}</Text>
        </HStack>
        <HStack></HStack>
      </VStack>
      <VStack w={"100%"} alignItems={"start"} gap={"20px"}>
        <Text
          fontSize={"15px"}
          w="full"
          whiteSpace="normal"
          lineHeight={"taller"}
        >
          {data?.content}
        </Text>
        <HStack>
          {
            data?.tags?.map((item, index) => (
              <Badge
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
            ))

          }
        </HStack>
        <HStack w={"100%"}>
          {data?.source &&<HStack>
            <Avatar size={"sm"} />
            <Text color={"gray.700"} w={"140px"}>
              {data?.source}
            </Text>
          </HStack>}
          <HStack w={"100%"} justifyContent={"end"}>
            <Text w={"150px"} color={"gray.400"}>
              {moment(data?.created_at).format('hh:mm:ss jYYYY/jMM/jDD')}
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
