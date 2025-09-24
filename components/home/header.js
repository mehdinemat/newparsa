import {
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
  VStack
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
import { PiDiamondThin } from "react-icons/pi";
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

  return (
    <Box
      // marginTop={{ base: "60px", md: "100px" }}
      as={Stack}
      justifyContent={"center"}
      alignItems={"center"}
      width="100%"
      height={"100vh"}
      bg={"#3646B3"}
      p={2}
      px={4}
      borderBottom={"1px"}
      borderBottomColor={"gray.200"}
      bgImage={"./homeheader.jpg"}
      bgSize="cover" // 👈 this makes it cover the container
      bgRepeat="no-repeat"
      bgPosition="center"
      position={'relative'}
    >
      <HStack maxW="container.xl" justifyContent={'space-between'} w={'100%'} mt={'20px'}>
        <HStack>
          <Image src="./headerquestionlogo.png" width={'29px'} height={'42px'} ml={'5px'} />
          <Image src="./headerparsalogo.png" width={'100px'} height={'41px'} />
          <Menu >
            <MenuButton px={4} py={2} marginRight={'20px'} transition="all 0.2s">
              <HStack color={'white'}>
                <Text fontSize={"20px"}>
                  {locale == "en"
                    ? t("header_english")
                    : locale == "fa"
                      ? t("header_persian")
                      : locale == "ar" && t("header_arabic")}
                </Text>
                <IoIosArrowDown width={'12px'} fontSize={'12px'} />
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem
                value={"en"}
                onClick={(e) => router.push("/", "/", { locale: "en" })}
              >
                {t("header_english")}
              </MenuItem>
              <MenuItem
                value={"ar"}
                onClick={(e) => router.push("/", "/", { locale: "ar" })}
              >
                {t("header_arabic")}
              </MenuItem>
              <MenuItem
                value={"fa"}
                onClick={(e) => router.push("/", "/", { locale: "fa" })}
              >
                {t("header_persian")}
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
        <HStack>
          <Text fontFamily={'iransans'} fontWeight={'500px'} fontSize={'20px'} color={'white'}>ورود/ثبت‌نام</Text>
          <Image src="./adduserheader.png" height={'29px'} width={'28px'} />
          <Image src="./menuheader.png" height={'29px'} width={'28px'} mr={'20px'} />
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
          mt={'-50px'}
        >
          <Text fontFamily="morabba"
            fontSize={{ base: "35px", md: "50px" }}
            color={"white"}
            textAlign={{ base: "center", md: "center" }}
            fontWeight={'700'}
            mb={'40px'}
          >
            {t("home_parsa_header_title")}
          </Text>
          <VStack
            mb={'80px'}
            alignItems={'end'}
            position="relative"
            borderRadius="20px"
            p={'12px'}
            bgColor={'#00000040'}
            sx={{
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
              {isRecording ? (
                <InputLeftElement height="100%" mr="10px">
                  <Flex
                    position="relative"
                    align="center"
                    justify="center"
                    w="50px"
                    h="50px"
                  >
                    {/* First Wave */}

                    {/* Second Wave (delayed) */}
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

                    {/* Mic Icon Button */}
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
              ) : null}

              <Textarea
                ref={inputRef}
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
            <HStack w={'100%'} justifyContent={'space-between'}>
              <Flex align="center" gap="2">
                {isRecording ? (
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
                ) : isMutating ? (
                  <Spinner color="white" />
                ) : (
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
                    <IoMic
                      fontSize={'25px'}
                      color="#29CCCC"
                      style={{ cursor: "pointer", marginRight: '10px' }}
                      onClick={handleMicClick}

                    />
                  </>
                )}
              </Flex>
              <HStack>
                <Button w={'109px'} height={'40px'} color={'#29CCCC'} borderRadius="10px" rightIcon={<IoSearch fontSize={'25px'} />}
                  onClick={(e) => handleClickSemanticSearch()} variant={'outline'}>جستجو</Button>
                <Button bgColor={'#29CCCC'} w={'179px'} height={'40px'} color={'#3646B3'} borderRadius="10px" rightIcon={<PiDiamondThin fontSize={'40px'} />}
                  onClick={(e) => handleClickSemanticSearch()}>جستجوی معنایی</Button>
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
            padding={'15px'}
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
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                pointerEvents: "none",
              },
            }}
          >

            <Text color={'#76FFFF'}>اَحْبِبْ حَبیبَکَ هَوْنًا ما عَسی اَنْ یَعْصِیَکَ یَوْمًا ما. وَ اَبْغِضْ بَغیضَکَ هَوْنًا ما عَسی اَنْ یَکُونَ حَبیبَکَ یَوْمًا ما.</Text>
          </Box>
          <HStack as={Center} justifyContent="center" w="50%" mt={'20px'}>
            {siteData?.map((item, index) => (
              <React.Fragment key={index}>
                <VStack
                  bgColor="#2A378C4D"
                  borderRadius="13px"
                  spacing={0}
                  w="132px"
                  height="65px"
                  textAlign="center"
                  display={item?.size != breakpoint ? "flex" : "none"}
                  justifyContent="space-between"
                  padding="5px"
                  backdropFilter="blur(4px)"
                  boxShadow="0px 7px 7px 0px #0000001A"
                  borderImageSource="linear-gradient(180deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0) 36.54%, rgba(255, 255, 255, 0) 72.12%, rgba(255, 255, 255, 0.33) 100%)"
                  borderImageSlice={1}
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
                  <Text color="white" fontWeight="300" fontSize={{ base: "14px", md: "14px" }}>
                    {t(item?.t_title)}
                  </Text>
                </VStack>

                {/* Only add divider if it's not the last item */}

              </React.Fragment>
            ))}
          </HStack>
        </VStack>
        <Box as={VStack} alignItems="center" role="group" cursor="pointer" position={'relative'} mb={'30px'} bottom={'0px'} onClick={() => {
          const el = document.querySelector(".questions");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }}>
          <Image
            src="./navigate2.png"
            transition="all 0.3s ease"
            height="7px"
            w={'2px'}
            _groupHover={{ height: "40px" }}
            position={'absolute'}
            bottom={'12px'}
          />
          <Image src="./navigate.png" w={'36px'} />
        </Box>
      </VStack >
    </Box >
  );
};

export default Header;
