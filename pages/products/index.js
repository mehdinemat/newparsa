import MainLayout from "@/components/mainLayout";
import Header from "@/components/products/header";
import ProductCard from "@/components/products/productcard";
import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Stack,
  Text,
  VStack
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const Index = () => {
    const { t } = useTranslation();
  
  return (
    <MainLayout>
      <Header t={t}/>
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
        <Stack direction={{ base: 'column', md: 'row' }} dir="rtl" w={{ base: 'calc( 100% - 10px )', md: "100%" }} justifyContent={"space-between"}>
          <Stack w={"100%"} alignItems={{ base: 'center' }}>
            <Image src="/questionlogo.png" w={{ base: '225px', md: "509px" }} h={{ base: '222px', md: "500px" }} />
          </Stack>

          <VStack w={'100%'} alignItems={{ base: 'center', md: "start" }}>
            <Text
              fontSize={"20px"}
              fontWeight={"bold"}
              w={"auto"}
              textAlign={"start"}
              mb={"10px"}
            >
             {t('smart_question_search_engine')}
            </Text>
            <Text w={"auto"} fontSize={"14px"} textAlign={"start"} whiteSpace="normal">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است
            </Text>
            <Button bgColor={"#29CCCC"} fontWeight={"normal"} mt={"20px"}>
            {t('learn_more')}
            </Button>
          </VStack>
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
        <Stack direction={{ base: 'column', md: 'row' }} dir="rtl" w={{ base: 'calc( 100% - 10px )', md: "100%" }} justifyContent={"space-between"}>
          <Stack w={"100%"} alignItems={{ base: 'center' }} order={{ base: 1, md: 2 }} >
            <Image src="/questionlogo.png" w={{ base: '225px', md: "509px" }} h={{ base: '222px', md: "500px" }} />
          </Stack>

          <VStack w={'100%'} alignItems={{ base: 'center', md: "start" }} order={{ base: 2, md: 1 }}>
            <Text
              fontSize={"20px"}
              fontWeight={"bold"}
              w={"auto"}
              textAlign={"start"}
              mb={"10px"}
            >
               {t('smart_question_search_engine')}
            </Text>
            <Text w={"auto"} fontSize={"14px"} textAlign={"start"} whiteSpace="normal">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است
            </Text>
            <Button bgColor={"#29CCCC"} fontWeight={"normal"} mt={"20px"}>
            {t('learn_more')}
            </Button>
          </VStack>
        </Stack>
      </Box>
      <Box
        w="100%"
        alignItems={"center"}
        justifyContent={"center"}
        maxW="container.xl"
        mx="auto"
        p={{ base: '20px', md: "60px" }}
        my={"20px"}
      >
        <HStack mb={'20px'}>
          <Text fontWeight={'bold'} fontSize={'20px'}>{t('all_products')}</Text>
          <Text></Text>
        </HStack>
        {
          <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }} gap={"2px"} w={"100%"}>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </Grid>
        }
      </Box>
    </MainLayout>
  );
};

export default Index;
