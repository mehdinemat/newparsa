import { Card, HStack, Text, VStack } from "@chakra-ui/react"
import { IoChatbubbleEllipsesOutline, IoEyeOutline } from "react-icons/io5"
import { TiInputChecked } from "react-icons/ti"

const Bookmarks = ({ item }) => {
  return (
    <Card as={VStack} w={'100%'} variant={'unstyled'} flexShrink={0} padding={'3px'} borderRadius={'15px'} bgColor={'#F7F7F7'} height={'88px'}>
      <HStack w={'100%'} alignItems={'start'} height={'88px'} bgColor={'white'} padding={'10px'} borderRadius={'10px'}>
        <VStack w={'100%'} alignItems={'start'} gap={0} height={'100%'} justifyContent={'space-between'}>
          <HStack w={'100%'} justifyContent={'space-between'}>
            <Text fontWeight={'bold'} fontSize={'14px'} color={'#333333'}>{item?.question__content?.length > 150 ? `${item?.question__content?.slice(0, 150)}...` : item?.question__content}</Text>
          </HStack>
          <HStack w={'100%'} justifyContent={'space-between'}>
            <HStack w={'100%'}>
              <HStack gap={'14px'}>
                <HStack gap={'2px'}>
                  <TiInputChecked width={'10px'} height={'10px'} color="#C2C2C2" />
                  <Text fontWeight={'600'} fontSize={'7px'} color={'#C2C2C2'}>3 پسند</Text>
                </HStack>
                <HStack gap={'2px'}>
                  <IoEyeOutline width={'10px'} height={'10px'} color="#C2C2C2" />
                  <Text fontWeight={'600'} fontSize={'7px'} color={'#C2C2C2'}>3 پسند</Text>
                </HStack>
                <HStack gap={'2px'}>
                  <IoChatbubbleEllipsesOutline width={'10px'} height={'10px'} color="#C2C2C2" />
                  <Text fontWeight={'600'} fontSize={'7px'} color={'#C2C2C2'}>3 پسند</Text>
                </HStack>
              </HStack>
            </HStack>
            <HStack w={'100%'} justifyContent={'end'} color={'#999999'} fontSize={'8px'}>
              <Text>1404/01/27</Text>
              <Text>13:50</Text>
            </HStack>
          </HStack>
        </VStack>
      </HStack>

    </Card>
  )
}

export default Bookmarks
