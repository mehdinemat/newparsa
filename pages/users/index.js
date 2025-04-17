import MainLayout from "@/components/mainLayout";
import UsersCard from "@/components/users/usersCard";
import { Box, Button, Grid, HStack, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { BiSortAlt2 } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";

const Index = () => {
  return (
    <MainLayout>
      <Box
        marginTop={{ base: '60px', md: "100px" }}
        mb={'20px'}
        w="100%"
        alignItems={"center"}
        justifyContent={"center"}
        maxW="container.xl"
        mx="auto"
        p={{ base: '0px', md: "20px" }}
        px={{ base: '20px' }}
      >
        <HStack w={'100%'} justifyContent={'space-between'} display={{ base: 'none', md: 'flex' }}>
          <Text fontWeight={'bold'}>کاربران</Text>
          <InputGroup width={'290px'} height={'46px'} >
            <Input width={'290px'} height={'46px'} placeholder="جستجو کاربر" />
            <InputRightElement h="100%">
              <IoSearch fontSize="20px"
                style={{ marginTop: "2px" }}
                color="gray" />
            </InputRightElement>
          </InputGroup>
        </HStack>
        <HStack w={'100%'} justifyContent={'space-between'} my={'20px'}>
          <Text fontWeight={'bold'} >کاربر</Text>
          <HStack w={'100%'} alignItems={'end'} justifyContent={'end'}>
            <HStack justifyContent={{ base: 'start' }}>
              <BiSortAlt2 color="gray" />
              <Button variant={'ghost'} fontSize={'sm'} padding={{ base: '0px' }} display={{ base: 'none', md: 'flex' }}>مرتب سازی براساس:</Button>
              <Button variant={'ghost'} fontSize={'sm'} padding={{ base: '0px' }} display={{ md: 'none', md: 'flex' }}>جدیدترین ها</Button>

            </HStack>
            <HStack display={{ base: 'none', md: 'flex' }}>
              <Button variant={'ghost'} fontSize={'sm'}>جدیدترین‌ها</Button>
              <Button variant={'ghost'} fontSize={'sm'}>پربازدیدترین‌ها</Button>
              <Button variant={'ghost'} fontSize={'sm'}>محبوبترین‌ها</Button>
            </HStack>
          </HStack>
        </HStack>
        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }} gap={"20px"} w={"100%"}>
          <UsersCard />
          <UsersCard />
          <UsersCard />
          <UsersCard />
          <UsersCard />
          <UsersCard />
          <UsersCard />
          <UsersCard />
          <UsersCard />
          <UsersCard />
          <UsersCard />
          <UsersCard />
          <UsersCard />
        </Grid>
      </Box>
    </MainLayout>
  )
}

export default Index
