import MainLayout from "@/components/mainLayout";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Divider,
  Grid,
  GridItem,
  HStack,
  Text,
  VStack
} from "@chakra-ui/react";
import { Geist, Geist_Mono } from "next/font/google";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import LeftSidebar from "@/components/home/leftsidebar";
import QuestionMCard from "@/components/home/mobile/questionMCard";
import QuestionCard from "@/components/questionCars";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const items = [
  {
    image: "/img1.jpg",
    title: "آیت الله محمدتقی بهجت فومنی",
    button: "اطلاعات بیشتر",
  },
  {
    image: "/img2.jpg",
    title: "آیت الله جعفر سبحانی خیابانی تبریزی",
    button: "اطلاعات بیشتر",
  },
  {
    image: "/img3.jpg",
    title: "آیت الله سید عبدالکریم موسوی اردبیلی",
    button: "اطلاعات بیشتر",
  },
];
const items2 = [
  {
    image: "/img1.jpg",
  },
  {
    image: "/img2.jpg",
  },
  {
    image: "/img3.jpg",
  },
];

const Index = ({ children }) => {

  return (
    <MainLayout>
      <Box
        w="100%"
        alignItems={"center"}
        justifyContent={"center"}
        maxW="container.xl"
        mx="auto"
        p={"20px"}
        mt={{ base: '60px', md: '100px' }}
      >
        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
          templateAreas={{
            base: `"main" "right" "left" "slider"`,
          }} gap={"20px"} w={"100%"} >

          {/* Right Sidebar */}
          <Box w="100%"
            maxW={{ base: "calc( 100vw - 50px )", md: '100vw' }}
            overflow="hidden"
            wordBreak="break-word"
            order={{ base: 2, md: 1 }}
            zIndex={100}
            border={"1px"}
            borderColor={"#EBEBEB"}
            borderRadius={"15px"}
            padding={'10px'}
          >
            <Text fontWeight={"bold"} fontSize={"16px"}>
              موضوعات
            </Text>
            <Accordion dir="rtl" mt={"20px"} w="100%">
              <AccordionItem>
                <h2>
                  <AccordionButton flexDirection="row-reverse">
                    <AccordionIcon ml={2} />
                    <Box as="span" flex="1" textAlign="right">
                      تب اول
                    </Box>
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>لورم ایپسوم متن ساختگ</AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton flexDirection="row-reverse">
                    <AccordionIcon ml={2} />
                    <Box as="span" flex="1" textAlign="right">
                      تب دوم
                    </Box>
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>لورم ایپسوم متن ساختگی</AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton flexDirection="row-reverse">
                    <AccordionIcon ml={2} />
                    <Box as="span" flex="1" textAlign="right">
                      تب دوم
                    </Box>
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>لورم ایپسوم متن ساختگی</AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton flexDirection="row-reverse">
                    <AccordionIcon ml={2} />
                    <Box as="span" flex="1" textAlign="right">
                      تب دوم
                    </Box>
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>لورم ایپسوم متن ساختگی</AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton flexDirection="row-reverse">
                    <AccordionIcon ml={2} />
                    <Box as="span" flex="1" textAlign="right">
                      تب دوم
                    </Box>
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>لورم ایپسوم متن ساختگی</AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton flexDirection="row-reverse">
                    <AccordionIcon ml={2} />
                    <Box as="span" flex="1" textAlign="right">
                      تب دوم
                    </Box>
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>لورم ایپسوم متن ساختگی</AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>

          {/* Main Content */}
          <Box p={{ base: 0, md: "6" }} order={{ base: 1, md: 2 }} as={GridItem}
            colSpan={{ md: 2 }} w="100%" overflowWrap="break-word"
            wordBreak="break-word"
            maxW="100vw"
            whiteSpace="normal"
            pr={{ base: 0, md: '21px' }}
          >

            <HStack w="100%" whiteSpace="normal"
              justifyContent={"space-between"}
              mb={{ base: '20px', md: "10px" }}

              alignItems={{ base: 'center', md: "start" }}
            >
              <Text fontWeight={"bold"} fontSize={"16px"}>
                سؤال‌ها پیشنهادی
              </Text>
              <Button
                width={"189px"}
                height={"50px"}
                bgColor={"#F9C96D"}
                color={"black"}
                fontWeight={"normal"}
                borderRadius={'10px'}
                onClick={e => handleNewQuestionButton()}
              >
                سوال خود را بپرسید
              </Button>
            </HStack>

            <VStack display={{ base: 'none', md: 'flex' }}>
              <Divider my={"20px"} />
              <QuestionCard />
              <Divider my={"20px"} />
              <QuestionCard />
              <Divider my={"20px"} />
            </VStack>

            <VStack display={{ base: 'flex', md: 'none' }}>
              <QuestionMCard />
              <Divider my={"20px"} />
              <QuestionMCard />
              <Divider my={"20px"} />
            </VStack>

          </Box>

          {/* Left Sidebar */}
          <Box order={3} as={GridItem}
            colSpan={'1'} w="100%"
            maxW={{ base: "calc( 100vw - 50px )", md: '100vw' }}

            whiteSpace="normal"
            overflowWrap="break-word">
            <Box
              w={'100%'}
              p="4"
              border={"1px"}
              borderColor={"#EBEBEB"}
              borderRadius={"15px"}
              height={"500px"}
              mb={"30px"}
            >
              <Text fontWeight={"bold"} fontSize={"16px"}>
                منابع سوال ها
              </Text>
              <VStack mt={"20px"} w={"100%"} alignItems={"start"}>
                <LeftSidebar />
                <Divider />
                <LeftSidebar />
                <Divider />
                <LeftSidebar />
                <Divider />
                <LeftSidebar />
                <Divider />
              </VStack>
            </Box>
            <Box
              w={'100%'}
              p="4"
              border={"1px"}
              borderColor={"#EBEBEB"}
              borderRadius={"15px"}
              bgColor={"#CFF186"}
            >
              <Text fontWeight={"bold"} fontSize={"16px"}>
                حدیث روز
              </Text>
              <Text mt={"10px"}>
                عن الامام الحسن علیه السلام: «رَأَیْتُ أُمِّی فَاطِمَةَ ع قَامَتْ
                فِی مِحْرَابِهَا لَیْلَةَ جُمُعَتِهَا فَلَمْ تَزَلْ رَاکِعَةً
                سَاجِدَةً حَتَّى اتَّضَحَ عَمُودُ الصُّبْحِ وَ سَمِعْتُهَا تَدْعُو
                لِلْمُؤْمِنِینَ» در محرابش ایستاده بود و پیوسته در حال رکوع و سجده
                بود تا اینکه روشنایی صبح نمایان شد و از او شنیدم که برای مردان و
                زنان مومن دعا می‌کرد و با اسم آنان را نام می‌برد و برایشان زیاد
                دعا می‌کرد. علل الشرائع، ج‏۱ ص ۱۸۱ بحارالانوار، ج ۴۳ ص ۸۲ (۱۶۶۷)
              </Text>
            </Box>
          </Box>
        </Grid>
      </Box>

    </MainLayout >
  );
}

export default Index