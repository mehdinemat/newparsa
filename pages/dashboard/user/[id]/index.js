import {
  Avatar,
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Image,
  Select,
  Stack,
  Text,
  VStack
} from "@chakra-ui/react";

import Bookmarks from "@/components/dashboard/bookmarks";
import Info from "@/components/dashboard/info";
import Scores from "@/components/dashboard/scores";
import MainLayout from "@/components/mainLayout";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import RightSidebar from "../../rightSidebar";



const Index = () => {
  const { t } = useTranslation();

  const [type, setType] = useState(false)

  const handleResizeQuestions = () => {
    setType(!type)
  }

  return (
    <MainLayout>
      <Box
        w="100%"
        alignItems={"center"}
        justifyContent={"center"}
        // maxW="container.xl"
        px="34px"
        // p={{ base: "20px", md: "60px" }}
        my={"34px"}
        mt={{ base: "40px", md: "120px" }}
      >
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(8, 1fr)" }}
          w={"100%"}
        >
          <GridItem colSpan={1} display={{ base: "none", md: "flex" }}>
            <RightSidebar />
          </GridItem>
          <GridItem as={VStack} gap={"8px"} colSpan={7} mr={"8px"} bgColor={'#F3F3F3'} padding={'12px'} borderRadius={'15px'}>
            <HStack w={'100%'} alignItems={'center'} justifyContent={'space-between'}>
              <HStack>
                <Text fontSize={'18px'} fontWeight={'bold'} color={'#979797'}>مرتبط سازی بر اساس</Text>
                <Select w={'120px'} bgColor={'white'} color={'#3646B3'} height={'40px'} borderRadius={'13px'}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </Select>
              </HStack>
              <HStack color={'white'} borderRadius={'10px'}>
                <Button bgColor={'#C2C2C2'} borderRadius={'10px'}>دنبال شونده ها</Button>
                <Button bgColor={'#C2C2C2'} borderRadius={'10px'}>دنبال کننده ‌ها</Button>
                <Button bgColor={'#3646B3'} borderRadius={'10px'}>همه</Button>
              </HStack>
            </HStack>
            <VStack w={'100%'} alignItems={'start'} height={'100%'} bgColor={'white'} padding={'20px'} borderRadius={'15px'} mt={'20px'} sx={{
              boxShadow: "0px 4px 11.3px 0px #00000033",
            }}>
              <Grid templateColumns='repeat(8, 1fr)' gap={2} w={'100%'}>
                <GridItem colSpan={1} as={Stack} alignItems={'center'}>
                  <Avatar height={'150px'} width={'150px'} />
                </GridItem>
                <GridItem colSpan={3} as={VStack} bgColor={'#F3F3F3'} borderRadius={'15px'} padding={'20px'} alignItems={'start'}>
                  <HStack w={'100%'} justifyContent={'space-between'}>
                    <Text fontSize={'32px'} fontWeight={'extrabold'}>علیرضا نوری</Text>
                    <Image src="/start.png" />
                  </HStack>
                  <Text fontSize={'14px'} fontWeight={'extrabold'}>مشخصات بایو . مشخصات بایو</Text>
                  <Text fontSize={'14px'} color={'#333333'}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است.</Text>
                </GridItem>
                <GridItem colSpan={2}>
                  <Grid templateColumns='repeat(2, 1fr)' gap={2} w={'100%'} bgColor={'#F3F3F3'} height={'100%'} padding={'11px'} borderRadius={'15px'} fontWeight={'bold'} fontSize={'16px'}>
                    <Stack alignItems={'center'} justifyContent={'center'} borderRadius={'15px'} bgColor={'white'}><Text>432 سوال</Text></Stack>
                    <Stack alignItems={'center'} justifyContent={'center'} borderRadius={'15px'} bgColor={'white'}><Text>432 پاسخ</Text></Stack>
                    <Stack alignItems={'center'} justifyContent={'center'} borderRadius={'15px'} bgColor={'white'}><Text>432 دیدگاه</Text></Stack>
                    <Stack alignItems={'center'} justifyContent={'center'} borderRadius={'15px'} bgColor={'white'}><Text>43% رضایت</Text></Stack>
                  </Grid>
                </GridItem>
                <GridItem colSpan={2} as={VStack}>
                  <VStack height={'100%'} w={'100%'} justifyContent={'space-between'} bgColor={'#F3F3F3'} fontWeight={'bold'} borderRadius={'15px'} padding={'15px'}>
                    <Text fontSize={'14px'}>میزان رضایت شما از این کاربر</Text>
                    <HStack>
                      <Image src="/start.png" height={'30px'} width={'30px'} />
                      <Image src="/start.png" height={'30px'} width={'30px'} />
                      <Image src="/start.png" height={'30px'} width={'30px'} />
                      <Image src="/start.png" height={'30px'} width={'30px'} />
                      <Image src="/start.png" height={'30px'} width={'30px'} />
                    </HStack>
                  </VStack>
                  <Button bgColor={'#29CCCC'} minH={'40px'} width={'100%'} borderRadius={'10px'}>دنبال کردن</Button>
                </GridItem>
              </Grid>
              <HStack w={'100%'} justifyContent={'space-between'} mt={'40px'}>
                <Text w={'100%'} fontSize={'16px'} fontWeight={'extrabold'}>سوالات</Text>
                <Text w={'100%'} fontSize={'16px'} fontWeight={'extrabold'} textAlign={'start'}>پاسخ ها</Text>
                <Text w={'100%'} fontSize={'16px'} fontWeight={'extrabold'}>دیدگاه ها</Text>
              </HStack>
              <Grid templateColumns='repeat(3, 1fr)' gap={2} w={'100%'} height={'100%'}>
                <GridItem colSpan={1} bgColor={'#F7F7F7'} padding={'16px'} borderRadius={'15px'}>
                  <Box as={VStack} w={'100%'} transition="height 0.3s ease" height={'calc( 100% - 50px )'} gap={'10px'} overflowY={'scroll'} >
                    <Scores />

                  </Box>
                </GridItem>
                <GridItem colSpan={1} bgColor={'#F7F7F7'} padding={'16px'} borderRadius={'15px'}>
                  <Box as={VStack} w={'100%'} transition="height 0.3s ease" height={'calc( 100% - 50px )'} overflowY={'scroll'} >
                    <Info />
                    <Info />
                    <Info />

                  </Box>
                </GridItem>
                <GridItem colSpan={1} bgColor={'#F7F7F7'} padding={'16px'} borderRadius={'15px'}>
                  <Box as={VStack} w={'100%'} transition="height 0.3s ease" height={'calc( 100% - 50px )'} overflowY={'scroll'} >
                    <Bookmarks />
                    <Bookmarks />
                    <Bookmarks />
                    <Bookmarks />

                  </Box>
                </GridItem>
              </Grid>
            </VStack>
          </GridItem>
        </Grid>
      </Box >
    </MainLayout>
  );
};

export default Index;
