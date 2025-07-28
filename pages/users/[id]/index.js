import MainLayout from "@/components/mainLayout";
import {
  Box,
  Grid,
  GridItem,
  HStack,
  Image,
  Stack,
  Text,
  VStack
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { BsReply } from "react-icons/bs";
import { CiFileOn } from "react-icons/ci";
import { FaQuestion } from "react-icons/fa";
import { GiGlobeRing } from "react-icons/gi";
import {
  IoChatbubbleEllipsesOutline,
  IoEyeOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { TiInputChecked } from "react-icons/ti";
import useSWR from "swr";
import RightSidebar from "../rightSidebar";

const menuList = [
  { title: "پروفایل", icon: <IoPersonOutline /> },
  { title: "پرسش‌ها", icon: <FaQuestion /> },
  { title: "پاسخ‌ها", icon: <BsReply /> },
  { title: "نوشته‌ها", icon: <CiFileOn /> },
  { title: "حسنات", icon: <GiGlobeRing /> },
  { title: "دوستان", icon: <IoPeopleOutline /> },
  { title: "حساب کاربری", icon: <IoSettingsOutline /> },
];

const Index = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const { id } = router.query;

  const {
    data: dataUser,
    isLoading: isLoadingUser,
    mutate: mutateUser,
  } = useSWR(`user/client?username__icontains=${id}`);

  return (
    <MainLayout>
      <Box
        w="100%"
        alignItems={"center"}
        justifyContent={"center"}
        maxW="container.xl"
        mx="auto"
        p={{ base: "20px", md: "22px" }}
        my={"auto"}
        mt={"120px"}
        bgColor={'#F3F3F3'}
        borderRadius={'15px'}
        mb={'20px'}
      >
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
          gap={"16px"}
          w={"100%"}
          bgColor={'white'}
          p={'48px'}
          borderRadius={'15px'} boxShadow={' 0px 12px 22px 0px #00000026'}

        >
          <GridItem colSpan={2} display={{ base: "none", md: "flex" }}>
            {dataUser?.data?.result?.[0] && (
              <RightSidebar user={dataUser?.data?.result?.[0]} mutate={mutateUser} />
            )}
          </GridItem>
          <GridItem as={Stack} gap={"20px"} colSpan={1}>
            <Stack
              direction={{ base: "column", md: "row" }}
              gap={{ base: "20px" }}
              w={"100%"}
            >
              <Box
                as={VStack}
                gap={"20px"}
                w={"100%"}
                borderRadius={"15px"}
                py={"10px"}
                pb={"40px"}
              >
                <HStack
                  w={"100%"}
                  justifyContent={"space-between"}
                  bgColor={'#F3F3F3'}
                  height={'77px'}
                  borderRadius={'15px'}
                  padding={'20px'}
                >
                  <Text fontWeight={'500'} fontSize={'17px'}>میزان رضایت</Text>
                  <HStack>
                    <Image src="/startoutline.png" height={'37px'} width={'37px'} />
                    <Image src="/startoutline.png" height={'37px'} width={'37px'} />
                    <Image src="/start.png" height={'37px'} width={'37px'} />
                    <Image src="/start.png" height={'37px'} width={'37px'} />
                    <Image src="/start.png" height={'37px'} width={'37px'} />
                  </HStack>
                </HStack>
                <HStack w={"100%"} justifyContent={"space-between"} px={"20px"} bgColor={'#F3F3F3'} borderRadius={'15px'}
                  padding={'20px'}>
                  <Grid templateColumns='repeat(2, 1fr)' gap={6} w={'100%'}>
                    <Box bgColor={'white'} height={'75px'} w={'100%'} borderRadius={'10px'} alignItems={'center'} justifyContent={'center'}>
                      <Text textAlign={'center'} height={'100%'} fontWeight={'extrabold'} fontSize={'16px'}>432 سوال</Text>
                    </Box>
                    <Box bgColor={'white'} height={'75px'} w={'100%'} borderRadius={'10px'} alignItems={'center'} justifyContent={'center'}> <Text textAlign={'center'} height={'100%'} fontWeight={'extrabold'} fontSize={'16px'}>432 پاسخ</Text></Box>
                    <Box bgColor={'white'} height={'75px'} w={'100%'} borderRadius={'10px'} alignItems={'center'} justifyContent={'center'}> <Text textAlign={'center'} height={'100%'} fontWeight={'extrabold'} fontSize={'16px'}>432 دیدگاه</Text></Box>
                    <Box bgColor={'white'} height={'75px'} w={'100%'} borderRadius={'10px'} alignItems={'center'} justifyContent={'center'}> <Text textAlign={'center'} height={'100%'} fontWeight={'extrabold'} fontSize={'16px'}>43% رضایت</Text></Box>
                  </Grid>
                  {/* <VStack>
                    <FaQuestion fontSize={"40px"} />
                    <Image
                      src="../../dashboard/ellipse.png"
                      w={"45px"}
                      h={"auto"}
                    />

                    <Text fontSize={"sm"}>
                      {dataUser?.data?.result?.[0]?.question_count}{" "}
                      {t("question")}
                    </Text>
                  </VStack>
                  <VStack>
                    <CiFileOn fontSize={"40px"} />
                    <Image
                      src="../../dashboard/ellipse.png"
                      w={"45px"}
                      h={"auto"}
                    />

                    <Text fontSize={"sm"}>
                      {dataUser?.data?.result?.[0]?.answer_count} {t("answer")}
                    </Text>
                  </VStack>
                  <VStack>
                    <BsReply fontSize={"40px"} />
                    <Image
                      src="../../dashboard/ellipse.png"
                      w={"45px"}
                      h={"auto"}
                    />

                    <Text fontSize={"sm"}> ریپلای</Text>
                  </VStack> */}
                </HStack>
              </Box>
              {/* <Box
                as={VStack}
                w={"100%"}
                gap={"20px"}
                border={"1px"}
                borderRadius={"15px"}
                borderColor={"gray.200"}
                padding={"20px"}
                py={"10px"}
                pb={"40px"}
                bgColor={"#29CCCC"}
                color={"white"}
              >
                <HStack w={"100%"} justifyContent={"space-between"}>
                  <Text>حسنات</Text>
                  <Text fontSize={"xs"}>مشاهده همه</Text>
                </HStack>
                <HStack w={"100%"} justifyContent={"space-between"} px={"20px"}>
                  <VStack>
                    <GiGlobeRing fontSize={"40px"} />
                    <Image
                      src="../../dashboard/ellipse.png"
                      w={"45px"}
                      h={"auto"}
                    />
                    <Text fontSize={"sm"}> انگشتر عقیق</Text>
                  </VStack>
                  <VStack>
                    <Image
                      src="../../dashboard/mohr.png"
                      w={"45px"}
                      h={"40px"}
                    />
                    <Image
                      src="../../dashboard/ellipse.png"
                      w={"45px"}
                      h={"auto"}
                    />
                    <Text fontSize={"sm"}> پرسش</Text>
                  </VStack>
                  <VStack>
                    <Image
                      src="../../dashboard/tasbih.png"
                      w={"45px"}
                      h={"40px"}
                    />
                    <Image
                      src="../../dashboard/ellipse.png"
                      w={"45px"}
                      h={"auto"}
                    />
                    <Text fontSize={"sm"}> پرسش</Text>
                  </VStack>
                </HStack>
              </Box> */}
            </Stack>
          </GridItem>
          <GridItem>
            <Box as={VStack} bgColor={'#F3F3F3'} padding={'14px'} borderRadius={'10px'} gap={'10px'} height={'500px'} overflowY={'auto'}>
              <Box bgColor={'white'} padding={'5px'} borderRadius={'10px'}>
                <Text>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیــک اســت،</Text>
              </Box>
              <Box bgColor={'white'} padding={'5px'} borderRadius={'10px'}>
                <Text>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیــک اســت،</Text>
              </Box>
              <Box bgColor={'white'} padding={'5px'} borderRadius={'10px'}>
                <Text>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیــک اســت،</Text>
              </Box>
              <Box bgColor={'white'} padding={'5px'} borderRadius={'10px'}>
                <Text>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیــک اســت،</Text>
              </Box>
              <Box bgColor={'white'} padding={'5px'} borderRadius={'10px'}>
                <Text>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیــک اســت،</Text>
              </Box>
              <Box bgColor={'white'} padding={'5px'} borderRadius={'10px'}>
                <Text>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیــک اســت،</Text>
              </Box>
              <Box bgColor={'white'} padding={'5px'} borderRadius={'10px'}>
                <Text>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیــک اســت،</Text>
              </Box>
              <Box bgColor={'white'} padding={'5px'} borderRadius={'10px'}>
                <Text>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیــک اســت،</Text>
              </Box>
              <Box bgColor={'white'} padding={'5px'} borderRadius={'10px'}>
                <Text>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیــک اســت،</Text>
              </Box>
            </Box>
          </GridItem>
          <GridItem>
            <Box as={VStack} bgColor={'#F3F3F3'} padding={'14px'} borderRadius={'10px'} gap={'10px'} height={'500px'} overflowY={'auto'}>
              <Box bgColor={'white'} padding={'5px'} borderRadius={'10px'}>
                <Text>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیــک اســت،</Text>
              </Box>
              <Box bgColor={'white'} padding={'5px'} borderRadius={'10px'}>
                <Text>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیــک اســت،</Text>
              </Box>
              <Box bgColor={'white'} padding={'5px'} borderRadius={'10px'}>
                <Text>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیــک اســت،</Text>
              </Box>
              <Box bgColor={'white'} padding={'5px'} borderRadius={'10px'}>
                <Text>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیــک اســت،</Text>
              </Box>
              <Box bgColor={'white'} padding={'5px'} borderRadius={'10px'}>
                <Text>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیــک اســت،</Text>
              </Box>
              <Box bgColor={'white'} padding={'5px'} borderRadius={'10px'}>
                <Text>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیــک اســت،</Text>
              </Box>
              <Box bgColor={'white'} padding={'5px'} borderRadius={'10px'}>
                <Text>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیــک اســت،</Text>
              </Box>
              <Box bgColor={'white'} padding={'5px'} borderRadius={'10px'}>
                <Text>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیــک اســت،</Text>
              </Box>
              <Box bgColor={'white'} padding={'5px'} borderRadius={'10px'}>
                <Text>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیــک اســت،</Text>
              </Box>
            </Box>
          </GridItem>   <GridItem>
            <Box as={VStack} bgColor={'#F3F3F3'} padding={'14px'} borderRadius={'10px'} gap={'10px'} height={'500px'} overflowY={'auto'} >
              <Box bgColor={'white'} padding={'7px'} borderRadius={'10px'} w={'100%'}>
                <VStack w={'100%'} alignItems={'start'} justifyContent={'start'}>
                  <HStack w={'100%'} alignItems={'start'} justifyContent={'start'} position={'relative'}>
                    <Box width={'25px'} height={'25px'} bgColor={'#29CCCC'} borderRadius={'5px'} />
                    <Text position={'absolute'} color={'white'} right={'11px'} top={'3px'}>1</Text>
                    <Text fontWeight={'400'} fontSize={'14px'} flex="1" color={'#333333'}>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیــک اســت،</Text>
                  </HStack>
                  <HStack w={'100%'} justifyContent={'space-between'}>
                    <HStack gap={'14px'}>
                      <HStack gap={'2px'}>
                        <TiInputChecked width={'10px'} height={'10px'} color="#C2C2C2" />
                        <Text fontWeight={'600'} fontSize={'7px'} color={'#C2C2C2'}>3 پسند</Text>
                      </HStack>
                      <HStack gap={'2px'}>
                        <IoEyeOutline width={'10px'} height={'10px'} color="#C2C2C2" />
                        <Text fontWeight={'600'} fontSize={'7px'} color={'#C2C2C2'}>3 پسند</Text>
                      </HStack>
                      <HStack gap={'2px'}>
                        <IoChatbubbleEllipsesOutline width={'10px'} height={'10px'} color="#C2C2C2" />
                        <Text fontWeight={'600'} fontSize={'7px'} color={'#C2C2C2'}>3 پسند</Text>
                      </HStack>
                    </HStack>
                    <HStack>
                      <Text fontWeight={'500'} fontSize={'8px'} color={'#999999'}>1404/2/2</Text>
                    </HStack>
                  </HStack>
                </VStack>
              </Box>
              <Box bgColor={'white'} padding={'5px'} borderRadius={'10px'}>
                <Text>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیــک اســت،</Text>
              </Box>
              <Box bgColor={'white'} padding={'5px'} borderRadius={'10px'}>
                <Text>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیــک اســت،</Text>
              </Box>
              <Box bgColor={'white'} padding={'5px'} borderRadius={'10px'}>
                <Text>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیــک اســت،</Text>
              </Box>
              <Box bgColor={'white'} padding={'5px'} borderRadius={'10px'}>
                <Text>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیــک اســت،</Text>
              </Box>
              <Box bgColor={'white'} padding={'5px'} borderRadius={'10px'}>
                <Text>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیــک اســت،</Text>
              </Box>
              <Box bgColor={'white'} padding={'5px'} borderRadius={'10px'}>
                <Text>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیــک اســت،</Text>
              </Box>
              <Box bgColor={'white'} padding={'5px'} borderRadius={'10px'}>
                <Text>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیــک اســت،</Text>
              </Box>
              <Box bgColor={'white'} padding={'5px'} borderRadius={'10px'}>
                <Text>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیــک اســت،</Text>
              </Box>
            </Box>
          </GridItem>
        </Grid>

      </Box>
    </MainLayout>
  );
};

export default Index;
