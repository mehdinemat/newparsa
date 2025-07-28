import {
  Avatar,
  Button,
  Card,
  HStack,
  IconButton,
  Image,
  Text,
  VStack
} from "@chakra-ui/react";
import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsReply } from "react-icons/bs";
import { FaQuestion } from "react-icons/fa";
import { IoPencil, IoPersonOutline } from "react-icons/io5";
import { RxExit } from "react-icons/rx";
import useSWR from "swr";

const menuList = [
  { title: "سوالات", icon: <IoPersonOutline />, link: "questions" },
  { title: "پاسخ ها", icon: <FaQuestion />, link: "answers" },
  { title: "دیدگاه ها", icon: <BsReply />, link: "comments" },
  { title: "پسند ها", icon: <BsReply />, link: "likes" },
  // { title: "حسنات", icon: <BsReply />, link: "users" },
];

const RightSidebar = () => {

  const { data: dataMe, isLoading: isLoadingMe } = useSWR(`user/client/me`)

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
    router.push(`/dashboard/${link}`);
  };

  const handleClickProfile = () => {
    router.replace('/dashboard/profile')
  }

  const handleClickFollowing = () => {
    router.push(`/dashboard/followings`)
  }
  const handleClickFollower = () => {
    router.push(`/dashboard/followers`)
  }

  return (
    <VStack
      w={"100%"}
      alignItems={"center"}
      border={"1px"}
      borderRadius={"15px"}
      borderColor={"gray.200"}
      padding={"10px"}
      pt={"10px"}
      bgColor={"#3646B3"}
      height={'calc( 100vh - 70px )'}
    >
      <Card bgColor={'#F7F7F71A'} height={'360px'} width={'100%'} borderRadius={'10px'} position={'relative'} as={VStack} cursor={'pointer'}>
        <IconButton icon={<IoPencil />} bgColor={'#3646B3'} position={'absolute'} top={'10px'} right={'10px'} height={'30px'} width={'30px'} />
        <Avatar height={'99px'} width={'99px'} mt={'30px'} onClick={e => handleClickProfile()} />
        <Image src="/start.png" position={'absolute'} top={'120px'} onClick={e => handleClickProfile()} />
        <Text fontWeight={'900'} fontSize={'15px'} color={'white'} mt={'20px'} onClick={e => handleClickProfile()} >{dataMe?.data?.[0]?.first_name} {dataMe?.data?.[0]?.last_name}</Text>
        <Text fontWeight={'300'} fontSize={'10px'} color={'white'} onClick={e => handleClickProfile()} >{dataMe?.data?.[0]?.email}</Text>
        <HStack w={'100%'} padding={'10px'}>
          <Button bgColor={'#3646B3'} fontSize={'10px'} w={'100%'} onClick={e => handleClickFollower()}>دنبال کننده‌ها</Button>
          <Button bgColor={'#3646B3'} fontSize={'10px'} w={'100%'} onClick={e => handleClickFollowing()}>دنبال شونده‌ها</Button>
        </HStack>
      </Card>
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
                fontWeight={"extrabold"}
                color={
                  getLastPathSegment(activePage) == item?.link
                    ? "#3646B3"
                    : "white"
                }
                fontSize={"10px"}
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
