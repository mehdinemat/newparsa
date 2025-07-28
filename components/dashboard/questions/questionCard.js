import { Avatar, Badge, Card, Divider, Grid, GridItem, HStack, Text, VStack } from "@chakra-ui/react";
import moment from "moment-jalaali";
import { IoChatbubbleEllipsesOutline, IoEyeOutline } from "react-icons/io5";
import { TiInputChecked } from "react-icons/ti";

const QuestionCard = ({ data }) => {
  return (
    <Grid templateColumns='repeat(4, 1fr)' gap={2} height={'150px'} w={'100%'} bgColor={'white'} borderRadius={'10px'}>
      <GridItem colSpan={4} height={'100%'}>
        <Card as={VStack} height={'100%'} w={'100%'} variant={'unstyled'} flexShrink={0} gap={0} padding={'10px'} borderRadius={'10px'}>
          <HStack w={'100%'} alignItems={'start'} >
            <VStack w={'100%'} alignItems={'start'}>
              <Text fontWeight={'400'} fontSize={'18px'}>{data?.content}</Text>
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
          <HStack w={'100%'} justifyContent={'space-between'}>
            <HStack w={'100%'} alignItems={'start'} >
              <HStack gap={'14px'} color={'#3646B3'}>
                <HStack gap={'2px'} >
                  <TiInputChecked size={'24px'} />
                  <Text fontWeight={'600'} fontSize={'12px'} >3پسند</Text>
                </HStack>
                <HStack gap={'2px'}>
                  <IoEyeOutline size={'24px'} />
                  <Text fontWeight={'600'} fontSize={'12px'} >3پسند</Text>
                </HStack>
                <HStack gap={'2px'}>
                  <IoChatbubbleEllipsesOutline size={'24px'} />
                  <Text fontWeight={'600'} fontSize={'12px'} >3پسند</Text>
                </HStack>
              </HStack>
            </HStack>
            <HStack w={'100%'} justifyContent={'end'}>
              <Text fontWeight={'500'} fontSize={'14px'} color={'#3646B3'}>{moment(data?.created_at).format("hh:mm:ss jYYYY/jMM/jDD")}
              </Text>
            </HStack>
          </HStack>
        </Card>
      </GridItem>
    </Grid>

  )
}

export default QuestionCard
