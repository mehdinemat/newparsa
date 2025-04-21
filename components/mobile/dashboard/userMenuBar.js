import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BsReply } from "react-icons/bs";
import { CiFileOn } from "react-icons/ci";
import { FaQuestion } from "react-icons/fa";
import { GiGlobeRing } from "react-icons/gi";
import { IoIosArrowDown, IoIosMenu } from "react-icons/io";
import { IoPeopleOutline, IoPersonOutline, IoSettingsOutline } from "react-icons/io5";

// const menuList = [
//   {
//     title: "سؤال‌ها",
//     icon: "./mobile/question.png",
//     link: "/questions",
//   },
//   {
//     title: "موضوعات",
//     icon: "./mobile/folder.png",
//     link: "/",
//   },
//   {
//     title: "برچسب‌ها",
//     icon: "./mobile/tag.png",
//     link: "",
//   },
//   {
//     title: "منابع",
//     icon: "./mobile/inbox.png",
//     link: "/",
//   },
//   {
//     title: "مراجع",
//     icon: "./mobile/user.png",
//     link: "/references",
//   },
//   {
//     title: "کاربران",
//     icon: "./mobile/users.png",
//     link: "references",
//   },
//   {
//     title: "محصولات",
//     icon: "./mobile/box.png",
//     link: "/products",
//   },
// ];

const menuList = [
  { title: 'پروفایل', icon: <IoPersonOutline />, link: 'profile' },
  { title: 'پرسش‌ها', icon: <FaQuestion />, link: 'questions' },
  { title: 'پاسخ‌ها', icon: <BsReply />, link: 'answers' },
  { title: 'نوشته‌ها', icon: <CiFileOn />, link: 'profile' },
  { title: 'حسنات', icon: <GiGlobeRing />, link: 'goods' },
  { title: 'دوستان', icon: <IoPeopleOutline />, link: 'friends' },
  { title: 'حساب کاربری', icon: <IoSettingsOutline />, link: 'account' },
]

const UserMenuBar = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClickMenuLink = (link) => {
    router.replace(link);
  };

  return (
    <Box display={{ base: "flex", md: "none" }}>
      <IconButton
        onClick={onOpen}
        icon={<IoIosMenu color="#29CCCC" fontSize={"30px"} />}
      />
      <Drawer placement="right" onClose={onClose} isOpen={isOpen} size={"xs"}>
        <DrawerOverlay />
        <DrawerContent bg="#3646B3" color="white">
          <DrawerHeader
            as={VStack}
            w={"100%"}
            justifyContent={"center"}
            borderBottomWidth="1px"
            borderBottomColor="rgba(255, 255, 255, 0.1)"
            py={"50px"}
          >
            <HStack>
              <Image src="../../questiongreen.png" w={"42px"} h={"56px"} />
              <Image src="../../parsaw.png" w={"91px"} h={"37px"} />
            </HStack>
            <Text fontSize={"md"} fontWeight={"normal"} color={"white"}>
              پنل کاربری
            </Text>
          </DrawerHeader>
          <DrawerBody
            borderBottomWidth="1px"
            w={"100%"}
            borderBottomColor="rgba(255, 255, 255, 0.1)"
          >
            <VStack
              align="start"
              spacing={6}
              mt={"20px"}
              right={"10px"}
              w={"100%"}
              height={"calc( 100% - 50px )"}
            >
              {menuList?.map((item) => (
                <HStack onClick={(e) => handleClickMenuLink(item?.link)} alignItems={'center'}>
                  <IconButton icon={item?.icon} fontSize={'20px'} />
                  <Text fontSize={"md"}>{item?.title}</Text>
                </HStack>
              ))}
              <Menu w={"100%"}>
                <HStack w={"100%"}>
                  <Image
                    src={"../../mobile/globe.png"}
                    color={"white"}
                    w={"32px"}
                    h={"32px"}
                  />
                  <MenuButton
                    pl={4}
                    py={2}
                    transition="all 0.2s"
                    w={"100%"}
                    bgColor={"#3646B3"}
                  >
                    <HStack w={"100%"} justifyContent={"space-between"}>
                      <Text>فارسی</Text>
                      <IoIosArrowDown />
                    </HStack>
                  </MenuButton>
                </HStack>
                <MenuList w={"100%"}>
                  <MenuItem color={"black"}>انگلیسی</MenuItem>
                  <MenuItem color={"black"}>عربی</MenuItem>
                </MenuList>
              </Menu>
              <Stack
                w={"100%"}
                alignItems={"center"}
                height={"100%"}
                justifyContent={"end"}
              >
                <Button
                  mt={"40px"}
                  width={"150px"}
                  height={"45px"}
                  bgColor={"#F9C96D"}
                  color={"black"}
                  fontWeight={"normal"}
                  borderRadius={"10px"}
                >
                  سوال خود را بپرسید
                </Button>
              </Stack>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <Text fontSize={"sm"}>مؤسسه هوش مصنوعی و تمدن اسلامی (همتا)</Text>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default UserMenuBar;
