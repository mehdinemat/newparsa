import {
  Avatar,
  Box,
  Button,
  Center,
  chakra,
  Container,
  Flex,
  HStack,
  Image,
  InputGroup,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Stack,
  Text,
  Textarea,
  Tooltip,
  useBreakpoint,
  VStack
} from "@chakra-ui/react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { IoIosArrowDown } from "react-icons/io";
import {
  IoMic,
  IoSearch
} from "react-icons/io5";
import Recorder from "recorder-js";
import useSWRMutation from "swr/mutation";
import { baseUrl } from "../lib/api";

const siteData = [
  {
    title: "سوال",
    number: "234",
    t_title: "question",
  },
  {
    title: "برچسب",
    number: "52353",
    t_title: "tag",
  },
  {
    title: "مرجع",
    number: "43",
    t_title: "reference",
  },
  {
    title: "منبع",
    number: "2",
    size: "base",
    t_title: "source",
  },
];

const dataTranslate = {
  سوال: "question_count",
  برچسب: "tag_count",
  منبع: "source_count",
  مرجع: "public_figure_count",
};

const MotionMenuList = chakra(motion(MenuList));


const MotionBox = motion(Box);

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

const postRequest = (url, { arg }) => {
  return axios.post(baseUrl + url, arg);
};

const Header = ({
  data,
  t,
  register,
  handleClickSearch,
  handleClickSemanticSearch,
  watchSearch,
  resetSearch,
  handleVoiceSearch,
  hadith,
  handleClickAiSearch,
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const { locale, asPath } = router;

  const inputRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const breakpoint = useBreakpoint();

  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [voiceText, setVoiceText] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [recordingActive, setRecordingActive] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [loadingRecording, setLoadingRecording] = useState(false);

  const audioContextRef = useRef(null);
  const streamRef = useRef(null);
  const recorderRef = useRef(null);

  const { trigger: uploadAudio, isMutating } = useSWRMutation(
    "user/general/speech-to-text",
    sendAudio,
    {
      onSuccess: (data) => {
        handleVoiceSearch(data?.data?.text);
      },
    }
  );

  // const handleMicClick = async () => {
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  //     mediaRecorderRef.current = new MediaRecorder(stream);
  //     mediaRecorderRef.current.start();
  //     setIsRecording(true);

  //     mediaRecorderRef.current.ondataavailable = (e) => {
  //       const audioBlob = new Blob([e.data], { type: "audio/wav" });
  //       const audioUrl = URL.createObjectURL(audioBlob);
  //     };
  //   } catch (error) {
  //     console.error("Microphone access denied:", error);
  //   }
  // };

  const handleCancelRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const handleMicClick = async () => {
    setRecordingActive(true);

    if (isRecording) return;

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const recorder = new Recorder(audioContext);

    await recorder.init(stream);
    recorder.start();

    audioContextRef.current = audioContext;
    streamRef.current = stream;
    recorderRef.current = recorder;

    setIsRecording(true);
  };

  const handleStopRecording = async () => {
    if (!recorderRef.current || !isRecording) return;

    setLoadingRecording(true);

    const { blob } = await recorderRef.current.stop();
    setRecordedBlob(blob);

    streamRef.current.getTracks().forEach((track) => track.stop());
    setIsRecording(false);

    try {
      const response = await uploadAudio(blob); // this sends it
      console.log("Upload response:", response); // use this data in UI
    } catch (err) {
      setLoadingRecording(false);
      console.error("Upload failed:", err);
    }

    setLoadingRecording(false);
    // Optionally clear the blob
    setRecordedBlob(null);
  };

  const handleDownload = () => {
    if (recordedBlob) {
      const url = URL.createObjectURL(recordedBlob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "recording.wav";
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleUpload = async () => {
    if (recordedBlob) {
      await uploadAudio(recordedBlob);
      setRecordedBlob(null); // Reset
    }
  };

  useEffect(() => {
    setIsUserLogin(!!localStorage.getItem("token"));
  }, []);

  const handleAiResponse = () => {
    handleClickAiSearch();
  };

  const handleProfileLink = () => {
    router.push("/dashboard/profile");
  };

  const handleExit = () => {
    localStorage.removeItem("token");
    router.replace("/");
  };
  return (
    <Box
      // marginTop={{ base: "60px", md: "100px" }}
      as={Stack}
      justifyContent={"center"}
      alignItems={"center"}
      width="100%"
      height={"100vh"}
      scrollSnapAlign="start"
      bg={"#3646B3"}
      p={2}
      px={4}
      borderBottom={"1px"}
      borderBottomColor={"gray.200"}
      bgImage={"/homebg.jpg"}
      bgSize="cover" // 👈 this makes it cover the container
      bgRepeat="no-repeat"
      bgPosition="center"
      position={"relative"}
    >
      <HStack
        maxW="container.xl"
        justifyContent="space-between"
        w="100%"
        mt="10px"
        alignItems="center" // make sure children align properly
      >
        <HStack>
          <Image
            src="./headerquestionlogo.png"
            width="29px"
            height="42px"
            ml="5px"
            onClick={(e) => router.push("/")}
            cursor={"pointer"}
          />
          <Image
            src="./headerparsalogo.png"
            width="100px"
            height="41px"
            onClick={(e) => router.push("/")}
            cursor={"pointer"}
          />
          <Menu>
            <MenuButton px={4} py={2} marginRight="20px" transition="all 0.2s">
              <HStack color="white">
                <Text fontSize="20px">
                  {locale == "en"
                    ? t("header_english")
                    : locale == "fa"
                      ? t("header_persian")
                      : locale == "ar" && t("header_arabic")}
                </Text>
                <IoIosArrowDown width="12px" fontSize="12px" />
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => router.push("/", "/", { locale: "en" })}>
                {t("header_english")}
              </MenuItem>
              <MenuItem onClick={() => router.push("/", "/", { locale: "ar" })}>
                {t("header_arabic")}
              </MenuItem>
              <MenuItem onClick={() => router.push("/", "/", { locale: "fa" })}>
                {t("header_persian")}
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>

        <HStack align="center">
          {!isUserLogin ? (
            <HStack
              height={"60px"}
              width={"173px"}
              cursor="pointer"
              onClick={() => router.push("/login")}
              role="group" // 👈 important: allows child hover detection
              alignItems={"center"}
              justifyContent={"center"}
              transition="all 0.3s ease" // smooth hover
              _hover={{
                backdropFilter: "blur(12.8px)",
                boxShadow: `
      0px 3px 7px 0px #0000000D,
      0px 12px 12px 0px #0000000A,
      0px 28px 17px 0px #00000008,
      0px 50px 20px 0px #00000003,
      0px 77px 22px 0px #00000000
    `,
              }}
              borderRadius={"15px"}
            >
              <Text
                fontFamily="iransans"
                fontWeight="500"
                fontSize="20px"
                color="white"
              >
                {t("log_sub")}
              </Text>

              <Image src="/adduserheader.png" height="29px" width="28px" />
            </HStack>
          ) : (
            <Avatar fontSize={"46px"} />
          )}
          <Menu isOpen={isOpen} onOpen={() => setIsOpen(true)} onClose={() => setIsOpen(false)}>
            <MenuButton as={Button}>
              <Image src="/menuheader.png" height="29px" width="28px" mr="20px" />
            </MenuButton>

            <AnimatePresence>
              {isOpen && (
                <MotionMenuList
                  // 👇 animation
                  initial={{ opacity: 0, height: '0px' }}
                  animate={{ opacity: 1, height: 'fit-content' }}
                  exit={{ opacity: 0, height: '0px' }}
                  transition={{ duration: 1.6, ease: "easeInOut" }}
                  // 👇 your original Chakra UI props
                  bgColor={"#EBEDF8E5"}
                  padding={"12px"}
                  w={"237px"}
                  h={"289px"}
                  backdropFilter="blur(27.6px)"
                  boxShadow={`
              0px 14px 30px 0px #0000001A,
              0px 54px 54px 0px #00000017,
              0px 122px 73px 0px #0000000D,
              0px 216px 86px 0px #00000003,
              0px 338px 95px 0px #00000000
            `}
                  borderRadius={"30px"}
                >
                  <MenuItem
                    _hover={{ bgColor: "#3646B333" }}
                    borderRadius="15px"
                    bgColor="#3646B30D"
                    my="5px"
                    h="35px"
                    onClick={() => handleProfileLink()}
                  >
                    {isUserLogin ? 'پروفایل' : 'ورود؟ثبت‌نام'}
                  </MenuItem>
                  <MenuItem
                    _hover={{ bgColor: "#3646B333" }}
                    borderRadius="15px"
                    bgColor="#3646B30D"
                    my="5px"
                    h="35px"
                  >
                    منابع و مراجع
                  </MenuItem>
                  <MenuItem
                    _hover={{ bgColor: "#3646B333" }}
                    borderRadius="15px"
                    bgColor="#3646B30D"
                    my="5px"
                    h="35px"
                  >
                    اخبار
                  </MenuItem>
                  <MenuItem
                    _hover={{ bgColor: "#3646B333" }}
                    borderRadius="15px"
                    bgColor="#3646B30D"
                    my="5px"
                    h="35px"
                  >
                    کاربران
                  </MenuItem>
                  <MenuItem
                    _hover={{ bgColor: "#3646B333" }}
                    borderRadius="15px"
                    bgColor="#3646B30D"
                    my="5px"
                    h="35px"
                  >
                    پشتیبانی و راه ارتباطی
                  </MenuItem>
                  {isUserLogin && <MenuItem
                    _hover={{ bgColor: "#3646B333" }}
                    borderRadius="15px"
                    bgColor="#3646B30D"
                    my="5px"
                    h="35px"
                    onClick={() => handleExit()}
                  >
                    خروج از حساب کاربری
                  </MenuItem>}
                </MotionMenuList>
              )}
            </AnimatePresence>
          </Menu>
        </HStack>
      </HStack>
      <VStack
        height={"100vh"}
        as={Container}
        maxW="5xl"
        w={"100%"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <VStack
          w={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
          height={"100%"}
          mt={"-50px"}
        >
          <Text
            fontFamily="morabba"
            fontSize={{ base: "35px", md: "50px" }}
            color={"white"}
            textAlign={{ base: "center", md: "center" }}
            fontWeight={"700"}
            mb={{ base: "20px" }}
            sx={{
              "@media (min-width: 120em)": {
                marginBottom: "40px",
              },
            }}
          >
            {t("home_parsa_header_title")}
          </Text>
          <VStack
            mb={{ base: "15px" }}
            alignItems={"end"}
            position="relative"
            borderRadius="20px"
            p={"12px"}
            bgColor={"#00000040"}
            sx={{
              "@media (min-width: 120em)": {
                marginBottom: "80px",
              },
              backdropFilter: "blur(23.3px)",
              WebkitBackdropFilter: "blur(23.3px)",
              overflow: "hidden", // for rounded corners
              _before: {
                content: '""',
                position: "absolute",
                inset: 0,
                borderRadius: "20px",
                padding: "1.5px", // thickness of border
                background:
                  "linear-gradient(360deg, rgba(255, 255, 255, 0.55) -32.14%, rgba(255, 255, 255, 0) 19.32%, rgba(255, 255, 255, 0) 53.62%, rgba(255, 255, 255, 0.33) 100%)",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                pointerEvents: "none",
              },
            }}
          >
            <InputGroup
              height="89px"
              width={{ base: "381px", md: "874px" }}
              borderRadius="20px"
            // my="20px"
            >

              <Textarea
                borderRadius="20px"
                ref={inputRef}
                fontSize={"20px"}
                fontWeight={"500"}
                width={{ base: "381px", md: "100%" }}
                bgColor="#00000059"
                backdropFilter="blur(9px)"
                height="89px"
                textIndent="20px"
                placeholder={isRecording ? t("listening") : t("search_among")}
                color="white"
                border="none" // removes the border completely
                pl={isRecording ? "50px" : "12px"}
                _placeholder={{ color: "gray.300" }}
                {...register("search")}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleClickSearch();
                  }
                }}
              />
            </InputGroup>
            <HStack w={"100%"} justifyContent={"space-between"}>
              <Flex align="center" gap="2">

                <>
                  {!isRecording ? (
                    loadingRecording ? (
                      <Spinner color="white" />
                    ) : (
                      <IoMic
                        fontSize={"25px"}
                        color="#29CCCC"
                        style={{ cursor: "pointer", marginRight: "10px" }}
                        onClick={handleMicClick}
                      />
                    )
                  ) : (
                    <HStack gap={0}>
                      <svg
                        cursor={"pointer"}
                        width="38"
                        height="38"
                        viewBox="0 0 38 38"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={async () => {
                          handleStopRecording();
                          // setTimeout(handleUpload, 500);
                        }}
                      >
                        <g filter="url(#filter0_d_832_10734)">
                          <rect
                            x="11.5"
                            y="11.5"
                            width="15"
                            height="15"
                            rx="2"
                            fill="#FF0000"
                          />
                        </g>
                        <defs>
                          <filter
                            id="filter0_d_832_10734"
                            x="0.7"
                            y="0.7"
                            width="36.6"
                            height="36.6"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                          >
                            <feFlood
                              flood-opacity="0"
                              result="BackgroundImageFix"
                            />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feOffset />
                            <feGaussianBlur stdDeviation="5.4" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="BackgroundImageFix"
                              result="effect1_dropShadow_832_10734"
                            />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="effect1_dropShadow_832_10734"
                              result="shape"
                            />
                          </filter>
                        </defs>
                      </svg>
                      <Image src="/Device.png" height={"40px"} />
                    </HStack>
                  )}
                </>

                {/* } */}
              </Flex>
              <HStack>
                {searchActive && (
                  <Box
                    height={"40px"}
                    display={"flex"}
                    flexDir={"row"}
                    alignItems={"center"}
                    gap={"5px"}
                    bgColor={"#FFFFFF0D"}
                    borderRadius={"10px"}
                    padding={"5px"}
                  >
                    <Button
                      leftIcon={<IoSearch fontSize={"20px"} />}
                      bgColor={"#29CCCC4D"}
                      border={"1px"}
                      borderColor={"#29CCCC"}
                      color={"#29CCCC"}
                      onClick={(e) => handleClickSearch()}
                      height={"30px"}
                    >
                      معمولی
                    </Button>
                    <Button
                      onClick={(e) => handleClickSemanticSearch()}
                      leftIcon={
                        <svg
                          width="17"
                          height="18"
                          viewBox="0 0 17 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.5129 16.6387L12.0137 13.2129L15.5129 16.6387Z"
                            fill="black"
                          />
                          <path
                            d="M15.5129 16.6387L12.0137 13.2129"
                            stroke="#29CCCC"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M13.9003 8.745C13.9003 12.2326 11.0124 15.0598 7.45013 15.0598C3.88782 15.0598 1 12.2326 1 8.745C1 5.25742 3.88782 2.43018 7.45013 2.43018"
                            stroke="#29CCCC"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M11.1696 0.232422L11.61 2.01061C11.9087 3.21516 12.8889 4.15473 14.1454 4.44107L16.0003 4.86329L14.1454 5.28552C12.8889 5.57185 11.9087 6.51142 11.61 7.71597L11.1696 9.49416L10.7292 7.71597C10.4305 6.51142 9.45034 5.57185 8.1938 5.28552L6.33887 4.86329L8.1938 4.44107C9.45034 4.15473 10.4305 3.21516 10.7292 2.01061L11.1696 0.232422Z"
                            fill="#29CCCC"
                          />
                        </svg>
                      }
                      height={"30px"}
                      bgColor={"#29CCCC4D"}
                      border={"1px"}
                      borderColor={"#29CCCC"}
                      color={"#29CCCC"}
                    >
                      معنایی
                    </Button>
                  </Box>
                )}
                {!searchActive && (
                  <Button
                    w={"109px"}
                    height={"40px"}
                    color={"#29CCCC"}
                    borderRadius="10px"
                    rightIcon={<IoSearch fontSize={"25px"} />}
                    onClick={(e) => setSearchActive(true)}
                    variant={"outline"}
                  >
                    جستجو
                  </Button>
                )}
                <Tooltip label='پاسخ معنایی با استفاده از هوش مصنوعی' bgColor={'#D9D9D9'} color={'#333333'} sx={{
                  boxShadow: `
          0px 20px 45px 0px #00000033,
          0px 82px 82px 0px #0000002B,
          0px 184px 111px 0px #0000001A,
          0px 328px 131px 0px #00000008,
          0px 512px 143px 0px #00000000
        `
                }} hasArrow>
                  <Button
                    bgColor={"#29CCCC"}
                    w={"179px"}
                    height={"40px"}
                    color={"#3646B3"}
                    borderRadius="10px"
                    rightIcon={
                      <svg
                        width="22"
                        height="24"
                        viewBox="0 0 22 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.1575 4.09766L13.0549 7.91879C13.6635 10.5072 15.6603 12.5263 18.2204 13.1416L21.9996 14.0489L18.2204 14.9562C15.6603 15.5715 13.6635 17.5905 13.0549 20.179L12.1575 24.0001L11.2602 20.179C10.6516 17.5905 8.65473 15.5715 6.09467 14.9562L2.31543 14.0489L6.09467 13.1416C8.65473 12.5263 10.6516 10.5072 11.2602 7.91879L12.1575 4.09766Z"
                          fill="#3646B3"
                        />
                        <path
                          d="M4.05263 0L4.42213 1.57341C4.67272 2.63924 5.49496 3.4706 6.54911 3.72396L8.10526 4.09756L6.54911 4.47116C5.49496 4.72452 4.67272 5.55588 4.42213 6.62171L4.05263 8.19512L3.68313 6.62171C3.43255 5.55588 2.6103 4.72452 1.55616 4.47116L0 4.09756L1.55616 3.72396C2.6103 3.4706 3.43255 2.63924 3.68313 1.57341L4.05263 0Z"
                          fill="#3646B3"
                        />
                      </svg>
                    }
                    onClick={(e) => handleAiResponse()}
                  >
                    پاسخ هوش‌مصنوعی
                  </Button>
                </Tooltip>
              </HStack>
            </HStack>
          </VStack>
          <Box
            w="545px"
            h="127px"
            borderRadius="13px"
            position="relative"
            bg="#2A378C4D"
            backdropFilter="blur(5px)"
            padding={"15px"}
            sx={{
              overflow: "hidden", // ensures rounded corners
              _before: {
                content: '""',
                position: "absolute",
                inset: 0,
                borderRadius: "13px",
                padding: "0.7px", // border thickness
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0) 36.54%, rgba(255, 255, 255, 0) 72.12%, rgba(255, 255, 255, 0.33) 100%)",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                pointerEvents: "none",
              },
            }}
          >
            <Text color={"#76FFFF"} wordBreak="break-word" align={"justify"}>
              {hadith}
            </Text>
          </Box>
          <HStack
            as={Center}
            justifyContent="center"
            w="fit-content"
            mt={"20px"}
          >
            {siteData?.map((item, index) => (
              <React.Fragment key={index}>
                <VStack
                  position="relative"
                  bgColor="#2A378C4D"
                  borderRadius="13px"
                  spacing={0}
                  w="132px"
                  h="65px"
                  textAlign="center"
                  display={item?.size != breakpoint ? "flex" : "none"}
                  justifyContent="space-between"
                  p="5px"
                  backdropFilter="blur(4px)"
                  overflow="hidden"
                  _before={{
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    borderRadius: "13px",
                    padding: "0.7px", // stroke thickness
                    background:
                      "linear-gradient(180deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0) 36.54%, rgba(255, 255, 255, 0) 72.12%, rgba(255, 255, 255, 0.33) 100%)",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    pointerEvents: "none",
                  }}
                >
                  <CountUp
                    start={0}
                    end={data?.[dataTranslate?.[item?.title]]}
                    duration={2.75}
                    decimals={0}
                    onEnd={() => console.log("Ended! 👏")}
                    onStart={() => console.log("Started! 💨")}
                  >
                    {({ countUpRef, start }) => {
                      // Automatically start count on mount
                      useEffect(() => {
                        start();
                      }, [start]);

                      return (
                        <Stack>
                          <Text
                            color="white"
                            fontWeight="500"
                            ref={countUpRef}
                            fontSize={{ base: "20px", md: "20px" }}
                          >
                            {item?.number}
                          </Text>
                        </Stack>
                      );
                    }}
                  </CountUp>
                  <Text
                    color="white"
                    fontWeight="300"
                    fontSize={{ base: "14px", md: "14px" }}
                  >
                    {t(item?.t_title)}
                  </Text>
                </VStack>

                {/* Only add divider if it's not the last item */}
              </React.Fragment>
            ))}
          </HStack>
        </VStack>
        <Box
          as={VStack}
          alignItems="center"
          role="group"
          cursor="pointer"
          position={"relative"}
          mb={"30px"}
          bottom={"0px"}
          onClick={() => {
            const el = document.querySelector(".questions");
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <Image
            src="./navigate2.png"
            transition="all 0.3s ease"
            height="7px"
            w={"2px"}
            _groupHover={{ height: "40px" }}
            position={"absolute"}
            bottom={"12px"}
          />
          <Image src="./navigate.png" w={"36px"} />
        </Box>
      </VStack>
    </Box>
  );
};

export default Header;
