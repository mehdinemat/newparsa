import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  Tooltip,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import QuestionMCard from "@/components/home/mobile/questionMCard";
import { baseUrl } from "@/components/lib/api";
import LoadingDots from "@/components/loadingDots";
import Pagination from "@/components/pagination";
import QuestionCard from "@/components/questionCars";
import TextSlider from "@/components/textSlider";
import axios from "axios";
import { motion } from "framer-motion";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosList, IoMdCheckmarkCircleOutline, IoMdClose } from "react-icons/io";
import { IoMic, IoOptionsOutline, IoSearch } from "react-icons/io5";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

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

const tags = [
  "جامعه اسلامی",
  "قرآن",
  "جمهوری اسلامی",
  "احادیث معتبر",
  "روایات",
  "جامعه اسلامی",
];

const sendAudio = async (url, { arg }) => {
  const formData = new FormData();
  formData.append("file", arg, "voice.wav");

  const res = await fetch(baseUrl + url, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to upload audio");
  return res.json();
};


const Index = ({ children, filters, setFilters, source , register, handleClickAiSearch}) => {
  const { t } = useTranslation();

  const size = useBreakpointValue({ base: "base", md: "md", xl: "xl" });

  const router = useRouter();

  const { locale } = useRouter();

  const [page, setPage] = useState(1);

  const [isUserLogin, setIsUserLogin] = useState("");

  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [chatSession, setChatSession] = useState("");
  const [botStream, setBotStream] = useState("");
  const [aiMessage, setAiMessage] = useState("");
  const [filter, setFilter] = useState(false);
  const [conditionStream, setConditionStream] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [continueQuestion , setContinueQuestion ] = useState(false)
  const [chatHistory, setChatHistory] = useState([]);
  const [input, setInput] = useState("");

  const inputRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const currentSize = useBreakpointValue({ base: "base", md: "md", lg: "lg" });

  
  const [searchActive, setSearchActive] = useState(false);

  const { trigger: uploadAudio, isMutating } = useSWRMutation(
    "user/general/speech-to-text",
    sendAudio,
    {
      onSuccess: (data) => {
        handleVoiceSearch(data?.data?.text);
      },
    }
  );


  useEffect(() => {
    setIsUserLogin(!!localStorage.getItem("token"));
  }, []);

  const sourceParams =
    filters?.source?.length > 0
      ? filters.source
          .map((src) => `&source_list=${encodeURIComponent(src)}`)
          .join("")
      : "";

  const {
    data: dataQuestionSearch,
    error: errorQuestionSearch,
    isLoading: isLoadingQuestionSearch,
  } = useSWR(
    `user/question/search?page=${(page - 1) * 10}` +
      `&search_type=${filters?.search_type || ""}` +
      `&content=${filters?.search || ""}` +
      `&lang=${locale}` +
      `${filters?.order_by ? `&order_by=${filters.order_by}` : ""}` +
      `&model_name=${filters?.model || ""}` +
      `${sourceParams}`,
    fetcherWithTiming
  );

  const { trigger: triggerSession } = useSWRMutation(
    `user/chat/session`,
    postRequest,
    {
      onSuccess: async (data) => {
        setChatSession(data?.data?.data?.id);
        setIsStreaming(true);
        
        const userId = Date.now();

        const newUserMsg = {
          id: userId,
          role: 2, // user
          content: filters?.search,
          level: (chatHistory?.length ?? 0) + 1, // increment level
        };

        setChatHistory((prev) => {
          const base = Array.isArray(prev) ? prev : [];
          return [...base, newUserMsg];
        });


        const streamId = userId + 1;
    let botMessage = "";
    setChatHistory((prev) => [
      ...(Array.isArray(prev) ? prev : []),
      { id: streamId, role: 3, content: "", level: (chatHistory?.length ?? 0) + 2 },
    ]);

        setBotStream("");
        setAiMessage("");

        setInput('')

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
          setIsStreaming(false);
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

              if (!parsed?.chunk) {
                setConditionStream(parsed?.state);
              }

              if (parsed.chunk) {
                setConditionStream("");
                setIsStreaming(false);
                botMessage += parsed.chunk;

                setChatHistory((prev) =>
              prev.map((msg) =>
                msg.id === streamId ? { ...msg, content: botMessage } : msg
              )
            );
            
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

  useEffect(()=>{
    console.log(chatHistory, 'this is 37')
  },[chatHistory])

  const publicChat = async () => {
    let botMessage = "";
    setIsStreaming(true);
    setBotStream("");
    setAiMessage("");
    const res = await fetch(
      `https://parsa.api.t.etratnet.ir/user/chat/anonymous`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          messages: [{ content: filters?.search, role: "user" }],
        }),
      }
    );

    if (!res.body) {
      setIsStreaming(false);
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

          if (!parsed?.chunk) {
            setConditionStream(parsed?.state);
          }

          if (parsed.chunk) {
            setConditionStream("");
            setIsStreaming(false);
            botMessage += parsed.chunk;
            console.log(parsed);
            // update assistant message in history
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
  };

  useEffect(() => {
    setPage(1);
  }, [filters?.search]);

  useEffect(() => {
    if (filters?.type == "ai") {
      setAiMessage("");
      if (isUserLogin) {
        triggerSession();
      } else {
        publicChat();
      }
    }
  }, [filters?.search]);

  return (
    <Tabs w={"100%"} scrollSnapAlign="start">
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
        <link rel="icon" href="/question.png" />
      </Head>
      <Box
        w="100%"
        alignItems={"center"}
        justifyContent={"center"}
        maxW="container.xl"
        mx="auto"
        p={"20px"}
        mt={{ base: "60px", md: "30px" }}
      >
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(1, 1fr)" }}
          templateAreas={{
            base: `"main" "right" "left" "slider"`,
          }}
          gap={"20px"}
          w={"100%"}
        >
          <Box
            p={{ base: 0, md: "6" }}
            order={{ base: 1, md: 2 }}
            as={VStack}
            width={"100%"}
            alignItems={"start"}
            colSpan={{ md: 4 }}
            w="100%"
            overflowWrap="break-word"
            wordBreak="break-word"
            maxW={{ base: "calc( 100vw - 100px )", md: "100vw" }}
            whiteSpace="normal"
            pr={{ base: 0, md: "21px" }}
          >
            {filters?.type == "ai" && (
              <VStack mb={"80px"} alignItems={"start"}>
                <Text fontSize={{ base: "11px", md: "16px" }} color={"#C2C2C2"}>
                  {filters?.search}
                </Text>

               

                <Tabs colorScheme="blue" variant="unstyled">
  <TabList>
    <Tab  _selected={{
            borderBottom: "3px solid #3646B3", // active border
            color: "#3646B3", // active text color
          }}>
         <HStack w={"100%"} alignItems={"center"}>
                  <svg
                    width="21"
                    height="22"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.7422 0L17.1554 6.14379C18.1138 10.3056 21.2586 13.5519 25.2904 14.5412L31.2422 16L25.2904 17.4588C21.2586 18.4481 18.1138 21.6944 17.1554 25.8562L15.7422 32L14.329 25.8562C13.3706 21.6944 10.2257 18.4481 6.19398 17.4588L0.242188 16L6.19398 14.5412C10.2257 13.5519 13.3706 10.3056 14.329 6.14379L15.7422 0Z"
                      fill="#3646B3"
                    />
                  </svg>
                  <Text fontSize={"22px"} color={"#3646B3"} fontWeight={'700'} width={'max-content'}>
                    نتایج جستجو هوشمند
                  </Text>
                </HStack>
                </Tab>
                <HStack w={"100%"} alignItems={"center"} color={'#B8B8B8'}>
                  <IoIosList fontSize={'20px'} />
                  <Text fontSize={"22px"} fontWeight={'700'} onClick={() => {
            const el = document.querySelector(".questionlist");
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }} cursor={'pointer'}>نتایج بین سوالات پارسا</Text>
                  </HStack>
                
  </TabList>

  <TabPanels>
    <TabPanel>
    <Box
                bgColor={"#F7F7F7"}
                borderRadius={"30px"}
                w={"100%"}
                padding={'15px'}
                pb={'0px'}
              >

                {chatHistory?.map((chat, index) => {
              const isLast = index === chatHistory.length - 1;

              return (
            
                <Box
                  key={chat.id}
                  id={chat.role === 2 ? 'user' : 'bot'}
                  alignSelf={chat.role === 2 ? 'flex-start' : 'flex-end'}
                  border={'.3px'}
                  bgColor={chat.role === 2 ? '#3646B3' : 'none'}
                  px={'18px'}
                  py={'5px'}
                  borderRadius={'20px'}
                  borderBottomRightRadius={chat.role === 2 ? '0px' : '20px'}
                  w={'auto'}
                  maxW={chat.role == 2 ? 'fit-content':'100%'}
                  mb={'15px'}
                  justifyContent={'start'}
                >
                  {
                    chat.role != 2
                      ?
                      <Box
                        padding={"5px"}
                        borderRadius={"30px"}

                      >
                        <ReactMarkdown
                          remarkPlugins={[remarkBreaks]}
                          components={{
                            h1: (props) => (
                              <Heading as="h2" size="lg" my={2} {...props} />
                            ),
                            h2: (props) => (
                              <Heading as="h3" size="md" my={2} {...props} />
                            ),
                            h3: (props) => (
                              <Heading as="h4" size="sm" my={2} {...props} />
                            ),
                            p: (props) => (
                              <Text
                                fontSize="20px"
                                fontWeight="400"
                                my={1}
                                {...props}
                              />
                            ),
                            a: ({ href, children }) => (
                              <Link
                                href={href}
                                color="blue.500"
                                isExternal
                                _hover={{
                                  textDecoration: "underline",
                                  color: "blue.600",
                                }}
                              >
                                {children}
                              </Link>
                            ),
                          }}
                        >
                          {chat?.content}
                        </ReactMarkdown>

                        {isStreaming && chat.role !== 2 && isLast && (

<LoadingDots size="sm" color="blue.500" conditionStream={conditionStream} />
)}

                        <HStack mt={'10px'} justifyContent={'space-between'} pb={continueQuestion ? '0px':'15px'}>

                 <HStack gap={'15px'}>
                 <Button bgColor={'#DFE3FF'} color={'#3646B3'} borderRadius={'18px'} fontSize={'14px'} width={'180px'} fontWeight={'500'}>بررسی عمیق‌تر</Button>
                  <Button bgColor={'white'} color={'#CCCCCC'} leftIcon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.00001 5.40001C4.00001 4.62201 4.62201 4.00001 5.40001 4.00001L12.6 4.00001C13.378 4.00001 14 4.62201 14 5.40001V6.00001C14 6.13133 14.0259 6.26136 14.0761 6.38269C14.1264 6.50401 14.2 6.61425 14.2929 6.70711C14.3858 6.79997 14.496 6.87363 14.6173 6.92388C14.7386 6.97414 14.8687 7.00001 15 7.00001C15.1313 7.00001 15.2614 6.97414 15.3827 6.92388C15.504 6.87363 15.6143 6.79997 15.7071 6.70711C15.8 6.61425 15.8736 6.50401 15.9239 6.38269C15.9741 6.26136 16 6.13133 16 6.00001V5.40001C16 3.51801 14.482 2.00001 12.6 2.00001L5.40001 2.00001C4.95329 1.99921 4.51081 2.08662 4.09795 2.25721C3.68508 2.42779 3.30996 2.6782 2.99408 2.99408C2.6782 3.30996 2.42779 3.68508 2.25721 4.09795C2.08662 4.51081 1.99921 4.95329 2.00001 5.40001L2.00001 12.6C2.00001 14.482 3.51801 16 5.40001 16H6.00001C6.26522 16 6.51958 15.8946 6.70711 15.7071C6.89465 15.5196 7.00001 15.2652 7.00001 15C7.00001 14.7348 6.89465 14.4804 6.70711 14.2929C6.51958 14.1054 6.26522 14 6.00001 14H5.40001C4.62201 14 4.00001 13.378 4.00001 12.6L4.00001 5.40001Z" fill="#CCCCCC"/>
<path d="M9 11.4C9 10.7635 9.25286 10.153 9.70294 9.70294C10.153 9.25286 10.7635 9 11.4 9L18.6 9C19.2365 9 19.847 9.25286 20.2971 9.70294C20.7471 10.153 21 10.7635 21 11.4V18.6C21 19.2365 20.7471 19.847 20.2971 20.2971C19.847 20.7471 19.2365 21 18.6 21H11.4C10.7635 21 10.153 20.7471 9.70294 20.2971C9.25286 19.847 9 19.2365 9 18.6L9 11.4Z" fill="#CCCCCC"/>
</svg>
} borderRadius={'18px'}>کپی</Button>
                  <Button bgColor={'white'} color={'#CCCCCC'} leftIcon={ <IoMdCheckmarkCircleOutline fontSize={"30px"} />} borderRadius={'18px'}>مفید بود</Button>
                  <Button bgColor={'white'} color={'#CCCCCC'} leftIcon={<svg width="29" height="30" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<g opacity="0.5">
<path d="M10.1855 10.459L18.8438 19.349" stroke="#999999" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.8457 10.459L10.1875 19.349" stroke="#999999" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<path opacity="0.5" d="M14.2607 1.50098C21.2711 1.50103 27.0215 7.34769 27.0215 14.6436C27.0213 21.9393 21.271 27.7851 14.2607 27.7852C7.25041 27.7852 1.50014 21.9393 1.5 14.6436C1.5 7.34766 7.25033 1.50098 14.2607 1.50098Z" stroke="#A1A1A1" stroke-width="3"/>
</svg>
} borderRadius={'18px'}>اشتباه بود</Button>
                 </HStack>

{ !continueQuestion && <Button bgColor={'#3646B3'} color={'white'} fontSize={'14px'} fontWeight={'500'} borderRadius={'18px'} width={'180px'} onClick={e=>setContinueQuestion
(true)}>ادامه گفتگو</Button>}
                  </HStack>
                        
                      </Box>

                      
                      :
                      <Text
                        fontSize={chat.role === 2 ? '13px' : '14px'}
                        fontWeight={'400'}
                        whiteSpace="pre-wrap"
                        color={chat.role === 2 ? 'white' : 'black'}
                      >
                        {chat.content}
                      </Text>
                  }
                 
                </Box>
                
              );
            })}
            </Box>
    </TabPanel>
  </TabPanels>
</Tabs>
          
                
                {/* {(!showMore && aiMessage?.length > 200) && (
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
                )} */}
              </VStack>
            )}

            <Flex
              flexDir={{ base: "column", md: "row" }}
              w={"100%"}
              justifyContent={"space-between"}
              alignItems={"start"}
              height={"100%"}
              width={"100%"}
              className="questionlist"
            >
              <HStack mb={"10px"} ml={"20px"}>
                <IoSearch color={"#3646B3"} fontSize={"22px"} />
                <Text
                  fontSize={{ base: "20px", md: "30px" }}
                  color={"#3646B3"}
                  whiteSpace={"nowrap"}
                >
                  نتایج جستجو بین سوالات
                </Text>
                <Text
                  color={"#C2C2C2"}
                  fontSize={{ base: "11px", md: "16px" }}
                  whiteSpace={"nowrap"}
                >
                  {dataQuestionSearch?.data?.data?.total_count} سوال
                </Text>
              </HStack>
              {!filter ? (
                <Box
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
                    {size != "base" && (
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
                    )}

                    <IconButton
                      icon={<IoOptionsOutline color="#3646B3" />}
                      fontSize="31px"
                    />
                  </HStack>
                </Box>
              ) : (
                <Box
                  flex="1"
                  as={HStack}
                  justifyContent={"space-between"}
                  w={"calc( 100% - 40px )"}
                  bgColor={"#3646B31A"}
                  overflow={"hidden"}
                  height={"60px"}
                  borderRadius={"10px"}
                >
                  <TextSlider
                    source={source}
                    setFilters={setFilters}
                    filters={filters}
                  />
                  <Box>
                    <IoMdClose
                      color="#3646B3"
                      fontSize={"24px"}
                      width={"fit-content"}
                      cursor={"pointer"}
                      style={{ width: "24px", marginLeft: "14px" }}
                      onClick={(e) => setFilter(false)}
                    />
                  </Box>
                </Box>
              )}
            </Flex>

            <VStack
              w={"100%"}
              bgColor={"white"}
              padding={"14px"}
              borderRadius={"15px"}
            >
              <HStack w={"100%"} justifyContent={"space-between"}></HStack>
              {isLoadingQuestionSearch ? (
                <HStack
                  w={"100%"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Spinner />
                </HStack>
              ) : (
                <VStack display={{ base: "none", md: "flex" }} w={"100%"} >
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

            <VStack display={{ base: "flex", md: "none" }} width={"100%"}>
              {dataQuestionSearch?.data?.data?.result?.map((item, index) => (
                <QuestionMCard key={index} data={item} t={t} />
              ))}
            </VStack>
          </Box>
        </Grid>
      </Box>
    </Tabs>
  );
};

export default Index;
