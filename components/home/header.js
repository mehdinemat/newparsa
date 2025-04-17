import {
  Box,
  Center,
  Container,
  Divider,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Geist, Geist_Mono } from "next/font/google";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import CountUp from "react-countup";
import { IoMicOff, IoOptions } from "react-icons/io5";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


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
  },
  {
    title: "زبان",
    number: "3",
  },
];

const Header = ({ children }) => {
  const router = useRouter();

  return (
    <Box
      marginTop={{ base: '60px', md: "100px" }}
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
          <Text fontSize={{ base: '35px', md: "50px" }} color={"white"} textAlign={{ base: 'center', md: 'right' }} >
            پارسا شبکه اجتماعی پرسش و پاسخ دینی
          </Text>
          <InputGroup height="60px" width={{ base: '381px', md: "890px" }} my={"20px"}>
            <Input
              borderRadius={"10px"}
              width={{ base: '381px', md: "100%" }}
              bgColor="#2A378C"
              height="60px"
              placeholder="در میان هزاران پرسش و پاسخ جستجو کنید..."
              color="white"
              border={"none"}
              _placeholder={{ color: "gray.300" }}
            />
            <InputRightElement height="100%" ml="20px">
              <Flex align="center" gap="2">
                <IoOptions fontSize="20px" color="#29CCCC" />
                <IoMicOff fontSize="20px" color="#29CCCC" />
              </Flex>
            </InputRightElement>
          </InputGroup>

          <HStack as={Center} justifyContent="center" w="50%">
            {siteData?.map((item, index) => (
              <React.Fragment key={index}>
                <VStack spacing={0} w={"100%"}>
                  <Text color="white">{item?.title}</Text>

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
                          <Text color="white" fontWeight="thin" ref={countUpRef}>
                            {item?.number}
                          </Text>
                        </Stack>
                      );
                    }}
                  </CountUp>

                </VStack>

                {/* Only add divider if it's not the last item */}
                {index !== siteData.length - 1 && (
                  <Divider
                    orientation="vertical"
                    h="30px"
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
