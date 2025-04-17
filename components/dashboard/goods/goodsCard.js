import { HStack, IconButton, Text } from "@chakra-ui/react"
import { GiGlobeRing } from "react-icons/gi"

const GoodsCard = () => {
  return (
    <HStack w={'100%'} justifyContent={'space-between'}>
      <HStack>
        <IconButton icon={<GiGlobeRing color="white" fontSize={'20px'} />} bgColor={'#29CCCC'} />
        <Text>دریافت انگشتر عقیق به خاطر پاسخ دقیق به سؤال </Text>
      </HStack>
      <Text fontSize={'xs'} color={'gray'} > ۲۱ ساعت قبل</Text>
    </HStack>
  )
}

export default GoodsCard
