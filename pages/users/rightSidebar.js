import {
  Avatar,
  Box,
  Divider,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsReply } from "react-icons/bs";
import { CiFileOn } from "react-icons/ci";
import { FaQuestion } from "react-icons/fa";
import { GiGlobeRing } from "react-icons/gi";
import {
  IoPeopleOutline,
  IoPersonOutline,
  IoSettingsOutline,
} from "react-icons/io5";

const menuList = [
  { title: "پروفایل", icon: <IoPersonOutline />, link: "profile" },
  { title: "پرسش‌ها", icon: <FaQuestion />, link: "questions" },
  { title: "پاسخ‌ها", icon: <BsReply />, link: "answers" },
  { title: "نوشته‌ها", icon: <CiFileOn />, link: "profile" },
  { title: "حسنات", icon: <GiGlobeRing />, link: "goods" },
  { title: "دوستان", icon: <IoPeopleOutline />, link: "friends" },
  { title: "حساب کاربری", icon: <IoSettingsOutline />, link: "account" },
];

const RightSidebar = ({
  user: { first_name, last_name, username, ...user },
}) => {
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
      justifyContent={"start"}
      border={"1px"}
      borderRadius={"15px"}
      borderColor={"gray.200"}
      padding={"20px"}
    >
      <Avatar />
      <Text fontWeight={"bold"} fontSize={"20px"}>
        {first_name} {last_name}
      </Text>
      <Text fontSize={"md"} color={"gray.500"}>
        {username}
      </Text>
      {/* <Text fontSize={"sm"}>۱۲ سال سابقه عضویت در پارسا</Text>
      <Text fontSize={"sm"}>آخرین فعالیت: ۳ روز پیش</Text> */}
    </VStack>
  );
};

export default RightSidebar;
