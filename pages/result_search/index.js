import MainLayout from "@/components/mainLayout";
import {
  Box,
  chakra,
  Collapse,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Spinner,
  Stack,
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
import TextSlider from "@/components/textSlider";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import { IoOptionsOutline, IoSearch } from "react-icons/io5";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
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

const postRequest = (url, { arg }) => {
  console.log("slam");
  return axios.post(baseUrl + url, arg);
};

const tags = ['جامعه اسلامی', 'قرآن', 'جمهوری اسلامی', 'احادیث معتبر', 'روایات', 'جامعه اسلامی',]

const Index = ({ children }) => {
  const { t } = useTranslation();

  const router = useRouter();

  const { locale } = useRouter();

  const [page, setPage] = useState(1);

  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [chatSession, setChatSession] = useState("");
  const [botStream, setBotStream] = useState("");
  const [aiMessage, setAiMessage] = useState("");
  const [filter, setFilter] = useState(false)

  const [hoveredIndex, setHoveredIndex] = useState({ selected: "", val: "" });

  const [filters, setFilters] = useQueryParams({
    search: withDefault(StringParam, ""),
    search_type: withDefault(StringParam, ""),
    type: withDefault(StringParam, ""),
    order_by: withDefault(StringParam, ""),
    model: withDefault(StringParam, "e5"),
    source: withDefault(StringParam, ""),
    category_id: withDefault(StringParam, "28"),
  });

  const {
    register: registerSearch,
    getValues: getValuesSearch,
    setValue: setValueSearch,
    handleSubmit: handleSubmitSearch,
    watch: watchSearch,
    reset: resetSearch,
  } = useForm();

  const { data: dataCategory, isLoading: isLoadingCategory } = useSWR(
    `user/category?type=question`,
    {
      onSuccess: (res) => { },
    }
  );
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

  const { trigger: triggerSession } = useSWRMutation(
    `user/chat/session`,
    postRequest,
    {
      onSuccess: async (data) => {
        console.log(chatSession, data);

        setChatSession(data?.data?.data?.id);

        const userId = Date.now();
        let botMessage = "";
        setBotStream("");

        const res = await fetch(
          `https://parsa.api.t.etratnet.ir/user/chat/${data?.data?.data?.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ content: filters?.search }),
          }
        );

        if (!res.body) {
          console.error("No streaming body in response");
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let buffer = "";
        let done = false;

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = !!doneReading;
          if (value) buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split(/\r?\n/);
          buffer = lines.pop() ?? "";

          for (const rawLine of lines) {
            const line = rawLine.trim();
            if (!line.startsWith("data:")) continue;

            const jsonStr = line.replace(/^data:\s*/, "");
            if (jsonStr === "[DONE]") {
              done = true;
              break;
            }

            try {
              const parsed = JSON.parse(jsonStr);
              if (parsed.error) {
                console.error("Stream error:", parsed.error);
                done = true;
                break;
              }

              if (parsed.chunk) {
                botMessage += parsed.chunk;
                console.log(parsed);
                // update assistant message in history
                console.log(botMessage)
                setAiMessage(botMessage);
              }

              if (parsed.done) {
                done = true;
                break;
              }
            } catch (err) {
              console.error("Could not parse stream JSON:", jsonStr, err);
            }
          }
        }

        // clear botStream state if you don’t need it
        setBotStream("");
      },
    }
  );

  const handleNewQuestionButton = () => {
    router.push("/new_question");
  };
  const handleCurrectClick = (currect) => {
    router.push(
      `/ result_search?search=${currect}&search_type=${filters?.search_type}`
    );
  };

  const handleClickSearch = () => {
    router.push(
      `/result_search?search=${watchSearch("search")}&search_type=search`
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

  const handleCategoryClick = (index, val) => {
    setHoveredIndex({ selected: index, val: val });
  };

  const handleCategoryLink = ({ title, id }) => {
    router.push(`/questions/category/${id}/${title}`);
  };

  const RotatingIcon = chakra(IoIosArrowDown, {
    baseStyle: {
      transition: "transform 0.3s ease",
    },
  });

  useEffect(() => {
    if (filters?.type == "ai") {
      triggerSession();
    }
  }, []);

  return (
    <MainLayout
      menuDefault={true}
      register={registerSearch}
      watchSearch={watchSearch}
    >
      <Tabs w={"100%"} scrollSnapAlign="start">
        {/* <Box
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

        </Box> */}

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
          mt={{ base: "60px", md: "80px" }}
        >
          {/* <TabPanels>
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
          </TabPanels> */}
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(1, 1fr)" }}
            templateAreas={{
              base: `"main" "right" "left" "slider"`,
            }}
            gap={"20px"}
            w={"100%"}
          >
            {/* Right Sidebar */}
            {/* <Box
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
            </Box> */}

            {/* Main Content */}
            <Box
            
              p={{ base: 0, md: "6" }}
              order={{ base: 1, md: 2 }}
              as={VStack}
              width={'100%'}
              alignItems={'start'}
              colSpan={{ md: 4 }}
              w="100%"
              overflowWrap="break-word"
              wordBreak="break-word"
              maxW="100vw"
              whiteSpace="normal"
              pr={{ base: 0, md: "21px" }}
            >
              {filters?.type == "ai" && (
                <VStack mb={"80px"} alignItems={"start"}>
                  <Text fontSize={"16px"} color={"#C2C2C2"}>
                    {filters?.search}
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
                    <Box
                      bgColor={"#F7F7F7"}
                      padding={"17px"}
                      borderRadius={"30px"}
                      minW={'100%'}
                    >
                      <ReactMarkdown
                        remarkPlugins={[remarkBreaks]}
                        components={{
                          h1: (props) => <Heading as="h1" size="xl" my={2} {...props} />,
                          h2: (props) => <Heading as="h2" size="lg" my={2} {...props} />,
                          h3: (props) => <Heading as="h3" size="md" my={2} {...props} />,
                          p: (props) => <Text fontSize={"20px"} fontWeight={"400"} my={1} {...props} />,
                        }}
                      >
                        {aiMessage?.substring(
                          0,
                          showMore ? aiMessage?.length : 200
                        )}
                      </ReactMarkdown>
                    </Box>
                  </Collapse>
                  {(!showMore && aiMessage?.length > 200) && (
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
              )}

              <HStack w={'100%'} justifyContent={'space-between'} height={'100%'} width={'100%'}>
                <HStack mb={"10px"} ml={'20px'}>
                  <IoSearch color={"#3646B3"} fontSize={"22px"} />
                  <Text fontSize={"30px"} color={"#3646B3"} whiteSpace={'nowrap'}>
                    نتایج جستجو بین سوالات
                  </Text>
                  <Text color={"#C2C2C2"} fontSize={"16px"} whiteSpace={'nowrap'}>
                    {dataQuestionSearch?.data?.data?.total_count} سوال
                  </Text>
                </HStack>
                {!filter ? <Box
                  position="relative"
                  cursor="pointer"
                  borderRadius="15px"
                  overflow="hidden"
                  role="group"
                  onClick={() => setFilter(true)}
                >
                  {/* Background */}
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    width="0" // default: no background
                    height="100%"
                    bgColor="#3646B31A"
                    transition="width 0.4s ease" // collapse smoothly on leave
                    _groupHover={{
                      width: "100%", // appear instantly on hover
                      transition: "none", // no animation on hover enter
                    }}
                    zIndex={0}
                  />

                  {/* Content */}
                  <HStack
                    position="relative"
                    alignItems="center"
                    justifyContent="center"
                    height="60px"
                    px={4}
                    spacing={2}
                    zIndex={1}
                  >
                    <Text
                      fontFamily="iransans"
                      fontWeight="500"
                      fontSize="20px"
                      color="#3646B3"
                      opacity={0} // hidden initially
                      transition="opacity 0.4s ease" // smooth fade on leave
                      _groupHover={{
                        opacity: 1, // appear instantly
                        transition: "none", // no animation on hover enter
                      }}
                      pointerEvents="none"
                    >
                      فیلترها
                    </Text>

                    <IconButton icon={<IoOptionsOutline color="#3646B3" />} fontSize="31px" />
                  </HStack>
                </Box>


                  :
                  <Box as={HStack} justifyContent={'space-between'} w={'100%'} bgColor={'#3646B31A'} overflow={'hidden'} height={'60px'} borderRadius={'10px'}>
                    <TextSlider />
                    <IoMdClose color="#3646B3" fontSize={'24px'} width={'fit-content'} cursor={'pointer'} style={{ width: '24px', marginLeft: '14px' }} onClick={e => setFilter(false)} />
                  </Box>
                }
              </HStack>

              <VStack
                w={"100%"}
                bgColor={"white"}
                padding={"14px"}
                borderRadius={"15px"}
              >
                <HStack w={"100%"} justifyContent={"space-between"}>
                  {/* <Text w={"full"}>
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
                  </HStack> */}
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
                  <VStack display={{ base: "none", md: "flex" }} w={"100%"}>
                    {dataQuestionSearch?.data?.data?.result?.map(
                      (item, index) => (
                        <QuestionCard
                          key={index}
                          data={item}
                          t={t}
                          bgColor={"#F7F7F7"}
                        />
                      )
                    )}
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

              <VStack display={{ base: "flex", md: "none" }} width={'100%'}>
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
