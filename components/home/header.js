import {
  Box,
  Center,
  Container,
  Divider,
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
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { useForm } from "react-hook-form";
import {
  IoClose,
  IoMic,
  IoMicOutline,
  IoOptions,
  IoSearch,
} from "react-icons/io5";
import { RiSearchEyeLine } from "react-icons/ri";

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

const Header = ({
  data,
  t,
  register,
  handleClickSearch,
  isLoadingQuestionSearch,
  handleClickSemanticSearch,
  watchSearch,
  resetSearch,
}) => {
  const router = useRouter();

  const [isRecording, setIsRecording] = useState(false);
  const inputRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const breakpoint = useBreakpoint();

  const handleMicClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.start();
      setIsRecording(true);

      mediaRecorderRef.current.ondataavailable = (e) => {
        const audioBlob = new Blob([e.data], { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);
      };
    } catch (error) {
      console.error("Microphone access denied:", error);
    }
  };

  const handleCancelRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  return (
    <Box
      marginTop={{ base: "60px", md: "100px" }}
      as={Stack}
      justifyContent={"center"}
      alignItems={"center"}
      width="100%"
      height={"450px"}
      bg={"#3646B3"}
      p={2}
      px={4}
      borderBottom={"1px"}
      borderBottomColor={"gray.200"}
      bgImage={"./homeheader.png"}
      bgSize="cover" // 👈 this makes it cover the container
      bgRepeat="no-repeat"
      bgPosition="center"
    >
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
            fontSize={{ base: "35px", md: "50px" }}
            color={"white"}
            textAlign={{ base: "center", md: "center" }}
          >
            {t("home_parsa_header_title")}
          </Text>
          <InputGroup
            height="60px"
            width={{ base: "381px", md: "890px" }}
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
              borderRadius="10px"
              width={{ base: "381px", md: "100%" }}
              bgColor={isRecording ? "#29CCCC" : "#2A378C"}
              height="60px"
              textIndent={"20px"}
              placeholder={isRecording ? t("listening") : t("search_among")}
              color="white"
              border="none"
              pl={isRecording ? "50px" : "12px"} // Padding when mic moves inside
              _placeholder={{ color: "gray.300" }}
              {...register("search")}
            />

            <InputRightElement height="100%" ml="30px">
              <Flex align="center" gap="2">
                {isRecording ? (
                  <IoClose
                    fontSize="16px"
                    color="white"
                    style={{ cursor: "pointer" }}
                    onClick={handleCancelRecording}
                  />
                ) : !isLoadingQuestionSearch ? (
                  <>
                    <IoSearch
                      fontSize="20px"
                      color="#29CCCC"
                      cursor={"pointer"}
                      onClick={(e) => handleClickSearch()}
                    />
                    <RiSearchEyeLine
                      fontSize="20px"
                      color="#29CCCC"
                      onClick={(e) => handleClickSemanticSearch()}
                      cursor={"pointer"}
                    />
                    {watchSearch("search") ? (
                      <IoClose
                        fontSize="16px"
                        color="white"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => resetSearch()}
                      />
                    ) : (
                      <IoMic
                        fontSize="20px"
                        color="#29CCCC"
                        style={{ cursor: "pointer" }}
                        onClick={handleMicClick}
                      />
                    )}
                  </>
                ) : (
                  <Spinner color="white" />
                )}
              </Flex>
            </InputRightElement>
          </InputGroup>
          <HStack as={Center} justifyContent="center" w="50%">
            {siteData?.map((item, index) => (
              <React.Fragment key={index}>
                <VStack
                  spacing={0}
                  w={"136px"}
                  display={item?.size != breakpoint ? "flex" : "none"}
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
                            fontWeight="thin"
                            ref={countUpRef}
                            fontSize={{ base: "20px", md: "22px" }}
                          >
                            {item?.number}
                          </Text>
                        </Stack>
                      );
                    }}
                  </CountUp>
                  <Text color="white" fontSize={{ base: "20px", md: "22px" }}>
                    {t(item?.t_title)}
                  </Text>
                </VStack>

                {/* Only add divider if it's not the last item */}
                {index !== siteData.length - 1 && (
                  <Divider
                    display={item?.size != breakpoint ? "flex" : "none"}
                    orientation="vertical"
                    h="50px"
                    borderColor="gray.300"
                  />
                )}
              </React.Fragment>
            ))}
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default Header;
