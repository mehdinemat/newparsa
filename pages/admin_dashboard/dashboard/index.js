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
          >
            <Grid templateColumns="repeat(4, 1fr)" gap={6} h={"100%"} w={'100%'} p={'16px'} >
              <GridItem bgColor={"white"} w={"100%"} height={"100%"} colSpan={2} borderRadius={"15px"}></GridItem>
              <GridItem bgColor={"white"} w={"100%"} height={"100%"} borderRadius={"15px"}></GridItem>
              <GridItem bgColor={"white"} w={"100%"} height={"100%"} borderRadius={"15px"}></GridItem>

              <GridItem bgColor={"white"} w={"100%"} height={"100%"} colSpan={3} borderRadius={"15px"}></GridItem>
              <GridItem bgColor={"white"} w={"100%"} height={"100%"} borderRadius={"15px"}></GridItem>

              <GridItem bgColor={"white"} w={"100%"} height={"100%"} borderRadius={"15px"}></GridItem>
              <GridItem bgColor={"white"} w={"100%"} height={"100%"} colSpan={2} borderRadius={"15px"}></GridItem>
              <GridItem bgColor={"white"} w={"100%"} height={"100%"} borderRadius={"15px"}></GridItem>
            </Grid>
          </Box>
        </GridItem>
      </Grid>
    </Box>
    // </MainLayout>
  );
};

export default Index;
