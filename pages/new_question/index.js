import MultiSelectComboBox from "@/components/base/multiSelectComboBox";
import { baseUrl } from "@/components/lib/api";
import MainLayout from "@/components/mainLayout";
import {
  Badge,
  Box,
  Button,
  Divider,
  HStack,
  Input,
  ListItem,
  Text,
  Textarea,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Masonry from "react-masonry-css";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

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

  const { data: dataTag, isLoading: isLoadingTag } =
    useSWR(`user/category/tag`);
  const { trigger: triggerQuestion, isLoading: isLoadingQuestion } =
    useSWRMutation(`user/question`, postRequest);

  const {
    register: registerQuestion,
    setValue: setValueQuestion,
    getValues: getValuesQuestion,
    handleSubmit: handleSubmitQuestion,
    reset: resetQuestion
  } = useForm();

  const breakpointColumnsObj = {
    default: 2,
    1100: 2,
    700: 1,
  };

  const handleAddNewQuestion = (e) => {
    triggerQuestion({
      ...e,
      lang: "fa",
      tags: selectedOptions.map((item) => item.value),
      categories: [],
    });
    reset()
    selectedOptions([])
  };

  return (
    <MainLayout>
      <Box
        as={"form"}
        w="100%"
        alignItems={"center"}
        justifyContent={"center"}
        maxW="container.xl"
        mx="auto"
        mt={{ base: "80px", md: "120px" }}
        onSubmit={handleSubmitQuestion(handleAddNewQuestion)}
      >
        <Text fontWeight={"bold"} fontSize={"20px"} mb={"20px"}>
          سوال خود را بپرسید...
        </Text>
        <Masonry
          width={"100%"}
          breakpointCols={breakpointColumnsObj}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          <VStack
            w={"calc( 100% - 20px )"}
            alignItems={"start"}
            border={"2px"}
            borderColor={"#23D9D7"}
            borderRadius={"15px"}
            padding={"20px"}
            color={"black"}
          >
            <Text fontWeight={"bold"}>عنوان سوال</Text>
            <Text>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
            </Text>
            <Input {...registerQuestion("title")} />
            <Text fontWeight={"bold"} mt={"20px"}>
              سؤالات مرتبط
            </Text>
            <HStack>
              <Text>
                اگر نتوانیم آن را انجام دهیم، آیا می‌توان فطریه را به یک بدهکار
                ورشکسته داد؟
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
              <Text>
                اگر نتوانیم آن را انجام دهیم، آیا می‌توان فطریه را به یک بدهکار
                ورشکسته داد؟
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
              <Text>
                اگر نتوانیم آن را انجام دهیم، آیا می‌توان فطریه را به یک بدهکار
                ورشکسته داد؟
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
              <Text>
                اگر نتوانیم آن را انجام دهیم، آیا می‌توان فطریه را به یک بدهکار
                ورشکسته داد؟
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
              <Text>
                اگر نتوانیم آن را انجام دهیم، آیا می‌توان فطریه را به یک بدهکار
                ورشکسته داد؟
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
            <HStack w={"100%"} justifyContent={"end"} mt={"20px"}>
              <Button bgColor={"#23D9D7"}>مرحله بعد</Button>
            </HStack>
          </VStack>
          <VStack
            w={"calc( 100% - 20px )"}
            alignItems={"start"}
            borderRadius={"15px"}
            padding={"20px"}
            bgColor={"#3646B3"}
          >
            <Text fontWeight={"bold"} color={"white"} fontSize={"18px"}>
              چگونه سؤال مؤثرتری بپرسیم؟
            </Text>
            <Text color={"white"}>
              شما آماده هستید که یک سوال مرتبط با برنامه نویسی بپرسید و این فرم
              به شما در این فرآیند کمک می کند.
            </Text>
            <Text color={"white"} my={"20px"}>
              به دنبال پرسیدن یک سوال غیر برنامه نویسی هستید؟ برای یافتن یک سایت
              مرتبط به موضوعات اینجا مراجعه کنید.
            </Text>
            <Text fontWeight={"bold"} color={"white"}>
              مراحل
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
                <Text color={"white"}>
                  مشکل خود را در یک عنوان یک خطی خلاصه کنید.
                </Text>
              </ListItem>
              <ListItem>
                <Text color={"white"}>
                  مشکل خود را با جزئیات بیشتر توضیح دهید.
                </Text>
              </ListItem>
              <ListItem>
                <Text color={"white"}>
                  آنچه را که تلاش کردید و انتظار داشتید چه اتفاقی بیفتد را توصیف
                  کنید.
                </Text>
              </ListItem>
              <ListItem>
                <Text color={"white"}>
                  «برچسب‌هایی» را اضافه کنید که به نمایان شدن سؤال شما برای
                  اعضای انجمن کمک می‌کند.
                </Text>
              </ListItem>
              <ListItem>
                <Text color={"white"}>
                  سوال خود را بررسی کنید و آن را در سایت ارسال کنید.
                </Text>
              </ListItem>
            </UnorderedList>
          </VStack>
          <VStack
            w={"calc( 100% - 20px )"}
            alignItems={"start"}
            border={"1px"}
            borderColor={"gray.200"}
            borderRadius={"15px"}
            padding={"20px"}
            color={"black"}
          >
            <Text fontWeight={"bold"} fontSize={"18px"}>
              محتوا سوال
            </Text>
            <Text>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
            </Text>
            <Textarea {...registerQuestion("content")}></Textarea>
          </VStack>
          <VStack
            w={"calc( 100% - 20px )"}
            alignItems={"start"}
            borderRadius={"15px"}
            padding={"20px"}
            bgColor={"#fef4e2"}
          >
            <Text fontWeight={"bold"} color={"black"}>
              سؤالات مرتبط
            </Text>
            <Text color={"black"} my={"10px"}>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
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
                  3 پاسخ
                </Badge>
              </HStack>
            </VStack>
            <HStack w={"100%"} justifyContent={"end"} mt={"20px"}>
              <Button bgColor={"#23D9D7"}>مرحله بعد</Button>
            </HStack>
          </VStack>

          <VStack
            w={"calc( 100% - 20px )"}
            alignItems={"start"}
            border={"1px"}
            borderColor={"gray.200"}
            borderRadius={"15px"}
            padding={"20px"}
            color={"black"}
          >
            <Text fontWeight={"bold"} fontSize={"18px"}>
              برچسب‌های سؤال
            </Text>
            <Text>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
            </Text>
            {dataTag && (
              <MultiSelectComboBox
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
                optionsList={dataTag?.data?.result?.map((it) => ({
                  value: it?.id,
                  label: it?.name,
                }))}
                setInputValue={setInputValue}
                inputValue={inputValue}
              />
            )}
            <HStack w={"100%"} justifyContent={"end"} mt={"20px"}>
              <Button bgColor={"#23D9D7"} type={"submit"}>
                ثبت سوال
              </Button>
            </HStack>
          </VStack>
        </Masonry>
      </Box>
    </MainLayout>
  );
};

export default Index;
