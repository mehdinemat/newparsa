import MainLayout from "@/components/mainLayout";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Button,
  Center,
  chakra,
  Checkbox,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  SimpleGrid,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack
} from "@chakra-ui/react";
import { Geist, Geist_Mono } from "next/font/google";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import QuestionMCard from "@/components/home/mobile/questionMCard";
import { baseUrl } from "@/components/lib/api";
import Pagination from "@/components/pagination";
import QuestionCard from "@/components/questionCars";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { TbArrowsSort } from "react-icons/tb";
import useSWR from "swr";
import { StringParam, useQueryParams, withDefault } from "use-query-params";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const fetcherWithTiming = async (url) => {
  const startTime = performance.now();
  const response = await fetch(baseUrl + url);
  const endTime = performance.now();
  const duration = endTime - startTime;

  if (!response.ok) throw new Error("Request failed");

  const data = await response.json();

  return { data, duration };
};

const Index = ({ children }) => {


  const { t } = useTranslation();

  const router = useRouter();

  const { locale } = useRouter();

  const [page, setPage] = useState(1);

  const scrollRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState({ selected: '', val: '' });

  const [filters, setFilters] = useQueryParams({
    search: withDefault(StringParam, ""),
    search_type: withDefault(StringParam, ""),
    order_by: withDefault(StringParam, ""),
    model: withDefault(StringParam, "e5"),
    source: withDefault(StringParam, ""),
    category_id: withDefault(StringParam, '28')
  });

  const { data: dataCategory, isLoading: isLoadingCategory } = useSWR(
    `user/category?type=question`,
    {
      onSuccess: (res) => { },
    }
  );
  const { data: dataCategoryChild, error: errorCategoryChild, mutate: mutateCategory, isLoading: isLoadingChildCategory } = useSWR(`user/category?parent_id=${filters?.category_id}&type=question`);
  const { data: dataCategoryChild2, error: errorCategoryChild2, mutate: mutateCategory2, isLoading: isLoadingChildCategory2 } = useSWR(hoveredIndex?.val && `user/category?parent_id=${hoveredIndex?.val}&type=question`);


  const { data: dataResource, isLoading: isLoadingResource } =
    useSWR(`user/source`);

  const {
    data: dataQuestionSearch,
    error: errorQuestionSearch,
    isLoading: isLoadingQuestionSearch,
  } = useSWR(
    `user/question/search?page=${(page - 1) * 10}&search_type=${filters?.search_type
    }&content=${filters?.search}&lang=${locale}${filters?.order_by && `&order_by=${filters?.order_by}`
    }&model_name=${filters?.model}&source_name=${filters?.source}`,
    fetcherWithTiming
  );
  const {
    data: dataCurrection,
    error: errorCurrection,
    isLoading: isLoadingCurrection,
  } = useSWR(`user/question/spell-correction?content=${filters?.search}`);

  const handleNewQuestionButton = () => {
    router.push("/new_question");
  };
  const handleCurrectClick = (currect) => {
    router.push(
      `/ result_search?search=${currect}&search_type=${filters?.search_type}`
    );
  };

  useEffect(() => {
    setPage(1);
  }, [filters?.search]);

  const handleChangeModel = () => {
    setPage(1);
    setFilters({ model: "bge" });
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -150 : 150
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const handleMouseDown = (e) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = x - startX
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  const handleCategoryClick = (index, val) => {
    setHoveredIndex({ selected: index, val: val })
  }

  const handleCategoryLink = ({ title, id }) => {
    router.push(`/questions/category/${id}/${title}`);
  };

  const RotatingIcon = chakra(IoIosArrowDown, {
    baseStyle: {
      transition: 'transform 0.3s ease',
    },
  });

  return (
    <MainLayout>
      <Tabs w={'100%'}>

        <Box
          height="230px"
          w="100%"
          position="fixed"
          top="0"
          left="0"
          zIndex="9999"
          bg="white"
          borderBottom="1px"
          borderBottomColor="gray.200"
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
          mt={'100px'}
        >
          <VStack w={'100%'} height={'100%'} justifyContent={'space-between'}>
            <HStack
              maxW="container.xl"
              mx="auto"
              w="100%"
              whiteSpace="normal"
              justifyContent={"space-between"}
              mb={{ base: "30px", md: "20px" }}
              alignItems={{ base: "center", md: "start" }}
              bgColor={'#f7f7f7'}
              borderRadius={'15px'}
              p={'15px'}
              mt={'22px'}
            >
              <VStack alignItems={"start"}>
                <HStack>
                  <Text
                    fontWeight={"700"}
                    fontSize={"22px"}
                    color={"gray"}
                    letterSpacing={0}
                  >
                    نتایج جستجو{" "}
                    {filters?.search_type == "search" ? " لفظی " : " معنایی "}{" "}
                    برای:
                  </Text>
                  <Text fontWeight={"bold"} fontSize={"16px"}>
                    {filters?.search}
                  </Text>
                  <Text
                    color={"blue.400"}
                    cursor={"pointer"}
                    onClick={(e) => handleChangeModel()}
                  >
                    جستجو بر اساس مدل دوم
                  </Text>
                </HStack>
                {filters?.search !=
                  dataCurrection?.data?.data?.spell_correction_text &&
                  dataCurrection?.data?.data?.spell_correction_text && (
                    <HStack>
                      <Text fontSize={"16px"}>
                        آیا منظور شما{" "}
                        <Text
                          as={"span"}
                          color={"blue.500"}
                          cursor={"pointer"}
                          onClick={(e) =>
                            handleCurrectClick(
                              dataCurrection?.data?.data?.spell_correction_text
                            )
                          }
                        >
                          {dataCurrection?.data?.data?.spell_correction_text}
                        </Text>{" "}
                        بود؟
                      </Text>
                    </HStack>
                  )}


              </VStack>
              <Button
                width={{ base: "152px", md: "189px" }}
                height={"50px"}
                bgColor={"#F9C96D"}
                color={"black"}
                fontWeight={"400"}
                fontSize={"16px"}
                lineHeight={"100%"}
                letterSpacing={0}
                borderRadius={"10px"}
                onClick={(e) => handleNewQuestionButton()}
              >
                سوال خود را بپرسید
              </Button>
            </HStack>

            <Box display="flex" alignItems="center" maxW="100%">
              <IconButton
                colorScheme="gray"
                icon={<IoIosArrowForward />}
                aria-label="Scroll Left"
                onClick={() => scroll('left')}
                size="sm"
                mr={2}
                borderRadius={0}
                mb={'10px'}
                color={'#3646B3'}
              />
              <IconButton
                colorScheme="gray"
                icon={<IoIosArrowBack />}
                aria-label="Scroll Right"
                onClick={() => scroll('right')}
                size="sm"
                ml={2}
                mb={'10px'}
                borderRadius={0}
                color={'#3646B3'}
              />
              <Box
                ref={scrollRef}
                overflowX="auto"
                whiteSpace="nowrap"
                flex="1"
                cursor={isDragging ? 'grabbing' : 'grab'}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                css={{
                  '&::-webkit-scrollbar': { display: 'none' },
                  '-ms-overflow-style': 'none',
                  'scrollbar-width': 'none',
                }}
                borderBottom={'1px'}
                borderBottomColor={'gray.200'}
              >
                <TabList mb={'2px'} borderBottom={'none'}>
                  {dataCategory?.data?.map((item, i) => (
                    <Tab key={i} whiteSpace="nowrap"
                      onClick={e => setFilters({ category_id: item?.id })}
                      _selected={{
                        borderBottom: '3px solid #3646B3', // custom color and width
                        bgColor: '#F7F7F7',
                        color: '#3646B3'
                      }}
                      px={4}
                      py={2}>
                      {item?.name}
                    </Tab>
                  ))}
                </TabList>
              </Box>

            </Box>


          </VStack>

        </Box>


        <Head>
          <title>
            {t("parsa")} :{" "}
            {t(
              filters?.search_type != "search"
                ? "semantic_search_results_for"
                : "literal_search_results_for"
            )}{" "}
            :{filters?.search}
          </title>
          <link rel="icon" href="/porsyab_header.png" />
        </Head>
        <Box
          w="100%"
          alignItems={"center"}
          justifyContent={"center"}
          maxW="container.xl"
          mx="auto"
          p={"20px"}
          mt={{ base: "60px", md: "320px" }}
        >
          <TabPanels>
            {[...Array(20)].map((_, i) => (
              <TabPanel key={i}>
                {!isLoadingChildCategory ? <SimpleGrid
                  columns={{ base: 1, sm: 2, md: 3, lg: 5 }}
                  spacing={5}
                  mb={'50px'}
                >{dataCategoryChild?.data?.map((val, index) => (
                  <Popover >
                    <PopoverTrigger>
                      <Button as={Badge} height={'35px'} width={'200px'} colorScheme="gray" bgColor={hoveredIndex?.selected === index ? 'white' : ''} borderRadius={'7px'} py={'8px'} textAlign={'center'} cursor={'pointer'} color={'#3646B3'} onClick={() => handleCategoryClick(index, val?.id)} borderBottomRightRadius={hoveredIndex?.selected === index ? 0 : ''} borderBottomLeftRadius={hoveredIndex?.selected === index ? 0 : ''} variant={hoveredIndex?.selected === index ? 'outline' : 'solid'} rightIcon={
                        <RotatingIcon
                          transform={hoveredIndex?.selected === index ? 'rotate(180deg)' : 'rotate(0deg)'}
                        />
                      }
                      >{val?.name}</Button>
                      {/* <Badge colorScheme="gray" borderRadius={'7px'} py={'8px'} textAlign={'center'} cursor={'pointer'} color={'#3646B3'}>{val?.name}</Badge> */}
                    </PopoverTrigger>
                    <Portal>
                      <PopoverContent bg="gray.100" // match your badge's color if needed
                        borderColor="gray.200"
                        borderRadius="7px"
                        mt="-8px" width={'none'} borderTopRightRadius={0} borderTopLeftRadius={0} boxShadow="0px 10px 22px 0px #00000040"
                      >
                        {/* <PopoverHeader>{val?.name}</PopoverHeader> */}
                        <PopoverBody padding={0} width={'200px'} >
                          {
                            !mutateCategory2 ? <Spinner /> : dataCategoryChild2?.data?.map((item) => (

                              <Badge height={'35px'} width={'200px'} colorScheme="gray" bgColor={'white'} py={'8px'} textAlign={'center'} cursor={'pointer'} color={'#3646B3'} _hover={{ bgColor: '#D9D9D9' }} borderBottom={'1px'} borderBottomColor={'gray.200'} onClick={e => {
                                handleCategoryLink({ title: item?.name, id: item?.id })

                              }}> {item?.name}</Badge>
                            ))
                          }

                        </PopoverBody>
                      </PopoverContent>
                    </Portal>
                  </Popover>

                ))}
                </SimpleGrid> : <Center><Spinner /></Center>}
              </TabPanel>
            ))}
          </TabPanels>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
            templateAreas={{
              base: `"main" "right" "left" "slider"`,
            }}
            gap={"20px"}
            w={"100%"}
          >
            {/* Right Sidebar */}
            <Box
              w="100%"
              maxW={{ base: "calc( 100vw - 50px )", md: "100vw" }}
              overflow="hidden"
              wordBreak="break-word"
              order={{ base: 2, md: 1 }}
              zIndex={100}
              border={"1px"}
              borderColor={"#EBEBEB"}
              borderRadius={"15px"}
              padding={"10px"}
              height={"min-content"}
            >
              <Text fontWeight={"bold"} fontSize={"16px"}>
                فیلترها
              </Text>
              <Accordion dir="rtl" mt={"20px"} w="100%" allowMultiple>
                {isLoadingResource ? (
                  <Center>
                    <Spinner />
                  </Center>
                ) : (
                  <AccordionItem>
                    <h2>
                      <AccordionButton flexDirection="row-reverse">
                        <AccordionIcon ml={2} />
                        <Box as="span" flex="1" textAlign="right">
                          منابع
                        </Box>
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <VStack gap={"20px"}>
                        {/* <InputGroup>
                      <Input placeholder="جستجوی عبارت" />
                      <InputRightElement>
                        <IoSearch />
                      </InputRightElement>
                    </InputGroup> */}
                        {dataResource?.data?.map((source) => (
                          <HStack
                            w={"100%"}
                            alignItems={"center"}
                            justifyContent={"start"}
                          >
                            <Checkbox
                              colorScheme="blue"
                              isChecked={
                                source?.en_source_name == filters?.source
                              }
                              size={"lg"}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFilters({ source: source?.en_source_name });
                                } else if (
                                  filters?.source == source?.en_source_name
                                ) {
                                  setFilters({ source: undefined });
                                }
                              }}
                            ></Checkbox>
                            <Text>{source?.fa_source_name}</Text>
                          </HStack>
                        ))}
                      </VStack>
                    </AccordionPanel>
                  </AccordionItem>
                )}
              </Accordion>
            </Box>

            {/* Main Content */}
            <Box
              p={{ base: 0, md: "6" }}
              order={{ base: 1, md: 2 }}
              as={GridItem}
              colSpan={{ md: 3 }}
              w="100%"
              overflowWrap="break-word"
              wordBreak="break-word"
              maxW="100vw"
              whiteSpace="normal"
              pr={{ base: 0, md: "21px" }}
            >

              <VStack w={'100%'} bgColor={'#F7F7F7'} padding={'14px'} borderRadius={'15px'}>
                <HStack w={"100%"} justifyContent={"space-between"} mb={"20px"} >
                  <Text w={"full"}>
                    {dataQuestionSearch?.data?.data?.total_count} نتیجه (
                    {(dataQuestionSearch?.duration / 1000).toFixed(3) || 0} ثانیه)
                  </Text>
                  <HStack>
                    <TbArrowsSort color="gray" fontSize={"16px"} />
                    <Text fontSize={"sm"} w={"max-content"}>
                      مرتب سازی :
                    </Text>
                    <Button
                      colorScheme="gray"
                      variant={"ghost"}
                      _hover={{ bgColor: "none" }}
                      fontSize={"sm"}
                      fontWeight={filters?.order_by == "view" ? "bold" : "normal"}
                      onClick={(e) => setFilters({ order_by: "view" })}
                    >
                      پربازدیدترین‌ها
                    </Button>
                    <Button
                      colorScheme="gray"
                      variant={"ghost"}
                      _hover={{ bgColor: "none" }}
                      fontWeight={filters?.order_by == "vote" ? "bold" : "normal"}
                      fontSize={"sm"}
                      onClick={(e) => setFilters({ order_by: "vote" })}
                    >
                      محبوبترین‌ها
                    </Button>
                  </HStack>
                </HStack>
                {isLoadingQuestionSearch ? (
                  <HStack
                    w={"100%"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Spinner />
                  </HStack>
                ) : (
                  <VStack display={{ base: "none", md: "flex" }} w={'100%'}>
                    {dataQuestionSearch?.data?.data?.result?.map((item, index) => (
                      <QuestionCard key={index} data={item} t={t} bgColor={'white'} />
                    ))}
                    <Stack
                      w={"100%"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Pagination
                        totalPages={
                          Math?.ceil(
                            dataQuestionSearch?.data?.data?.total_count / 10
                          ) - 1
                        }
                        currentPage={page}
                        onPageChange={setPage}
                        t={t}
                      />
                    </Stack>
                  </VStack>
                )}
              </VStack>

              <VStack display={{ base: "flex", md: "none" }}>
                {dataQuestionSearch?.data?.data?.result?.map((item, index) => (
                  <QuestionMCard key={index} data={item} t={t} />
                ))}
              </VStack>
            </Box>

            {/* Left Sidebar */}
            {/* <Box
            order={3}
            as={GridItem}
            colSpan={"1"}
            w="100%"
            maxW={{ base: "calc( 100vw - 50px )", md: "100vw" }}
            whiteSpace="normal"
            overflowWrap="break-word"
          >
            <Box
              w={"100%"}
              p="4"
              border={"1px"}
              borderColor={"#EBEBEB"}
              borderRadius={"15px"}
              height={"min-content"}
              mb={"30px"}
            >
              <Text fontWeight={"bold"} fontSize={"16px"}>
                مستحبات
              </Text>
              <VStack mt={"20px"} w={"100%"} alignItems={"start"}>
                <Image src="./tasbihimage.png" />
                <Text lineHeight={"tall"} fontSize={"16px"} color={"#666666"}>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                  با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی
                  تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای
                  کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و
                  آینده، شناخت فراوان جامعه و متخصصان را خلاقی
                </Text>
                <HStack w={"100%"} justifyContent={"end"}>
                  <Button color={"#29CCCC"} fontWeight={"normal"}>
                    اطلاعات بیشتر
                  </Button>
                </HStack>
              </VStack>
            </Box>
          </Box> */}
          </Grid>
        </Box>
      </Tabs>

    </MainLayout>
  );
};

export default Index;
