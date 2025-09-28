import CommentCard from "@/components/commentCard";
import { baseUrl } from "@/components/lib/api";
import MainLayout from "@/components/mainLayout";
import { useUser } from "@/context/UserContext";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Collapse,
  Divider,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Stack,
  Text,
  useBreakpointValue,
  VStack
} from "@chakra-ui/react";
import axios from "axios";
import moment from "moment-jalaali";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  IoArrowDown,
  IoArrowUp,
  IoBookmarkOutline
} from "react-icons/io5";
import { TbBookmark } from "react-icons/tb";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const answer =
  ['لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و  متن از صنعت چاپ، و با استفاده از طراحان گرافیــک اســت، لورم ایپسوم ساختگی با تولید سادگی از', 'لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و  متن  تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیــک اســت، لورم ایپسوم ساختگی با تولید سادگی از', 'لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از  گرافیــک اســت، لورم ایپسوم ساختگی با تولید سادگی از لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیــک اســت، لورم ایپسوم ساختگی با تولید سادگی از', 'لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و  متن ساختگی با تولید سادگی از صنعت چاپ، و  متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیــک اســت، لورم ایپسوم ساختگی با تولید سادگی از']

const postRequest = (url, { arg: { id, ...data } }) => {
  return axios.post(baseUrl + url + `?question_id=${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
const postActionRequest = (
  url,
  { arg: { table_id, table_type, type_param, ...data } }
) => {
  return axios.post(
    baseUrl +
    url +
    `?table_type=${table_type}&table_id=${table_id}&type_param=${type_param}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

const patchRequest = (
  url,
  { arg: { action_id, ...data } }
) => {
  return axios.patch(
    baseUrl +
    url +
    `?action_id=${action_id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

const Index = () => {
  const { t } = useTranslation();

  const [isInputOpen, setIsInputOpen] = useState(false);
  const [comment, setComment] = useState("");

  const [showMore, setShowMore] = useState(false)

  const [contentTest, setContentTest] = useState('لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرن گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی،')

  const { dataMe, isLoadingMe } = useUser();

  const [isUserLogin, setIsUserLogin] = useState("");

  const slidesToShow = useBreakpointValue({ base: 1, md: 2, lg: 4 }); // responsive value

  const router = useRouter();

  const { query } = router;

  const {
    register: registerAnswer,
    setValue: setValueAnswer,
    getValues: getValuesAnswer,
    reset: resetAnswer,
    handleSubmit: handleSubmitAnswer,
  } = useForm();
  const {
    register: registerComment,
    setValue: setValueComment,
    getValues: getValuesComment,
    reset: resetComment,
    handleSubmit: handleSubmitComment,
  } = useForm();

  const {
    data: dataQuestion,
    isLoading: isLoadingQuestion,
    mutate: mutateQuestion,
  } = useSWR(query?.id && `user/question?id=${query?.id}`);

  const { data: dataQuestionAnswer, isLoading: isLoadingQuestionAnswer, mutate: muatteAnswer } =
    useSWR(query?.id && `user/question/answer?question_id=${query?.id}`);

  const { data: dataQuestionComment, isLoading: isLoadingComment } = useSWR(
    query?.id &&
    `user/action?table_id=${query?.id}&table_type=question&type_param=comment`
  );
  const { data: dataQuestionLike, isLoading: isLoadingLike, mutate: mutateLike } = useSWR(
    query?.id &&
    `user/action?table_id=${query?.id}&table_type=question&type_param=like`
  );

  const { data: dataAnswerLike, mutate: mutateAnswerLike } = useSWR(
    dataQuestionAnswer?.data &&
    `user/action?table_id=${dataQuestionAnswer?.data?.[0]?.id}&table_type=answer&type_param=like`
  );

  // const { data: dataQuestionSave, isLoading: isLoadingSave } = useSWR(
  //   query?.id &&
  //   `user/action?table_id=${query?.id}&table_type=question&type_param=save_message`
  // );

  const { data: dataQuestionSimilar, isLoading: isLoadingSimilar } = useSWR(
    dataQuestion?.data &&
    `user/question/similar-questions?question_elastic_id=${dataQuestion?.data?.result?.[0]?.elastic_id}`
  );

  const {
    trigger: triggerAnswer,
    isLoading: isLoadingAnswer,
    isMutating: isMutatingQuestionAnswer,
  } = useSWRMutation(`user/question/answer`, postRequest, {
    onSuccess: () => {
      resetAnswer();
    },
  });

  const { trigger: triggerUpdateLike, isLoading: isLoadingUpdateLike } =
    useSWRMutation(`user/action`, patchRequest, {
      onSuccess: () => {
        mutateQuestion();
        muatteAnswer()
        mutateLike()
      },
    });
  const {
    trigger: triggerAddLike,
    isLoading: isLoadingAddLike,
    isMutating: isMutatingAddAction,
  } = useSWRMutation(`user/action`, postActionRequest, {
    onSuccess: () => {
      mutateQuestion();
      muatteAnswer()
      mutateLike()
      resetComment();
    },
  });

  const handleAddAnswer = (e) => {
    triggerAnswer({ ...e, id: query?.id, lang: "fa" });
  };

  const handleAddAction = (type, action, id) => {
    triggerAddLike({
      table_id: id || query?.id,
      table_type: type,
      type_param: action,
    });
  };
  const handleUpdateAction = (type, action, action_id) => {
    triggerUpdateLike({
      action_id
    });
  };

  const handleNewQuestionButton = () => {
    router.push("/new_question");
  };

  const handleSimilarClick = (id) => {
    router.push(`/question_answer/${id}`);
  };
  const { data: dataSource, error: errorSource } = useSWR(
    "user/source?size=10"
  );

  const handleClickSource = (source) => {
    router.replace(
      `/questions?source=${dataSource?.data?.find((it) => it?.fa_source_name == source)?.id
      }`
    );
  };

  const handleToggleInput = () => {
    setIsInputOpen((prev) => !prev);
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSendComment = (type, action) => {
    triggerAddLike({
      table_id: query?.id,
      table_type: type,
      type_param: action,
      content: getValuesComment("content"),
    });
    setIsInputOpen(false);
  };

  const handleUserProfileLink = (username) => {
    router.push(`/users/${username}`);
  };

  useEffect(() => {
    setIsUserLogin(!!localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    console.log(dataMe?.data?.[0]?.username)
  }, [dataMe])

  return (
    <MainLayout menuDefault={true}>
      <Head>
        <title>
          {dataQuestion?.data?.result?.[0]?.title ||
            dataQuestion?.data?.result?.[0]?.content}
        </title>
        <link rel="icon" href="/porsyab_header.png" />
      </Head>
      <Box
        marginTop={{ base: "60px", md: "100px" }}
        w="100%"
        alignItems={"center"}
        justifyContent={"center"}
        maxW="container.xl"
        mx="auto"
        p={"20px"}
      >
        <HStack w={"100%"} alignItems={"start"} gap={"20px"}>


          <VStack w={"100%"}>
            {/* <Grid
              templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
              gap={"2px"}
              w={"100%"}
            >
              <GridItem colSpan={{ base: "2", md: "3" }}>
                {isLoadingQuestion ? (
                  <Spinner />
                ) : (
                  <VStack
                    w={"100%"}
                    alignItems={"start"}
                    justifyContent={"start"}
                    h={"100%"}
                  >
                    <Text>{dataQuestion?.data?.result?.[0]?.title}</Text>
                    <HStack w={"100%"}>
                      <HStack w={"100%"} justifyContent={"space-between"}>

                        <HStack
                          w={"100%"}
                          justifyContent={"end"}
                          display={{ base: "none", md: "flex" }}
                        >
                          <Text fontSize={"sm"} color={"gray.400"}>
                            {moment(
                              dataQuestion?.data?.result?.[0]?.created_at
                            ).format("jYYYY/jMM/jDD")}
                          </Text>
                        </HStack>
                      </HStack>
                      <Button
                        width={{ base: "152px", md: "189px" }}
                        height={"50px"}
                        bgColor={"#F9C96D"}
                        color={"black"}
                        fontWeight={"400"}
                        fontSize={"12px"}
                        size={"sm"}
                        lineHeight={"100%"}
                        letterSpacing={0}
                        borderRadius={"10px"}
                        onClick={(e) => handleNewQuestionButton()}
                      >
                        {t("ask_your_question")}
                      </Button>
                    </HStack>
                  </VStack>
                )}
              </GridItem>
              <GridItem
                as={Stack}
                alignItems={"end"}
                display={{ base: "none" }}
              >
                <Button bgColor={"#F9C96D"} fontWeight={"normal"}>
                  {t("ask_your_question")}
                </Button>
              </GridItem>
            </Grid>
            <Divider my={"10px"} /> */}
            <Grid
              templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
              gap={{ base: "10px", md: "20px" }}
              w={"100%"}
            >
              <GridItem
                as={Stack}
                position={"relative"}
                direction={{ base: "row", md: "column" }}
                colSpan={"3"}
                w={"100%"}
              >
                {slidesToShow == 1 && (
                  <VStack gap={0}>
                    <IconButton
                      icon={<IoArrowUp color="gray" />}
                      variant={"outline"}
                      colorScheme="gray"
                      borderRadius={"100%"}
                      size={"sm"}
                      onClick={(e) =>
                        handleAddAction("question", "save_message")
                      }
                    />
                    <IconButton
                      icon={<IoArrowDown color="gray" />}
                      variant={"outline"}
                      colorScheme="gray"
                      borderRadius={"100%"}
                      size={"sm"}
                    />
                    <IconButton
                      icon={<IoBookmarkOutline color="gray" />}
                      size={"sm"}
                      onClick={(e) =>
                        handleAddAction("question", "save_message")
                      }
                    />
                  </VStack>
                )}

                {isLoadingQuestion ? (
                  <Spinner />
                ) : (


                  <VStack w={"100%"} alignItems={"start"}>
                    <HStack alignItems={'start'} w={'100%'}>
                      {/* {slidesToShow != 1 && (
                        <VStack>
                          <IconButton
                            icon={
                              <IoChevronUpOutline
                                color={
                                  dataQuestion?.data?.result?.[0]?.is_user_liked
                                    ? "orange"
                                    : "gray"
                                }
                              />
                            }
                            variant={"outline"}
                            colorScheme={
                              dataQuestion?.data?.result?.[0]?.is_user_liked
                                ? "orange"
                                : "gray"
                            }
                            border={'none'}
                            size={"sm"}
                            onClick={(e) => {
                              if (dataQuestion?.data?.result?.[0]?.is_user_liked) {
                                handleUpdateAction("question", "like", dataQuestionLike?.data?.result?.find((user) => (user?.user__username == dataMe?.data?.[0]?.username))?.id);
                              } else {
                                handleAddAction("question", "like");
                              }
                            }}
                          />
                          <Text>{dataQuestionLike?.data?.count}</Text>
                          <IconButton
                            icon={<IoChevronDown rowDown color="gray" />}
                            variant={"outline"}
                            colorScheme="gray"
                            border={'none'}
                            size={"sm"}

                          />

                        </VStack>
                      )} */}
                      <HStack alignItems={'center'}
                        bgColor={'#3646B31A'}
                        padding={'8px'}
                        borderRadius={'10px'} w={'100%'}>

                        <IoIosArrowForward cursor={'pointer'} style={{ marginRight: '10px' }} />
                        <VStack w={'100%'} alignItems={'start'} mr={'10px'}>
                          <Text
                            lineHeight={"taller"}
                            textAlign={"justify"}
                            fontSize={'21px'}
                            fontWeight={'700'}
                          >
                            {dataQuestion?.data?.result?.[0]?.content}
                          </Text>

                          {/* <HStack w={'100%'} justifyContent={'space-between'}>
                            <HStack
                              cursor={"pointer"}
                              onClick={(e) =>
                                handleClickSource(
                                  dataQuestion?.data?.result?.[0]?.source
                                )
                              }
                            >
                              <Avatar
                                w={"28px"}
                                h={"28px"}
                                display={{ base: "none", md: "flex" }}
                              />
                              <Text
                                minW={"150px"}
                                color={"gray.400"}
                                fontSize={"16px"}
                              >
                                {dataQuestion?.data?.result?.[0]?.source}
                              </Text>
                            </HStack>
                            <HStack>
                              <Text fontSize={"sm"} color={"gray.400"}>
                                {moment(
                                  dataQuestion?.data?.result?.[0]?.created_at
                                ).format("jYYYY/jMM/jDD")}
                              </Text>
                            </HStack>

                          </HStack> */}

                        </VStack>
                        <Text whiteSpace={'nowrap'} fontWeight={'400'} color={'#999999'} fontSize={'16px'}>3 پاسخ</Text>

                        <IconButton
                          minWidth={'none'}
                          icon={
                            dataQuestion?.data?.result?.[0]?.is_user_saved ? (
                              <TbBookmark color="orange" strokeWidth={2} onClick={(e) => {
                                if (dataQuestion?.data?.result?.[0]?.is_user_saved) {
                                  // handleUpdateAction("question", "save_message", dataQuestionLike?.data?.result?.find((user) => (user?.user__username == dataMe?.data?.[0]?.username))?.id)
                                } else {
                                  handleAddAction("question", "save_message")
                                }
                              }
                              } />
                            ) : (
                              <TbBookmark
                                fontSize={'20px'}
                                strokeWidth={2}
                                color="black"
                                onClick={(e) => {
                                  if (dataQuestion?.data?.result?.[0]?.is_user_saved) {
                                    // handleUpdateAction("question", "save_message", dataQuestionLike?.data?.result?.find((user) => (user?.user__username == dataMe?.data?.[0]?.username))?.id)
                                  } else {
                                    handleAddAction("question", "save_message")
                                  }
                                }
                                }
                              />
                            )
                          }
                          size={"lg"}
                        />

                      </HStack>
                    </HStack>



                    <Stack
                      direction={{ base: "column", md: "row" }}
                      w={"100%"}
                      justifyContent={"space-between"}
                      mt={'10px'}
                    >

                    </Stack>
                    <Box
                      w={{ base: "fit-content", md: "100%" }}
                      padding={{ base: "none", md: "0px" }}
                      px={{ base: "none", md: "20px" }}
                      bgColor={"#F7F7F7"}
                      borderRadius={"10px"}
                      mb={"10px"}
                      mr={{ base: "-40px", md: "0px" }}
                    >
                      {/* <HStack
                        w={"100%"}
                        justifyContent={"space-between"}
                        my={"10px"}
                      >
                        <Text fontWeight={"bold"} fontSize={"18px"}>
                          {t(dataQuestionAnswer?.data?.length == 1 ? "answer_one" : "answers")}
                        </Text>
                      </HStack> */}
                      {
                        dataQuestionAnswer?.data?.map((answer) => (
                          <HStack alignItems={"start"} gap={"10px"}>
                            {/* <VStack>
                              <IconButton
                                icon={
                                  <IoArrowUp
                                    color={
                                      answer?.is_user_liked
                                        ? "orange"
                                        : "gray"
                                    }
                                  />
                                }
                                variant={"outline"}
                                colorScheme={
                                  answer?.is_user_liked
                                    ? "orange"
                                    : "gray"
                                }
                                borderRadius={"100%"}
                                size={"sm"}
                                onClick={(e) => {
                                  if (answer?.is_user_liked) {
                                    handleUpdateAction("answer", "like", dataAnswerLike?.data?.result?.find((user) => (user?.user__username == dataMe?.data?.[0]?.username))?.id);
                                  } else {
                                    handleAddAction("answer", "like", answer?.id);
                                  }
                                }}
                              />
                              <Text>{dataAnswerLike?.data?.count}</Text>
                              <IconButton
                                icon={<IoArrowDown color="gray" />}
                                variant={"outline"}
                                colorScheme="gray"
                                borderRadius={"100%"}
                                size={"sm"}
                              />
                              <IconButton
                                icon={
                                  answer?.is_user_saved ? (
                                    <IoBookmark color="orange" onClick={(e) => {
                                      if (answer?.is_user_saved) {
                                        // handleUpdateAction("question", "save_message", dataQuestionLike?.data?.result?.find((user) => (user?.user__username == dataMe?.data?.[0]?.username))?.id)
                                      } else {
                                        handleAddAction("answer", "save_message", answer?.id)
                                      }
                                    }
                                    } />
                                  ) : (
                                    <IoBookmarkOutline
                                      color="gray"
                                      onClick={(e) => {
                                        if (answer?.is_user_saved) {
                                          // handleUpdateAction("question", "save_message", dataQuestionLike?.data?.result?.find((user) => (user?.user__username == dataMe?.data?.[0]?.username))?.id)
                                        } else {
                                          handleAddAction("answer", "save_message", answer?.id)
                                        }
                                      }
                                      }
                                    />
                                  )
                                }
                                size={"lg"}
                              />
                            </VStack> */}
                            <VStack w={"100%"} alignItems={"start"} px={'2px'} pt={'25px'}>
                              <HStack w={'100%'} justifyContent={'space-between'}>
                                <HStack>
                                  <Avatar w={'28px'} h={'28px'} />
                                  <Text fontSize={'16px'} color={'#999999'}>{answer?.source}</Text>
                                </HStack>
                                <Text fontSize={"16px"} color={"#999999"} fontWeight={'100'}>
                                  {moment(
                                    answer?.created_at
                                  ).format("jYYYY/jMM/jDD")}
                                </Text>
                              </HStack>
                              <Collapse startingHeight={80} in={showMore}>
                                <Text
                                  lineHeight="190%"
                                  w="fit-content"
                                  textAlign="justify"
                                  fontSize="17px"
                                  fontWeight="400"
                                  whiteSpace="pre-wrap"
                                  mt="20px"
                                  color="#333333"
                                >
                                  {contentTest}
                                </Text>
                              </Collapse>
                              <HStack
                                w={"100%"}
                                justifyContent={{
                                  base: "start",
                                  md: "space-between",
                                }}
                                mt={"10px"}
                              >
                                <HStack order={{ base: 1 }} w={'100%'} justifyContent={'space-between'}>
                                  <HStack
                                    w={{ base: "100%" }}
                                    justifyContent={{ base: "start" }}
                                  >
                                    {dataQuestion?.data?.result?.[0]?.tags?.map((tag) => (
                                      <Badge
                                        bgColor={"#29CCCC1A"}
                                        color={"#16A6A6"}
                                        padding={"5px"}
                                        borderRadius={"5px"}
                                        w={{ base: "min-content" }}
                                        textAlign={"center"}
                                      >
                                        {tag?.name}
                                      </Badge>
                                    ))}
                                  </HStack>

                                </HStack>
                              </HStack>
                              {!showMore && <Stack flexDir={'row'} color={'#3646B3'} alignItems={'center'} cursor={'pointer'} onClick={e => setShowMore(true)} mt={'13px'}>
                                <Text fontWeight={'500'} fontSize={'14px'} lineHeight={'176%'}>مشاهده کامل</Text>
                                <IoIosArrowBack />
                              </Stack>}
                            </VStack>
                          </HStack>
                        ))
                      }

                      <Divider mt={"20px"} borderColor={"gray.200"} />
                    </Box>
                    {!isUserLogin ? (
                      <Box
                        w={{ base: "fit-content", md: "100%" }}
                        padding={"20px"}
                        bgColor={"#3646B3"}
                        borderRadius={"15px"}
                        my={{ base: "0px", md: "0px" }}
                        mr={{ base: "-40px", md: "0px" }}
                      >
                        <HStack>
                          <VStack w={"100%"} alignItems={"start"}>
                            <Text
                              fontWeight={"bold"}
                              color={"white"}
                              fontSize={"16px"}
                              mb={"10px"}
                            >
                              {t("your_answer")}
                            </Text>
                            <Text fontSize={"xs"} color={"white"}>
                              {t("you_must_log")}
                            </Text>
                          </VStack>
                          <Button
                            onClick={(e) => router.push("/login")}
                            bgColor={"#29CCCC"}
                            fontWeight={"normal"}
                            p={"10px"}
                            w={{ base: "200px", md: "150px" }}
                            size={"sm"}
                          >
                            {t("log_in_to_your_account")}
                          </Button>
                        </HStack>
                      </Box>
                    ) : (
                      <VStack w={'100%'} alignItems={'start'} mt={'40px'} px={'20px'}>
                        <Text fontSize={'22px'} fontWeight={'600'}>شما میتوانید به این سوال پاسخ دهید</Text>
                        <HStack w={'100%'}>
                          <Input w={'100%'} borderRadius={'10px'} height={'61px'} placeholder="نوشتن متن..." border={'1px'} borderColor={'#A3A3A3'} bgColor={'#FBFBFB'} />
                          <Button bgColor={'#F9C96D'} borderRadius={'10px'} color={'black'} width={'220px'} height={'61px'} fontWeight={'700'} fontSize={'18px'}>ثبت پاسخ</Button>
                        </HStack>
                      </VStack>
                      // <VStack w={'100%'}>
                      //   <HStack w={'100%'} justifyContent={'space-between'}>
                      //     <HStack>
                      //       <Text fontSize={'33px'} fontWeight={'800'} color={'#333333'} fontFamily={'morabba'}>پاسخ ها</Text>
                      //       <Text fontSize={'14px'} color={'#999999'}>5 پاسخ</Text>
                      //     </HStack>
                      //     <Text
                      //       fontWeight={"700"}
                      //       fontSize={"12px"}
                      //       color="#3646B3"
                      //       cursor={"pointer"}
                      //       onClick={(e) => router.push("/references")}
                      //     >
                      //       {t("show_all")}
                      //     </Text>
                      //   </HStack>
                      //   <QuestionAnswerCard handleSubmitAnswer={handleSubmitAnswer} handleAddAnswer={handleAddAnswer} isMutatingQuestionAnswer={isMutatingQuestionAnswer} registerAnswer={registerAnswer} t={t} />
                      // </VStack>
                    )}
                    <Grid templateColumns='repeat(5, 1fr)' mt={'90px'} gap={'25px'}>
                      <GridItem colSpan={'3'} height={'456px'}>
                        <HStack w={'100%'} justifyContent={'space-between'} >
                          <Text fontSize={'33px'} fontWeight={'800'} color={'#333333'} fontFamily={'morabba'}>دیدگاه ها</Text>
                          <Text
                            fontWeight={"700"}
                            fontSize={"12px"}
                            color="#3646B3"
                            cursor={"pointer"}
                            onClick={(e) => router.push("/references")}
                          >
                            {t("show_all")}
                          </Text>
                        </HStack>
                        <CommentCard t={t} />
                      </GridItem>
                      <GridItem colSpan={'2'} height={'456px'}>

                        <VStack w={'100%'}>
                          <HStack w={'100%'} justifyContent={'space-between'}>
                            <HStack>
                              <Text fontSize={'33px'} fontWeight={'800'} color={'#333333'} fontFamily={'morabba'}>پاسخ ها</Text>
                              <Text fontSize={'14px'} color={'#999999'}>5 پاسخ</Text>
                            </HStack>
                            <Text
                              fontWeight={"700"}
                              fontSize={"12px"}
                              color="#3646B3"
                              cursor={"pointer"}
                              onClick={(e) => router.push("/references")}
                            >
                              {t("show_all")}
                            </Text>
                          </HStack>

                          <Box
                            w={{ base: "full", md: "100%" }}
                            padding={"20px"}
                            bgColor={"#F7F7F7"}
                            border={"1px"}
                            borderColor={"gray.200"}
                            borderRadius={"10px"}
                            my={"10px"}
                            mr={{ base: "-40px", md: "0px" }}
                            as="form"
                            onSubmit={handleSubmitAnswer(handleAddAnswer)}

                          >
                            <VStack w={'100%'} gap={'30px'} height={'452px'}
                              overflowY={'auto'}>
                              {
                                answer?.map((item) => (
                                  <VStack bgColor={'white'} padding={'10px'} borderRadius={'10px'}>
                                    <HStack w={'100%'} alignItems={'start'}>
                                      <Avatar w={'35px'} h={'35px'} />
                                      <Text fontSize={'14px'}>
                                        {item}
                                      </Text>
                                    </HStack>
                                    <Divider />
                                    <HStack w={'100%'} justifyContent={'end'} color={'#3646B3'}>
                                      <Text>1404/01/27</Text>
                                      <Text>15:30</Text>
                                    </HStack>
                                  </VStack>
                                ))
                              }
                            </VStack>
                            <VStack w={"100%"} alignItems={"start"} mt={'35px'}>
                              <Text
                                fontWeight={"bold"}
                                fontSize={"22px"}
                                mb={"4px"}
                              >
                                {t("your_answer")}
                              </Text>
                              <Text fontSize={"14px"}>{t("AI-generated")}</Text>
                            </VStack>

                            <InputGroup height={'61px'} mt={'14px'}>
                              <Input height={'inherit'} bgColor={'white'} placeholder="نوشتن متن..." borderRadius={'10px'}  {...registerAnswer("content")}
                              />
                              <InputRightElement w={'150px'} height={'inherit'}>
                                <Button bgColor={'#F9C96D'} padding={'20px'} w={'150px'} h={'inherit'} color={'black'} isLoading={isMutatingQuestionAnswer} type="submit">
                                  {t("submit_answer")}
                                </Button>
                              </InputRightElement>
                            </InputGroup>
                          </Box>

                          {/* <QuestionAnswerCard handleSubmitAnswer={handleSubmitAnswer} handleAddAnswer={handleAddAnswer} isMutatingQuestionAnswer={isMutatingQuestionAnswer} registerAnswer={registerAnswer} t={t} /> */}
                        </VStack>
                      </GridItem>
                    </Grid>

                  </VStack>
                )}
              </GridItem>

              {/* <GridItem>
                <Box
                  as={VStack}
                  alignItems={"start"}
                  border={"1px"}
                  borderColor={"gray.200"}
                  h={"min-content"}
                  borderRadius={"15px"}
                  padding={"20px"}
                  w={{ base: "fit-content", md: "100%" }}
                >
                  <Text fontWeight={"bold"} fontSize={"16px"} mb={"10px"}>
                    {t("related_questions")}
                  </Text>
                  {dataQuestionSimilar?.data
                    ?.slice(0, 5)
                    ?.map((similar, index) => (
                      <HStack
                        w={"100%"}
                        py={"5px"}
                        alignItems={"start"}
                        borderBottom={index != 4 && "1px"}
                        borderBottomColor={"gray.200"}
                        cursor={"pointer"}
                        onClick={(e) => handleSimilarClick(similar?.id)}
                      >
                        <Text fontSize={"14px"}>{similar?.content?.substring(0, 100)}</Text>
                      </HStack>
                    ))}
                </Box>
                <Box
                  as={VStack}
                  alignItems={"start"}
                  border={"1px"}
                  borderColor={"gray.200"}
                  h={"min-content"}
                  borderRadius={"15px"}
                  padding={"20px"}
                  my={"20px"}
                >
                  <Text fontWeight={"bold"} fontSize={"16px"} mb={"10px"}>
                    {t("most_viewed_questions")}
                  </Text>
                  {dataQuestionSimilar?.data
                    ?.slice(5, 10)
                    ?.map((related, index) => (
                      <VStack
                        w={"100%"}
                        alignItems={"start"}
                        borderBottom={index != 4 && "1px"}
                        borderBottomColor={"gray.200"}
                        py={"5px"}
                        cursor={"pointer"}
                        onClick={(e) => handleSimilarClick(related?.id)}
                      >
                        <Text fontSize={"14px"}>{related?.content?.substring(0, 100)}</Text>
                      </VStack>
                    ))}
                </Box>
              </GridItem> */}
            </Grid>
          </VStack>
        </HStack>
      </Box>
    </MainLayout>
  );
};

export default Index;
