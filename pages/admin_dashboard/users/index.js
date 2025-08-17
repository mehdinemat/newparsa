import Header from "@/components/admin_dashboard/header";
import UserCard from "@/components/admin_dashboard/users/userCard";
import UserInfoCard from "@/components/admin_dashboard/users/userInfoCard";
import {
  Box,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Select,
  Text,
  VStack
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { IoMenu } from "react-icons/io5";
import RightSidebar from "../rightSidebar";

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
            padding={'10px'}
          >
            <Text fontWeight={'700'} fontSize={'30px'} pr={'16px'} >کاربران</Text>
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
                    <IconButton icon={<IoMenu />} colorScheme="blue" fontSize={'31px'} />
                  </HStack>
                </HStack>
                <Grid templateColumns="repeat(3, 1fr)" height={'100%'} w={'100%'} p={'10px'} padding={'16px'} gap={'10px'} overflowY={'auto'}>
                  <UserCard />
                  <UserCard />
                  <UserCard />
                  <UserCard />
                  <UserCard />
                </Grid>
              </GridItem>
              <GridItem bgColor={"white"} w={"100%"} height={"100%"} borderRadius={"15px"} >
                <UserInfoCard />
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
