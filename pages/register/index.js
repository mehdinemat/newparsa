import { baseUrl } from "@/components/lib/api";
import {
  Box,
  Button,
  Divider,
  HStack,
  Image,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useSWRMutation from "swr/mutation";
import * as Yup from "yup";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
});

const postRequest = (url, { arg }) => {
  return axios.post(baseUrl + url, arg);
};

const Index = () => {
  const { t } = useTranslation();

  const router = useRouter();
  const toast = useToast();

  const validationSchema = Yup.object({
    username: Yup.string()
      .required("نام کاربری را وارد کنید")
      .min(3, "نام کاربری باید حداقل 3 کاراکتر باشد"),

    phone_number: Yup.string()
      .required("شماره موبایل را وارد کنید")
      .matches(/^\+\d{10,15}$/, "شماره موبایل اشتباست"),

    email: Yup.string().required("ایمیل را وارد کنید").email("ایمیل اشتباست"),

    first_name: Yup.string()
      .required("نام را وارد کنید")
      .min(2, "نام حداقل باید 2 کاراکتر باشد"),

    last_name: Yup.string()
      .required("نام خانوادگی را وارد کنید ")
      .min(2, "نام خانوادگی حداقل باید 2 کاراکتر باشد"),

    password: Yup.string()
      .required("رمز عبور را وارد کنید")
      .min(6, "رمز عبور حداقل باید 6 کاراکتر باشد"),

    re_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "تکرار رمز عبور اشتباست")
      .required("لطفا تکرار رمز عبور را وارد کنید"),
  });

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { trigger, isLoading, isMutating } = useSWRMutation(
    "user/auth/register",
    postRequest,
    {
      onSuccess: (data) => {
        console.log(data?.data?.status)
        if (data?.data?.status) {
          router.push("/login");
        } else {
          toast({
            title: 'خطا',
            description: data?.data?.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        }
      },
    }
  );
  const handleRegisterUser = (e) => {
    trigger(e);
  };

  return (
    <Box
      backgroundImage="url('./bg.png')"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      height="100vh"
      width="100%"
      bgColor="#F1F5F9"
    >
      <HStack height={"100%"}>
        <Box
          w={{ base: "100%", md: "40%" }}
          alignItems={"center"}
          justifyContent={"center"}
          as={HStack}
        >
          <VStack
            w={"350px"}
            mt={"20px"}
            justifyContent={"center"}
            height={"100%"}
            as={"form"}
            onSubmit={handleSubmit(handleRegisterUser)}
          >
            <Image
              src="/loginlogo.png"
              width={{ base: "120px", md: "165px" }}
              height={{ base: "50px", md: "68px" }}
              onClick={e => router.replace('/')}
              cursor={'pointer'}
            />
            <Text
              fontSize={{ base: "20px", md: "23px" }}
              color={"#333333"}
              textAlign={"center"}
              w={"327px"}
              mb={"20px"}
            >
              {t("religious")}
            </Text>
            <Divider w={"350px"} h={"2px"} bgColor={"#29CCCC"} />
            <Text fontSize={{ base: "20px", md: "25px" }} mt={"20px"}>
              {t("register")}
            </Text>
            <Input
              height={"46px"}
              placeholder={t("phone_number")}
              mt={"10px"}
              {...register("phone_number")}
              sx={{
                "::placeholder": {
                  textAlign: "center", // this line is also needed to target the placeholder itself
                },
              }}
            />
            <p
              style={{
                fontSize: "10px",
                color: "#e4002b",
                width: "100%",
                textAlign: "start",
              }}
            >
              {errors.phone_number?.message}
            </p>
            <Input
              height={"46px"}
              placeholder={t("first_name")}
              {...register("first_name")}
              sx={{
                "::placeholder": {
                  textAlign: "center", // this line is also needed to target the placeholder itself
                },
              }}
            />
            <p
              style={{
                fontSize: "10px",
                color: "#e4002b",
                width: "100%",
                textAlign: "start",
              }}
            >
              {errors.first_name?.message}
            </p>
            <Input
              height={"46px"}
              placeholder={t("last_name")}
              {...register("last_name")}
              sx={{
                "::placeholder": {
                  textAlign: "center", // this line is also needed to target the placeholder itself
                },
              }}
            />
            <p
              style={{
                fontSize: "10px",
                color: "#e4002b",
                width: "100%",
                textAlign: "start",
              }}
            >
              {errors.last_name?.message}
            </p>
            <Input
              height={"46px"}
              placeholder={t("username")}
              {...register("username")}
              sx={{
                "::placeholder": {
                  textAlign: "center", // this line is also needed to target the placeholder itself
                },
              }}
            />
            <p
              style={{
                fontSize: "10px",
                color: "#e4002b",
                width: "100%",
                textAlign: "start",
              }}
            >
              {errors.username?.message}
            </p>
            <Input
              height={"46px"}
              placeholder={t("password")}
              type="password"
              {...register("password")}
              sx={{
                "::placeholder": {
                  textAlign: "center", // this line is also needed to target the placeholder itself
                },
              }}
            />
            <p
              style={{
                fontSize: "10px",
                color: "#e4002b",
                width: "100%",
                textAlign: "start",
              }}
            >
              {errors.password?.message}
            </p>
            <Input
              height={"46px"}
              placeholder={t("confirm_password")}
              type="password"
              {...register("re_password")}
              sx={{
                "::placeholder": {
                  textAlign: "center", // this line is also needed to target the placeholder itself
                },
              }}
            />
            <p
              style={{
                fontSize: "10px",
                color: "#e4002b",
                width: "100%",
                textAlign: "start",
              }}
            >
              {errors.re_password?.message}
            </p>
            <Input
              height={"46px"}
              placeholder={t("email")}
              {...register("email")}
              sx={{
                "::placeholder": {
                  textAlign: "center", // this line is also needed to target the placeholder itself
                },
              }}
            />
            <p
              style={{
                fontSize: "10px",
                color: "#e4002b",
                width: "100%",
                textAlign: "start",
              }}
            >
              {errors.email?.message}
            </p>

            <Button
              w={"100%"}
              bgColor={"#29CCCC"}
              height={"46px"}
              mt={"20px"}
              type="submit"
              isLoading={isMutating}
            >
              {t("register")}
            </Button>
            <HStack
              w={"100%"}
              alignItems={"start"}
              onClick={(e) => router.push("/login")}
            >
              <Text>{t("have_account")}</Text>
              <Text color={"blue.500"} cursor={"pointer"} >
                {t("log_in")}
              </Text>
            </HStack>
            {/* <Button
              w={"100%"}
              height={"46px"}
              variant={'outline'}
              colorScheme="teal"
              onClick={e => router.push("/login")}
            >
              ثبت نام
            </Button> */}
            {/* <Button
                variant={"outline"}
                w={"100%"}
                rightIcon={<IoLogoGoogle />}
                height={"46px"}
              >
                ورود با حساب گوگل
              </Button> */}
          </VStack>
        </Box>
        <Box
          position="relative"
          w="60%"
          h="100%"
          display={{ base: "none", md: "flex" }}
        >
          {/* Base / background image */}
          <Image src="/loginbg.png" objectFit="cover" w="100%" h="100%" />

          {/* Overlay / centered image */}
          <Image
            src="/loginlogoqu.png"
            alt="Centered Image"
            position="absolute"
            top="50%"
            left="50%"
            width={"130px"}
            height={"158px"}
            transform="translate(-50%, -50%)"
          />
        </Box>
      </HStack>
    </Box>
  );
};

export default Index;
