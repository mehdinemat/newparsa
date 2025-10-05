import {
  Box,
  Grid,
  Heading,
  HStack,
  IconButton,
  Spinner,
  Stack,
  Tabs,
  Text,
  VStack
} from "@chakra-ui/react";
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
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";
import { IoOptionsOutline, IoSearch } from "react-icons/io5";
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

const tags = ['جامعه اسلامی', 'قرآن', 'جمهوری اسلامی', 'احادیث معتبر', 'روایات', 'جامعه اسلامی',]

const Index = ({ children, filters, setFilters }) => {
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

  const { trigger: triggerSession } = useSWRMutation(
    `user/chat/session`,
    postRequest,
    {
      onSuccess: async (data) => {
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

  useEffect(() => {
    setPage(1);
  }, [filters?.search]);

  useEffect(() => {
    if (filters?.type == "ai") {
      setAiMessage("")
      triggerSession();
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
                <Box
                  bgColor={"#F7F7F7"}
                  padding={"17px"}
                  borderRadius={"30px"}

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
                    {aiMessage}
                  </ReactMarkdown>
                </Box>
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

        </Grid>
      </Box>
    </Tabs>
  );
};

export default Index;
