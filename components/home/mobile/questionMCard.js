import { Avatar, AvatarGroup, Badge, HStack, Text, VStack } from "@chakra-ui/react";
import { HiArrowTurnDownLeft } from "react-icons/hi2";
import { IoCheckmark, IoEyeOutline } from "react-icons/io5";

const QuestionMCard = () => {
  return (
    <VStack w={"calc( 100vw - 50px )"} alignItems={"start"}>
      <HStack alignItems={"start"} gap={'10px'}>
        <HStack color={"#999999"}>
          <HiArrowTurnDownLeft fontSize={"20px"} />
          <Text fontSize={'16px'}>2پسند</Text>
        </HStack>
        <HStack color={"#999999"}>
          <IoCheckmark fontSize={"20px"} />
          <Text fontSize={'16px'}>3 جواب</Text>
        </HStack>
        <HStack color={"#999999"}>
          <IoEyeOutline fontSize={"20px"} />
          <Text fontSize={'16px'}>87 بازدید</Text>
        </HStack>
        <HStack></HStack>
      </HStack>
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
            fontSize={'14px'}
            fontWeight={'100'}
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
            fontSize={'14px'}
            fontWeight={'100'}
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
            fontSize={'14px'}
            fontWeight={'100'}
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
            fontSize={'14px'}
            fontWeight={'100'}
          >
            پزشکی
          </Badge>
        </HStack>
        <HStack w={"100%"}>
          <HStack>
            <Avatar size={"sm"} display={{base:'none' , md:'flex'}}/>
            <Text color={"gray.700"} w={"100px"} fontSize={'16px'}>
              اسلام کوئست
            </Text>
          </HStack>
          {/* <Divider
            orientation="vertical"
            w={"5px"}
            borderColor={"gray.400"}
            height={"40px"}
          />
          */}

          <HStack w={"100%"} justifyContent={"end"}>
            <Text w={"max-content"} color={"gray.400"} fontSize={'16px'}>
              پاسخ ۲۱ ساعت قبل
            </Text>
            <AvatarGroup size="sm" max={2}>
             
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
    </VStack>
  )
}

export default QuestionMCard
