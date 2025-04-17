import MainLayout from "@/components/mainLayout";
import HeaderId from "@/components/news/headerId";
import Reply from "@/components/news/reply";
import SuggestCard from "@/components/news/suggestCard";
import { Box, Button, Grid, GridItem, HStack, Image, Text, Textarea, VStack } from "@chakra-ui/react";
import { IoChatboxOutline } from "react-icons/io5";

const Index = () => {
  return (
    <MainLayout>
      <HeaderId />
      <Box
        w="100%"
        alignItems={"center"}
        justifyContent={"center"}
        maxW="container.xl"
        mx="auto"
        pt={{ base: '0px', md: "60px" }}
        my={"20px"}
        display={{ base: 'flex' }}
      >
        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }} gap={"20px"} w={{ base: 'calc( 100% - 40px )', md: "100%" }}>
          <GridItem colSpan={2}>
            <VStack>
              <Image src="../../newphoto.png" width={'100%'} height={{ base: '380px', md: '630px' }} />
              <Text whiteSpace={'20px'} lineHeight={2}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.

                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.</Text>
            </VStack>
            <HStack w={'100%'} justifyContent={'space-between'}>
              <HStack my={'20px'}>
                <Text fontWeight={'bold'} fontSize={'20px'}>دیدگاه ها</Text>
                <Text>(28 دیدگاه)</Text>
              </HStack>
              <HStack>
                <IoChatboxOutline color="#29CCCC" />
                <Text color={'#29CCCC'}>ارسال دیدگاه</Text>
              </HStack>
            </HStack>

            <Box bgColor={'#3646B3'} borderRadius={'10px'} padding={'20px'}>
              <HStack w={'100%'} justifyContent={'space-between'}>
                <Text color={'#29CCCC'} fontWeight={'bold'}>برای ثبت دیدگاه خود، وارد حساب کاربری خود شوید.</Text>
                <Button bgColor={'#29CCCC'}>ورود به حساب کاربری</Button>
              </HStack>
            </Box>

            <VStack w={'100%'} alignItems={'end'}>
              <Textarea placeholder="دیدگاه خود را بنویسید..." my={'10px'} />
              <Button bgColor={'#29CCCC'}>ثبت پیام</Button>
            </VStack>

            <VStack w={'100%'} alignItems={'start'}>
              <Reply />
              <Reply />
              <Reply />
              <Reply />
            </VStack>

          </GridItem>
          <GridItem>
            <VStack w={'100%'} alignItems={'start'} border={'1px'} borderRadius={'15px'} borderColor={'gray.200'} padding={'20px'}>
              <Text fontWeight={'bold'} fontSize={'20px'} mb={'20px'}>پیشنهاد سردبیر</Text>
              <SuggestCard />
              <SuggestCard />
              <SuggestCard />
              <SuggestCard />

            </VStack>
          </GridItem>
        </Grid>
      </Box>
    </MainLayout>
  )
}

export default Index
