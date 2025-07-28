import { Avatar, Badge, Button, Card, Checkbox, Divider, Grid, GridItem, HStack, Image, Text, VStack } from "@chakra-ui/react"
import { IoArrowBack, IoChatbubbleEllipsesOutline, IoEyeOutline } from "react-icons/io5"
import { TiInputChecked } from "react-icons/ti"

const QuestionCard = () => {
  return (
    <Grid templateColumns='repeat(4, 1fr)' gap={2} height={'150px'} w={'100%'}>
      <GridItem colSpan={3} height={'100%'}>
        <Card as={VStack} height={'100%'} w={'100%'} bgColor={'#F7F7F7'} variant={'unstyled'} flexShrink={0} gap={0} padding={'10px'} borderRadius={'10px'}>
          <HStack w={'100%'} alignItems={'start'} >
            <Checkbox></Checkbox>
            <VStack w={'100%'} alignItems={'start'}>
              <Text fontWeight={'400'} fontSize={'18px'}>آیا می‌توان نذر کرد که فطریه را به زلزله زده‌گان داد؟  داد؟</Text>
              <HStack w={'100%'} justifyContent={'space-between'}>
                <HStack>
                  <Badge bgColor={'#29CCCC2B'} color={'#16A6A6'} fontSize={'12px'} padding={'5px'} borderRadius={'5px'}>خداشناسی</Badge>
                  <Badge bgColor={'#29CCCC2B'} color={'#16A6A6'} fontSize={'12px'} padding={'5px'} borderRadius={'5px'}>خداشناسی</Badge>
                  <Badge bgColor={'#29CCCC2B'} color={'#16A6A6'} fontSize={'12px'} padding={'5px'} borderRadius={'5px'}>خداشناسی</Badge>
                  <Badge bgColor={'#29CCCC2B'} color={'#16A6A6'} fontSize={'12px'} padding={'5px'} borderRadius={'5px'}>خداشناسی</Badge>
                </HStack>
                <HStack alignItems={'center'}>
                  <Avatar height={'24px'} width={'24px'} />
                  <Text fontWeight={'400'} fontSize={'12px'} color={'#999999'}>اسلام کوئست</Text>
                  <Divider orientation="vertical" />
                </HStack>
              </HStack>
              <HStack w={'100%'} justifyContent={'end'}>


              </HStack>
              <Divider my={'5px'} />
            </VStack>
          </HStack>
          <HStack w={'100%'} alignItems={'start'}>
            <HStack w={'100%'}>
              <Text fontWeight={'500'} fontSize={'14px'} color={'#3646B3'}>1404/4/1</Text>
              <Text fontWeight={'500'} fontSize={'14px'} color={'#3646B3'}>15:30</Text>

              {/* <Avatar height={'19px'} width={'19px'} />
                        <VStack gap={0} alignItems={'start'}>
                          <Text fontWeight={'800'} fontSize={'9px'}>محمد مهدی</Text>
                          <Text fontWeight={'200'} fontSize={'5px'}>mohamadi@gmail.com</Text>
                        </VStack> */}
            </HStack>
            <HStack>
              <HStack gap={'14px'} color={'#3646B3'}>
                <HStack gap={'2px'} >
                  <TiInputChecked width={'10px'} height={'15px'} />
                  <Text fontWeight={'600'} fontSize={'12px'} >3پسند</Text>
                </HStack>
                <HStack gap={'2px'}>
                  <IoEyeOutline width={'10px'} height={'15px'} />
                  <Text fontWeight={'600'} fontSize={'12px'} >3پسند</Text>
                </HStack>
                <HStack gap={'2px'}>
                  <IoChatbubbleEllipsesOutline width={'15px'} height={'10px'} />
                  <Text fontWeight={'600'} fontSize={'12px'} >3پسند</Text>
                </HStack>
              </HStack>
            </HStack>
          </HStack>
        </Card>
      </GridItem>
      <GridItem height={'100%'}>
        <Card height={'100%'} w={'100%'} variant={'unstyled'} flexShrink={0} position={'relative'}>
          <Image position={'absolute'} src="/medal.png" height={'56px'} w={'40px'} left={'10px'} />
          <Text fontWeight={'900'} fontSize={'15px'} position={'absolute'} color={'#29CCCC'} left={'25px'} top={'27px'}>7</Text>
          <HStack w={'100%'} height={'100%'} justifyContent={'space-between'} bgColor={'#F7F7F7'} padding={'16px'} borderRadius={'10px'}>
            <HStack position={'relative'}>
              <Avatar height={'42px'} width={'42px'} />
              <VStack gap={0} w={'100%'} alignItems={'start'}>
                <Text fontWeight={'900'} fontSize={'15px'}>محمد محمدی</Text>
                <Text fontWeight={'300'} fontSize={'10px'}>mohammadi@gmail.com</Text>
              </VStack>
            </HStack>
          </HStack>
          <Button leftIcon={<IoArrowBack />} bgColor={'#29CCCC'} minHeight={'36px'} w={'100%'} mt={'2px'} borderRadius={'10px'}>مشاهده فعالیت</Button>
        </Card>
      </GridItem>
    </Grid>

  )
}

export default QuestionCard
