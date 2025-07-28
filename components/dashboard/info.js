import { Card, HStack, Text, VStack } from "@chakra-ui/react"

const Info = () => {
  return (
    <Card as={VStack} w={'100%'} variant={'unstyled'} flexShrink={0} padding={'3px'} borderRadius={'15px'} bgColor={'#F7F7F7'}>
      <HStack w={'100%'} alignItems={'start'} height={'64px'} bgColor={'white'} padding={'10px'} borderRadius={'10px'}>
        <VStack w={'100%'} alignItems={'start'} gap={0}>
          <HStack w={'100%'} justifyContent={'space-between'}>
            <Text fontWeight={'bold'} fontSize={'14px'} color={'#333333'}>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیــک اســت،</Text>
          </HStack>
          <HStack w={'100%'} justifyContent={'end'} color={'#999999'} fontSize={'8px'}>
            <Text>1404/01/27</Text>
            <Text>13:50</Text>
          </HStack>
        </VStack>
      </HStack>
    </Card>
  )
}

export default Info
