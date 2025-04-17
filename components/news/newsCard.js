import { Button, Divider, HStack, Image, Stack, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { IoCalendar, IoTime } from 'react-icons/io5';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

const NewsCard = () => {

  const router = useRouter()

  const handleClickNews = () => {
    router.replace('/news/123')
  }

  return (
    <Stack direction={{ base: 'column', md: 'row' }} w={{ base: 'calc( 100vw - 40px )', md: '100%' }} alignItems={'start'} border={'1px'} borderColor={'gray.200'} borderRadius={{ base: '10px', md: '15px' }} onClick={e => handleClickNews()} cursor={'pointer'}>
      <Image src='./newsphoto.png' width={{ base: '100%', md: '327px' }} height={'224px'} />
      <VStack w={'100%'} alignItems={'start'} minH={'224px'} justifyContent={'space-between'}>
        <VStack alignItems={'start'} padding={'10px'}>
          <Text fontWeight={'bold'} lineHeight={'taller'}>آیا پیامبر اکرم و ائمه اطهار (ع) بین نماز ظهر و عصر جمع می کردند؟</Text>
          <Text lineHeight={'taller'}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز...</Text>
        </VStack>
        <VStack w={'100%'} gap={{ base: 0 }}>
          <Divider />
          <HStack py={'5px'} px={{ base: '5px' }} w={'100%'} justifyContent={'space-between'} >
            <HStack color={'gray'}>
              <HStack>
                <IoCalendar color='gray' />
                <Text>۱۶ دی ۱۴۰۲، دی ۱۴۰۲  </Text>
              </HStack>
              <HStack display={{ base: 'none' }}>
                <IoTime color='gray' />
                <Text>زمان مورد نیاز برای مطالعه: ۷ دقیقه</Text>
              </HStack>
            </HStack>
            <Button variant={'ghost'} color={'#29CCCC'} rightIcon={<MdOutlineKeyboardArrowLeft />}>ادامه مطلب</Button>
          </HStack>
        </VStack>
      </VStack>
    </Stack>
  )
}

export default NewsCard
