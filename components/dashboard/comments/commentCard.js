

import { Box, Card, Divider, Grid, GridItem, HStack, Text, VStack } from "@chakra-ui/react"
import { IoChatbubbleEllipsesOutline, IoEyeOutline } from "react-icons/io5"
import { TiInputChecked } from "react-icons/ti"

const CommentCard = () => {
  return (
    <Grid templateColumns='repeat(4, 1fr)' gap={2} height={'170px'} w={'100%'}>
      <GridItem colSpan={4} height={'100%'}>
        <Card as={VStack} height={'100%'} w={'100%'} bgColor={'white'} variant={'unstyled'} flexShrink={0} gap={0} padding={'10px'} borderRadius={'10px'}>
          <HStack w={'100%'} alignItems={'start'} >
            <VStack w={'100%'} alignItems={'start'}>
              <Box display={'flex'} height={'38px'} bgColor={'#F3F3F3'} w={'100%'} alignItems={'center'} p={'8px'} position={'relative'} pr={'10px'} borderRadius={'5px'}>
                <Box bgColor={'#3646B3'} height={'90%'} w={'3px'} position={'absolute'} zIndex={'9999'} borderTopRightRadius={'10px'} borderBottomRightRadius={'10px'} right={'1px'} />
                <Text>آیا می‌توان نذر کرد که فطریه را به زلزله زده‌گان داد؟  داد؟</Text>
              </Box>
              <Text fontWeight={'400'} fontSize={'18px'}>آیا می‌توان نذر کرد که فطریه را به زلزله زده‌گان داد؟  داد؟</Text>
              <HStack w={'100%'} justifyContent={'end'}>


              </HStack>
              <Divider my={'5px'} />
            </VStack>
          </HStack>
          <HStack w={'100%'} alignItems={'start'} justifyContent={'space-between'}>
            <HStack w={'100%'}>
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
            <HStack w={'100%'} justifyContent={'end'}>
              <Text fontWeight={'500'} fontSize={'14px'} color={'#3646B3'}>1404/4/1</Text>
              <Text fontWeight={'500'} fontSize={'14px'} color={'#3646B3'}>15:30</Text>
            </HStack>
          </HStack>
        </Card>
      </GridItem>
    </Grid>
  )
}

export default CommentCard
