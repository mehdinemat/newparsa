import Header from "@/components/home/header";
import MainLayout from "@/components/mainLayout";
import {
  Box,
  Button,
  chakra,
  Collapse,
  Grid,
  GridItem,
  HStack,
  Spinner,
  Stack,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { Geist, Geist_Mono } from "next/font/google";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import QuestionMCard from "@/components/home/mobile/questionMCard";
import Pagination from "@/components/pagination";
import QuestionCard from "@/components/questionCars";
import { useRouter } from "next/router";

import ChatBot from "@/components/chatbot";
import SliderCom from "@/components/slider";
import SliderSource from "@/components/sliderSource";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
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

const items = [
  {
    image: "/img1.jpg",
    title: "آیت الله محمدتقی بهجت فومنی",
    button: "اطلاعات بیشتر",
  },
  {
    image: "/img2.jpg",
    title: "آیت الله جعفر سبحانی خیابانی تبریزی",
    button: "اطلاعات بیشتر",
  },
  {
    image: "/img3.jpg",
    title: "آیت الله سید عبدالکریم موسوی اردبیلی",
    button: "اطلاعات بیشتر",
  },
];
const items2 = [
  {
    image: "/img1.jpg",
  },
  {
    image: "/img2.jpg",
  },
  {
    image: "/img3.jpg",
  },
];

const RotatingIcon = chakra(IoIosArrowDown, {
  baseStyle: {
    transition: "transform 0.3s ease",
  },
});

export default function Home({ children }) {
  const [hoveredIndex, setHoveredIndex] = useState({ selected: "", val: "" });
  const [isUserLogin, setIsUserLogin] = useState("");

  const [test, setTest] = useState(
    "نماز آیات هنگام وقوع پدیده‌های طبیعی ترسناک مانند کسوف (خورشید گرفتگی)، خسوف (ماه گرفتگی)، زلزله، رعد و برق، بادهای سیاه و سرخ، صیحه آسمانی، یا فرو رفتن زمین واجب می‌شود. در مواردی مانند زلزله، رعد و برق و صیحه آسمانی، این نماز باید بلافاصله خوانده شود و اگر خوانده نشود تا آخر عمر بر گردن فرد باقی می‌ماند و هر وقت خوانده شود، به صورت ادا محسوب می‌شود. نماز آیات هنگام وقوع پدیده‌های طبیعی ترسناک مانند کسوف (خورشید گرفتگی)، خسوف (ماه گرفتگی)، زلزله، رعد و برق، بادهای سیاه و سرخ، صیحه آسمانی، یا فرو رفتن زمین واجب می‌شود. در مواردی مانند زلزله، رعد و برق و صیحه آسمانی، این نماز باید بلافاصله خوانده شود و اگر خوانده نشود تا آخر عمر بر گردن فرد باقی می‌ماند و هر وقت خوانده شود، به صورت ادا محسوب می‌شود نماز آیات هنگام وقوع پدیده‌های طبیعی ترسناک مانند کسوف (خورشید گرفتگی)، خسوف (ماه گرفتگی)، زلزله، رعد و برق، بادهای سیاه و سرخ، صیحه آسمانی، یا فرو رفتن زمین واجب می‌شود. در مواردی مانند زلزله، رعد و برق و صیحه آسمانی، این نماز باید بلافاصله خوانده شود و اگر خوانده نشود تا آخر عمر بر گردن فرد باقی می‌ماند و هر وقت خوانده شود، به صورت ادا محسوب می‌شو"
  );
  const [showMore, setShowMore] = useState(false);

  const [filters, setFilters] = useQueryParams({
    category_id: withDefault(StringParam, "28"),
  });

  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const router = useRouter();
  const { locale } = useRouter();
  const slidesToShow = useBreakpointValue({ base: 1, md: 2, lg: 4 }); // responsive value

  const [treeData, setTreeData] = useState([]);
  const [page, setPage] = useState(1);
  const [categoryId, setCategoryId] = useState("");
  const [searchType, setSearchType] = useState("search");

  const panelsRef = useRef(null);

  const { t } = useTranslation();

  const [showMenu, setShowMenu] = useState(false);
  const questionsRef = useRef(null);

  const {
    register: registerSearch,
    getValues: getValuesSearch,
    setValue: setValueSearch,
    handleSubmit: handleSubmitSearch,
    watch: watchSearch,
    reset: resetSearch,
  } = useForm();

  const {
    data: dataQuestion,
    error: errorQuestion,
    isLoading: isLoadingQuestion,
  } = useSWR(
    `user/question?lang=${locale}&page=${page}${
      categoryId && `&categories__id=${categoryId}`
    }`
  );
  // const {
  //   data: dataQuestionSearch,
  //   error: errorQuestionSearch,
  //   isLoading: isLoadingQuestionSearch,
  // } = useSWR(
  //   watchSearch("selected_search") &&
  //   `user/question/search?page=${page}&search_type=${searchType}&content=${watchSearch(
  //     "selected_search"
  //   )}${categoryId && `&categories__id=${categoryId}`}`
  // );

  const { data: dataGeneral, error: errorGeneral } = useSWR("user/general");

  const {
    data: dataCategoryChild,
    error: errorCategoryChild,
    mutate: mutateCategory,
    isLoading: isLoadingChildCategory,
  } = useSWR(`user/category?parent_id=${filters?.category_id}&type=question`);
  const {
    data: dataCategoryChild2,
    error: errorCategoryChild2,
    mutate: mutateCategory2,
    isLoading: isLoadingChildCategory2,
  } = useSWR(
    hoveredIndex?.val &&
      `user/category?parent_id=${hoveredIndex?.val}&type=question`
  );

  const { data: dataHadith, error: errorHadith } = useSWR("user/general/hadis");
  const { data: dataSource, error: errorSource } = useSWR(
    "user/source?size=10"
  );
  const { data: dataReferences, error: errorReferences } =
    useSWR("user/public-figure");

  const { data: dataCategory, isLoading: isLoadingCategory } = useSWR(
    `user/category?type=question`,
    {
      onSuccess: (res) => {},
    }
  );

  // Helper function to update treeData immutably
  const updateTreeData = (list, key, children) =>
    list.map((node) => {
      if (node.key === key) {
        return { ...node, children };
      } else if (node.children) {
        return {
          ...node,
          children: updateTreeData(node.children, key, children),
        };
      }
      return node;
    });

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -150 : 150;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleMouseDown = (e) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };
  const handleNewQuestionButton = () => {
    router.push("/new_question");
  };

  const handleClickSearch = () => {
    router.push(
      `/result_search?search=${watchSearch("search")}&search_type=search`
    );
  };
  const handleClickSemanticSearch = () => {
    router.push(
      `/result_search?search=${watchSearch(
        "search"
      )}&search_type=semantic_search`
    );
  };
  const handleVoiceSearch = (text) => {
    router.push(`/result_search?search=${text}&search_type=semantic_search`);
  };

  const handleCategoryLink = ({ title, id }) => {
    router.push(`/questions/category/${id}/${title}`);
  };
  const handleCategoryClick = (index, val) => {
    console.log(index, val, hoveredIndex);
    if (hoveredIndex?.selected == index && hoveredIndex?.val == val) {
      setHoveredIndex({ selected: "", val: "" });
    } else {
      setHoveredIndex({ selected: index, val: val });
    }
  };

  useEffect(() => {
    setIsUserLogin(!!localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (panelsRef.current && !panelsRef.current.contains(e.target)) {
        setHoveredIndex({ selected: "", val: "" }); // reset on outside click
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setHoveredIndex]);

  return (
    <MainLayout questionsRef={questionsRef}>
      <Head>
        <title>
          {t("parsa")} | {t("main_page")}
        </title>
        <link rel="icon" href="/question.png" />
      </Head>
      <Header
        data={dataGeneral?.data}
        t={t}
        register={registerSearch}
        watchSearch={watchSearch}
        resetSearch={resetSearch}
        handleClickSearch={handleClickSearch}
        handleClickSemanticSearch={handleClickSemanticSearch}
        handleVoiceSearch={handleVoiceSearch}
      />
      <Box
        w="100%"
        alignItems={"center"}
        justifyContent={"center"}
        maxW="container.xl"
        mx="auto"
        p={"20px"}
        className="questions"
        ref={questionsRef}
      >
        {isUserLogin && <ChatBot />}
        {/* <HStack
          w="100%"
          whiteSpace="normal"
          justifyContent={"space-between"}
          mb={{ base: "20px", md: "25px" }}
          mt={{ base: "20px", md: "25px" }}
          alignItems={{ base: "center", md: "start" }}
        >
          <Text fontWeight={"700"} fontSize={"22px"} letterSpacing={0}>
            {t("suggested_questions")}
          </Text>

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
            {t("ask_your_question")}
          </Button>
        </HStack> */}
        {/* <Tabs>
          <Box display="flex" alignItems="center">
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

          <TabPanels>
            {[...Array(20)].map((_, i) => (
              <TabPanel key={i} ref={panelsRef}>
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
                    </PopoverTrigger>
                    <Portal>
                      <PopoverContent bg="gray.100" // match your badge's color if needed
                        borderColor="gray.200"
                        borderRadius="7px"
                        mt="-8px" width={'none'} borderTopRightRadius={0} borderTopLeftRadius={0} boxShadow="0px 10px 22px 0px #00000040"
                      >
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
        </Tabs> */}
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
          templateAreas={{
            base: `"main" "right" "left" "slider"`,
          }}
          gap={"20px"}
          w={"100%"}
        >
          {/* Right Sidebar */}

          {/* <GridItem colSpan={1}>

            <Box
              mb={"20px"}
              order={3}
              as={GridItem}
              colSpan={"1"}
              w="100%"
              maxW={{ base: "calc( 100vw - 50px )", md: "100%" }}
              whiteSpace="normal"
              overflowWrap="break-word"

            >
              <Box
                w="100%"
                maxW="100%"
                p="30px"
                border="1px"
                borderColor="#EBEBEB"
                borderRadius="15px"
                bgColor="#CFF186"
                height="min-content"
                mb="20px"
                overflow="hidden"
                bgImage={'/bghadith2.png'}
                bgSize={'cover'}
                position={'relative'}
                bgPosition={'center'}
                overflowY={'hidden'}

              >
                <Box
                  as="img"
                  src={'/vec1.png'}
                  position="absolute"
                  top="0px"
                  left="0px"
                  maxHeight={'585px'}
                />
                <VStack alignItems={'center'} paddingX={'30px'}>
                  <Text fontSize="22px" fontWeight='extrabold' mt={'40px'}>
                    {t("hadith_of_the_day")}
                  </Text>
                  <Text mt="0px" whiteSpace="pre-wrap" wordBreak="break-word" align={'justify'} fontSize={'9px'} fontWeight={'bold'}>
                    {dataHadith?.data}
                  </Text>
                </VStack>
              </Box>

              <Box
                w={"100%"}
                p="4"
                height={"min-content"}
              >
                <Text fontWeight={"extrabold"} fontSize={"16px"} lineHeight={'100%'}>
                  {t("question_sources")}
                </Text>
                <VStack mt={"20px"} w={"100%"} alignItems={"start"}>
                  {dataSource?.data?.slice(0, 14)?.map((item, index) => (
                    <LeftSidebar
                      key={index}
                      data={item}
                      t={t}
                      last={index == 13}
                    />
                  ))}
                </VStack>
              </Box>
            </Box>
          </GridItem> */}

          {/* Main Content */}
          <GridItem
            p={{ base: 0, md: "0" }}
            order={{ base: 1, md: 2 }}
            as={GridItem}
            colSpan={{ md: 4 }}
            w="100%"
            overflowWrap="break-word"
            wordBreak="break-word"
            maxW="100vw"
            whiteSpace="normal"
            pr={{ base: 0, md: "21px" }}
            area={{ base: "main", md: "auto" }}
          >
            <VStack mb={"80px"} alignItems={"start"}>
              <Text fontSize={"16px"} color={"#C2C2C2"}>
                نماز آیات چه موقع واجب میشود؟
              </Text>
              <HStack w={"100%"} alignItems={"center"}>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.7422 0L17.1554 6.14379C18.1138 10.3056 21.2586 13.5519 25.2904 14.5412L31.2422 16L25.2904 17.4588C21.2586 18.4481 18.1138 21.6944 17.1554 25.8562L15.7422 32L14.329 25.8562C13.3706 21.6944 10.2257 18.4481 6.19398 17.4588L0.242188 16L6.19398 14.5412C10.2257 13.5519 13.3706 10.3056 14.329 6.14379L15.7422 0Z"
                    fill="#3646B3"
                  />
                </svg>
                <Text fontSize={"30px"} color={"#3646B3"}>
                  نتایج جستجو هوشمند
                </Text>
              </HStack>
              <Collapse startingHeight={80} in={showMore}>
                <Box bgColor={"#F7F7F7"} padding={"17px"} borderRadius={"30px"}>
                  <Text fontSize={"20px"} fontWeight={"400"}>
                    {test?.substring(0, showMore ? test?.length : 200)}
                  </Text>
                </Box>
              </Collapse>
              {!showMore && (
                <VStack w={"100%"} justifyContent={"center"}>
                  <Text
                    fontSize={"14px"}
                    color={"#3646B3"}
                    cursor={"pointer"}
                    onClick={(e) => setShowMore(true)}
                  >
                    مشاهده کامل
                  </Text>
                </VStack>
              )}
            </VStack>

            <HStack mb={"30px"}>
              <IoSearch color={"#3646B3"} fontSize={"22px"} />
              <Text fontSize={"30px"} color={"#3646B3"}>
                نتایج جستجو بین سوالات
              </Text>
              <Text color={"#C2C2C2"} fontSize={"16px"}>
                323 سوال
              </Text>
            </HStack>

            {isLoadingQuestion ? (
              <HStack
                w={"100%"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Spinner />
              </HStack>
            ) : (
              <VStack display={{ base: "none", md: "flex" }}>
                {dataQuestion?.data?.result?.map((item, index) => (
                  <QuestionCard key={index} data={item} t={t} />
                ))}
                <Stack
                  w={"100%"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  mt={"45px"}
                >
                  <HStack>
                    <Button
                      height={"32px"}
                      width={"178px"}
                      bgColor={"#3646B3"}
                      borderRadius={"15px"}
                      fontSize={"16px"}
                    >
                      مشاهده بیشتر
                    </Button>
                    <Button
                      height={"32px"}
                      width={"178px"}
                      bgColor={"#3646B31A"}
                      color={"#3646B3"}
                      variant={"outline"}
                      borderRadius={"15px"}
                      fontSize={"16px"}
                    >
                      سوال خود را بپرسید
                    </Button>
                  </HStack>
                  <Pagination
                    totalPages={dataQuestion?.data?.total_count}
                    currentPage={page}
                    onPageChange={setPage}
                    t={t}
                  />
                </Stack>
              </VStack>
            )}

            <VStack display={{ base: "flex", md: "none" }}>
              {dataQuestion?.data?.result?.map((item, index) => (
                <QuestionMCard key={index} data={item} t={t} />
              ))}

              <Stack w={"100%"} justifyContent={"center"} alignItems={"center"}>
                <Pagination
                  totalPages={dataQuestion?.data?.total_count}
                  currentPage={page}
                  onPageChange={setPage}
                  t={t}
                />
              </Stack>
            </VStack>
          </GridItem>

          {/* Left Sidebar */}

          <GridItem
            order={4}
            colSpan={{ md: 4 }}
            w={"100%"}
            maxW={{ base: "calc( 100vw - 50px )", md: "100vw" }}
            whiteSpace="normal"
            overflowWrap="break-word"
          >
            {dataReferences?.data && (
              <SliderCom
                items={dataReferences?.data?.result?.map((val) => ({
                  title: val?.full_name,
                  image: val?.image_url,
                  id: val?.id,
                  buttoh: "اطلاعات بیشتر",
                }))}
                height={"fit-content"}
                borderRadius={"5px"}
                title={t("sources")}
              />
            )}

            <Box w={"100%"} height={"min-content"}>
              <VStack mt={"20px"} w={"100%"} alignItems={"start"}>
                {dataSource?.data && (
                  <SliderSource
                    items={dataSource?.data?.map((val) => ({
                      title: val?.fa_source_name,
                      image: val?.logo_link,
                      id: val?.id,
                      count: val?.question_count,
                      buttoh: "اطلاعات بیشتر",
                    }))}
                    height={"133px"}
                    borderRadius={"5px"}
                    title={"منابع"}
                  />
                )}
              </VStack>
            </Box>
            {/* <SliderCom
              items={items2}
              height={"270px"}
              width="350px"
              borderRadius={"0px"}
              title={t("parsa_supporters")}
            /> */}
          </GridItem>
        </Grid>
      </Box>
    </MainLayout>
  );
}
