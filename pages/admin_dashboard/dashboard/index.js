import AdminListCard from "@/components/admin_dashboard/dashboard/adminListCard";
import AnswerCard from "@/components/admin_dashboard/dashboard/answerCard";
import QuestionCard from "@/components/admin_dashboard/dashboard/questionCard";
import UncheckedQuestionsCard from "@/components/admin_dashboard/dashboard/uncheckedQuestionsCard";
import Header from "@/components/admin_dashboard/header";
import {
  Box,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack
} from "@chakra-ui/react";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoResize, IoSettingsSharp } from "react-icons/io5";
import RightSidebar from "../rightSidebar";



const Index = () => {
  const { t } = useTranslation();

  const [type, setType] = useState(false)

  const handleResizeQuestions = () => {
    setType(!type)
  }

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
            padding={'15px'}
          >
            <Text fontWeight={'700'} fontSize={'30px'} pr={'16px'} pt={'10px'}>داشبورد</Text>
            <Grid templateColumns="repeat(4, 1fr)" gap={6} h={"calc( 100% - 50px )"} w={'100%'} p={'16px'} >
              <GridItem bgColor={"white"} w={"100%"} height={"100%"} colSpan={4} borderRadius={"15px"} >
                <VStack w={'100%'} alignItems={'start'} padding={'16px'}>
                  <HStack w={'100%'} justifyContent={'space-between'}>
                    <HStack>
                      <Text fontWeight={'800'} fontSize={'18px'} color={'#979797'}>بخش</Text>
                      <Select bgColor={'#F3F3F3'} height={'40px'} width={'207px'}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </Select>
                    </HStack>
                    <IconButton icon={<IoResize />} colorScheme="gray" variant={'outline'} onClick={e => handleResizeQuestions()} />
                  </HStack>
                  <Grid templateColumns='repeat(6, 1fr)' gap={6} w={'100%'}>
                    <GridItem colSpan={2}>
                      <Text height={'20px'}></Text>
                      <Box as={VStack} w={'100%'} transition="height 0.3s ease" height={type ? '100%' : '320px'} padding={'16px'} gap={'10px'} overflowY={'scroll'}>
                        <QuestionCard />
                        <QuestionCard />
                        <QuestionCard />
                        <QuestionCard />

                      </Box>
                    </GridItem>
                    <GridItem colSpan={'4'} w={'100%'}>
                      <HStack w={'100%'} justifyContent={'space-between'}>
                        <Text height={'20px'} fontWeight={700} fontSize={'12px'} mb={'10px'} w={'100%'}>پاسخ‌های این سوال</Text>
                        <Text height={'20px'} fontWeight={700} fontSize={'12px'} mb={'10px'} textAlign={'start'} w={'100%'}>دیدگاه‌های این سوال</Text>
                      </HStack>
                      <HStack w={'100%'} height={'calc( 100% - 20px )'} bgColor={'#F7F7F7'} padding={'16px'} gap={'32px'} borderRadius={'5px'}>

                        <Box as={VStack} w={'100%'} gap={'10px'} transition="height 0.3s ease" height={type ? '100%' : '270px'} overflowY={'auto'}>
                          <AnswerCard />
                          <AnswerCard />
                          <AnswerCard />
                          <AnswerCard />
                          <AnswerCard />
                          <AnswerCard />
                        </Box>
                        <Box as={VStack} w={'100%'} gap={'10px'} transition="height 0.3s ease" height={type ? '100%' : '270px'} overflowY={'auto'}>
                          <AnswerCard />
                          <AnswerCard />
                          <AnswerCard />
                          <AnswerCard />
                          <AnswerCard />
                          <AnswerCard />
                        </Box>
                      </HStack>
                    </GridItem>
                  </Grid>
                </VStack>
              </GridItem>
              {/* <GridItem bgColor={"white"} w={"100%"} height={"100%"} borderRadius={"15px"}></GridItem>
              <GridItem bgColor={"white"} w={"100%"} height={"100%"} borderRadius={"15px"}></GridItem> */}

              {/* <GridItem bgColor={"white"} w={"100%"} height={"100%"} colSpan={3} borderRadius={"15px"}></GridItem>
              <GridItem bgColor={"white"} w={"100%"} height={"100%"} borderRadius={"15px"}></GridItem> */}

              <GridItem bgColor={"white"} w={"100%"} height={"100%"} borderRadius={"15px"}>
                <HStack mr={'15px'} mt={'15px'} color="#979797" alignItems={'flex-start'}>
                  <IoSettingsSharp size={'25px'} />
                  <Text height={'20px'} fontWeight={'800'} fontSize={'18px'}>آدمین ها</Text>
                </HStack>
                <Box as={VStack} w={'100%'} height={'320px'} padding={'16px'} gap={'10px'} overflowY={'auto'}>
                  <AdminListCard />
                  <AdminListCard />
                  <AdminListCard />
                  <AdminListCard />
                  <AdminListCard />
                </Box>
              </GridItem>
              <GridItem bgColor={"white"} w={"100%"} height={"100%"} colSpan={2} borderRadius={"15px"}>
                <HStack mr={'15px'} mt={'15px'} color="#979797" alignItems={'flex-start'}>
                  <Text height={'20px'} fontWeight={'800'} fontSize={'18px'}>سوالات بررسی نشده</Text>
                </HStack>
                <Box as={VStack} w={'100%'} height={'320px'} padding={'16px'} gap={'10px'} overflowY={'auto'}>
                  <UncheckedQuestionsCard />
                  <UncheckedQuestionsCard />
                  <UncheckedQuestionsCard />
                  <UncheckedQuestionsCard />
                  <UncheckedQuestionsCard />
                  <UncheckedQuestionsCard />
                </Box>
              </GridItem>
              <GridItem bgColor={"white"} w={"100%"} height={"100%"} borderRadius={"15px"} padding={'16px'}>
                <TableContainer height={'320px'} overflowY={'auto'}>
                  <Table variant='unstyled'>
                    <Thead>
                      <Tr borderBottom={'none'}>
                        <Th>کاربران</Th>
                        <Th>سطح</Th>
                        <Th >رتبه</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>inches</Td>
                        <Td>millimetres (mm)</Td>
                        <Td >25.4</Td>
                      </Tr>
                      <Tr>
                        <Td>feet</Td>
                        <Td>centimetres (cm)</Td>
                        <Td >30.48</Td>
                      </Tr>
                      <Tr>
                        <Td>yards</Td>
                        <Td>metres (m)</Td>
                        <Td >0.91444</Td>
                      </Tr>
                      <Tr>
                        <Td>yards</Td>
                        <Td>metres (m)</Td>
                        <Td >0.91444</Td>
                      </Tr>
                      <Tr>
                        <Td>yards</Td>
                        <Td>metres (m)</Td>
                        <Td >0.91444</Td>
                      </Tr>
                      <Tr>
                        <Td>yards</Td>
                        <Td>metres (m)</Td>
                        <Td >0.91444</Td>
                      </Tr>
                      <Tr>
                        <Td>yards</Td>
                        <Td>metres (m)</Td>
                        <Td >0.91444</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
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
