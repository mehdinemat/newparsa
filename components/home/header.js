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
  Stack,
  Text,
  useBreakpoint,
  VStack,
} from "@chakra-ui/react";
import { Geist, Geist_Mono } from "next/font/google";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { IoClose, IoMic, IoMicOff, IoMicOutline, IoOptions } from "react-icons/io5";
import { motion } from "framer-motion";

const siteData = [
  {
    title: "سوال",
    number: "234",
  },
  {
    title: "برچسب",
    number: "52353",
  },
  {
    title: "مرجع",
    number: "43",
  },
  {
    title: "منبع",
    number: "2",
    size: "base",
  },
  {
    title: "زبان",
    number: "3",
    size: "base",
  },
];

const MotionBox = motion(Box);


const Header = ({ children }) => {
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
        const audioBlob = new Blob([e.data], { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        console.log("Audio URL:", audioUrl);
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
      height={"500px"}
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
            textAlign={{ base: "center", md: "right" }}
          >
            پارسا شبکه اجتماعی پرسش و پاسخ دینی
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
        textIndent={'20px'}
        placeholder={isRecording ? 'درحال شنیدن...':"در میان هزاران پرسش و پاسخ جستجو کنید..."}
        color="white"
        border="none"
        pl={isRecording ? "50px" : "12px"} // Padding when mic moves inside
        _placeholder={{ color: "gray.300" }}
      />

      <InputRightElement height="100%" ml="20px">
        <Flex align="center" gap="2">
          {isRecording ? (
            <IoClose
              fontSize="16px"
              color="white"
              style={{ cursor: "pointer" }}
              onClick={handleCancelRecording}
            />
          ) : (
            <>
              <IoOptions fontSize="20px" color="#29CCCC" />
              <IoMic
                fontSize="20px"
                color="#29CCCC"
                style={{ cursor: "pointer" }}
                onClick={handleMicClick}
              />
            </>
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
                    end={item?.number}
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
                  <Text color="white" fontSize={{base:'20px' , md:'22px'}}>{item?.title}</Text>
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
