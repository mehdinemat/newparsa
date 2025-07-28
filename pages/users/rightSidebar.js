import { baseUrl } from "@/components/lib/api";
import {
  Avatar,
  HStack,
  Image,
  Text,
  VStack
} from "@chakra-ui/react";
import axios from "axios";
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
import useSWRMutation from "swr/mutation";

const menuList = [
  { title: "پروفایل", icon: <IoPersonOutline />, link: "profile" },
  { title: "پرسش‌ها", icon: <FaQuestion />, link: "questions" },
  { title: "پاسخ‌ها", icon: <BsReply />, link: "answers" },
  { title: "نوشته‌ها", icon: <CiFileOn />, link: "profile" },
  { title: "حسنات", icon: <GiGlobeRing />, link: "goods" },
  { title: "دوستان", icon: <IoPeopleOutline />, link: "friends" },
  { title: "حساب کاربری", icon: <IoSettingsOutline />, link: "account" },
];

const patchRequest = (url, { arg: { id, ...data } }) => {
  return axios.patch(baseUrl + url + `${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const RightSidebar = ({
  user: { first_name, last_name, username, id, is_following, ...user },
  mutate,
}) => {
  const { trigger: triggerUserFollow, isLoading: isLoadingUserFollow, isMutating: isMutatingFollow } =
    useSWRMutation(`user/client/flow-action/`, patchRequest, {
      onSuccess: () => {
        mutate();
      },
    });

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
    >
      <HStack alignItems={'center'}>
        <Avatar borderRadius={'10px'} w={'297px'} h={'297px'} />
        {/* {is_following ? (
          <Button
            bgColor={"#29CCCC"}
            color={"white"}
            _hover={{ bgColor: "white", color: "#29CCCC" }}
            variant={"outline"}
            onClick={(e) => {
              triggerUserFollow({ id: id });
            }}
          >
            آنفالو کردن
          </Button>
        ) : (
          <Button
            color={"#29CCCC"}
            _hover={{ bgColor: "#29CCCC", color: "white" }}
            variant={"outline"}
            onClick={(e) => {
              triggerUserFollow({ id: id });
            }}
            isLoading={isMutatingFollow}
          >
            دنبال کردن
          </Button>
        )} */}
        <VStack w={'100%'} alignItems={'start'} mr={'30px'}>
          <HStack>
            <Image src="/start.png" />
            <Text fontWeight={"bold"} fontSize={"40px"}>
              {first_name || ""}{last_name || ""}
            </Text>
          </HStack>
          <Text fontWeight={"extrabold"} fontSize={"20px"} >
            مشخصاتبایو
          </Text>
          <Text fontWeight={"400"} fontSize={"18px"} color={'#333333'}>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.          </Text>
        </VStack>
        {/* <Text fontSize={"md"} color={"gray.500"}>
          {username}
        </Text> */}
      </HStack>

      {/* <Text fontSize={"sm"}>۱۲ سال سابقه عضویت در پارسا</Text>
      <Text fontSize={"sm"}>آخرین فعالیت: ۳ روز پیش</Text> */}
    </VStack>
  );
};

export default RightSidebar;
