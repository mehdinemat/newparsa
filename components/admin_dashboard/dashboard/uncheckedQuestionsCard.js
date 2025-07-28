import { Avatar, Card, HStack, Text, VStack } from "@chakra-ui/react"

const UncheckedQuestionsCard = () => {
  return (
    <Card as={VStack} height={'117px'} w={'100%'} bgColor={'#F7F7F7'} variant={'unstyled'} flexShrink={0} gap={0} padding={'20px'} justifyContent={'space-between'}>
      <HStack w={'100%'} alignItems={'start'} >
        <VStack w={'100%'} alignItems={'start'}>
          <Text fontWeight={'400'} fontSize={'18px'}>آیا می‌توان نذر کرد که فطریه را به زلزله زده‌گان داد؟  داد؟</Text>

        </VStack>
      </HStack>
      <HStack w={'100%'} alignItems={'start'} justifyContent={'space-between'}>
        <HStack w={'100%'}>
          <Avatar height={'39px'} width={'39px'} />
          <VStack gap={0} alignItems={'start'}>
            <Text fontWeight={'600'} fontSize={'15px'}>محمد مهدی</Text>
            <Text fontWeight={'300'} fontSize={'10px'}>mohamadi@gmail.com</Text>
          </VStack>
        </HStack>
        <HStack w={'100%'} alignItems={'center'} justifyContent={'end'} height={'100%'}>
          <Text fontWeight={'500'} fontSize={'15px'} color={'#3646B3'}>1404/4/1</Text>
          <Text fontWeight={'500'} fontSize={'15pxs'} color={'#3646B3'}>15:30</Text>
        </HStack>
      </HStack>
    </Card>
  )
}

export default UncheckedQuestionsCard
