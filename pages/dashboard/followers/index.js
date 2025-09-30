import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  GridItem,
  HStack,
  Select,
  Text,
  VStack
} from "@chakra-ui/react";

import MainLayout from "@/components/mainLayout";
import { useUser } from "@/context/UserContext";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import useSWR from "swr";
import RightSidebar from "../rightSidebar";



const Index = () => {
  const { t } = useTranslation();

  const { dataMe } = useUser()

  const { data: dataFollowers } = useSWR(dataMe?.data?.[0]?.id && `user/client/follows/${dataMe?.data?.[0]?.id}?query_type=followers`)

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
        scrollSnapAlign="start"
        // maxW="container.xl"
        px="34px"
        // p={{ base: "20px", md: "60px" }}
        my={"34px"}
        mt={{ base: "40px", md: "120px" }}
      >
        <Grid mt={'40px'}
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(8, 1fr)" }}
          w={"100%"}
        >
          <GridItem colSpan={1} display={{ base: "none", md: "flex" }}>
            <RightSidebar />
          </GridItem>
          <GridItem as={VStack} gap={"8px"} colSpan={7} mr={"8px"} bgColor={'#F3F3F3'} padding={'12px'} borderRadius={'15px'} height={'calc( 100% - 70px )'}>
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
            <Grid templateColumns='repeat(4, 1fr)' gap={'70px'} w={'auto'} mt={'30px'}>
              {
                dataFollowers?.data?.map((item) => (
                  <Card bgColor={'white'} height={'300px'} as={VStack} padding={'5px'} justifyContent={'space-between'}>
                    <VStack w={'100%'}>
                      <Avatar height={'195px'} w={'205px'} />
                      <Text fontSize={'15px'} fontWeight={'bold'}>{item?.first_name} {item?.last_name}</Text>
                      {/* <Text>mohammadi@gmail.com</Text> */}
                    </VStack>
                    <Button bgColor={'#29CCCC'} w={'100%'} minH={'30px'}>دنبال کردن</Button>
                  </Card>
                ))
              }
            </Grid>
          </GridItem>
        </Grid>
      </Box >
    </MainLayout>
  );
};

export default Index;
