import MainLayout from "@/components/mainLayout";
import {
  Badge,
  Box,
  Divider,
  Grid,
  GridItem,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BsReply } from "react-icons/bs";
import { CiFileOn } from "react-icons/ci";
import { FaQuestion } from "react-icons/fa";
import { GiGlobeRing } from "react-icons/gi";
import {
  IoPeopleOutline,
  IoPersonOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import RightSidebar from "../rightSidebar";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

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

  const { data: dataUser, isLoading: isLoadingUser } = useSWR(
    `user/client?id=${id}`
  );

  return (
    <MainLayout>
      <Box
        w="100%"
        alignItems={"center"}
        justifyContent={"center"}
        maxW="container.xl"
        mx="auto"
        p={{ base: "20px", md: "60px" }}
        my={"auto"}
        mt={"60px"}
      >
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
          gap={"32px"}
          w={"100%"}
        >
          <GridItem colSpan={1} display={{ base: "none", md: "flex" }}>
            {dataUser?.data?.result && (
              <RightSidebar user={dataUser?.data?.result?.[0]} />
            )}
          </GridItem>
          <GridItem as={Stack} gap={"20px"} colSpan={3}>
            <Stack
              direction={{ base: "column", md: "row" }}
              gap={{ base: "20px" }}
              w={"100%"}
            >
              <Box
                as={VStack}
                gap={"20px"}
                w={"100%"}
                border={"1px"}
                borderRadius={"15px"}
                borderColor={"gray.200"}
                padding={"20px"}
                py={"10px"}
                pb={"40px"}
                bgColor={"#3646B3"}
                color={"white"}
              >
                <HStack
                  w={"100%"}
                  justifyContent={"space-between"}
                  color={"white"}
                >
                  <Text>آمار کاربر</Text>
                  <Text fontSize={"xs"}>اطلاعات بیشتر</Text>
                </HStack>
                <HStack w={"100%"} justifyContent={"space-between"} px={"20px"}>
                  <VStack>
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
                  </VStack>
                </HStack>
              </Box>
              <Box
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
              </Box>
            </Stack>
          </GridItem>
        </Grid>
      </Box>
    </MainLayout>
  );
};

export default Index;
