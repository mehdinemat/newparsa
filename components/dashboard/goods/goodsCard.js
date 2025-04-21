import { Flex, HStack, IconButton, Text } from "@chakra-ui/react"
import { GiGlobeRing } from "react-icons/gi"

const GoodsCard = () => {
  return (
    <Flex direction={{ base: 'column', md: 'row' }} w={'100%'} justifyContent={'space-between'}>
      <HStack>
        <IconButton icon={<GiGlobeRing color="white" fontSize={'20px'} />} bgColor={'#29CCCC'} />
        <Text>دریافت انگشتر عقیق به خاطر پاسخ دقیق به سؤال </Text>
      </HStack>
      <Text fontSize={'xs'} color={'gray'} mt={{ base: '20px', md: '0px' }}> ۲۱ ساعت قبل</Text>
    </Flex>
  )
}

export default GoodsCard
