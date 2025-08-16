import { Box, Card, HStack, Image, Progress, Text, VStack } from "@chakra-ui/react"

const Scores = () => {
  return (
    <Card as={VStack} height={'100%'} w={'100%'} variant={'unstyled'} flexShrink={0} gap={'10px'} padding={'10px'} borderRadius={'15px'} bgColor={'#F7F7F7'}>
      <HStack w={'100%'} alignItems={'start'} height={'64px'} bgColor={'white'} padding={'10px'} borderRadius={'10px'}>
        <VStack w={'100%'} alignItems={'start'}>
          <HStack w={'100%'} justifyContent={'space-between'}>
            <Text fontWeight={'bold'} fontSize={'10px'}>سطح کاربر</Text>
            <Image src="/start.png" />
          </HStack>
          <Box w={'100%'}>
            <Progress value={80} borderRadius={'20px'} colorScheme="teal" />
          </Box>
        </VStack>
      </HStack>
      <HStack w={'100%'} alignItems={'start'} bgColor={'white'} padding={'10px'} borderRadius={'10px'}>
        <VStack w={'100%'} alignItems={'start'}>
          <HStack w={'100%'} justifyContent={'space-between'}>
            <Text fontWeight={'bold'} fontSize={'10px'}>امتیاز سوالات</Text>
            <HStack>
              <Text color={'#29CCCC'}>3.2</Text>
              <Image src="/start.png" />
              <Image src="/start.png" />
              <Image src="/start.png" />
              <Image src="/start.png" />
            </HStack>
          </HStack>
        </VStack>
      </HStack>
      <HStack w={'100%'} alignItems={'start'} bgColor={'white'} padding={'10px'} borderRadius={'10px'}>
        <VStack w={'100%'} alignItems={'start'}>
          <HStack w={'100%'} justifyContent={'space-between'}>
            <Text fontWeight={'bold'} fontSize={'10px'}>امتیاز پاسخ ها</Text>
            <HStack>
              <Text color={'#29CCCC'}>3.2</Text>
              <Image src="/start.png" />
              <Image src="/start.png" />
              <Image src="/start.png" />
              <Image src="/start.png" />
            </HStack>
          </HStack>
        </VStack>
      </HStack>
      {/* <HStack w={'100%'} alignItems={'start'} bgColor={'white'} padding={'10px'} borderRadius={'10px'}>
        <VStack w={'100%'} alignItems={'start'}>
          <HStack w={'100%'} justifyContent={'space-between'}>
            <Text fontWeight={'bold'} fontSize={'10px'}>امتیاز دیدگاه ها</Text>
            <HStack>
              <Text color={'#29CCCC'}>3.2</Text>
              <Image src="/start.png" />
              <Image src="/start.png" />
              <Image src="/start.png" />
              <Image src="/start.png" />
            </HStack>
          </HStack>
        </VStack>
      </HStack>
      <HStack w={'100%'} alignItems={'start'} bgColor={'white'} padding={'10px'} borderRadius={'10px'}>
        <VStack w={'100%'} alignItems={'start'}>
          <HStack w={'100%'} justifyContent={'space-between'}>
            <Text fontWeight={'bold'} fontSize={'10px'}>میزان رضایت کاربران</Text>
            <HStack>
              <Text color={'#29CCCC'}>3.2</Text>
              <Image src="/start.png" />
              <Image src="/start.png" />
              <Image src="/start.png" />
              <Image src="/start.png" />
            </HStack>
          </HStack>
        </VStack>
      </HStack> */}
    </Card>
  )
}

export default Scores
