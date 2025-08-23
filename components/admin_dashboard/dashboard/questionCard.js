import { Avatar, Button, Card, Checkbox, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import moment from "moment-jalaali";
import { IoArrowBack, IoChatbubbleEllipsesOutline, IoEyeOutline } from "react-icons/io5";
import { TiInputChecked } from "react-icons/ti";

const questionCard = ({ data }) => {
  return (
    <Card as={VStack} height={'126px'} w={'100%'} bgColor={'#F7F7F7'} variant={'unstyled'} flexShrink={0} gap={0} padding={'10px'}>
      <HStack w={'100%'} alignItems={'start'} >
        <Checkbox></Checkbox>
        <VStack w={'100%'} alignItems={'start'}>
          <Text fontWeight={'400'} fontSize={'10px'}>{data?.content?.slice(0, 100)}</Text>
          <HStack w={'100%'} justifyContent={'space-between'}>
            {/* <HStack>
              <Badge colorScheme="blue" fontSize={'7px'}>خداشناسی</Badge>
              <Badge colorScheme="blue" fontSize={'7px'}>خداشناسی</Badge>
              <Badge colorScheme="blue" fontSize={'7px'}>خداشناسی</Badge>
              <Badge colorScheme="blue" fontSize={'7px'}>خداشناسی</Badge>
            </HStack> */}
            <Text fontWeight={'400'} fontSize={'8px'}>{moment(data?.created_at).format("jYYYY/jMM/jDD")}
            </Text>
          </HStack>
          <HStack w={'100%'} justifyContent={'space-between'}>
            {/* <HStack>
              <Avatar height={'13px'} width={'13px'} />
              <Text fontWeight={'400'} fontSize={'7px'}>اسلام کوئست</Text>
              <Divider orientation="vertical" />
            </HStack> */}
            <HStack>
              <HStack gap={'14px'}>
                <HStack gap={'2px'}>
                  <TiInputChecked width={'10px'} height={'10px'} color="#C2C2C2" />
                  <Text fontWeight={'600'} fontSize={'7px'} color={'#C2C2C2'}>{data?.like_count} پسند</Text>
                </HStack>
                <HStack gap={'2px'}>
                  <IoEyeOutline width={'10px'} height={'10px'} color="#C2C2C2" />
                  <Text fontWeight={'600'} fontSize={'7px'} color={'#C2C2C2'}>{data?.viewer} بازدید</Text>
                </HStack>
                <HStack gap={'2px'}>
                  <IoChatbubbleEllipsesOutline width={'10px'} height={'10px'} color="#C2C2C2" />
                  <Text fontWeight={'600'} fontSize={'7px'} color={'#C2C2C2'}>{data?.comment_count} کامنت</Text>
                </HStack>
              </HStack>
            </HStack>
          </HStack>
          <Divider my={'5px'} />
        </VStack>
      </HStack>
      <HStack w={'100%'} alignItems={'start'}>
        <HStack w={'100%'}>
          <Avatar height={'19px'} width={'19px'} />
          <VStack gap={0} alignItems={'start'}>
            <Text fontWeight={'800'} fontSize={'9px'}>محمد مهدی</Text>
            <Text fontWeight={'200'} fontSize={'5px'}>mohamadi@gmail.com</Text>
          </VStack>
        </HStack>
        <Button rightIcon={<IoArrowBack />} bgColor={'#3646B3'} height={'18px'} width={'91px'} fontSize={'8px'}>مشاهده کامل</Button>
      </HStack>
    </Card>
  )
}

export default questionCard
