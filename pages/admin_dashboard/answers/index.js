import QuestionMCard from "@/components/home/mobile/questionMCard";
import MainLayout from "@/components/mainLayout";
import QuestionCard from "@/components/questionCars";
import {
  Box,
  Button,
  Divider,
  Grid,
  GridItem,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BiSortAlt2 } from "react-icons/bi";
import RightSidebar from "../rightSidebar";
import { useTranslation } from "react-i18next";
import Header from "@/components/admin_dashboard/header";

const Index = () => {
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
          ></Box>
          {/* <Box p="6">
            <HStack
              w={"100%"}
              justifyContent={"space-between"}
              mb={"10px"}
              alignItems={"center"}
            >
              <Text fontWeight={"bold"} fontSize={"16px"}>
                پاسخ ها
              </Text>

              <Button
                width={"189px"}
                height={"50px"}
                bgColor={"#F9C96D"}
                color={"black"}
                fontWeight={"normal"}
              >
                سوال خود را بپرسید
              </Button>
            </HStack>
            <HStack
              w={"100%"}
              justifyContent={"space-between"}
              mb={"10px"}
              alignItems={"center"}
            >
              <Text fontSize={"14px"}>۲۵۸ سؤال</Text>
              <HStack>
                <HStack justifyContent={{ base: "start" }}>
                  <BiSortAlt2 color="gray" />
                  <Button
                    variant={"ghost"}
                    fontSize={"sm"}
                    padding={{ base: "0px" }}
                    display={{ base: "none", md: "flex" }}
                  >
                    مرتب سازی براساس:
                  </Button>
                  <Button
                    variant={"ghost"}
                    fontSize={"sm"}
                    padding={{ base: "0px" }}
                    display={{ base: "flex", md: "none" }}
                  >
                    جدیدترین ها
                  </Button>
                </HStack>
                <HStack display={{ base: "none", md: "flex" }}>
                  <Button
                    colorScheme="gray"
                    variant={"ghost"}
                    _hover={{ bgColor: "none" }}
                    fontWeight={"normal"}
                  >
                    جدیدترین‌ها
                  </Button>
                  <Button
                    colorScheme="gray"
                    variant={"ghost"}
                    _hover={{ bgColor: "none" }}
                    fontWeight={"normal"}
                  >
                    پربازدیدترین‌ها
                  </Button>
                  <Button
                    colorScheme="gray"
                    variant={"ghost"}
                    _hover={{ bgColor: "none" }}
                    fontWeight={"normal"}
                  >
                    محبوبترین‌ها
                  </Button>
                </HStack>
              </HStack>
            </HStack>

            <VStack display={{ base: "none", md: "flex" }}>
              <Divider my={"20px"} />
              <QuestionCard t={t} />
              <Divider my={"20px"} />
              <QuestionCard t={t} />
              <Divider my={"20px"} />
            </VStack>
            <VStack display={{ base: "flex", md: "none" }}>
              <Divider my={"20px"} />
              <QuestionMCard t={t} />
              <Divider my={"20px"} />
              <QuestionMCard t={t} />
              <Divider my={"20px"} />
            </VStack>
          </Box> */}
        </GridItem>
      </Grid>
    </Box>
    // </MainLayout>
  );
};

export default Index;
