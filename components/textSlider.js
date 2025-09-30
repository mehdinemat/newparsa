import {
  Box,
  Text,
  useBreakpointValue,
  VStack
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";


const items = ['جامعه اسلامی', 'قرآن', 'جمهوری اسلامی', 'احادیث معتبر', 'روایات', 'جامعه اسلامی',]


const TextSlider = ({ height, borderRadius, width = "auto" }) => {
  const slidesToShow = useBreakpointValue({ base: 1, md: 2, lg: 4 }); // responsive value

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow == 1 ? 4 : 5, // or 1 or 2
    slidesToScroll: 1,
    rtl: false, // for RTL support
    arrows: false
  };

  const router = useRouter();
  const { t } = useTranslation();

  return (
    <VStack
      w={"calc( 100% - 40px )"}
      alignItems={"center"}
      justifyContent={'center'}
      height={'60px'}

    >
      <Box w="100%" alignItems={"center"} justifyContent={"center"} mx="auto">
        <Slider {...sliderSettings}>
          {items.map((item, index) => (
            <Box
              key={index}
              boxSizing="border-box"
              height={'41px'}
              px={'3px'}
            >
              <Box
                cursor={"pointer"}
                textAlign={"center"}
                h="100%"
                w={'100%'}
                key={index}
                direction="column"
                justifyContent="center"
                alignItems="center"
                bgColor={'#FFFFFF80'}
                display={'flex'}
                borderRadius={'10px'}
              >
                {item && (
                  <Text fontWeight="400" color={'#3646B3'} fontSize={'20px'} align={'justify'} dir="rtl" lineHeight={'188%'} letterSpacing={'-0.5px'} textAlign={'center'} alignItems={'center'}>
                    {item}
                  </Text>
                )}
              </Box>
            </Box>

          ))}
        </Slider>
      </Box>
    </VStack>
  );
};

export default TextSlider;
