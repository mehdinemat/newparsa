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
import { useTranslation } from "react-i18next";
import { IoIosArrowDown, IoIosMenu } from "react-icons/io";

const menuList = [
  {
    title: "سوال ها",
    icon: "/mobile/question.png",
    link: "/questions",
    t_title: "questions",
  },
  {
    title: "موضوعات",
    icon: "/mobile/folder.png",
    link: "/",
    t_title: "topics",
  },
  {
    title: "برچسب‌ها",
    icon: "/mobile/tag.png",
    link: "",
    t_title: "tags",
  },
  {
    title: "منابع",
    icon: "/mobile/inbox.png",
    link: "/",
    t_title: "resources",
  },
  {
    title: "مراجع",
    icon: "/mobile/user.png",
    link: "/references",
    t_title: "sources",
  },
  {
    title: "کاربران",
    icon: "/mobile/users.png",
    link: "references",
    t_title: "users",
  },
  {
    title: "محصولات",
    icon: "/mobile/box.png",
    link: "/products",
    t_title: "products",
  },
];

const MenuBar = () => {
  const { t } = useTranslation();

  const router = useRouter();
  const { locale } = router;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClickMenuLink = (link) => {
    router.push(link);
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
              <Image src="/questiongreen.png" w={"42px"} h={"56px"} />
              <Image src="/parsaw.png" w={"91px"} h={"37px"} />
            </HStack>
            <Text fontSize={"md"} fontWeight={"normal"} color={"white"}>
              {t("religious")}
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
                <HStack onClick={(e) => handleClickMenuLink(item?.link)}>
                  <Image
                    src={item?.icon}
                    color={"white"}
                    w={"32px"}
                    h={"32px"}
                  />
                  <Text fontSize={"md"}>{t(item?.t_title)}</Text>
                </HStack>
              ))}
              <Menu w={"100%"}>
                <HStack w={"100%"}>
                  <Image
                    src={"/mobile/globe.png"}
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
                      <Text fontSize={"sm"}>
                        {locale == "en"
                          ? t("header_english")
                          : locale == "fa"
                            ? t("header_persian")
                            : locale == "ar" && t("header_arabic")}
                      </Text>
                      <IoIosArrowDown />
                    </HStack>
                  </MenuButton>
                </HStack>
                <MenuList w={"100%"}>
                  <MenuItem
                    color={"black"}
                    onClick={(e) => router.push("/", "/", { locale: "en" })}
                  >
                    {t("header_english")}
                  </MenuItem>
                  <MenuItem
                    color={"black"}
                    onClick={(e) => router.push("/", "/", { locale: "ar" })}
                  >
                    {t("header_arabic")}
                  </MenuItem>
                  <MenuItem
                    color={"black"}
                    onClick={(e) => router.push("/", "/", { locale: "fa" })}
                  >
                    {t("header_persian")}
                  </MenuItem>
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
                  {t("ask_your_question")}
                </Button>
              </Stack>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <Text fontSize={"sm"}>{t("institute")}</Text>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default MenuBar;
