import { Avatar, Card, Divider, HStack, Text, VStack } from "@chakra-ui/react"

const AnswerCard = () => {
  return (
    <Card as={VStack} height={'119px'} w={'100%'} bgColor={'white'} variant={'unstyled'} flexShrink={0} gap={0} padding={'10px'}>
      <HStack w={'100%'} alignItems={'start'} >
        <VStack w={'100%'} alignItems={'start'}>
          <Text fontWeight={'400'} fontSize={'12px'}>آیا می‌توان نذر کرد که فطریه را به زلزله زده‌گان داد؟ اگر نتوانیم آن را انجام دهیم، آیا می‌توان فطریه را به یک بدهکار ورشکسته داد؟</Text>

          <Divider my={'5px'} />
        </VStack>
      </HStack>
      <HStack w={'100%'} alignItems={'start'} justifyContent={'space-between'}>
        <HStack w={'100%'}>
          <Avatar height={'19px'} width={'19px'} />
          <VStack gap={0} alignItems={'start'}>
            <Text fontWeight={'800'} fontSize={'9px'}>محمد مهدی</Text>
            <Text fontWeight={'200'} fontSize={'5px'}>mohamadi@gmail.com</Text>
          </VStack>
        </HStack>
        <HStack w={'100%'} alignItems={'center'} justifyContent={'end'} height={'100%'}>
          <Text fontWeight={'500'} fontSize={'10px'} color={'#3646B3'}>1404/4/1</Text>
          <Text fontWeight={'500'} fontSize={'10px'} color={'#3646B3'}>15:30</Text>
        </HStack>
      </HStack>
    </Card>
  )
}

export default AnswerCard
