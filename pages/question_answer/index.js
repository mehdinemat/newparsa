import MainLayout from '@/components/mainLayout';
import { Avatar, AvatarGroup, Badge, Box, Button, Divider, Grid, GridItem, HStack, IconButton, Image, Stack, Text, Textarea, useBreakpointValue, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { IoArrowDown, IoArrowUp, IoBookmarkOutline, IoCheckmark, IoPencil, IoWarningOutline } from 'react-icons/io5';
import useSWR from 'swr';

const Index = () => {

  const slidesToShow = useBreakpointValue({ base: 1, md: 2, lg: 4 }); // responsive value

  const router = useRouter()
  const { query } = router;

  const { data: dataQuestion, isLoading: isLoadingQuestion } = useSWR(query?.id && `user/question?id=${query?.id}`)

  return (
    <MainLayout>
      <Box
        marginTop={{ base: '60px', md: "100px" }}
        w="100%"
        alignItems={"center"}
        justifyContent={"center"}
        maxW="container.xl"
        mx="auto"
        p={"20px"}
      >
        <HStack w={'100%'} alignItems={'start'} gap={'20px'}>

          {slidesToShow != 1 && <VStack>
            <IconButton icon={<IoArrowUp color='gray' />} variant={'outline'} colorScheme='gray' borderRadius={'100%'} size={'sm'} />
            <Text>6</Text>
            <IconButton icon={<IoArrowDown color='gray' />} variant={'outline'} colorScheme='gray' borderRadius={'100%'} size={'sm'} />
            <IconButton icon={<IoBookmarkOutline color='gray' />} size={'sm'} />
          </VStack>}

          <VStack w={'100%'}>
            <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }} gap={"2px"} w={"100%"}>
              <GridItem colSpan={'2'} >
                <VStack w={'100%'} alignItems={'start'} justifyContent={'start'} h={'100%'}>
                  <Text>اگر نتوانیم آن را انجام دهیم، آیا می‌توان فطریه را به یک بدهکار ورشکسته داد؟</Text>
                  <HStack w={'100%'}>
                    <HStack w={'100%'} justifyContent={'space-between'}>
                      <HStack>
                        <Avatar w={'28px'} h={'28px'} display={{ base: 'none', md: 'flex' }} />
                        <Text minW={'100px'} color={'gray.400'} fontSize={'16px'}>اسلام کوئست</Text>
                      </HStack>
                      <HStack w={'100%'} justifyContent={'end'} display={{ base: 'none', md: 'flex' }}>
                        <Text fontSize={'sm'} color={'gray.400'}>پاسخ ۲۱ ساعت قبل</Text>
                        <AvatarGroup size="sm" max={2}>
                          <Avatar
                            name="Ryan Florence"
                            src="https://bit.ly/ryan-florence"
                          />
                          <Avatar
                            name="Segun Adebayo"
                            src="https://bit.ly/sage-adebayo"
                          />
                          <Avatar
                            name="Kent Dodds"
                            src="https://bit.ly/kent-c-dodds"
                          />
                          <Avatar
                            name="Prosper Otemuyiwa"
                            src="https://bit.ly/prosper-baba"
                          />
                          <Avatar
                            name="Christian Nwamba"
                            src="https://bit.ly/code-beast"
                          />
                        </AvatarGroup>
                      </HStack>
                    </HStack>
                  </HStack>
                </VStack>
              </GridItem>
              <GridItem as={Stack} alignItems={'end'} display={{ base: 'none' }}>
                <Button bgColor={'#F9C96D'} fontWeight={'normal'}>سؤال خود را بپرسید</Button>
              </GridItem>
            </Grid>
            <Divider my={'10px'} />
            <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }} gap={{ base: '10px', md: "20px" }} w={"100%"}>
              <GridItem as={Stack} position={'relative'} direction={{ base: 'row', md: 'column' }} colSpan={'2'} w={'100%'} >
                {slidesToShow == 1 && <VStack gap={0}>
                  <IconButton icon={<IoArrowUp color='gray' />} variant={'outline'} colorScheme='gray' borderRadius={'100%'} size={'sm'} />
                  <Text>6</Text>
                  <IconButton icon={<IoArrowDown color='gray' />} variant={'outline'} colorScheme='gray' borderRadius={'100%'} size={'sm'} />
                  <IconButton icon={<IoBookmarkOutline color='gray' />} size={'sm'} />
                </VStack>}
                <VStack>
                  <Text lineHeight={'taller'}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی</Text>
                  <Image src='./imageskelete.png' w={'100%'} height={'530px'} my={'10px'} borderRadius={'2px'} />
                  <Text lineHeight={'taller'}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی</Text>
                  <Stack direction={{ base: 'column', md: 'row' }} w={'100%'} justifyContent={'space-between'} my={'20px'}>
                    <HStack w={{ base: '100%' }} justifyContent={{ base: 'start' }}>
                      <Badge bgColor={'#29CCCC1A'} color={'#16A6A6'} padding={'5px'} borderRadius={'5px'} w={{ base: 'min-content' }} textAlign={'center'}>خداشناسی</Badge>
                      <Badge bgColor={'#29CCCC1A'} color={'#16A6A6'} padding={'5px'} borderRadius={'5px'} w={{ base: 'min-content' }} textAlign={'center'}>توحید</Badge>
                      <Badge bgColor={'#29CCCC1A'} color={'#16A6A6'} padding={'5px'} borderRadius={'5px'} w={{ base: 'min-content' }} textAlign={'center'}>فقه سیاسی</Badge>
                      <Badge bgColor={'#29CCCC1A'} color={'#16A6A6'} padding={'5px'} borderRadius={'5px'} w={{ base: 'min-content' }} textAlign={'center'}>پزشکی</Badge>
                    </HStack>
                    <HStack gap={0} alignItems={'center'}>
                      <Button colorScheme='gray' color={'gray'} variant={'ghost'} fontWeight={'normal'} size={'sm'}>گزارش محتوای نامناسب</Button>
                      <IoWarningOutline color='gray' />
                    </HStack>
                  </Stack>
                  <Box w={'100%'} padding={'10px'} px={'20px'} bgColor={'#f9f9fd'} borderRadius={'15px'} my={{ base: '0px', md: '10px' }}>
                    <HStack w={'100%'} justifyContent={'space-between'}>
                      <Text fontWeight={'bold'} fontSize={'16px'}>
                        دیدگاه‌ها
                      </Text>
                      <HStack>
                        <Text fontSize={'sm'} color={'gray'}>دیدگاه خود را بنویسید</Text>
                        <IconButton icon={<IoPencil color='gray' />} variant={'ghost'} />
                      </HStack>
                    </HStack>
                    <Stack direction={{ base: 'column', md: 'row' }} w={'100%'} >
                      <Text fontSize={'sm'} color={'gray'} lineHeight={'taller'}>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیک است.</Text>
                      <HStack>
                        <Text color={'#3646B3'}>حسن الماسی</Text>
                        <Text color={'gray'} fontSize={'sm'}>۴ روز پیش</Text>
                      </HStack>
                    </Stack>
                    <Divider borderColor={'#EBEBEB'} my={'10px'} />
                    <Stack direction={{ base: 'column', md: 'row' }} w={'100%'} >
                      <Text fontSize={'sm'} color={'gray'} lineHeight={'taller'}>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیک است.</Text>
                      <HStack>
                        <Text color={'#3646B3'}>حسن الماسی</Text>
                        <Text color={'gray'} fontSize={'sm'}>۴ روز پیش</Text>
                      </HStack>
                    </Stack>
                    <Divider borderColor={'#EBEBEB'} my={'10px'} />

                    <Stack direction={{ base: 'column', md: 'row' }} w={'100%'} >
                      <Text fontSize={'sm'} color={'gray'} lineHeight={'taller'}>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیک است.</Text>
                      <HStack>
                        <Text color={'#3646B3'}>حسن الماسی</Text>
                        <Text color={'gray'} fontSize={'sm'}>۴ روز پیش</Text>
                      </HStack>
                    </Stack>
                    <Divider borderColor={'#EBEBEB'} my={'10px'} />
                  </Box>
                  <Box w={{ base: 'fit-content', md: '100%' }} padding={{ base: 'none', md: '10px' }} px={{ base: 'none', md: '20px' }} bgColor={'white'} borderRadius={'15px'} mb={'10px'} mr={{ base: '-40px', md: '0px' }} border={{ base: 'none', md: '1px' }} borderColor={{ base: 'none', md: 'gray.200' }}>
                    <HStack w={'100%'} justifyContent={'space-between'} my={'10px'}>
                      <Text fontWeight={'bold'} fontSize={'18px'}>
                        جواب ها
                      </Text>
                    </HStack>
                    <HStack alignItems={'start'} gap={'10px'}>
                      <VStack>
                        <IconButton icon={<IoArrowUp color='gray' />} variant={'outline'} colorScheme='gray' borderRadius={'100%'} size={'sm'} />
                        <Text>6</Text>
                        <IconButton icon={<IoArrowDown color='gray' />} variant={'outline'} colorScheme='gray' borderRadius={'100%'} size={'sm'} />
                        <IconButton icon={<IoCheckmark color='white' />} variant={'ghost'} bgColor='#29CCCC' borderRadius={'100%'} size={'sm'} />
                        <IconButton icon={<IoBookmarkOutline color='gray' fontSize={'20px'} />} size={'sm'} />
                      </VStack>
                      <VStack w={'100%'} alignItems={'start'}>
                        <Text lineHeight={'taller'} w={'fit-content'}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص</Text>
                        <HStack w={'100%'} justifyContent={{ base: 'start', md: 'space-between' }} mt={'10px'}>
                          <HStack order={{ base: 2 }}>
                            <Avatar width={'28px'} height={'28px'} order={{ base: 2 }} />
                            <Text color={'gray'} fontSize={'sm'} order={{ base: 1 }}>اسلام کوئست</Text>
                          </HStack>
                          <HStack order={{ base: 1 }}>
                            <Text fontSize={'sm'} color={'gray.500'}>۲۱ ساعت قبل</Text>
                            <Divider height={'10px'} borderColor={'#EBEBEB'} orientation='vertical' />
                            {slidesToShow != 1 && <HStack gap={0} alignItems={'center'}>
                              <Button colorScheme='gray' color={'gray'} variant={'ghost'} fontWeight={'normal'} size={'sm'}>گزارش محتوای نامناسب</Button>
                              <IoWarningOutline color='gray' />
                            </HStack>}
                          </HStack>
                        </HStack>
                        {slidesToShow == 1 && <HStack gap={0} alignItems={'center'}>
                          <Button colorScheme='gray' color={'gray'} variant={'ghost'} fontWeight={'normal'} size={'sm'}>گزارش محتوای نامناسب</Button>
                          <IoWarningOutline color='gray' />
                        </HStack>}
                        <Box w={'100%'} padding={'10px'} px={'20px'} bgColor={'#f9f9fd'} borderRadius={'15px'}>
                          <HStack w={'100%'} justifyContent={'space-between'}>
                            <Text fontWeight={'bold'} fontSize={'16px'}>
                              دیدگاه‌ها
                            </Text>
                            <HStack>
                              <Text fontSize={'sm'} color={'gray'}>دیدگاه خود را بنویسید</Text>
                              <IconButton icon={<IoPencil color='gray' />} variant={'ghost'} />
                            </HStack>
                          </HStack>
                          <Stack direction={{ base: 'column', md: 'row' }} w={'100%'} >
                            <Text fontSize={'sm'} color={'gray'} lineHeight={'taller'}>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیک است.</Text>
                            <HStack>
                              <Text color={'#3646B3'}>حسن الماسی</Text>
                              <Text color={'gray'} fontSize={'sm'}>۴ روز پیش</Text>
                            </HStack>
                          </Stack>
                          <Divider borderColor={'#EBEBEB'} my={'10px'} />
                          <Stack direction={{ base: 'column', md: 'row' }} w={'100%'} >
                            <Text fontSize={'sm'} color={'gray'} lineHeight={'taller'}>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیک است.</Text>
                            <HStack>
                              <Text color={'#3646B3'}>حسن الماسی</Text>
                              <Text color={'gray'} fontSize={'sm'}>۴ روز پیش</Text>
                            </HStack>
                          </Stack>
                          <Divider borderColor={'#EBEBEB'} my={'10px'} />
                          <Stack direction={{ base: 'column', md: 'row' }} w={'100%'} >
                            <Text fontSize={'sm'} color={'gray'} lineHeight={'taller'}>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیک است.</Text>
                            <HStack>
                              <Text color={'#3646B3'}>حسن الماسی</Text>
                              <Text color={'gray'} fontSize={'sm'}>۴ روز پیش</Text>
                            </HStack>
                          </Stack>
                        </Box>
                      </VStack>
                    </HStack>
                    <Divider mt={'20px'} borderColor={'gray.200'} />
                    <HStack alignItems={'start'} gap={'10px'} my={'20px'}>
                      <VStack>
                        <IconButton icon={<IoArrowUp color='gray' />} variant={'outline'} colorScheme='gray' borderRadius={'100%'} size={'sm'} />
                        <Text>6</Text>
                        <IconButton icon={<IoArrowDown color='gray' />} variant={'outline'} colorScheme='gray' borderRadius={'100%'} size={'sm'} />
                        <IconButton icon={<IoCheckmark color='white' />} variant={'ghost'} bgColor='#29CCCC' borderRadius={'100%'} size={'sm'} />
                        <IconButton icon={<IoBookmarkOutline color='gray' fontSize={'20px'} />} size={'sm'} />
                      </VStack>
                      <VStack w={'100%'} alignItems={'start'}>
                        <Text lineHeight={'taller'}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص</Text>
                        <HStack w={'100%'} justifyContent={{ base: 'start', md: 'space-between' }} my={'10px'}>
                          <HStack order={{ base: 2 }}>
                            <Avatar width={'28px'} height={'28px'} order={{ base: 2 }} />
                            <Text color={'gray'} fontSize={'sm'} order={{ base: 1 }}>اسلام کوئست</Text>
                          </HStack>
                          <HStack order={{ base: 1 }}>
                            <Text fontSize={'sm'} color={'gray.500'}>۲۱ ساعت قبل</Text>
                            <Divider height={'10px'} borderColor={'#EBEBEB'} orientation='vertical' />
                            {slidesToShow != 1 && <HStack gap={0} alignItems={'center'}>
                              <Button colorScheme='gray' color={'gray'} variant={'ghost'} fontWeight={'normal'} size={'sm'}>گزارش محتوای نامناسب</Button>
                              <IoWarningOutline color='gray' />
                            </HStack>}
                          </HStack>
                        </HStack>
                        {slidesToShow == 1 && <HStack gap={0} alignItems={'center'}>
                          <Button colorScheme='gray' color={'gray'} variant={'ghost'} fontWeight={'normal'} size={'sm'}>گزارش محتوای نامناسب</Button>
                          <IoWarningOutline color='gray' />
                        </HStack>}

                      </VStack>
                    </HStack>
                  </Box>
                  <Box w={{ base: 'fit-content', md: '100%' }} padding={'20px'} bgColor={'#3646B3'} borderRadius={'15px'} my={{ base: '0px', md: '0px' }} mr={{ base: '-40px', md: '0px' }}>
                    <HStack>
                      <VStack w={'100%'} alignItems={'start'}>
                        <Text fontWeight={'bold'} color={'white'} fontSize={'16px'} mb={'10px'}>پاسخ شما</Text>
                        <Text fontSize={'xs'} color={'white'}>برای پاسخ به این سؤال، باید وارد حساب کاربری خود شوید.</Text>
                      </VStack>
                      <Button bgColor={'#29CCCC'} fontWeight={'normal'} p={'10px'} w={{ base: '200px', md: '150px' }} size={'sm'}>ورود به حساب کاربری</Button>
                    </HStack>
                  </Box>
                  <Box w={{ base: 'full', md: '100%' }} padding={'20px'} bgColor={'white'} border={'1px'} borderColor={'gray.200'} borderRadius={'15px'} my={'10px'} mr={{ base: '-40px', md: '0px' }}>
                    <VStack w={'100%'} alignItems={'start'}>
                      <Text fontWeight={'bold'} fontSize={'16px'} mb={'10px'}>پاسخ شما</Text>
                      <Text fontSize={'xs'} >پاسخ‌های تولید شده توسط ابزارهای هوش مصنوعی مجاز نیستند.</Text>
                    </VStack>
                    <Textarea my={'20px'} />
                    <HStack w={'100%'} justifyContent={'end'}><Button bgColor={'#29CCCC'} fontWeight={'normal'} p={'10px'} size={'sm'}>ثبت پاسخ</Button></HStack>
                  </Box>
                </VStack>

              </GridItem>
              <GridItem>
                <Box as={VStack} alignItems={'start'} border={'1px'} borderColor={'gray.200'} h={'min-content'} borderRadius={'15px'} padding={'20px'} w={{ base: 'fit-content', md: '100%' }}>
                  <Text fontWeight={'bold'} fontSize={'16px'} mb={'10px'}>سؤال‌‌های مرتبط</Text>
                  <HStack alignItems={'start'}>
                    <Badge bgColor={'#29CCCC'} color={'white'} paddingY={'2px'} px={'10px'} borderRadius={'5px'}>6</Badge>
                    <Text fontSize={'sm'}>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله</Text>
                  </HStack>
                  <Divider />
                  <HStack alignItems={'start'}>
                    <Badge bgColor={'#29CCCC'} color={'white'} paddingY={'2px'} px={'10px'} borderRadius={'5px'}>6</Badge>
                    <Text fontSize={'sm'}>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله</Text>
                  </HStack>
                  <Divider />
                  <HStack alignItems={'start'}>
                    <Badge bgColor={'#29CCCC'} color={'white'} paddingY={'2px'} px={'10px'} borderRadius={'5px'}>6</Badge>
                    <Text fontSize={'sm'}>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله</Text>
                  </HStack>
                  <Divider />
                  <HStack alignItems={'start'}>
                    <Badge bgColor={'#29CCCC'} color={'white'} paddingY={'2px'} px={'10px'} borderRadius={'5px'}>6</Badge>
                    <Text fontSize={'sm'}>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله</Text>
                  </HStack>
                </Box>
                <Box as={VStack} alignItems={'start'} border={'1px'} borderColor={'gray.200'} h={'min-content'} borderRadius={'15px'} padding={'20px'} my={'20px'}>
                  <Text fontWeight={'bold'} fontSize={'16px'} mb={'10px'}>سؤال‌‌های پربازدید</Text>
                  <VStack alignItems={'start'}>
                    <Text>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله</Text>
                    <HStack alignItems={'center'}>
                      <Badge bgColor={'#D2D2D2'} color={'white'} paddingY={'2px'} px={'10px'} borderRadius={'5px'} w={'24px'} h={'24px'}></Badge>
                      <Text fontSize={'xs'} color={'#29CCCC'}>فقه سیاسی</Text>
                    </HStack>
                  </VStack>
                  <Divider />
                  <VStack alignItems={'start'}>
                    <Text>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله</Text>
                    <HStack alignItems={'center'}>
                      <Badge bgColor={'#D2D2D2'} color={'white'} paddingY={'2px'} px={'10px'} borderRadius={'5px'} w={'24px'} h={'24px'}></Badge>
                      <Text fontSize={'xs'} color={'#29CCCC'}>فقه سیاسی</Text>
                    </HStack>
                  </VStack>
                  <Divider />
                  <VStack alignItems={'start'}>
                    <Text>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله</Text>
                    <HStack alignItems={'center'}>
                      <Badge bgColor={'#D2D2D2'} color={'white'} paddingY={'2px'} px={'10px'} borderRadius={'5px'} w={'24px'} h={'24px'}></Badge>
                      <Text fontSize={'xs'} color={'#29CCCC'}>فقه سیاسی</Text>
                    </HStack>
                  </VStack>
                  <Divider />
                  <VStack alignItems={'start'}>
                    <Text>لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله</Text>
                    <HStack alignItems={'center'}>
                      <Badge bgColor={'#D2D2D2'} color={'white'} paddingY={'2px'} px={'10px'} borderRadius={'5px'} w={'24px'} h={'24px'}></Badge>
                      <Text fontSize={'xs'} color={'#29CCCC'}>فقه سیاسی</Text>
                    </HStack>
                  </VStack>
                </Box>
              </GridItem>
            </Grid>
          </VStack>

        </HStack>

      </Box>
    </MainLayout>
  )
}

export default Index
