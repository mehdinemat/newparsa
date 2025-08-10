import MainLayout from "@/components/mainLayout";
import Header from "@/components/product/header";
import SliderProduct from "@/components/product/slider";
import {
  Box,
  Divider,
  HStack,
  Text,
  useBreakpointValue,
  VStack
} from "@chakra-ui/react";

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

const Index = () => {


  const slidesToShow = useBreakpointValue({ base: 1, md: 2, lg: 4 }); // responsive value

  return (
    <MainLayout>
      <Header />
      <Box
        w="100%"
        alignItems={"center"}
        justifyContent={"center"}
        maxW="container.xl"
        mx="auto"
        p={{ base: '20px', md: "60px" }}
        height={"100%"}
        my={"20px"}
        py={'0px'}
      >
        <HStack w={"100%"} order={{ base: 2, md: 1 }} alignItems={{ base: 'center', md: "center" }} justifyContent={'space-between'} mb={'40px'}>
          <Text
            color={'#3646B3'}
            fontSize={"24px"}
            fontWeight={"bold"}
            w={"250px"}
            textAlign={"start"}
            mb={"10px"}
          >
            محصولات پربازدید
          </Text>
          <Divider w={'100%'} borderColor={'#3646B3'} />
          <Text fontSize={'14px'} fontWeight={'extrabold'} color={'#3646B3'} w={'150px'}>مشاهده همه</Text>
        </HStack>
        <VStack justifyContent={"space-between"} direction={{ base: 'column', md: 'row' }} w={{ base: 'calc( 100% - 10px )', md: "100%" }}>
          <SliderProduct bgColor={"white"} />
        </VStack>
      </Box>
      <Box
        w="100%"
        alignItems={"center"}
        justifyContent={"center"}
        maxW="container.xl"
        mx="auto"
        p={{ base: '20px', md: "60px" }}
        height={"100%"}
        my={"20px"}
        py={'0px'}
      >
        <VStack justifyContent={"space-between"} direction={{ base: 'column', md: 'row' }} w={{ base: 'calc( 100% - 10px )', md: "100%" }}>
          <SliderProduct bgColor={"#3646B3"} title={'محصولات جدید'} />
        </VStack>
      </Box>
      <Box
        w="100%"
        alignItems={"center"}
        justifyContent={"center"}
        maxW="container.xl"
        mx="auto"
        p={{ base: '20px', md: "60px" }}
        height={"100%"}
        my={"20px"}
        py={'0px'}
      >
        <HStack w={"100%"} order={{ base: 2, md: 1 }} alignItems={{ base: 'center', md: "center" }} justifyContent={'space-between'} mb={'40px'}>
          <Text
            color={'#3646B3'}
            fontSize={"24px"}
            fontWeight={"bold"}
            w={"350px"}
            textAlign={"start"}
            mb={"10px"}
          >
            محصولات پرسش و پاسخ
          </Text>
          <Divider w={'100%'} borderColor={'#3646B3'} />
          <Text fontSize={'14px'} fontWeight={'extrabold'} color={'#3646B3'} w={'150px'}>مشاهده همه</Text>
        </HStack>
        <VStack justifyContent={"space-between"} direction={{ base: 'column', md: 'row' }} w={{ base: 'calc( 100% - 10px )', md: "100%" }}>
          <SliderProduct bgColor={"white"} />
        </VStack>
      </Box>
    </MainLayout>
  );
};

export default Index;
