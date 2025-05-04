import { baseUrl } from "@/components/lib/api";
import MainLayout from "@/components/mainLayout";
import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Button,
  Divider,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Image,
  Stack,
  Text,
  Textarea,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import {
  IoArrowDown,
  IoArrowUp,
  IoBookmark,
  IoBookmarkOutline,
  IoCheckmark,
  IoPencil,
  IoWarningOutline,
} from "react-icons/io5";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import moment from "moment-jalaali";

const postRequest = (url, { arg: { id, ...data } }) => {
  return axios.post(baseUrl + url + `?id=${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
const patchRequest = (
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

const Index = () => {
  const slidesToShow = useBreakpointValue({ base: 1, md: 2, lg: 4 }); // responsive value

  const router = useRouter();
  const { query } = router;

  const {
    register: registerAnswer,
    setValue: setValueAnswer,
    getValues: getValuesAnswer,
    handleSubmit: handleSubmitAnswer,
  } = useForm();

  const { data: dataQuestion, isLoading: isLoadingQuestion , mutate:mutateQuestion } = useSWR(
    query?.id && `user/question?id=${query?.id}`
  );
  const { data: dataQuestionAnswer, isLoading: isLoadingQuestionAnswer } =
    useSWR(query?.id && `user/question/answer?question_id=${query?.id}`);

  const { data: dataQuestionComment, isLoading: isLoadingComment } = useSWR(
    query?.id &&
      `user/action?table_id=${query?.id}&table_type=question&type_param=comment`
  );

  const { trigger: triggerAnswer, isLoading: isLoadingAnswer } = useSWRMutation(
    `user/question/answer`,
    postRequest
  );

  const { trigger: triggerLike, isLoading: isLoadingLike } = useSWRMutation(
    `user/action`,
    patchRequest , {
      onSuccess:()=>{
        mutateQuestion()
      }
    }
  );

  const handleAddAnswer = (e) => {
    triggerAnswer({ ...e, id: query?.id, lang: "fa" });
  };

  const handleAddAction = (type, action) => {
    triggerLike({ table_id: query?.id, table_type: type, type_param: action });
  };

  const handleNewQuestionButton = () => {
    router.replace("/new_question");
  };

  return (
    <MainLayout>
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
          {slidesToShow != 1 && (
            <VStack>
              <IconButton
                icon={
                  <IoArrowUp
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
                borderRadius={"100%"}
                size={"sm"}
                onClick={(e) => handleAddAction("question", "like")}
              />
              <Text>6</Text>
              <IconButton
                icon={<IoArrowDown color="gray" />}
                variant={"outline"}
                colorScheme="gray"
                borderRadius={"100%"}
                size={"sm"}
              />
              <IconButton
                icon={
                  dataQuestion?.data?.result?.[0]?.is_user_saved ? (
                    <IoBookmark color="orange" />
                  ) : (
                    <IoBookmarkOutline
                      color="gray"
                      onClick={(e) =>
                        handleAddAction("question", "save_message")
                      }
                    />
                  )
                }
                size={"lg"}
              />
            </VStack>
          )}

          <VStack w={"100%"}>
            <Grid
              templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
              gap={"2px"}
              w={"100%"}
            >
              <GridItem colSpan={{ base: "2", md: "3" }}>
                <VStack
                  w={"100%"}
                  alignItems={"start"}
                  justifyContent={"start"}
                  h={"100%"}
                >
                  <Text>{dataQuestion?.data?.result?.[0]?.title}</Text>
                  <HStack w={"100%"}>
                    <HStack w={"100%"} justifyContent={"space-between"}>
                      <HStack>
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
                      سؤال خود را بپرسید
                    </Button>
                  </HStack>
                </VStack>
              </GridItem>
              <GridItem
                as={Stack}
                alignItems={"end"}
                display={{ base: "none" }}
              >
                <Button bgColor={"#F9C96D"} fontWeight={"normal"}>
                  سؤال خود را بپرسید
                </Button>
              </GridItem>
            </Grid>
            <Divider my={"10px"} />
            <Grid
              templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
              gap={{ base: "10px", md: "20px" }}
              w={"100%"}
            >
              <GridItem
                as={Stack}
                position={"relative"}
                direction={{ base: "row", md: "column" }}
                colSpan={"2"}
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
                    />
                    <Text>6</Text>
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
                    />
                  </VStack>
                )}
                <VStack>
                  <Text lineHeight={"taller"}>
                    {dataQuestion?.data?.result?.[0]?.content}
                  </Text>
                  <Image
                    src="./imageskelete.png"
                    w={"100%"}
                    height={"530px"}
                    my={"10px"}
                    borderRadius={"2px"}
                  />
                  <Stack
                    direction={{ base: "column", md: "row" }}
                    w={"100%"}
                    justifyContent={"space-between"}
                    my={"20px"}
                  >
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
                          {tag}
                        </Badge>
                      ))}
                    </HStack>
                    <HStack gap={0} alignItems={"center"}>
                      <Button
                        colorScheme="gray"
                        color={"gray"}
                        variant={"ghost"}
                        fontWeight={"normal"}
                        size={"sm"}
                      >
                        گزارش محتوای نامناسب
                      </Button>
                      <IoWarningOutline color="gray" />
                    </HStack>
                  </Stack>
                  <Box
                    w={"100%"}
                    padding={"10px"}
                    px={"20px"}
                    bgColor={"#f9f9fd"}
                    borderRadius={"15px"}
                    my={{ base: "0px", md: "10px" }}
                  >
                    <HStack w={"100%"} justifyContent={"space-between"}>
                      <Text fontWeight={"bold"} fontSize={"16px"}>
                        دیدگاه‌ها
                      </Text>
                      <HStack>
                        <Text fontSize={"sm"} color={"gray"}>
                          دیدگاه خود را بنویسید
                        </Text>
                        <IconButton
                          icon={<IoPencil color="gray" />}
                          variant={"ghost"}
                        />
                      </HStack>
                    </HStack>
                    {dataQuestionComment?.data?.result?.map((comment) => (
                      <Stack
                        direction={{ base: "column", md: "row" }}
                        w={"100%"}
                      >
                        <Text
                          fontSize={"sm"}
                          color={"gray"}
                          lineHeight={"taller"}
                        >
                          لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و
                          با استفاده از طراحان گرافیک است.
                        </Text>
                        <HStack>
                          <Text color={"#3646B3"}>حسن الماسی</Text>
                          <Text color={"gray"} fontSize={"sm"}>
                            ۴ روز پیش
                          </Text>
                        </HStack>
                      </Stack>
                    ))}
                  </Box>
                  <Box
                    w={{ base: "fit-content", md: "100%" }}
                    padding={{ base: "none", md: "10px" }}
                    px={{ base: "none", md: "20px" }}
                    bgColor={"white"}
                    borderRadius={"15px"}
                    mb={"10px"}
                    mr={{ base: "-40px", md: "0px" }}
                    border={{ base: "none", md: "1px" }}
                    borderColor={{ base: "none", md: "gray.200" }}
                  >
                    <HStack
                      w={"100%"}
                      justifyContent={"space-between"}
                      my={"10px"}
                    >
                      <Text fontWeight={"bold"} fontSize={"18px"}>
                        جواب ها
                      </Text>
                    </HStack>
                    <HStack alignItems={"start"} gap={"10px"}>
                      <VStack>
                        <IconButton
                          icon={<IoArrowUp color="gray" />}
                          variant={"outline"}
                          colorScheme="gray"
                          borderRadius={"100%"}
                          size={"sm"}
                        />
                        <Text>6</Text>
                        <IconButton
                          icon={<IoArrowDown color="gray" />}
                          variant={"outline"}
                          colorScheme="gray"
                          borderRadius={"100%"}
                          size={"sm"}
                        />
                        <IconButton
                          icon={<IoCheckmark color="white" />}
                          variant={"ghost"}
                          bgColor="#29CCCC"
                          borderRadius={"100%"}
                          size={"sm"}
                        />
                        <IconButton
                          icon={
                            <IoBookmarkOutline color="gray" fontSize={"20px"} />
                          }
                          size={"sm"}
                        />
                      </VStack>
                      <VStack w={"100%"} alignItems={"start"}>
                        <Text lineHeight={"taller"} w={"fit-content"}>
                          {dataQuestionAnswer?.data?.[0]?.content}
                        </Text>
                        <HStack
                          w={"100%"}
                          justifyContent={{
                            base: "start",
                            md: "space-between",
                          }}
                          mt={"10px"}
                        >
                          <HStack order={{ base: 2 }}>
                            <Avatar
                              width={"28px"}
                              height={"28px"}
                              order={{ base: 2 }}
                            />
                            <Text
                              color={"gray"}
                              fontSize={"sm"}
                              order={{ base: 1 }}
                            >
                              اسلام کوئست
                            </Text>
                          </HStack>
                          <HStack order={{ base: 1 }}>
                            <Text fontSize={"sm"} color={"gray.500"}>
                              {moment(
                                dataQuestionAnswer?.data?.[0]?.created_at
                              ).format("jYYYY/jMM/jDD")}
                            </Text>
                            <Divider
                              height={"10px"}
                              borderColor={"#EBEBEB"}
                              orientation="vertical"
                            />
                            {slidesToShow != 1 && (
                              <HStack gap={0} alignItems={"center"}>
                                <Button
                                  colorScheme="gray"
                                  color={"gray"}
                                  variant={"ghost"}
                                  fontWeight={"normal"}
                                  size={"sm"}
                                >
                                  گزارش محتوای نامناسب
                                </Button>
                                <IoWarningOutline color="gray" />
                              </HStack>
                            )}
                          </HStack>
                        </HStack>
                        {slidesToShow == 1 && (
                          <HStack gap={0} alignItems={"center"}>
                            <Button
                              colorScheme="gray"
                              color={"gray"}
                              variant={"ghost"}
                              fontWeight={"normal"}
                              size={"sm"}
                            >
                              گزارش محتوای نامناسب
                            </Button>
                            <IoWarningOutline color="gray" />
                          </HStack>
                        )}
                        <Box
                          w={"100%"}
                          padding={"10px"}
                          px={"20px"}
                          bgColor={"#f9f9fd"}
                          borderRadius={"15px"}
                        >
                          <HStack w={"100%"} justifyContent={"space-between"}>
                            <Text fontWeight={"bold"} fontSize={"16px"}>
                              دیدگاه‌ها
                            </Text>
                            <HStack>
                              <Text fontSize={"sm"} color={"gray"}>
                                دیدگاه خود را بنویسید
                              </Text>
                              <IconButton
                                icon={<IoPencil color="gray" />}
                                variant={"ghost"}
                              />
                            </HStack>
                          </HStack>
                          <Stack
                            direction={{ base: "column", md: "row" }}
                            w={"100%"}
                          >
                            <Text
                              fontSize={"sm"}
                              color={"gray"}
                              lineHeight={"taller"}
                            >
                              لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ،
                              و با استفاده از طراحان گرافیک است.
                            </Text>
                            <HStack>
                              <Text color={"#3646B3"}>حسن الماسی</Text>
                              <Text color={"gray"} fontSize={"sm"}>
                                ۴ روز پیش
                              </Text>
                            </HStack>
                          </Stack>
                          <Divider borderColor={"#EBEBEB"} my={"10px"} />
                          <Stack
                            direction={{ base: "column", md: "row" }}
                            w={"100%"}
                          >
                            <Text
                              fontSize={"sm"}
                              color={"gray"}
                              lineHeight={"taller"}
                            >
                              لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ،
                              و با استفاده از طراحان گرافیک است.
                            </Text>
                            <HStack>
                              <Text color={"#3646B3"}>حسن الماسی</Text>
                              <Text color={"gray"} fontSize={"sm"}>
                                ۴ روز پیش
                              </Text>
                            </HStack>
                          </Stack>
                          <Divider borderColor={"#EBEBEB"} my={"10px"} />
                          <Stack
                            direction={{ base: "column", md: "row" }}
                            w={"100%"}
                          >
                            <Text
                              fontSize={"sm"}
                              color={"gray"}
                              lineHeight={"taller"}
                            >
                              لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ،
                              و با استفاده از طراحان گرافیک است.
                            </Text>
                            <HStack>
                              <Text color={"#3646B3"}>حسن الماسی</Text>
                              <Text color={"gray"} fontSize={"sm"}>
                                ۴ روز پیش
                              </Text>
                            </HStack>
                          </Stack>
                        </Box>
                      </VStack>
                    </HStack>
                    <Divider mt={"20px"} borderColor={"gray.200"} />
                    {/* <HStack alignItems={"start"} gap={"10px"} my={"20px"}>
                      <VStack>
                        <IconButton
                          icon={<IoArrowUp color="gray" />}
                          variant={"outline"}
                          colorScheme="gray"
                          borderRadius={"100%"}
                          size={"sm"}
                        />
                        <Text>6</Text>
                        <IconButton
                          icon={<IoArrowDown color="gray" />}
                          variant={"outline"}
                          colorScheme="gray"
                          borderRadius={"100%"}
                          size={"sm"}
                        />
                        <IconButton
                          icon={<IoCheckmark color="white" />}
                          variant={"ghost"}
                          bgColor="#29CCCC"
                          borderRadius={"100%"}
                          size={"sm"}
                        />
                        <IconButton
                          icon={
                            <IoBookmarkOutline color="gray" fontSize={"20px"} />
                          }
                          size={"sm"}
                        />
                      </VStack>
                      <VStack w={"100%"} alignItems={"start"}>
                        <Text lineHeight={"taller"}>
                         {dataQuestionAnswer?.data?.[0]?.content}
                        </Text>
                        <HStack
                          w={"100%"}
                          justifyContent={{
                            base: "start",
                            md: "space-between",
                          }}
                          my={"10px"}
                        >
                          <HStack order={{ base: 2 }}>
                            <Avatar
                              width={"28px"}
                              height={"28px"}
                              order={{ base: 2 }}
                            />
                            <Text
                              color={"gray"}
                              fontSize={"sm"}
                              order={{ base: 1 }}
                            >
                              اسلام کوئست
                            </Text>
                          </HStack>
                          <HStack order={{ base: 1 }}>
                            <Text fontSize={"sm"} color={"gray.500"}>
                              ۲۱ ساعت قبل
                            </Text>
                            <Divider
                              height={"10px"}
                              borderColor={"#EBEBEB"}
                              orientation="vertical"
                            />
                            {slidesToShow != 1 && (
                              <HStack gap={0} alignItems={"center"}>
                                <Button
                                  colorScheme="gray"
                                  color={"gray"}
                                  variant={"ghost"}
                                  fontWeight={"normal"}
                                  size={"sm"}
                                >
                                  گزارش محتوای نامناسب
                                </Button>
                                <IoWarningOutline color="gray" />
                              </HStack>
                            )}
                          </HStack>
                        </HStack>
                        {slidesToShow == 1 && (
                          <HStack gap={0} alignItems={"center"}>
                            <Button
                              colorScheme="gray"
                              color={"gray"}
                              variant={"ghost"}
                              fontWeight={"normal"}
                              size={"sm"}
                            >
                              گزارش محتوای نامناسب
                            </Button>
                            <IoWarningOutline color="gray" />
                          </HStack>
                        )}
                      </VStack>
                    </HStack> */}
                  </Box>
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
                          پاسخ شما
                        </Text>
                        <Text fontSize={"xs"} color={"white"}>
                          برای پاسخ به این سؤال، باید وارد حساب کاربری خود شوید.
                        </Text>
                      </VStack>
                      <Button
                        bgColor={"#29CCCC"}
                        fontWeight={"normal"}
                        p={"10px"}
                        w={{ base: "200px", md: "150px" }}
                        size={"sm"}
                      >
                        ورود به حساب کاربری
                      </Button>
                    </HStack>
                  </Box>
                  <Box
                    w={{ base: "full", md: "100%" }}
                    padding={"20px"}
                    bgColor={"white"}
                    border={"1px"}
                    borderColor={"gray.200"}
                    borderRadius={"15px"}
                    my={"10px"}
                    mr={{ base: "-40px", md: "0px" }}
                    as="form"
                    onSubmit={handleSubmitAnswer(handleAddAnswer)}
                  >
                    <VStack w={"100%"} alignItems={"start"}>
                      <Text fontWeight={"bold"} fontSize={"16px"} mb={"10px"}>
                        پاسخ شما
                      </Text>
                      <Text fontSize={"xs"}>
                        پاسخ‌های تولید شده توسط ابزارهای هوش مصنوعی مجاز نیستند.
                      </Text>
                    </VStack>
                    <Textarea my={"20px"} {...registerAnswer("content")} />
                    <HStack w={"100%"} justifyContent={"end"}>
                      <Button
                        bgColor={"#29CCCC"}
                        fontWeight={"normal"}
                        p={"10px"}
                        size={"sm"}
                        type="submit"
                      >
                        ثبت پاسخ
                      </Button>
                    </HStack>
                  </Box>
                </VStack>
              </GridItem>
              <GridItem>
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
                    سؤال‌‌های مرتبط
                  </Text>
                  <HStack alignItems={"start"}>
                    <Badge
                      bgColor={"#29CCCC"}
                      color={"white"}
                      paddingY={"2px"}
                      px={"10px"}
                      borderRadius={"5px"}
                    >
                      6
                    </Badge>
                    <Text fontSize={"sm"}>
                      لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با
                      استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه
                      و مجله
                    </Text>
                  </HStack>
                  <Divider />
                  <HStack alignItems={"start"}>
                    <Badge
                      bgColor={"#29CCCC"}
                      color={"white"}
                      paddingY={"2px"}
                      px={"10px"}
                      borderRadius={"5px"}
                    >
                      6
                    </Badge>
                    <Text fontSize={"sm"}>
                      لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با
                      استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه
                      و مجله
                    </Text>
                  </HStack>
                  <Divider />
                  <HStack alignItems={"start"}>
                    <Badge
                      bgColor={"#29CCCC"}
                      color={"white"}
                      paddingY={"2px"}
                      px={"10px"}
                      borderRadius={"5px"}
                    >
                      6
                    </Badge>
                    <Text fontSize={"sm"}>
                      لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با
                      استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه
                      و مجله
                    </Text>
                  </HStack>
                  <Divider />
                  <HStack alignItems={"start"}>
                    <Badge
                      bgColor={"#29CCCC"}
                      color={"white"}
                      paddingY={"2px"}
                      px={"10px"}
                      borderRadius={"5px"}
                    >
                      6
                    </Badge>
                    <Text fontSize={"sm"}>
                      لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با
                      استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه
                      و مجله
                    </Text>
                  </HStack>
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
                    سؤال‌‌های پربازدید
                  </Text>
                  <VStack alignItems={"start"}>
                    <Text>
                      لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با
                      استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه
                      و مجله
                    </Text>
                    <HStack alignItems={"center"}>
                      <Badge
                        bgColor={"#D2D2D2"}
                        color={"white"}
                        paddingY={"2px"}
                        px={"10px"}
                        borderRadius={"5px"}
                        w={"24px"}
                        h={"24px"}
                      ></Badge>
                      <Text fontSize={"xs"} color={"#29CCCC"}>
                        فقه سیاسی
                      </Text>
                    </HStack>
                  </VStack>
                  <Divider />
                  <VStack alignItems={"start"}>
                    <Text>
                      لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با
                      استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه
                      و مجله
                    </Text>
                    <HStack alignItems={"center"}>
                      <Badge
                        bgColor={"#D2D2D2"}
                        color={"white"}
                        paddingY={"2px"}
                        px={"10px"}
                        borderRadius={"5px"}
                        w={"24px"}
                        h={"24px"}
                      ></Badge>
                      <Text fontSize={"xs"} color={"#29CCCC"}>
                        فقه سیاسی
                      </Text>
                    </HStack>
                  </VStack>
                  <Divider />
                  <VStack alignItems={"start"}>
                    <Text>
                      لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با
                      استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه
                      و مجله
                    </Text>
                    <HStack alignItems={"center"}>
                      <Badge
                        bgColor={"#D2D2D2"}
                        color={"white"}
                        paddingY={"2px"}
                        px={"10px"}
                        borderRadius={"5px"}
                        w={"24px"}
                        h={"24px"}
                      ></Badge>
                      <Text fontSize={"xs"} color={"#29CCCC"}>
                        فقه سیاسی
                      </Text>
                    </HStack>
                  </VStack>
                  <Divider />
                  <VStack alignItems={"start"}>
                    <Text>
                      لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با
                      استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه
                      و مجله
                    </Text>
                    <HStack alignItems={"center"}>
                      <Badge
                        bgColor={"#D2D2D2"}
                        color={"white"}
                        paddingY={"2px"}
                        px={"10px"}
                        borderRadius={"5px"}
                        w={"24px"}
                        h={"24px"}
                      ></Badge>
                      <Text fontSize={"xs"} color={"#29CCCC"}>
                        فقه سیاسی
                      </Text>
                    </HStack>
                  </VStack>
                </Box>
              </GridItem>
            </Grid>
          </VStack>
        </HStack>
      </Box>
    </MainLayout>
  );
};

export default Index;
