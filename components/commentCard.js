import { Box, Button, Input, InputGroup, InputRightElement, Text, VStack } from "@chakra-ui/react"
import SliderCommnet from "./sliderCommnet"

const CommentCard = ({ t }) => {
  return (
    <Box bgColor={'#F7F7F7'} padding={'19px'} w={'100%'} borderRadius={'10px'}>
      <SliderCommnet />
      <VStack w={"100%"} alignItems={"start"} mt={'10px'}>
        <Text
          fontWeight={"bold"}
          fontSize={"22px"}
          mb={"4px"}
        >
          دیدگاه شما
        </Text>
        <Text fontSize={"14px"}>پدیدگاه‌های تولید شده توسط ابزارهای هوش مصنوعی مجاز نیستند.</Text>
      </VStack>

      <InputGroup height={'61px'} mt={'14px'}>
        <Input height={'inherit'} bgColor={'white'} placeholder="نوشتن متن..." borderRadius={'10px'}
        />
        <InputRightElement w={'150px'} height={'inherit'}>
          <Button bgColor={'#3646B3'} padding={'20px'} w={'150px'} h={'inherit'} color={'white'} type="submit">
            ارسال دیدگاه
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  )
}

export default CommentCard
