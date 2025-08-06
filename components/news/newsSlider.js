import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
  VStack
} from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1, // or 1 or 2
  slidesToScroll: 1,
  rtl: false, // for RTL support
};

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



const NewsSlider = () => {
  return (
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
      <Slider {...sliderSettings}>
        {items.map((item, index) => (
          <Flex
            textAlign={"center"}
            w="100%"
            h="100%"
            key={index}
            p={"10px"}
            direction="column"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction={{ base: 'column', md: 'row' }} dir="rtl">
              <VStack w={'100%'} alignItems={{ baes: 'center', md: 'start' }} order={{ base: 2, md: 1 }}>
                <Text fontSize={'24px'} fontWeight={'bold'} color={'white'} w={{ base: 'auto', md: '280px' }} textAlign={{ base: 'center', md: 'start' }}>موتور جستجو هوشمند سوالات</Text>
                <Text w={{ base: 'auto', md: '500px' }} fontSize={'16px'} textAlign={{ base: 'center', md: 'start' }} color={'white'}>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                  با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است
                </Text>
                <HStack w={'100%'} justifyContent={{ base: 'center', md: 'start' }}>
                  <Button bgColor={'#29CCCC'} fontWeight={'normal'} mt={'20px'} w={'80px'}>ادامه خبر</Button>
                </HStack>
              </VStack>
              <Image src="./newsslider.png" w={{ base: '356', md: '560px' }} h={{ base: '262px', md: '410px' }} order={{ base: 1, md: 2 }} />
            </Stack>
          </Flex>
        ))}
      </Slider>
    </Box>
  );
};

export default NewsSlider;
