import { HStack, Image, Text, VStack } from "@chakra-ui/react"

const LeftSidebar = ({ data , t }) => {
  return (
    <HStack w={'100%'} alignItems={'start'} borderBottom={'1px solid'} borderColor={'#EBEBEB'} p={'10px 0'}>
      <Image
        src="https://m.media-amazon.com/images/I/81xeEPe678L.jpg"
        w={"60px"}
        bgColor={"gray.300"}
        height={"60px"}
        borderRadius={"10px"}
      />
      <VStack w={'100%'} alignItems={'start'}>
        <Text fontSize={"18px"}>{data?.fa_source_name}</Text>
        <Text color={"gray.500"}>{data?.question_count} {t('question')}</Text>
      </VStack>
    </HStack>
  )
}

export default LeftSidebar
