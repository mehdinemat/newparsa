import { Avatar, Box, Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";


const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2, // or 1 or 2
  slidesToScroll: 1,
  rtl: false, // for RTL support
};




const SliderCom = ({ items, height, borderRadius, width = 'auto', title }) => {

  const router = useRouter()
  const { t } = useTranslation();

  return (
    <VStack w={'100%'} border={'1px'} borderColor={'gray.200'} borderRadius={'16px'} p={'40px'} alignItems={'start'} height={height} my={'20px'}>
      <HStack w={'100%'} justifyContent={'space-between'}>
      <Text fontWeight={'700'} fontSize={'22px'}>{title}</Text>
      <Text fontWeight={'700'} fontSize={'16px'} color="blue.400" cursor={'pointer'} onClick={e=>router.replace('/references')}>{t('show_all')}</Text>
      </HStack>
      <Box w="100%" alignItems={'center'} justifyContent={'center'} mx="auto" >
        <Slider {...sliderSettings}>
          {items.map((item, index) => (
            <Flex
              textAlign={'center'}
              w="100%"
              h="100%"
              key={index}
              p={'10px'}
              direction="column"
              justifyContent="space-between"
              alignItems="center"
            >
              <Avatar w="128px" h="128px" borderRadius={borderRadius} />
              {item.title && <Text fontWeight="bold" my={'20px'}>{item.title}</Text>}
              {item.button && <Button bgColor={'#29CCCC'}>{item.button}</Button>}
            </Flex>
          ))}
        </Slider>
      </Box>
    </VStack>

  )
}

export default SliderCom
