import IsLogin from "@/components/base/isLogin";
import MultiSelectComboBox from "@/components/base/multiSelectComboBox";
import { baseUrl } from "@/components/lib/api";
import MainLayout from "@/components/mainLayout";
import {
  Box,
  Button,
  CloseButton,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  List,
  ListItem,
  Spinner,
  Text,
  Textarea,
  VStack
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import * as Yup from 'yup';

const data = [
  {
    title: "عنوان اول",
    description: "توضیح کوتاه در مورد این کارت.",
    image: "/img1.jpg",
  },
  {
    title: "عنوان دوم",
    description: "توضیح متفاوت با محتوای بیشتر نسبت به کارت‌های دیگر.",
    image: "/img2.jpg",
  },
  {
    title: "عنوان سوم",
    description: "کارت دیگر با یک تصویر متفاوت.",
    image: "/img3.jpg",
  },
  {
    title: "عنوان چهارم",
    description: "توضیحی دیگر برای نمایش در کارت.",
    image: "/img1.jpg",
  },
  {
    title: "عنوان پنجم",
    description: "کارت با توضیحی بسیار بلندتر برای تست کردن ارتفاع کارت.",
    image: "/img2.jpg",
  },
];

const options = [
  { value: "react", label: "React" },
  { value: "nextjs", label: "Next.js" },
  { value: "chakra", label: "Chakra UI" },
  { value: "tailwind", label: "Tailwind" },
];

const postRequest = (url, { arg }) => {
  return axios.post(`${baseUrl}${url}`, arg, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const Index = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [queryToSearch, setQueryToSearch] = useState("");

  const router = useRouter()
  const { locale } = router;

  const [isUserLogin, setIsUserLogin] = useState('')

  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const { t } = useTranslation();

  const { data: dataTag, isLoading: isLoadingTag } = useSWR(
    `user/category/tag?name__icontains=${inputValue}`
  );
  const { data: dataSearchQuestion, isLoading: isLoadingSearchQuestion } = useSWR(
    `user/question/search?content=${encodeURIComponent(queryToSearch)}&search_type=search&lang=${locale}`
  );
  const { trigger: triggerQuestion, isLoading: isLoadingQuestion } =
    useSWRMutation(`user/question`, postRequest);

  const validationSchema = Yup.object({
    title: Yup.string()
      .required('عنوان الزامی است') // Persian: "Title is required"
      .min(3, 'عنوان باید حداقل ۳ کاراکتر باشد'), // "Title must be at least 3 characters"

    content: Yup.string()
      .required('محتوا الزامی است') // "Content is required"
      .min(10, 'محتوا باید حداقل ۱۰ کاراکتر باشد') // "Content must be at least 10 characters"
  });

  const {
    register: registerQuestion,
    setValue: setValueQuestion,
    getValues: getValuesQuestion,
    watch: watchQuestion,
    handleSubmit: handleSubmitQuestion,
    reset: resetQuestion,
    formState: { errors }

  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const breakpointColumnsObj = {
    default: 1,
    1100: 1,
    700: 1,
  };

  const handleAddNewQuestion = (e) => {
    triggerQuestion({
      ...e,
      lang: "fa",
      tags: selectedOptions.map((item) => item.value),
      categories: [],
    });
    resetQuestion();
    selectedOptions([]);
  };

  useEffect(() => {
    setIsUserLogin(!!localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    console.log(dataSearchQuestion, showSuggestions)
  }, [dataSearchQuestion])


  return (
    <MainLayout>
      <Head>
        <title>{t("submit_your_question")}</title>
        <link rel="icon" href="/question.png" />
      </Head>

      {
        false ? <IsLogin type='question' /> :
          <Box
            as={"form"}
            border={'1px'}
            borderColor={'gray.200'}
            borderRadius={'10px'}
            padding={'20px'}
            w="100%"
            alignItems={"center"}
            justifyContent={"center"}
            maxW="container.xl"
            mx="auto"
            mt={{ base: "80px", md: "120px" }}
            mb={'10px'}
            onSubmit={handleSubmitQuestion(handleAddNewQuestion)}
          >

            <Text fontWeight={"bold"} fontSize={"20px"} mb={"30px"}>
              {t("ask_your_question")}...
            </Text>
            {/* <Masonry
          width={"100%"}
          breakpointCols={breakpointColumnsObj}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        > */}
            <VStack
              w={"calc( 100% - 20px )"}
              alignItems={"start"}
              paddingX={"20px"}
              color={"black"}
            >
              <FormControl isInvalid={!!errors.title} mb="10px">
                <Text fontWeight={"bold"} fontSize={"16px"} mb={"10px"}>{t("question_title")}</Text>
                <Box position="relative" w="100%">
                  <Input
                    {...registerQuestion("title")} onBlur={e => {
                      setQueryToSearch(e?.target.value);
                      setTimeout(() => setShowSuggestions(true), 200); // delay to allow click
                    }} onFocus={e => {
                      if (e?.target.value) {
                        setQueryToSearch(e?.target.value);
                        setShowSuggestions(false);
                      }
                    }} onChange={e => {
                      // setShowSuggestions(true);
                    }}
                    ref={inputRef}
                  />
                  {showSuggestions && dataSearchQuestion?.data?.result?.length > 0 && (
                    <Box
                      position="absolute"
                      top="100%"
                      left={0}
                      right={0}
                      bg="white"
                      shadow="md"
                      borderRadius="md"
                      mt={1}
                      zIndex={10}
                      maxH="200px"
                      overflowY="auto"
                    >
                      <Flex justify="flex-end" p={2} borderBottom="1px solid #eee">
                        <CloseButton size="sm" onClick={() => setShowSuggestions(false)} />
                      </Flex>
                      <List spacing={1}>
                        {dataSearchQuestion?.data?.result?.map((q) => (
                          <ListItem
                            height={'100px'}
                            key={q.id}
                            px={3}
                            py={2}
                            _hover={{ bg: "gray.100", cursor: "pointer" }}
                            onMouseDown={() => {
                              // use onMouseDown instead of onClick to prevent blur
                              setQueryToSearch(q.title);
                              setShowSuggestions(false);
                              router.push(`/question_answer?id=${q?.id}`)
                            }}
                          >
                            <Text>{q.title}</Text>
                            <Text fontSize={'xs'} color={'gray.600'}>{q?.content}</Text>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
                  {isLoadingSearchQuestion && (
                    <Box position="absolute" top="100%" left={0} mt={1}>
                      <Spinner size="sm" />
                    </Box>
                  )}
                  <FormErrorMessage colorScheme="blue">{errors.title?.message}</FormErrorMessage>
                </Box>
              </FormControl>
              {/* <Text fontWeight={"bold"} mt={"20px"}>
              {t("related_questions")}
            </Text> */}
              {/* <HStack>
              <Text>{t("question_title")}</Text>
              <Badge
                bgColor={"#23D9D7"}
                padding={"5px"}
                borderRadius={"5px"}
                color={"white"}
              >
                3 {t("answer")}
              </Badge>
            </HStack> */}
              {/* <HStack w={"100%"} justifyContent={"end"} mt={"20px"}> */}
              {/* <Button bgColor={"#23D9D7"}>{t("next_step")}</Button> */}
              {/* </HStack> */}
            </VStack>
            {/* <VStack
            w={"calc( 100% - 20px )"}
            alignItems={"start"}
            borderRadius={"15px"}
            padding={"20px"}
            bgColor={"#3646B3"}
          >
            <Text fontWeight={"bold"} color={"white"} fontSize={"18px"}>
              {t("how_to_ask_a_better_question")}
            </Text>
            <Text color={"white"}>{t("youre_ready")}</Text>
            <Text color={"white"} my={"20px"}>
              {t("looking_to_ask")}
            </Text>
            <Text fontWeight={"bold"} color={"white"}>
              {t("steps")}
            </Text>
            <UnorderedList
              textAlign={"start"}
              spacing={"10px"}
              sx={{
                li: {
                  color: "black", // text color
                  "::marker": {
                    color: "white", // 🔵 your custom bullet color
                  },
                },
              }}
            >
              <ListItem>
                <Text color={"white"}>{t("summarize_your_problem")}</Text>
              </ListItem>
              <ListItem>
                <Text color={"white"}>{t("explain_your_problem")}</Text>
              </ListItem>
              <ListItem>
                <Text color={"white"}>{t("describe_what_you_tried")}</Text>
              </ListItem>
              <ListItem>
                <Text color={"white"}>{t("add_tags_to_help")}</Text>
              </ListItem>
              <ListItem>
                <Text color={"white"}>{t("review_your_question")}</Text>
              </ListItem>
            </UnorderedList>
          </VStack> */}
            <VStack
              w={"calc( 100% - 20px )"}
              alignItems={"start"}
              paddingX={"20px"}
              mt={'20px'}
              color={"black"}
            >
              <FormControl mt={4} isInvalid={!!errors.content}>
                <Text fontWeight={"bold"} fontSize={"16px"} mb={"10px"}>
                  {t("question_content")}
                </Text>
                <Textarea {...registerQuestion("content")}></Textarea>
                <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
              </FormControl>
            </VStack>
            {/* <VStack
            w={"calc( 100% - 20px )"}
            alignItems={"start"}
            borderRadius={"15px"}
            padding={"20px"}
            bgColor={"#fef4e2"}
          >
            <Text fontWeight={"bold"} color={"black"}>
              {t("suggested_questions")}
            </Text>
            <VStack
              w={"100%"}
              border={"1px"}
              borderColor={"#F9C96D"}
              padding={"10px"}
              borderRadius={"15px"}
            >
              <HStack>
                <Text color={"black"}>
                  اگر نتوانیم آن را انجام دهیم، آیا می‌توان فطریه را به یک
                  بدهکار ورشکسته داد؟
                </Text>
                <Badge
                  bgColor={"#23D9D7"}
                  padding={"5px"}
                  borderRadius={"5px"}
                  color={"white"}
                >
                  3 پاسخ
                </Badge>
              </HStack>
              <Divider borderColor={"gray.200"} />
              <HStack>
                <Text color={"black"}>
                  اگر نتوانیم آن را انجام دهیم، آیا می‌توان فطریه را به یک
                  بدهکار ورشکسته داد؟
                </Text>
                <Badge
                  bgColor={"#23D9D7"}
                  padding={"5px"}
                  borderRadius={"5px"}
                  color={"white"}
                >
                  3 پاسخ
                </Badge>
              </HStack>
              <Divider borderColor={"gray.200"} />
              <HStack>
                <Text color={"black"}>
                  اگر نتوانیم آن را انجام دهیم، آیا می‌توان فطریه را به یک
                  بدهکار ورشکسته داد؟
                </Text>
                <Badge
                  bgColor={"#23D9D7"}
                  padding={"5px"}
                  borderRadius={"5px"}
                  color={"white"}
                >
                  3 پاسخ
                </Badge>
              </HStack>
              <Divider borderColor={"gray.200"} />
              <HStack>
                <Text color={"black"}>
                  اگر نتوانیم آن را انجام دهیم، آیا می‌توان فطریه را به یک
                  بدهکار ورشکسته داد؟
                </Text>
                <Badge
                  bgColor={"#23D9D7"}
                  padding={"5px"}
                  borderRadius={"5px"}
                  color={"white"}
                >
                  3 پاسخ
                </Badge>
              </HStack>
              <Divider borderColor={"gray.200"} />
              <HStack>
                <Text color={"black"}>
                  اگر نتوانیم آن را انجام دهیم، آیا می‌توان فطریه را به یک
                  بدهکار ورشکسته داد؟
                </Text>
                <Badge
                  bgColor={"#23D9D7"}
                  padding={"5px"}
                  borderRadius={"5px"}
                  color={"white"}
                >
                  3 {t("answer")}
                </Badge>
              </HStack>
            </VStack>
            <HStack w={"100%"} justifyContent={"end"} mt={"20px"}>
              <Button bgColor={"#23D9D7"}>{t("next_step")}</Button>
            </HStack>
          </VStack> */}

            <VStack
              w={"calc( 100% - 20px )"}
              alignItems={"start"}
              paddingX={"20px"}
              color={"black"}
              mt={'20px'}
            >
              <Text fontWeight={"bold"} fontSize={"16px"} mb={"0px"}>
                {t("question_tags")}
              </Text>

              <MultiSelectComboBox
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
                optionsList={
                  dataTag?.data?.result?.map((it) => ({
                    value: it?.id,
                    label: it?.name,
                  })) || []
                }
                setInputValue={setInputValue}
                inputValue={inputValue}
              />

              <HStack w={"100%"} justifyContent={"end"} mt={"20px"}>
                <Button bgColor={"#23D9D7"} type={"submit"}>
                  {t("submit_your_question")}
                </Button>
              </HStack>
            </VStack>
            {/* </Masonry> */}
          </Box>}

    </MainLayout>
  );
};

export default Index;
