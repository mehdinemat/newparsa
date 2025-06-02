import {
  Box,
  Divider,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsReply } from "react-icons/bs";
import { FaQuestion } from "react-icons/fa";
import { IoExit, IoPersonOutline } from "react-icons/io5";
import { RxExit } from "react-icons/rx";

const menuList = [
  { title: "پروفایل", icon: <IoPersonOutline />, link: "profile" },
  { title: "پرسش‌ها", icon: <FaQuestion />, link: "questions" },
  { title: "پاسخ‌ها", icon: <BsReply />, link: "answers" },
];

const RightSidebar = () => {
  const [activePage, setActivePage] = useState("");
  const router = useRouter();

  useEffect(() => {
    setActivePage(router.asPath);
  }, [router]);

  const getLastPathSegment = (path) => {
    const segments = path.split("/").filter(Boolean);
    return _.last(segments);
  };

  const handleClickLink = (link) => {
    router.push(link);
  };

  return (
    <VStack
      w={"100%"}
      alignItems={"center"}
      border={"1px"}
      borderRadius={"15px"}
      borderColor={"gray.200"}
      padding={"20px"}
      pt={"14px"}
      bgColor={"#3646B3"}
      height={'calc( 100vh - 70px )'}
    >
      <Image
        src="/dashboard/parsa_logo_admin.png"
        width={"139px"}
        height={"57px"}
      />
      {/* <Text fontWeight={'bold'} fontSize={'20px'}>حسن الماسی</Text>
      <Text fontSize={'sm'}>مدیر</Text> */}
      {/* <Text fontSize={'sm'}>آخرین فعالیت: ۳ روز پیش</Text> */}
      {/* <Divider my={'20px'} /> */}
      <VStack
        w={"100%"}
        alignItems={"start"}
        padding={"0px"}
        mt={"24px"}
        height={"100%"}
        justifyContent={"space-between"}
      >
        <VStack w={"100%"}>
          {menuList?.map((item, index) => (
            <HStack
              position={"relative"}
              cursor={"pointer"}
              onClick={(e) => handleClickLink(item?.link)}
              bgColor={
                getLastPathSegment(activePage) == item?.link
                  ? "white"
                  : "#F7F7F71A"
              }
              w={"100%"}
              borderRadius={"10px"}
            >
              {console.log(getLastPathSegment(activePage) == item?.link)}
              {
                <Box
                  w={"2px"}
                  height={"40px"}
                  bgColor={
                    getLastPathSegment(activePage) == item?.link
                      ? "#29CCCC"
                      : ""
                  }
                  right={"-21px"}
                  position={"absolute"}
                ></Box>
              }
              <IconButton
                icon={item?.icon}
                color={
                  getLastPathSegment(activePage) == item?.link
                    ? "#3646B3"
                    : "white"
                }
                fontSize={"20px"}
              />
              <Text
                fontWeight={"800"}
                color={
                  getLastPathSegment(activePage) == item?.link
                    ? "#3646B3"
                    : "white"
                }
                fontSize={"18px"}
              >
                {item?.title}
              </Text>
            </HStack>
          ))}
        </VStack>
        <HStack
          position={"relative"}
          cursor={"pointer"}
          // onClick={(e) => handleClickLink(item?.link)}
          w={"100%"}
          borderRadius={"10px"}
          bgColor={"#F7F7F71A"}
          justifyContent={"center"}
          gap={0}
        >
          <IconButton icon={<RxExit />} fontSize={"20px"} />
          <Text
            color={"white"}
            textAlign={"center"}
            fontWeight={"800"}
            fontSize={"10px"}
          >
            خروج از حساب
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default RightSidebar;
