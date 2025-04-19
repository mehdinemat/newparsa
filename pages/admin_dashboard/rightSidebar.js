import { Box, Divider, HStack, IconButton, Text, VStack } from "@chakra-ui/react"
import { BsReply } from "react-icons/bs"
import { FaQuestion } from "react-icons/fa"
import { IoPersonOutline } from "react-icons/io5"



const menuList = [
  { title: 'پروفایل', icon: <IoPersonOutline /> },
  { title: 'پرسش‌ها', icon: <FaQuestion /> },
  { title: 'پاسخ‌ها', icon: <BsReply /> },
]

const RightSidebar = () => {
  return (
    <VStack w={'100%'} alignItems={'center'} border={'1px'} borderRadius={'15px'} borderColor={'gray.200'} padding={'20px'} pt={'80px'}>
      <Text fontWeight={'bold'} fontSize={'20px'}>حسن الماسی</Text>
      <Text fontSize={'sm'}>مدیر</Text>
      {/* <Text fontSize={'sm'}>آخرین فعالیت: ۳ روز پیش</Text> */}
      <Divider my={'20px'} />
      <VStack w={'100%'} alignItems={'start'} padding={'0px'}>
        {
          menuList?.map((item, index) => (
            <HStack position={'relative'}>
              {index == 0 && <Box w={'2px'} height={'40px'} bgColor={'#29CCCC'} right={'-21px'} position={'absolute'}></Box>}
              <IconButton icon={item?.icon} color={index == 0 ? '#23D9D7' : 'black'} fontSize={'20px'} />
              <Text color={index == 0 ? '#23D9D7' : 'black'}>{item?.title}</Text>
            </HStack>
          ))
        }
      </VStack>
    </VStack>
  )
}

export default RightSidebar
