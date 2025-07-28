import { Avatar, Box, Button, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { CiBookmark, CiHeart } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { IoPerson } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { RiForbid2Line, RiMedalLine } from "react-icons/ri";
import { TiInputChecked } from "react-icons/ti";

const UserInfoCard = () => {
  return (
    <VStack w={'100%'} alignItems={'start'} justifyContent={'space-between'} height={'100%'}>
      <VStack w={'100%'} alignItems={'start'}>
        <Avatar height={'300px'} width={'100%'} borderRadius={'10px'} />
        <Box w={'100%'} display={'flex'} p={'10px'} borderRadius={'5px'} position={'relative'} padding={'10px'} gap={'12px'}>
          <VStack w={'100%'}>
            <Box as={VStack} w={'100%'} bgColor={'#F3F3F3'} padding={'14px'} borderRadius={'10px'} alignItems={'start'}>
              <HStack>
                <IconButton icon={<IoPerson />} variant={'ghost'} colorScheme="gray" />
                <Text color={'#333333'} fontWeight={'500'} fontSize={'10px'}>محمد محمدی</Text>
              </HStack>
              <HStack>
                <IconButton icon={<MdOutlineEmail />} variant={'ghost'} colorScheme="gray" />
                <Text color={'#333333'} fontWeight={'500'} fontSize={'10px'}>mohammadi@gmail.com</Text>
              </HStack>
              <HStack>
                <IconButton icon={<FaPhoneAlt />} variant={'ghost'} colorScheme="gray" />
                <Text color={'#333333'} fontWeight={'500'} fontSize={'10px'}>+98 912 333 22 11</Text>
              </HStack>
            </Box>
            <HStack w={'100%'} gap={'10px'} >
              <Box display={'flex'} alignItems={'center'} justifyContent={'center'} width={'100%'} height={'50px'} bgColor={'#F3F3F3'} borderRadius={'10px'}>
                <Text fontSize={'14px'}>پاسخ  128</Text>
              </Box>
              <Box display={'flex'} alignItems={'center'} justifyContent={'center'} width={'100%'} height={'50px'} bgColor={'#F3F3F3'} borderRadius={'10px'}>
                <Text fontSize={'14px'}>پاسخ  128</Text>
              </Box>
            </HStack>
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} width={'100%'} padding={'14px'} height={'30px'} bgColor={'#F3F3F3'} borderRadius={'10px'}>
              <HStack>
                <RiMedalLine />
                <Text fontSize={'14px'}>سطح کاربر</Text>
              </HStack>
              <Text fontSize={'14px'}>7</Text>
            </Box>
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} width={'100%'} padding={'14px'} height={'30px'} bgColor={'#F3F3F3'} borderRadius={'10px'}>
              <HStack>
                <CiBookmark />
                <Text fontSize={'14px'}>ذخیره شده ‌ها</Text>
              </HStack>
              <Text fontSize={'14px'}>7</Text>
            </Box>
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} width={'100%'} padding={'14px'} height={'30px'} bgColor={'#F3F3F3'} borderRadius={'10px'}>
              <HStack>
                <HiOutlineChatBubbleOvalLeftEllipsis />
                <Text fontSize={'14px'}>تعداد دیدگاه ها</Text>
              </HStack>
              <Text fontSize={'14px'}>7</Text>
            </Box>
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} width={'100%'} padding={'14px'} height={'30px'} bgColor={'#F3F3F3'} borderRadius={'10px'}>
              <HStack>
                <TiInputChecked />
                <Text fontSize={'14px'}>پسـند ها</Text>
              </HStack>
              <Text fontSize={'14px'}>7</Text>
            </Box>
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} width={'100%'} padding={'14px'} height={'30px'} bgColor={'#F3F3F3'} borderRadius={'10px'}>
              <HStack>
                <CiHeart />
                <Text fontSize={'14px'}>میزان رضایت کابران</Text>
              </HStack>
              <Text fontSize={'14px'}>7</Text>
            </Box>
          </VStack>
        </Box>
      </VStack>
      <HStack w={'100%'} padding={'14px'} justifyContent={'space-between'}>
        <Button colorScheme="gray" color={'red'} fontWeight={'800'} fontSize={'14px'} leftIcon={<RiForbid2Line />} >مسدود کردن </Button>
        <IconButton colorScheme="gray" fontWeight={'800'} fontSize={'14px'} icon={<GoPencil />} variant={'solid'} />
      </HStack>
    </VStack>
  )
}

export default UserInfoCard
