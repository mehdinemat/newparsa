import { Avatar, AvatarGroup, Badge, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { HiArrowTurnDownLeft } from "react-icons/hi2";
import { IoCheckmark, IoEye } from "react-icons/io5";

const QuestionCard = () => {
  return (
    <HStack w={"100%"} alignItems={"start"}>
      <VStack w={"150px"} alignItems={"start"}>
        <HStack color={"gray.600"}>
          <HiArrowTurnDownLeft fontSize={"20px"} />
          <Text fontSize={'md'}>2پسند</Text>
        </HStack>
        <HStack color={"gray.600"}>
          <IoCheckmark fontSize={"20px"} />
          <Text>3 جواب</Text>
        </HStack>
        <HStack color={"gray.600"}>
          <IoEye fontSize={"20px"} />
          <Text>87 بازدید</Text>
        </HStack>
        <HStack></HStack>
      </VStack>
      <VStack w={"100%"} alignItems={"start"} gap={"20px"}>
        <Text fontSize={'15px'} w="100%" whiteSpace="normal" lineHeight={'taller'}>
          آیا می‌توان نذر کرد که فطریه را به زلزله زده‌گان داد؟ اگر
          نتوانیم آن را انجام دهیم، آیا می‌توان فطریه را به یک بدهکار
          ورشکسته داد؟
        </Text>
        <HStack>
          <Badge
            color="#16A6A6"
            bgColor="#29CCCC1A"
            height="26px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            px="8px" // optional: add some horizontal padding
          >
            خداشناسی
          </Badge>
          <Badge
            color="#16A6A6"
            bgColor="#29CCCC1A"
            height="26px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            px="8px"
          >
            توحید
          </Badge>
          <Badge
            color="#16A6A6"
            bgColor="#29CCCC1A"
            height="26px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            px="8px"
          >
            فقه سیاسی
          </Badge>
          <Badge
            color="#16A6A6"
            bgColor="#29CCCC1A"
            height="26px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            px="8px"
          >
            پزشکی
          </Badge>
        </HStack>
        <HStack w={"100%"}>
          <HStack>
            <Avatar size={"sm"} />
            <Text color={"gray.700"} w={"100px"}>
              اسلام کوئست
            </Text>
          </HStack>
          <Divider
            orientation="vertical"
            w={"5px"}
            borderColor={"gray.400"}
            height={"40px"}
          />
          <HStack>
            <Avatar size={"sm"} />
            <Text color={"gray.700"} w={"100px"}>
              اسلام کوئست
            </Text>
          </HStack>

          <HStack w={"100%"} justifyContent={"end"}>
            <Text w={"120px"} color={"gray.400"}>
              پاسخ ۲۱ ساعت قبل
            </Text>
            <AvatarGroup size="sm" max={2}>
              <Avatar
                name="Ryan Florence"
                src="https://bit.ly/ryan-florence"
              />
              <Avatar
                name="Segun Adebayo"
                src="https://bit.ly/sage-adebayo"
              />
              <Avatar
                name="Kent Dodds"
                src="https://bit.ly/kent-c-dodds"
              />
              <Avatar
                name="Prosper Otemuyiwa"
                src="https://bit.ly/prosper-baba"
              />
              <Avatar
                name="Christian Nwamba"
                src="https://bit.ly/code-beast"
              />
            </AvatarGroup>
          </HStack>
        </HStack>
      </VStack>
    </HStack>
  )
}

export default QuestionCard
