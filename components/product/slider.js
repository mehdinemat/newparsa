import {
  Box,
  HStack,
  Image,
  Text,
  useBreakpointValue
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";


const items = [
  'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،.',
  'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،.',
  'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،.',
  'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،.',
  'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،.',
]

const SliderProduct = ({ height, borderRadius, width = "auto", bgColor, title = '' }) => {
  const slidesToShow = useBreakpointValue({ base: 1, md: 2, lg: 4 }); // responsive value

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow == 1 ? 2 : 3, // or 1 or 2
    slidesToScroll: 1,
    rtl: false, // for RTL support
  };

  const router = useRouter();
  const { t } = useTranslation();

  return (
    <HStack
      w={"100%"}
      alignItems={"start"}
      bgColor={bgColor}
      padding={title ? '17px' : '0px'}
      borderRadius={'15px'}
      overflowX={'hidden'}
    >
      {title && <Text fontSize={'33px'} fontWeight={'extrabold'} color={'white'}>{title}</Text>}
      <Box w="100%" alignItems={"center"} justifyContent={"center"} mx="auto" >
        <Slider {...sliderSettings}>
          {items.map((item, index) => (
            <Box
              key={index}
              px="25px"
              w={'290px'}
              height={'380px'}
              boxSizing="border-box"
              pb={'25px'}
              zIndex={9999}
            >
              <Box
                borderRadius={'15px'}
                cursor={"pointer"}
                textAlign={"center"}
                w="327px"
                h="100%"
                position="relative" // <--- important
                role="group" // <--- needed to trigger hover within group
                p={"3px"}
                direction="column"
                justifyContent="space-between"
                alignItems="center"
                bgColor={'#F3F3F3'}
              >
                <Image src="/producttest.png" height={'287px'} w={'100%'} objectFit={'cover'} borderRadius={'15px'} />
                {item && (
                  <Text fontWeight="bold" fontSize={'10px'} align={'justify'} dir="rtl" p={'12px'} lineHeight={'188%'} letterSpacing={'-0.5px'}>
                    {item}
                  </Text>
                )}

                {/* Hover Button */}
                <Box
                  position="absolute"
                  bottom="-20px"
                  left="50%"
                  transform="translateX(-50%)"
                  opacity={0}
                  _groupHover={{ opacity: 1 }}
                  transition="opacity 0.3s ease"
                  w={'327px'}
                  zIndex={9}

                >
                  <Box
                    as="button"
                    bg="blue.500"
                    color="white"
                    px="20px"
                    py="6px"
                    fontSize="sm"
                    _hover={{ bg: 'blue.600' }}
                    w={'327px'}
                    borderRadius={'15px'}
                  >
                    اطلاعات بیشتر
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}

        </Slider>
      </Box>
    </HStack>
  );
};

export default SliderProduct;
