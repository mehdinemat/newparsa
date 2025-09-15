import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  Stack,
  Text,
  useBreakpoint,
  VStack
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { BiSupport } from "react-icons/bi";
import {
  IoClose,
  IoMic,
  IoMicOutline,
  IoSearch,
  IoSendOutline,
} from "react-icons/io5";
import { PiDiamondThin } from "react-icons/pi";
import { RiTelegram2Line, RiThreadsFill } from "react-icons/ri";
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
      marginTop={{ base: "60px", md: "100px" }}
      as={Stack}
      justifyContent={"center"}
      alignItems={"center"}
      width="100%"
      height={"350px"}
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
      <VStack height={"350px"} position={'absolute'} right={0} top={0} alignItems={'center'} justifyContent={'center'} pr={'25px'}>
        <IconButton icon={<BiSupport />} bgColor={'#3646B3'} borderRadius={'8px'} />
        <IconButton icon={<RiTelegram2Line />} bgColor={'#3646B3'} borderRadius={'8px'} />
        <IconButton icon={<RiThreadsFill />} bgColor={'#3646B3'} borderRadius={'8px'} />
        {/* <Box bgColor={'white'} borderRadius={'20px'}>
          <svg fill="#3646B3" width="25px" height="25px" color="white" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" stroke="#3646B3"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M5.968 23.942a6.624 6.624 0 0 1-2.332-.83c-1.62-.929-2.829-2.593-3.217-4.426-.151-.717-.17-1.623-.15-7.207C.288 5.47.274 5.78.56 4.79c.142-.493.537-1.34.823-1.767C2.438 1.453 3.99.445 5.913.08c.384-.073.94-.08 6.056-.08 6.251 0 6.045-.009 7.066.314a6.807 6.807 0 0 1 4.314 4.184c.33.937.346 1.087.369 3.555l.02 2.23-.391.268c-.558.381-1.29 1.06-2.316 2.15-1.182 1.256-2.376 2.42-2.982 2.907-1.309 1.051-2.508 1.651-3.726 1.864-.634.11-1.682.067-2.302-.095-.553-.144-.517-.168-.726.464a6.355 6.355 0 0 0-.318 1.546l-.031.407-.146-.03c-1.215-.241-2.419-1.285-2.884-2.5a3.583 3.583 0 0 1-.26-1.219l-.016-.34-.309-.284c-.644-.59-1.063-1.312-1.195-2.061-.212-1.193.34-2.542 1.538-3.756 1.264-1.283 3.127-2.29 4.953-2.68.658-.14 1.818-.177 2.403-.075 1.138.198 2.067.773 2.645 1.639.182.271.195.31.177.555a.812.812 0 0 1-.183.493c-.465.651-1.848 1.348-3.336 1.68-2.625.585-4.294-.142-4.033-1.759.026-.163.04-.304.031-.313-.032-.032-.293.104-.575.3-.479.334-.903.984-1.05 1.607-.036.156-.05.406-.034.65.02.331.053.454.192.736.092.186.275.45.408.589l.24.251-.096.122a4.845 4.845 0 0 0-.677 1.217 3.635 3.635 0 0 0-.105 1.815c.103.461.421 1.095.739 1.468.242.285.797.764.886.764.024 0 .044-.048.044-.106.001-.23.184-.973.326-1.327.423-1.058 1.351-1.96 2.82-2.74.245-.13.952-.47 1.572-.757 1.36-.63 2.103-1.015 2.511-1.305 1.176-.833 1.903-2.065 2.14-3.625.086-.57.086-1.634 0-2.207-.368-2.438-2.195-4.096-4.818-4.37-2.925-.307-6.648 1.953-8.942 5.427-1.116 1.69-1.87 3.565-2.187 5.443-.123.728-.169 2.08-.093 2.75.193 1.704.822 3.078 1.903 4.156a6.531 6.531 0 0 0 1.87 1.313c2.368 1.13 4.99 1.155 7.295.071.996-.469 1.974-1.196 3.023-2.25 1.02-1.025 1.71-1.88 3.592-4.458 1.04-1.423 1.864-2.368 2.272-2.605l.15-.086-.019 3.091c-.018 2.993-.022 3.107-.123 3.561-.6 2.678-2.54 4.636-5.195 5.242l-.468.107-5.775.01c-4.734.008-5.85-.002-6.19-.056z"></path></g></svg>
        </Box> */}
      </VStack>
      <HStack
        height={"500px"}
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
        >
          <Text
            fontSize={{ base: "35px", md: "45px" }}
            color={"white"}
            textAlign={{ base: "center", md: "center" }}
          >
            {t("home_parsa_header_title")}
          </Text>
          <HStack>
            <InputGroup
              height="74px"
              width={{ base: "381px", md: "1050px" }}
              my="20px"
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

              <Input
                ref={inputRef}
                borderRadius="13px"
                width={{ base: "381px", md: "100%" }}
                bgColor={isRecording ? "#29CCCC" : "#00000059"}
                height="74px"
                textIndent={"20px"}
                placeholder={isRecording ? t("listening") : t("search_among")}
                color="white"
                border="none"
                pl={isRecording ? "50px" : "12px"}
                _placeholder={{ color: "gray.300" }}
                {...register("search")}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleClickSearch();
                  }
                }}
              />

              <InputRightElement height="100%" ml="30px">
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
                      <IoSearch
                        fontSize={'30px'}
                        color="#29CCCC"
                        cursor="pointer"
                        onClick={(e) => handleClickSearch()}
                      />
                      {/* <PiDiamondThin
                        fontSize="20px"
                        color="#29CCCC"
                        cursor="pointer"
                        onClick={(e) => handleClickSemanticSearch()}
                      /> */}
                      <IoMic
                        fontSize={'30px'}
                        color="#29CCCC"
                        style={{ cursor: "pointer" }}
                        onClick={handleMicClick}
                      />
                    </>
                  )}
                </Flex>
              </InputRightElement>
            </InputGroup>
            <Button bgColor={'#29CCCC'} w={'206px'} height={'74px'} color={'white'} borderRadius="13px" rightIcon={<PiDiamondThin fontSize={'40px'} />}
              onClick={(e) => handleClickSemanticSearch()}>جستجوی معنایی</Button>
          </HStack>
          <HStack as={Center} justifyContent="center" w="50%">
            {siteData?.map((item, index) => (
              <React.Fragment key={index}>
                <VStack
                  bgColor={'#2A378CB2'}
                  borderRadius={'13px'}
                  spacing={0}
                  w={"132px"}
                  height={'65px'}
                  textAlign={'center'}
                  display={item?.size != breakpoint ? "flex" : "none"}
                  justifyContent={'space-between'}
                  padding={'5px'}
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
      </HStack >
    </Box >
  );
};

export default Header;
