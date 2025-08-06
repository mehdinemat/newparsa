import MainLayout from "@/components/mainLayout";
import Header from "@/components/product/header";
import SliderProduct from "@/components/product/slider";
import {
  Box,
  Button,
  HStack,
  Image,
  Stack,
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
      >
        <Stack dir="rtl" justifyContent={"space-between"} direction={{ base: 'column', md: 'row' }} w={{ base: 'calc( 100% - 10px )', md: "100%" }}>
          <VStack w={"100%"} order={{ base: 2, md: 1 }} alignItems={{ base: 'center', md: "start" }}>
            <Text

              fontSize={"24px"}
              fontWeight={"bold"}
              w={"auto"}
              textAlign={"start"}
              mb={"10px"}
            >
              موتور جستجو هوشمند سوالات
            </Text>
            <Text w={"auto"} fontSize={"16px"} textAlign={"start"} whiteSpace="normal">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است
            </Text>
            <Button bgColor={"#29CCCC"} fontWeight={"normal"} mt={"20px"}>
              اطلاعات بیشتر
            </Button>
          </VStack>
          <Stack w={"100%"} order={{ base: 1, md: 2 }} alignItems={{ base: 'center' }}>
            <Image src="../../questionlogo.png" w={{ base: '357px', md: "509px" }} h={{ base: '350px', md: "500px" }} />
          </Stack>
        </Stack>
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
      >
        <Stack dir="rtl" justifyContent={"space-between"} direction={{ base: 'column', md: 'row' }} w={{ base: 'calc( 100% - 10px )', md: "100%" }}>
          <Stack w={"100%"} alignItems={{ base: 'center' }}>
            <Image src="../../questionlogo.png" w={{ base: '357px', md: "509px" }} h={{ base: '350px', md: "500px" }} />
          </Stack>

          <VStack w={"100%"} alignItems={{ base: 'center', md: "start" }}>
            <Text
              fontSize={"24px"}
              fontWeight={"bold"}
              w={"auto"}
              textAlign={"start"}
              mb={"10px"}
            >
              موتور جستجو هوشمند سوالات
            </Text>
            <Text w={"auto"} fontSize={"16px"} textAlign={"start"} whiteSpace="normal">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است
            </Text>
            <Button bgColor={"#29CCCC"} fontWeight={"normal"} mt={"20px"}>
              اطلاعات بیشتر
            </Button>
          </VStack>
        </Stack>
      </Box>
      <Box
        marginTop={{ base: '0px', md: "100px" }}
        as={Stack}
        justifyContent={"center"}
        alignItems={"center"}
        width="100%"
        height={{ base: '386px', md: "564px" }}
        bg={"#3646B3"}
        p={2}
        px={4}
        bgImage={"./homeheader.png"}
        bgSize="cover" // 👈 this makes it cover the container
        bgRepeat="no-repeat"
        bgPosition="center"
      >
        <HStack
          height={{ base: '380px', md: "500px" }}
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
              maxW={{ base: '100%', md: "80%" }}
              mx="auto"
              py={4}
              px={{ base: 8 }}
              top={'0px'}
              textAlign={'center'}
            // position={"absolute"}
            >
              <SliderProduct items={items} title={'سایر محصولات'} height={slidesToShow == 1 ? '386px' : null} />
            </Stack>
          </VStack>
        </HStack>
      </Box>
    </MainLayout>
  );
};

export default Index;
