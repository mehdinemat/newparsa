import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const SliderCom = ({ items, height, borderRadius, width = "auto", title , link }) => {
  const slidesToShow = useBreakpointValue({ base: 1, md: 2, lg: 4 }); // responsive value

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow == 1 ? 2 : 6, // or 1 or 2
    slidesToScroll: 1,
    rtl: false, // for RTL support

  };

  const handlePublicFiqure = (item) => {
    window.open(item?.link , '_blank')
    // router.push(`/questions/public_fiqure/${item?.id}/${item?.title}`);
  };

  const router = useRouter();
  const { t } = useTranslation();

  return (
    <VStack
      w={"100%"}
      border={"1px"}
      borderColor={"#3646B3"}
      borderRadius={"16px"}
      p={'30px'}
      alignItems={"start"}
      height={height}
      my={"20px"}
      position={'relative'}
    >
      <HStack w={"100%"} justifyContent={"space-between"} >
        <Text fontWeight={"700"} color={'#3646B3'} fontSize={"22px"} fontFamily={'morabba'} bgColor={'white'} position={'absolute'} top={'-20px'} px={'10px'} right={'20px'}>
          {title}
        </Text>
        {/* <Text
          fontWeight={"700"}
          fontSize={"16px"}
          color="blue.400"
          cursor={"pointer"}
          onClick={(e) => router.push("/references")}
        >
          {t("show_all")}
        </Text> */}
      </HStack>
      <Box w="100%" alignItems={"center"} justifyContent={"center"} mx="auto">
        <Slider {...sliderSettings}>
          {items.map((item, index) => (
            <Flex
              cursor={"pointer"}
              textAlign={"center"}
              h="100%"
              key={index}
              direction="column"
              justifyContent="space-between"
              alignItems="center"
              onClick={(e) => handlePublicFiqure(item)}
              w={'50px'}
            >
              <Box bgColor={'#EBEBEB4D'} padding={'6px'} w={'min-content'} borderRadius={'10px'}>
                <Avatar
                  w="128px"
                  h="128px"
                  borderRadius={borderRadius}
                  src={item?.image}
                />
                {item.title && (
                  <Text fontWeight="bold" my={"20px"} fontSize={'8px'}>
                    {item.title}
                  </Text>
                )}
                {item.button && (
                  <Button bgColor={"#29CCCC"}>{item.button}</Button>
                )}
              </Box>
            </Flex>
          ))}
        </Slider>
      </Box>
    </VStack>
  );
};

export default SliderCom;
