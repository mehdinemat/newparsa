import MainLayout from "@/components/mainLayout";
import Header from "@/components/news/header";
import NewsCard from "@/components/news/newsCard";
import SuggestCard from "@/components/news/suggestCard";
import { Box, Button, Grid, GridItem, HStack, Text, VStack } from "@chakra-ui/react";
import { BiSortAlt2 } from "react-icons/bi";

const Index = () => {
  return (
    <MainLayout>
      <Header />
      <Box
        w="100%"
        alignItems={"center"}
        justifyContent={"center"}
        maxW="container.xl"
        mx="auto"
        pt={{ base: '0px', md: "60px" }}
        my={"20px"}
      >
        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }} gap={"20px"} w={"100%"}>
          <GridItem colSpan={2}>
            <HStack w={'100%'} justifyContent={'space-between'} mb={{ base: '20px', md: '40px' }} px={{ base: '20px' }}>
              <Text fontWeight={'bold'} fontSize={'20px'} w={'150px'}>آخرین اخبار</Text>
              <HStack w={'100%'} alignItems={'end'} justifyContent={'end'}>
                <HStack justifyContent={{ base: 'start' }}>
                  <BiSortAlt2 color="gray" />
                  <Button variant={'ghost'} fontSize={'sm'} padding={{ base: '0px' }} display={{ base: 'none' }}>مرتب سازی براساس:</Button>
                  <Button variant={'ghost'} fontSize={'sm'} padding={{ base: '0px' }} display={{ md: 'none' }}>جدیدترین ها</Button>

                </HStack>
                <HStack display={{ base: 'none' }}>
                  <Button variant={'ghost'} fontSize={'sm'}>جدیدترین‌ها</Button>
                  <Button variant={'ghost'} fontSize={'sm'}>پربازدیدترین‌ها</Button>
                  <Button variant={'ghost'} fontSize={'sm'}>محبوبترین‌ها</Button>
                </HStack>
              </HStack>
            </HStack>
            <VStack w={'100%'} gap={'20px'}>
              <NewsCard />
              <NewsCard />
              <NewsCard />
              <NewsCard />
              <NewsCard />
            </VStack>

          </GridItem>
          <GridItem display={{ base: 'none', md: 'flex' }} >
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
