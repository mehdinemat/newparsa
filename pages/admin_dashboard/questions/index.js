import Header from "@/components/admin_dashboard/header";
import QuestionCard from "@/components/admin_dashboard/questions/QuestionCard";
import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Select,
  Text,
  Textarea,
  VStack
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { GoPencil } from "react-icons/go";
import { IoArrowBack, IoClose, IoPencil, IoTrash } from "react-icons/io5";
import useSWR from "swr";
import RightSidebar from "../rightSidebar";

const Index = () => {

  const { data: dataQuestions, isLoading: isLoadingQuestions } = useSWR(`admin/question?lang=fa`)

  const { t } = useTranslation();


  return (
    // <MainLayout>
    <Box
      w="100%"
      alignItems={"center"}
      justifyContent={"center"}
      // maxW="container.xl"
      mx="34px"
      // p={{ base: "20px", md: "60px" }}
      my={"34px"}
    // mt={{ base: "40px", md: "60px" }}
    >
      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(8, 1fr)" }}
        w={"100%"}
      >
        <GridItem colSpan={1} display={{ base: "none", md: "flex" }}>
          <RightSidebar />
        </GridItem>
        <GridItem as={VStack} gap={"8px"} colSpan={7} pl={"50px"} mr={"8px"}>
          <Box
            w={"100%"}
            height={"85px"}
            bgColor={"#F3F3F3"}
            borderRadius={"15px"}
          >
            <Header />
          </Box>
          <Box
            w={"100%"}
            height={"100%"}
            bgColor={"#F3F3F3"}
            borderRadius={"15px"}
            padding={'10px'}
          >
            <Text fontWeight={'700'} fontSize={'30px'} pr={'16px'} >سوالات</Text>
            <Grid templateColumns="repeat(4, 1fr)" gap={6} w={'100%'} p={'10px'} >
              <GridItem bgColor={"white"} w={"100%"} height={"100%"} colSpan={3} borderRadius={"15px"} padding={'15px'}>
                <HStack w={'100%'} justifyContent={'space-between'} paddingX={'16px'}>
                  <HStack color="#979797" alignItems={'baseline'}>
                    <Text height={'20px'} fontWeight={'800'} fontSize={'18px'}>مرتب سازی براساس</Text>
                    <Select bgColor={'#F3F3F3'} height={'40px'} width={'90px'}>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </Select>
                  </HStack>
                  <HStack>
                    <IconButton icon={<IoPencil />} colorScheme="blue" fontSize={'31px'} />
                    <IconButton icon={<IoTrash />} colorScheme="blue" fontSize={'31px'} />
                  </HStack>
                </HStack>
                <Box as={VStack} w={'100%'} height={'calc( 100vh - 270px )'} padding={'16px'} gap={'10px'} overflowY={'auto'}>
                  {
                    dataQuestions?.data?.result?.map((question) => (
                      <QuestionCard data={question} />
                    ))
                  }
                </Box>
              </GridItem>
              <GridItem bgColor={"white"} w={"100%"} height={"100%"} borderRadius={"15px"} padding={'20px'}>
                <VStack w={'100%'} alignItems={'start'} justifyContent={'space-between'} height={'100%'}>
                  <VStack w={'100%'} alignItems={'start'}>
                    <HStack color={'#3646B3'} w={'100%'} alignItems={'center'} justifyContent={'start'} gap={0} fontWeight={'600'} fontSize={'16px'}>
                      <IconButton icon={<GoPencil />} variant={'ghost'} />
                      <Text>ویرایش سوال</Text>
                    </HStack>
                    <Select bgColor={'#F3F3F3'} height={'40px'} width={'100%'} mt={'27px'}>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </Select>
                    <Text color={'#979797'} fontWeight={'800'} fontSize={'18px'} mt={'24px'} >متن پاسخ</Text>
                    <Textarea bgColor={'#F3F3F3'} />
                    <Text color={'#979797'} fontWeight={'800'} fontSize={'18px'} mt={'24px'} >انتخاب مراجع</Text>
                    <Select bgColor={'#F3F3F3'} height={'40px'} width={'100%'} mt={'27px'}>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </Select>
                    <Text color={'#979797'} fontWeight={'800'} fontSize={'18px'} mt={'24px'} >انتخاب واژگان کلیدی</Text>
                    <Select bgColor={'#F3F3F3'} height={'40px'} width={'100%'} mt={'27px'}>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </Select>
                  </VStack>
                  <VStack w={'100%'}>
                    <Button bgColor={'#3646B3'} fontWeight={'800'} fontSize={'14px'} mt={'24px'} leftIcon={<IoArrowBack />} w={'100%'} height={'49px'}>ثبت و ادامه</Button>
                    <Button color={'#FF0000'} fontWeight={'800'} fontSize={'14px'} mt={'8px'} leftIcon={<IoClose />} w={'100%'} variant={'ghost'}>حذف این سوال</Button>
                  </VStack>
                </VStack>
              </GridItem>
            </Grid>
          </Box>
        </GridItem>
      </Grid>
    </Box >
    // </MainLayout>
  );
};

export default Index;
