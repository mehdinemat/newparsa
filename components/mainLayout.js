import {
  Avatar,
  Box,
  Button,
  chakra,
  Grid,
  GridItem,
  HStack,
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
import useSWR from "swr";
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

  const { data: dataMe, isLoading: isLoadingMe } = useSWR(
    isUserLogin && `user/client/me`
  );

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
  const handleClickSemanticSearch = () => {
    router.push(`/result_search?search=${search}&search_type=semantic_search`);
  };

  const handleToggle = () => {
    setShowInput((prev) => !prev);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 300); // Give time for animation
  };

  const handleClickMenuLink = (link) => {
    router.push(`/${link}`);
  };

  const handleClickHome = () => {
    router.push("/");
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

  const handleLoginButton = () => {
    router.push("/login");
  };

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

  // useEffect(() => {
  //   // find the element by class or fallback to the ref
  //   const el = document.querySelector(".questions") || questionsRef.current;
  //   if (!el) return;

  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       // show menu when .questions is visible
  //       setShowMenu(entry.isIntersecting);
  //     },
  //     {
  //       root: null,         // viewport
  //       threshold: 0.1,     // fire when 10% visible
  //       rootMargin: "0px"   // adjust to trigger earlier/later
  //     }
  //   );

  //   observer.observe(el);
  //   return () => observer.disconnect();
  // }, []);

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
                width={"29px"}
                height={"42px"}
                ml={"5px"}
                onClick={(e) => router.push("/")}
                cursor={"pointer"}
              />
              <Image
                src="/headerlogo2.png"
                width={"100px"}
                height={"41px"}
                onClick={(e) => router.push("/")}
                cursor={"pointer"}
              />
            </HStack>
            <HStack>
              <Box height="60px" display="flex" alignItems="center" ml={"0px"}>
                {!showInput ? (
                  <CiSearch
                    color={"#3646B3"}
                    fontSize={"30px"}
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
                      <CiSearch
                        cursor="pointer"
                        onClick={handleClickSearch}
                        fontSize="30px"
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
                    height="29px"
                    width="28px"
                  />
                </HStack>
              ) : (
                <Avatar fontSize={"46px"} />
              )}

              <Menu isOpen={isOpen2} onOpen={() => setIsOpen2(true)} onClose={() => setIsOpen2(false)}>
                <MenuButton as={Button}>
                  <Image src="/headermenu.png" height={"39px"}
                    width={"35px"} mr="20px" />
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
                        پروفایل(ورود؟ثبت‌نام)
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
                      <MenuItem
                        _hover={{ bgColor: "#3646B333" }}
                        borderRadius="15px"
                        bgColor="#3646B30D"
                        my="5px"
                        h="35px"
                        onClick={() => handleExit()}
                      >
                        خروج از حساب کاربری
                      </MenuItem>
                    </MotionMenuList>
                  )}
                </AnimatePresence>
              </Menu>
            </HStack>
          </HStack>

          {/* <HStack
          as={Container}
          maxW="container.xl"
          w={"100%"}
          alignItems={"center"}
          pr={{ base: 0, md: "14px" }}
          justifyContent={"space-between"}
        >
          <HStack
            w={"100%"}
            alignItems={"center"}
            height={"100%"}
            justifyContent={"space-between"}
          >
            <HStack ml={"20px"} w={"100%"}>
              {activePath == 0 ? (
                <MenuBar />
              ) : activePath == 1 ? (
                <UserMenuBar />
              ) : (
                <AdminMenuBar />
              )}
              <Image
                src="/question.png"
                width={{ base: "25px", md: "40px" }}
                height={{ base: "35px", md: "56px" }}
                onClick={handleClickHome}
                cursor={"pointer"}
              />
              <Image
                src="/parsaheader.png"
                width={{ base: "57px", md: "91px" }}
                height={{ base: "23px", md: "37px" }}
                onClick={handleClickHome}
                cursor={"pointer"}
              />
              {(hideHeaderButton || !(asPath == "/")) && (
                <HStack gap={0}>
                  <InputGroup
                    width={"266px"}
                    display={{ base: "none", md: "block" }}
                  >
                    <Input
                      height={"46px"}
                      placeholder={t("search")}
                      value={search}
                      bgColor={'#F7F7F7'}
                      onChange={(e) => setSearch(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleClickSearch();
                        }
                      }}
                    />
                    <InputRightElement h="100%" >
                      <Flex align="center" gap="2">
                        <IoSearch
                          fontSize="20px"
                          style={{ marginTop: "2px" }}
                          color="#29CCCC"
                          onClick={handleClickSearch}
                          cursor={"pointer"}
                        />

                      </Flex>
                    </InputRightElement>
                  </InputGroup>
                  <IconButton icon={<PiDiamondThin fontSize="20px" color="white" />} bgColor={'#29CCCC'} onClick={handleClickSemanticSearch} height={'46px'} width={'46px'} />

                </HStack>
              )}
            </HStack>
            <HStack
              w={"100%"}
              justifyContent={"end"}
              alignItems={"end"}
              display={{ base: "flex", md: "none" }}
            >
              <Fade in={!showInput}>
                {!showInput && (
                  <IconButton
                    icon={<IoSearch color="#29CCCC" />}
                    aria-label="Search"
                    fontSize="20px"
                    variant="ghost"
                    onClick={handleToggle}
                    transition="all 0.3s ease"
                  />
                )}
              </Fade>

              <Collapse in={showInput} animateOpacity style={{ marginLeft: 8 }}>
                <InputGroup size="md" w="150px">
                  <Input
                    ref={inputRef}
                    placeholder={t("search")}
                    variant="filled"
                    bg="white"
                    borderRadius="md"
                    onBlur={() => setShowInput(false)} // Optional: hide on blur
                  />
                  <InputRightElement>
                    <IoSearch color="gray.500" />
                  </InputRightElement>
                </InputGroup>
              </Collapse>
              <IconButton
                icon={<IoExitOutline color="#29CCCC" />}
                aria-label="Search"
                fontSize="20px"
                variant="ghost"
              />
            </HStack>
          </HStack>
          <HStack spacing={4} display={{ base: "none", md: "flex" }}>
            {menuList?.map((item) => (
              <Text
                _hover={{ bgColor: "gray.100" }}
                borderRadius={"5px"}
                padding={"5px"}
                textAlign={"center"}
                fontSize={"sm"}
                w={"70px"}
                onClick={(e) => handleClickMenuLink(item?.link)}
                cursor={"pointer"}
              >
                {t(item?.t_title)}
              </Text>
            ))}
            <Menu>
              <MenuButton px={4} py={2} transition="all 0.2s">
                <HStack>
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
              <MenuList>
                <MenuItem
                  value={"en"}
                  onClick={(e) => router.push("/", "/", { locale: "en" })}
                >
                  {t("header_english")}
                </MenuItem>
                <MenuItem
                  value={"ar"}
                  onClick={(e) => router.push("/", "/", { locale: "ar" })}
                >
                  {t("header_arabic")}
                </MenuItem>
                <MenuItem
                  value={"fa"}
                  onClick={(e) => router.push("/", "/", { locale: "fa" })}
                >
                  {t("header_persian")}
                </MenuItem>
              </MenuList>
            </Menu>
            {!isUserLogin && (
              <Button
                w={"180px"}
                bgColor={"#29CCCC"}
                fontWeight={"normal"}
                onClick={handleLoginButton}
              >
                {t("log_sub")}
              </Button>
            )}
            {isUserLogin && (
              <HStack>
                <IoIosNotificationsOutline fontSize={"20px"} color="#29CCCC" />
                <GiDiamondRing fontSize={"20px"} color="#29CCCC" />

                <Menu>
                  <MenuButton px={4} py={2} transition="all 0.2s">
                    <HStack>
                      <Avatar size={"sm"} />
                    </HStack>
                  </MenuButton>
                  <MenuList padding={'6px'} borderRadius={'10px'}>
                    <MenuItem
                      fontWeight={"bold"}
                      justifyContent={"start"}
                      cursor={"pointer"}
                      as={HStack}
                      borderRadius={'10px'}
                    >
                      <Avatar />
                      <VStack w={'100%'} alignItems={'baseline'} gap={0} height={'100%'} justifyContent={'start'}>
                        <Text>{" "}
                          {dataMe?.data?.[0]?.first_name}{" "}
                          {dataMe?.data?.[0]?.last_name}</Text>
                        <Text fontSize={'8px'}></Text>
                      </VStack>
                    </MenuItem>
                    <MenuItem onClick={(e) => handleProfileLink()} borderRadius={'10px'} as={HStack} justifyContent={'start'} fontWeight={'bold'} cursor={'pointer'} height={'43px'}>
                      <IoPersonOutline />
                      <Text fontSize={'14px'} >پروفایل کاربری</Text>
                    </MenuItem>
                    <MenuItem onClick={(e) => handleExit()} borderRadius={'10px'} height={'43px'}>خروج</MenuItem>
                  </MenuList>
                </Menu>
              </HStack>
            )}
          </HStack>
        </HStack> */}
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
                  <Image src="/question.png" width={"51px"} height={"72px"} />
                  <Image
                    src="/parsaheader.png"
                    width={"118px"}
                    height={"48px"}
                  />
                  <Text
                    w={"326px"}
                    fontSize={"16px"}
                    textAlign={"start"}
                    align={"justify"}
                    color={"#333333"}
                    letterSpacing={"-3%"}
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
                  <HStack
                    alignItems={"start"}
                    justifyContent={"start"}
                    w={"100%"}
                  >
                    <Text
                      color={"#3646B3"}
                      fontSize={"22px"}
                      fontWeight={"bold"}
                      fontFamily={"morabba"}
                      width={"fit-content"}
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
                  </HStack>
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
