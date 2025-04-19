import MainLayout from "@/components/mainLayout"
import QuestionCard from "@/components/questionCars"
import { Box, Button, Divider, Grid, GridItem, HStack, IconButton, Stack, Text } from "@chakra-ui/react"
import { TbArrowsSort } from "react-icons/tb"
import RightSidebar from "../rightSidebar"

const Index = () => {
  return (
    <MainLayout>
      <Box
        w="100%"
        alignItems={"center"}
        justifyContent={"center"}
        maxW="container.xl"
        mx="auto"
        p={{ base: '20px', md: "60px" }}
        my={"20px"}
        mt={'60px'}
      >
        <Grid templateColumns='repeat(3, 1fr)' gap={'32px'} w={'100%'}>
          <GridItem colSpan={1}>
            <RightSidebar />
          </GridItem>
          <GridItem as={Stack} gap={'20px'} colSpan={2} >
            <Box p="6" colSpan={'2'}>
              <HStack
                w={"100%"}
                justifyContent={"space-between"}
                mb={"10px"}
                alignItems={"start"}
              >
                <Text fontWeight={"bold"} fontSize={"16px"}>
                  سؤال‌ها
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
              <HStack w={"100%"}
                justifyContent={"space-between"}
                mb={"10px"}
                alignItems={"start"}>
                <Text fontSize={"14px"}>
                  ۲۵۸ سؤال
                </Text>
                <HStack>
                  <IconButton icon={<TbArrowsSort />} colorScheme="gray" variant={'ghost'} _hover={{ bgColor: 'none' }} />
                  <Text>مرتب سازی بر اساس:</Text>
                  <Button colorScheme="gray" variant={'ghost'} _hover={{ bgColor: 'none' }} fontWeight={'normal'}>جدیدترین‌ها</Button>
                  <Button colorScheme="gray" variant={'ghost'} _hover={{ bgColor: 'none' }} fontWeight={'normal'}>پربازدیدترین‌ها</Button>
                  <Button colorScheme="gray" variant={'ghost'} _hover={{ bgColor: 'none' }} fontWeight={'normal'}>محبوبترین‌ها</Button>
                </HStack>
              </HStack>

              <Divider my={"20px"} />
              <QuestionCard />
              <Divider my={"20px"} />
              <QuestionCard />
              <Divider my={"20px"} />
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </MainLayout>
  )
}

export default Index
