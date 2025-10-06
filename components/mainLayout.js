import {
  Avatar,
  Box,
  Button,
  chakra,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  Text,
  UnorderedList,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { CiSearch } from "react-icons/ci";
import { FaTelegram } from "react-icons/fa";
import { IoLogoInstagram, IoLogoTwitter } from "react-icons/io";
import { IoCall, IoLocation } from "react-icons/io5";
import { StringParam, useQueryParams, withDefault } from "use-query-params";

const menuList = [
  // {
  //   title: "برچسب ها",
  //   t_title: "header_tags",
  // },
  {
    title: "کاربران",
    t_title: "header_users",
    link: "users",
  },
  {
    title: "محصولات",
    t_title: "header_products",
    link: "products",
  },
  // {
  //   title: "دیدگاه ها",
  //   link: "users",
  //   t_title: "header_users",
  // },
  // {
  //   title: "کاربران",
  //   link: "products",
  //   t_title: "header_products",
  // },
];

// const menuList = [
//   {
//     title: "داشبورد",
//     t_title: "header_dashboard",
//   },
//   {
//     title: "سوالات",
//     t_title: "header_questions",
//   },
//   {
//     title: "پاسخ ها",
//     t_title: "header_answers",
//   },
//   {
//     title: "دیدگاه ها",
//     link: "users",
//     t_title: "header_users",
//   },
//   {
//     title: "کاربران",
//     link: "products",
//     t_title: "header_products",
//   },
// ];

const MotionMenuList = chakra(motion(MenuList));


const MainLayout = ({
  children,
  questionsRef,
  menuDefault = false,
  register,
  watchSearch,
}) => {
  const { t } = useTranslation();
  const [isOpen2, setIsOpen2] = useState(false);

  const [showMenu, setShowMenu] = useState(false);

  const router = useRouter();
  const { locale, asPath } = router;

  const [filters, setFilters] = useQueryParams({
    search: withDefault(StringParam, ""),
  });

  const [search, setSearch] = useState("");

  const [hideHeaderButton, setHideHeaderButton] = useState(false);
  const scrollContainerRef = useRef(null);

  const [activePath, setActivePath] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showInput, setShowInput] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(false);
  const inputRef = useRef(null);


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const sidebar = document.getElementById("rightSidebar");
    const sidebarOffsetTop = sidebar?.offsetTop;

    if (scrollTop >= sidebarOffsetTop) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  const handleClickSearch = () => {
    router.push(
      `/result_search?search=${watchSearch("search")}&search_type=search`
    );
  };

  useEffect(() => {
    setActivePath(
      _.includes(router.asPath.toLowerCase(), "admin_dashboard")
        ? 2
        : _.includes(router.asPath.toLowerCase(), "dashboard")
          ? 1
          : 0
    );
  }, [router]);

  useEffect(() => {
    setIsUserLogin(!!localStorage.getItem("token"));
  }, []);

  const handleFooterLink = (link) => {
    router.push(link);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const screenHeight = window.innerHeight; // 👈 user’s screen height
    const handleScroll = () => {
      const scrollY = container.scrollTop;

      setHideHeaderButton(scrollY >= screenHeight * 0.4);

      setShowMenu(scrollY >= screenHeight);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const handleExit = () => {
    localStorage.removeItem("token");
    router.replace("/");
  };

  useEffect(() => {
    setSearch(filters?.search);
  }, [filters?.search]);

  const handleProfileLink = () => {
    router.push("/dashboard/profile");
  };

  return (
    <VStack
      minHeight="100vh"
      w={"100%"}
      alignItems={"start"}
      gap={0}
      position={"relative"}
    >
      {/* header */}
      {(showMenu || menuDefault) && (
        <Box
          as={Stack}
          position="fixed" // 👈 Make it fixed
          top={0}
          left={0}
          zIndex={999} // 👈 Ensure it stays on top
          width="100%"
          height={{ base: "60px", md: "80px" }}
          alignItems={"center"}
          justifyContent={"center"}
          bg="#FFFFFF80" // 👈 semi-transparent background
          backdropFilter="blur(38.2px)" // 👈 blur effect
          p={2}
          px={{ base: 0, mode: 4 }}
        >
          <HStack
            maxW="container.xl"
            justifyContent={"space-between"}
            w={"100%"}
          >
            <HStack>
              <Image
                src="/headerparsalogo2.png"
                width={{ base: "16px", md: "29px" }}
            height={{ base: "23px", md: "42px" }}
                ml={"5px"}
                onClick={(e) => router.push("/")}
                cursor={"pointer"}
              />
              <Image
                src="/headerlogo2.png"
                width={{ base: "56px", md: "100px" }}
                height={{ base: "23px", md: "41px" }}
                onClick={(e) => router.push("/")}
                cursor={"pointer"}
              />
            </HStack>
            <HStack>
              <Box height="60px" display="flex" alignItems="center" ml={"0px"}>
                {!showInput ? (
                  <Icon
                  as={CiSearch}
                    color={"#3646B3"}
                    fontSize={{ base: "20px", md: "29px" }}
                    style={{ marginLeft: "20px", cursor: "pointer" }}
                    onClick={() => setShowInput(true)}
                  />
                ) : (
                  <InputGroup width="490px" height="60px">
                    <Input
                      border="1px"
                      borderColor="#3646B366"
                      height="60px"
                      width="490px"
                      placeholder="جستجو..."
                      bg="white"
                      borderRadius="10px"
                      {...register("search")}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleClickSearch();
                        }
                      }}
                      _focus={{ borderColor: "blue.400" }}
                    />
                    <InputRightElement height="60px" ml={"16px"}>
                      <Icon
                      as={CiSearch}
                        cursor="pointer"
                        onClick={handleClickSearch}
                        fontSize={{ base: "20px", md: "30px" }}
                        color="#3646B3"
                      />
                    </InputRightElement>
                  </InputGroup>
                )}
              </Box>
              {!isUserLogin ? (
                <HStack
                  cursor="pointer"
                  onClick={() => router.push("/login")}
                  role="group" // 👈 important: allows child hover detection
                  _hover={{ bgColor: "#3646B31A", width: "173px" }}
                  alignItems={"center"}
                  justifyContent={"center"}
                  height={"60px"}
                  width={"fit-content"}
                  borderRadius={"15px"}
                >
                  <Text
                    fontFamily="iransans"
                    fontWeight="500"
                    fontSize="20px"
                    color="#3646B3"
                    display={"none"} // hidden initially
                    transform="translateX(-10px)" // slight left offset
                    transition="all 0.3s ease"
                    _groupHover={{
                      display: "flex",
                      transform: "translateX(0)", // slide in
                    }}
                  >
                    {t("log_sub")}
                  </Text>

                  <Image
                    src="/headerpersonlogo.png"
                    height={{ base: "15px", md: "29px" }} width={{ base: "15px", md: "28px" }}
                  />
                </HStack>
              ) : (
                <Avatar fontSize={"46px"} />
              )}

              <Menu isOpen={isOpen2} onOpen={() => setIsOpen2(true)} onClose={() => setIsOpen2(false)}>
                <MenuButton as={Button}>
                  <Image src="/headermenu.png" height={{ base: "17px", md: "29px" }} width={{ base: "17px", md: "28px" }} mr={{ base: "5px", md: "20px" }} />
                </MenuButton>

                <AnimatePresence>
                  {isOpen2 && (
                    <MotionMenuList
                      // 👇 animation
                      initial={{ opacity: 0, height: '0px' }}
                      animate={{ opacity: 1, height: 'fit-content' }}
                      exit={{ opacity: 0, height: '0px' }}
                      transition={{ duration: 1.6, ease: "easeInOut" }}
                      // 👇 your original Chakra UI props
                      bgColor={"#EBEDF8E5"}
                      padding={"12px"}
                      w={"237px"}
                      h={"289px"}
                      backdropFilter="blur(27.6px)"
                      boxShadow={`
              0px 14px 30px 0px #0000001A,
              0px 54px 54px 0px #00000017,
              0px 122px 73px 0px #0000000D,
              0px 216px 86px 0px #00000003,
              0px 338px 95px 0px #00000000
            `}
                      borderRadius={"30px"}
                    >
                      <MenuItem
                        _hover={{ bgColor: "#3646B333" }}
                        borderRadius="15px"
                        bgColor="#3646B30D"
                        my="5px"
                        h="35px"
                        onClick={() => handleProfileLink()}
                      >
                        {isUserLogin ? 'پروفایل' : 'ورود؟ثبت‌نام'}
                      </MenuItem>
                      <MenuItem
                        _hover={{ bgColor: "#3646B333" }}
                        borderRadius="15px"
                        bgColor="#3646B30D"
                        my="5px"
                        h="35px"
                      >
                        منابع و مراجع
                      </MenuItem>
                      <MenuItem
                        _hover={{ bgColor: "#3646B333" }}
                        borderRadius="15px"
                        bgColor="#3646B30D"
                        my="5px"
                        h="35px"
                      >
                        اخبار
                      </MenuItem>
                      <MenuItem
                        _hover={{ bgColor: "#3646B333" }}
                        borderRadius="15px"
                        bgColor="#3646B30D"
                        my="5px"
                        h="35px"
                      >
                        کاربران
                      </MenuItem>
                      <MenuItem
                        _hover={{ bgColor: "#3646B333" }}
                        borderRadius="15px"
                        bgColor="#3646B30D"
                        my="5px"
                        h="35px"
                      >
                        پشتیبانی و راه ارتباطی
                      </MenuItem>
                      {isUserLogin && <MenuItem
                        _hover={{ bgColor: "#3646B333" }}
                        borderRadius="15px"
                        bgColor="#3646B30D"
                        my="5px"
                        h="35px"
                        onClick={() => handleExit()}
                      >
                        خروج از حساب کاربری
                      </MenuItem>}
                    </MotionMenuList>
                  )}
                </AnimatePresence>
              </Menu>
            </HStack>
          </HStack>
        </Box>
      )}
      {/* header */}
      <HStack
        height={"calc( 100vh )"}
        w={"100%"}
        gap={0}
        alignItems={"start"}
        overflowY={"scroll"}
        ref={scrollContainerRef}
        scrollSnapType="y mandatory"
      >
        {/* Main content area */}
        <VStack height={"calc( 100vh )"} w={"100%"} gap={0}>
          {children}
          <Stack
            w={"100%"}
            bg="#F7F7F7"
            alignItems={"center"}
            scrollSnapAlign="start"
            mt={'100px'}
          >
            <Box
              maxW="container.xl"
              as="footer"
              textAlign="center"
              bg="#F7F7F7"
              w="100%"
              alignItems={"center"}
              justifyContent={"center"}
              mx="auto"
              p={"20px"}
              pt={"50px"}
              pb={"30px"}
            >
              <Stack
                direction={{ base: "column", md: "row" }}
                height={"100%"}
                alignItems={"start"}
                justifyContent={"space-between"}
                gap={"40px"}
              >
                <VStack
                  alignItems={"start"}
                  gap={"20px"}
                  height={"100%"}
                  w={"100%"}
                >
                 <Flex flexDir={{base:'row' , md:'column'}} gap={'10px'} alignItems={'center'}>
                 <Image src="/question.png" width={"51px"} height={"72px"} />
                  <Image
                    src="/parsaheader.png"
                    width={"118px"}
                    height={"48px"}
                  />
                 </Flex>
                  <Text
                    w={"326px"}
                    fontSize={"16px"}
                    textAlign={"justify"}
                    color={"#333333"}
                    letterSpacing={"-3%"}
                    width={{base:'100%' , md:'fit-content'}}
                  >
                    {t("footer_parsa_info")}
                  </Text>
                </VStack>

                <VStack w={"100%"} height={"100%"}>
                  <VStack
                    alignItems={"start"}
                    gap={"20px"}
                    height={"100%"}
                    w={"100%"}
                  >
                    <Text
                      color={"#3646B3"}
                      fontSize={"22px"}
                      fontWeight={"bold"}
                      fontFamily={"morabba"}
                    >
                      {t("parsa")}
                    </Text>
                    <UnorderedList
                      width={"100%"}
                      display="grid"
                      gridTemplateColumns="repeat(2, 1fr)" // 🔥 two columns
                      gap="10px" // spacing between items
                      textAlign="start"
                      sx={{
                        li: {
                          color: "black",
                          "::marker": {
                            color: "#29CCCC", // custom bullet color
                          },
                        },
                      }}
                    >
                      <ListItem
                        cursor="pointer"
                        onClick={() => handleFooterLink("/")}
                      >
                        {t("home")}
                      </ListItem>
                      <ListItem
                        cursor="pointer"
                        onClick={() => handleFooterLink("/")}
                      >
                        کاربران
                      </ListItem>
                      <ListItem
                        cursor="pointer"
                        onClick={() => handleFooterLink("/")}
                      >
                        منابع و مراجع
                      </ListItem>
                      <ListItem
                        cursor="pointer"
                        onClick={() => handleFooterLink("/")}
                      >
                        اخبار
                      </ListItem>
                      <ListItem
                        cursor="pointer"
                        onClick={() => handleFooterLink("/aboutus")}
                      >
                        {t("about_us")}
                      </ListItem>
                      {/* add more items */}
                    </UnorderedList>
                  </VStack>
                  <Flex flexDir={{base:'column' , md:'row'}}
                    alignItems={"start"}
                    justifyContent={"start"}
                    w={"100%"}
                    mb={{base:'10px', md:'none'}}
                  >
                    <Text
                      color={"#3646B3"}
                      fontSize={"22px"}
                      fontWeight={"bold"}
                      fontFamily={"morabba"}
                      width={"fit-content"}
                      mb={{base:'10px', md:'none'}}
                    >
                      {t("social_media")}
                    </Text>
                    <HStack gap={"20px"}>
                      <IconButton
                        icon={
                          <IoLogoTwitter color="#29CCCC" fontSize={"20px"} />
                        }
                        boxShadow={`
                        0px 2px 4px 0px #0000000D,
                        0px 8px 8px 0px #0000000A,
                        0px 18px 11px 0px #00000008,
                        0px 32px 13px 0px #00000003,
                        0px 50px 14px 0px #00000000
                      `}
                      />
                      <IconButton
                        icon={
                          <IoLogoInstagram color="#29CCCC" fontSize={"20px"} />
                        }
                        boxShadow={`
                        0px 2px 4px 0px #0000000D,
                        0px 8px 8px 0px #0000000A,
                        0px 18px 11px 0px #00000008,
                        0px 32px 13px 0px #00000003,
                        0px 50px 14px 0px #00000000
                      `}
                      />
                      <IconButton
                        icon={<FaTelegram color="#29CCCC" fontSize={"20px"} />}
                        boxShadow={`
                        0px 2px 4px 0px #0000000D,
                        0px 8px 8px 0px #0000000A,
                        0px 18px 11px 0px #00000008,
                        0px 32px 13px 0px #00000003,
                        0px 50px 14px 0px #00000000
                      `}
                      />
                    </HStack>
                  </Flex>
                </VStack>

                <VStack
                  alignItems={"start"}
                  gap={"20px"}
                  height={"fit-content"}
                  w={"fit-content"}
                  minW={"348px"}
                  border={"1px"}
                  borderColor={"#3646B3"}
                  borderRadius={"15px"}
                  position={"relative"}
                  padding={"20px"}
                >
                  <Text
                    color={"#3646B3"}
                    bgColor={"#F7F7F7"}
                    px={"10px"}
                    fontSize={"22px"}
                    fontWeight={"700"}
                    fontFamily={"morabba"}
                    position={"absolute"}
                    top={"-20px"}
                    right={"12px"}
                  >
                    پشتیبانی و راه ارتباطی
                  </Text>
                  <HStack alignItems={"center"} textAlign={"start"} mt={"20px"}>
                    <IconButton
                      icon={<IoLocation color="#29CCCC" fontSize={"20px"} />}
                    />
                    <Text fontSize={"18px"}>0253 222 33 44</Text>
                  </HStack>
                  <HStack>
                    <IconButton
                      icon={<IoCall color="#29CCCC" fontSize={"20px"} />}
                    />
                    <Text fontSize={"18px"}>ParsaQa@info.com</Text>
                  </HStack>

                  <Grid
                    templateColumns={{ base: "repeat(2, 1fr)" }}
                    bgColor={"#3646B333"}
                    height={"46px"}
                    borderRadius={"9px"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    width={"308px"}
                    padding={"8px"}
                  >
                    <GridItem>
                      <Text fontWeight={"600"} fontSize={"14px"}>
                        پشتیبانی و رفع مشکلات
                      </Text>
                    </GridItem>
                    <GridItem
                      padding={"5px"}
                      bgColor={"#3646B3"}
                      borderRadius={"4px"}
                    >
                      <Text
                        color={"white"}
                        fontWeight={"600"}
                        fontSize={"14px"}
                      >
                        ثبت تیکت
                      </Text>
                    </GridItem>
                  </Grid>
                </VStack>
              </Stack>
            </Box>
          </Stack>

          <Box
            as="footer"
            bg="gray.200"
            color={"white"}
            p={4}
            textAlign="center"
            w={"100%"}
            bgColor={"#3646B3"}
          >
            تمامی حقوق این وبسایت متعلق به موسسه هوش مصنوعی و تمدن اسلامی (همتا)
            است.
          </Box>
        </VStack>
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns="repeat(2, 1fr)" gap={"2px"} w={"100%"}>
              <GridItem>
                <VStack>
                  <Text>جستجوی پیشرفته</Text>
                  <Text>نتایج دقیق‌تر و مرتبط‌تر با جستجوی پیشرفته</Text>
                </VStack>
              </GridItem>
              <GridItem></GridItem>
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default MainLayout;
