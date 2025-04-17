import GoodsCard from "@/components/dashboard/goods/goodsCard"
import MainLayout from "@/components/mainLayout"
import { Box, Button, Divider, Grid, GridItem, HStack, Stack, Text, VStack } from "@chakra-ui/react"
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
              <HStack w={"100%"}
                justifyContent={"space-between"}
                mb={"10px"}
                alignItems={"start"}>
                <Text fontSize={"14px"}>
                  ۲۵۸ سؤال
                </Text>
                <HStack>
                  <TbArrowsSort />
                  <Text fontSize={'sm'}>مرتب سازی بر اساس:</Text>
                  <Button colorScheme="gray" variant={'ghost'} _hover={{ bgColor: 'none' }} fontWeight={'normal'} fontSize={'sm'}>جدیدترین‌ها</Button>
                  <Button colorScheme="gray" variant={'ghost'} _hover={{ bgColor: 'none' }} fontWeight={'normal'} fontSize={'sm'}>پربازدیدترین‌ها</Button>
                  <Button colorScheme="gray" variant={'ghost'} _hover={{ bgColor: 'none' }} fontWeight={'normal'} fontSize={'sm'}>محبوبترین‌ها</Button>
                </HStack>
              </HStack>
              <Divider my={'20px'} />
              <VStack>
                <GoodsCard />
                <Divider />

                <GoodsCard />
                <Divider />

                <GoodsCard />
                <Divider />

                <GoodsCard />
                <Divider />

              </VStack>

            </Box>
          </GridItem>
        </Grid>
      </Box>
    </MainLayout>
  )
}

export default Index
