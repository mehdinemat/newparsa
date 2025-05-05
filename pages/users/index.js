import MainLayout from "@/components/mainLayout";
import Pagination from "@/components/pagination";
import UsersCard from "@/components/users/usersCard";
import { Box, Button, Grid, HStack, Input, InputGroup, InputRightElement, Stack, Text } from "@chakra-ui/react";
import { BiSortAlt2 } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import Head from "next/head";

const Index = () => {

  const { t } = useTranslation();

  return (
    <MainLayout>
       <Head>
        <title>لیست کاربران</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
          <Text fontWeight={'bold'}>{t('users')}</Text>
          <InputGroup width={'290px'} height={'46px'} >
            <Input width={'290px'} height={'46px'} placeholder={t('search_user')} />
            <InputRightElement h="100%">
              <IoSearch fontSize="20px"
                style={{ marginTop: "2px" }}
                color="gray" />
            </InputRightElement>
          </InputGroup>
        </HStack>
        <HStack w={'100%'} justifyContent={'space-between'} my={'20px'}>
          {/* <Text fontWeight={'bold'} >کاربر</Text> */}
          <HStack w={'100%'} alignItems={'end'} justifyContent={'end'}>
            <HStack justifyContent={{ base: 'start' }}>
              <BiSortAlt2 color="gray" />
              <Button variant={'ghost'} fontSize={'sm'} padding={{ base: '0px' }} display={{ base: 'none', md: 'flex' }}>{t("sort_by")}</Button>
              <Button variant={'ghost'} fontSize={'sm'} padding={{ base: '0px' }} display={{ md: 'none', md: 'flex' }}>{t('latest')}</Button>

            </HStack>
            <HStack display={{ base: 'none', md: 'flex' }}>
              <Button variant={'ghost'} fontSize={'sm'}>{t('latest')}</Button>
              <Button variant={'ghost'} fontSize={'sm'}>{t('most_viewed')}</Button>
              <Button variant={'ghost'} fontSize={'sm'}>{t('most_popular')}</Button>
            </HStack>
          </HStack>
        </HStack>
        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }} gap={"20px"} w={"100%"}>
          <UsersCard t={t}/>
          <UsersCard t={t}/>
          <UsersCard t={t}/>
          <UsersCard t={t}/>
          <UsersCard t={t}/>
          <UsersCard t={t}/>
          <UsersCard t={t}/>
          <UsersCard t={t}/>
          <UsersCard t={t}/>
        </Grid>
        <Stack w={'100%'} justifyContent={'center'} alignItems={'center'}>
        <Pagination totalPages={20} currentPage={5} t={t}/>
          </Stack>
      </Box>
    </MainLayout>
  )
}

export default Index
