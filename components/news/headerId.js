import { Box, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { Geist, Geist_Mono } from "next/font/google";
import { useRouter } from "next/router";
import { FaHeadphonesAlt } from "react-icons/fa";
import { IoCalendarOutline, IoDocuments, IoTime } from "react-icons/io5";
import { MdKeyboardVoice } from "react-icons/md";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const menuList = [
  {
    title: "صفحه اصلی",
    icon: <MdKeyboardVoice fontSize={"18px"} />,
    link: "audio",
  },
  { title: "تصویر به متن", icon: <IoDocuments fontSize={"18px"} /> },
  { title: "صوت به متن", icon: <FaHeadphonesAlt fontSize={"18px"} /> },
  // { title: 'ارتباط دادن نماز جمعه و حاکمیت', icon: <FaPrayingHands fontSize={'18px'} /> },
  // { title: 'صفحه مسئولین', icon: <BsFillPersonFill fontSize={'18px'} /> },
  // { title: 'بانک اطلاعات مسائل مربوط نماز جمعه', icon: <IoFileTrayStacked fontSize={'18px'} /> },
  // { title: 'توصیف خطبه', icon: <FaFile fontSize={'18px'} /> },
];

const siteData = [
  {
    title: "سوال",
    number: "234",
  },
  {
    title: "برچسب",
    number: "52353",
  },
  {
    title: "مرجع",
    number: "43",
  },
  {
    title: "منبع",
    number: "2",
  },
  {
    title: "زبان",
    number: "3",
  },
];

const HeaderId = ({ children }) => {
  const router = useRouter();

  return (
    <Box
      marginTop={{ base: '60px', md: "100px" }}
      as={Stack}
      justifyContent={"center"}
      alignItems={"center"}
      width="100%"
      height={{ base: '400px', md: "500px" }}
      bg={"#3646B3"}
      p={2}
      px={4}
      bgImage={"./homeheader.png"}
      bgSize="cover" // 👈 this makes it cover the container
      bgRepeat="no-repeat"
      bgPosition="center"
    >
      <HStack
        height={{ base: '400px', md: "500px" }}
        w={"100%"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <VStack
          w={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
          height={"100%"}
        >
          <Stack
            maxW="80%"
            mx="auto"
            py={4}
            top={'0px'}
            textAlign={'center'}
          // position={"absolute"}
          >
            <Text color={'#29CCCC'} fontSize={'18px'}>اخبار</Text>
            <Text color={'white'} fontWeight={'bold'} fontSize={'26px'} my={'10px'}>عنوان خبر در این قسمت قرار می گیرید</Text>
            <HStack w={'100%'} alignItems={'center'} textAlign={'center'} justifyContent={'center'}>
              <HStack>
                <IoCalendarOutline color="white" />
                <Text color={'white'}>۱۶ دی ۱۴۰۲، دی ۱۴۰۲</Text>
              </HStack>
              <HStack display={{ base: 'none', md: 'flex' }}>
                <IoTime color="white" />
                <Text color={'white'}>زمان مورد نیاز برای مطالعه: ۷ دقیقه</Text>
              </HStack>
            </HStack>
          </Stack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default HeaderId;
