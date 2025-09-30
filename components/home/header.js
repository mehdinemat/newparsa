import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Flex,
  HStack,
  IconButton,
  Image,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Stack,
  Text,
  Textarea,
  useBreakpoint,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { IoIosArrowDown } from "react-icons/io";
import {
  IoClose,
  IoMic,
  IoMicOutline,
  IoSearch,
  IoSendOutline,
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
}) => {
  const router = useRouter();

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

    const { blob } = await recorderRef.current.stop();
    setRecordedBlob(blob);

    streamRef.current.getTracks().forEach((track) => track.stop());
    setIsRecording(false);

    try {
      const response = await uploadAudio(blob); // this sends it
      console.log("Upload response:", response); // use this data in UI
    } catch (err) {
      console.error("Upload failed:", err);
    }

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
          {/* <Box height="60px" display="flex" alignItems="center" ml={'0px'}>
            {!showInput ? (
              <CiSearch
                color="white"
                fontSize="30px"
                style={{ marginLeft: "20px", cursor: "pointer" }}
                onClick={() => setShowInput(true)}
              />
            ) : (
              <InputGroup
                width="490px"
                border="1px"
                borderColor="#3646B366"
                height="60px"
              >
                <Input
                  border="1px"
                  borderColor="#3646B366"
                  height="60px"
                  width="490px"
                  placeholder="جستجو..."
                  bg="white"
                  borderRadius="10px"
                  {...register("search")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleClickSearch();
                    }
                  }}
                  _focus={{ borderColor: "blue.400" }}
                />
                <InputRightElement height="60px" ml={'16px'}>
                  <CiSearch
                    cursor="pointer"
                    onClick={handleClickSearch}
                    fontSize="30px"
                    color="#3646B3"
                  />
                </InputRightElement>
              </InputGroup>
            )}
          </Box> */}

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

          <Image src="/menuheader.png" height="29px" width="28px" mr="20px" />
        </HStack>
      </HStack>

      {/* <VStack height={"100vh"} position={'absolute'} right={0} top={0} alignItems={'center'} mt={'-30px'} justifyContent={'center'} pr={'25px'}>
        <IconButton icon={<BiSupport />} bgColor={'#3646B3'} borderRadius={'8px'} />
        <IconButton icon={<RiTelegram2Line />} bgColor={'#3646B3'} borderRadius={'8px'} />
        <IconButton icon={<RiThreadsFill />} bgColor={'#3646B3'} borderRadius={'8px'} />

      </VStack> */}
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
              // my="20px"
            >
              {/* {isRecording ? (
                <InputLeftElement height="100%" mr="10px">
                  <Flex
                    position="relative"
                    align="center"
                    justify="center"
                    w="50px"
                    h="50px"
                  >
                    <MotionBox
                      position="absolute"
                      width="32px"
                      height="32px"
                      borderRadius="50%"
                      border="3px solid #7fe0e0"
                      animate={{
                        scale: [1, 1.5],
                        opacity: [1, 0],
                      }}
                      transition={{
                        duration: 1.7,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                        delay: 1, // important! delay start
                      }}
                    />

                    <IconButton
                      aria-label="Record"
                      bgColor="white"
                      borderRadius="50px"
                      size="sm"
                      icon={
                        <IoMicOutline
                          fontSize="24px"
                          color="#29CCCC"
                          style={{ cursor: "pointer", zIndex: 1 }}
                        />
                      }
                    />
                  </Flex>
                </InputLeftElement>
              ) : null} */}

              <Textarea
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
                {/* {isRecording ? (
                  <HStack>
                    <IoClose
                      fontSize="16px"
                      color="white"
                      style={{ cursor: "pointer" }}
                      onClick={handleStopRecording}
                    />
                    <IoSendOutline
                      style={{ transform: "rotate(180deg)" }}
                      onClick={async () => {
                        handleStopRecording();
                        // setTimeout(handleUpload, 500);
                      }}
                      fontSize={"25px"}
                      color="white"
                      cursor={"pointer"}
                    />
                  </HStack>
                ) : isMutating ?  */}
                {/* (
                  <Spinner color="white" />
                ) :  */}
                
                  <>
                    {/* <IoSearch
                        fontSize={'30px'}
                        color="#29CCCC"
                        cursor="pointer"
                        onClick={(e) => handleClickSearch()}
                      /> */}
                    {/* <PiDiamondThin
                        fontSize="20px"
                        color="#29CCCC"
                        cursor="pointer"
                        onClick={(e) => handleClickSemanticSearch()}
                      /> */}
                    {!isRecording ? (
                      <IoMic
                        fontSize={"25px"}
                        color="#29CCCC"
                        style={{ cursor: "pointer", marginRight: "10px" }}
                        onClick={handleMicClick}
                      />
                    ) : 
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
                    }
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
                  onClick={(e) => handleClickSemanticSearch()}
                >
                  پاسخ هوش‌مصنوعی
                </Button>
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
