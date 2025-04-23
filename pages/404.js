import MainLayout from "@/components/mainLayout"
import { Box, Button, HStack, Image, Text, VStack } from "@chakra-ui/react"
import { useRouter } from "next/router"

const Custom404 = () => {

  const router = useRouter()

  const handleLinkToHomePage = () => {
    router.replace('/')
  }

  return (
    <MainLayout>
      <Box
        w="100%"
        alignItems={"center"}
        justifyContent={"center"}
        maxW="container.xl"
        mx="auto"
        p={"20px"}
        mt={'100px'}
      >
        <VStack gap={'20px'} my={'80px'} >
          <HStack position={'relative'} w={'100%'} alignItems={'center'} justifyContent={'center'} gap={'10px'}>
            <Image src={'./second4.png'} w={'105px'} h={'129px'} />
            <Image src={'./zero.png'} w={'105px'} h={'129px'} />
            <Image src={'./first4.png'} w={'105px'} h={'129px'} />
          </HStack>
          <Text fontWeight={'bold'} fontSize={'20px'}>صفحه مورد نظر پیدا نشد!</Text>
          <Button bgColor={'#29CCCC'} fontWeight={'normal'} onClick={handleLinkToHomePage}>بازگشت به صفحه اصلی</Button>
        </VStack>
      </Box>
    </MainLayout>
  )
}

export default Custom404
