import {
  Avatar,
  Box,
  Button,
  Collapse,
  Container,
  Fade,
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
import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { FaTelegram } from "react-icons/fa";
import { GiDiamondRing } from "react-icons/gi";
import {
  IoIosArrowDown,
  IoIosNotificationsOutline,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter,
  IoLogoYoutube,
} from "react-icons/io";
import { IoCall, IoExitOutline, IoLocation, IoSearch } from "react-icons/io5";
import AdminMenuBar from "./admin_dashboard/adminMenuBar";
import UserMenuBar from "./mobile/dashboard/userMenuBar";
import MenuBar from "./mobile/menuBar";

const menuList = [
  {
    title: "سوال ها",
    link: "questions",
  },
  {
    title: "برچسب ها",
  },
  {
    title: "کاربران",
    link: "users",
  },
  {
    title: "محصولات",
    link: "products",
  },
];

const MainLayout = ({ children }) => {
  const router = useRouter();
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

  const handleBuy = () => {
    onOpen();
  };

  const handleClickSearch = () => {
    onOpen();
  };

  const handleToggle = () => {
    setShowInput((prev) => !prev);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 300); // Give time for animation
  };

  const handleClickMenuLink = (link) => {
    router.replace(link);
  };

  const handleClickHome = () => {
    router.replace("/");
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

  const handleLoginButton =()=>{
    router.replace('/login')
  }

  return (
    <VStack minHeight="100vh" w={"100%"} alignItems={"start"} gap={0}>
      {/* header */}
      <Box
        as={Stack}
        position="fixed" // 👈 Make it fixed
        top={0}
        left={0}
        zIndex={999} // 👈 Ensure it stays on top
        width="100%"
        height={{ base: "60px", md: "100px" }}
        alignItems={"center"}
        justifyContent={"center"}
        bg="white"
        p={2}
        px={{ base: 0, mode: 4 }}
        borderBottom="1px"
        borderBottomColor="gray.200"
      >
        <HStack
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
                src="../../question.png"
                width={{ base: "25px", md: "40px" }}
                height={{ base: "35px", md: "56px" }}
                onClick={handleClickHome}
                cursor={"pointer"}
              />
              <Image
                src="../../parsaheader.png"
                width={{ base: "57px", md: "91px" }}
                height={{ base: "23px", md: "37px" }}
                onClick={handleClickHome}
                cursor={"pointer"}
              />
              <InputGroup
                width={"327px"}
                display={{ base: "none", md: "block" }}
              >
                <Input
                  height={"46px"}
                  placeholder="جستجو"
                  onClick={handleClickSearch}
                />
                <InputRightElement h="100%">
                  <IoSearch
                    fontSize="20px"
                    style={{ marginTop: "2px" }}
                    color="#29CCCC"
                  />
                </InputRightElement>
              </InputGroup>
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
                    placeholder="جستجو..."
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
                textAlign={"center"}
                fontSize={"sm"}
                w={"70px"}
                onClick={(e) => handleClickMenuLink(item?.link)}
                cursor={"pointer"}
              >
                {item?.title}
              </Text>
            ))}
            <Menu>
              <MenuButton px={4} py={2} transition="all 0.2s">
                <HStack>
                  <Text fontSize={"sm"}>فارسی</Text>
                  <IoIosArrowDown />
                </HStack>
              </MenuButton>
              <MenuList>
                <MenuItem>انگلیسی</MenuItem>
                <MenuItem>عربی</MenuItem>
              </MenuList>
            </Menu>
           {!isUserLogin && <Button w={"120px"} bgColor={"#29CCCC"} fontWeight={"normal"} onClick={handleLoginButton}>
              ورود/ثبت نام
            </Button>}
            {isUserLogin &&<HStack>
              <IoIosNotificationsOutline fontSize={"20px"} color="#29CCCC" />
              <GiDiamondRing fontSize={"20px"} color="#29CCCC" />

              <Menu>
                <MenuButton px={4} py={2} transition="all 0.2s">
                  <HStack>
                    <Avatar size={"sm"} />
                  </HStack>
                </MenuButton>
                <MenuList>
                  <MenuItem>انگلیسی</MenuItem>
                  <MenuItem>عربی</MenuItem>
                </MenuList>
              </Menu>
            </HStack>}
          </HStack>
        </HStack>
      </Box>
      {/* header */}

      <HStack
        height={"calc( 100vh )"}
        w={"100%"}
        gap={0}
        alignItems={"start"}
        overflowY={"scroll"}
      >
        {/* Main content area */}
        <VStack height={"calc( 100vh - 76px )"} w={"100%"} gap={0}>
          {children}
          <Stack w={"100%"} bg="#F7F7F7" alignItems={"center"}>
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
            >
              <Stack
                direction={{ base: "column", md: "row" }}
                height={"100%"}
                alignItems={"start"}
                justifyContent={"space-between"}
                gap={"40px"}
              >
                <VStack
                  alignItems={"center"}
                  gap={"20px"}
                  height={"100%"}
                  w={"100%"}
                >
                  <Image
                    src="../../question.png"
                    width={"51px"}
                    height={"72px"}
                  />
                  <Image
                    src="../../parsaheader.png"
                    width={"118px"}
                    height={"48px"}
                  />
                  <Text w={"326px"} fontSize={"16px"}>
                    پارسا موتور جستجوی پرسش و پاسخ‌های حوزه علوم اسلامی به
                    زبان‌های مختلف از منابع معتبر است؛که هدف آن افزایش دانش و
                    دسترسی ساخت یافته مخاطبین به پرسش و پاسخ‌های دینی است.
                  </Text>
                </VStack>
                <VStack
                  alignItems={"start"}
                  gap={"20px"}
                  height={"100%"}
                  w={"100%"}
                >
                  <Text color={"#3646B3"} fontSize={"20px"} fontWeight={"bold"}>
                    پارسا
                  </Text>
                  <UnorderedList
                    textAlign={"start"}
                    spacing={"10px"}
                    sx={{
                      li: {
                        color: "black", // text color
                        "::marker": {
                          color: "#29CCCC", // 🔵 your custom bullet color
                        },
                      },
                    }}
                  >
                    <ListItem>خانه</ListItem>
                    <ListItem>سؤالات</ListItem>
                    <ListItem>برچسب‌ها</ListItem>
                    <ListItem>کاربران</ListItem>
                    <ListItem>درباره‌ما</ListItem>
                    <ListItem>ارتباط با ما</ListItem>
                    <ListItem>قوانین استفاده</ListItem>
                    <ListItem fontWeight={"thin"}>سیاست حریم خصوصی</ListItem>
                  </UnorderedList>
                </VStack>
                <VStack
                  w={"100%"}
                  alignItems={"start"}
                  gap={"20px"}
                  height={"100%"}
                >
                  <Text color={"#3646B3"} fontSize={"20px"} fontWeight={"bold"}>
                    محصولات
                  </Text>
                  <UnorderedList
                    textAlign={"start"}
                    spacing={"10px"}
                    sx={{
                      li: {
                        color: "black", // text color
                        "::marker": {
                          color: "#29CCCC", // 🔵 your custom bullet color
                        },
                      },
                    }}
                  >
                    <ListItem>موتور جستجو هوشمند سوالات</ListItem>
                    <ListItem>سرویس جستجوی سوال مشابه</ListItem>
                    <ListItem>سرویس اصلاح خطای نوشتاری</ListItem>
                    <ListItem>سرویس توصیه گر سوال</ListItem>
                    <ListItem>سرویس استخراج عبارات کلیدی</ListItem>
                    <ListItem>سرویس خلاصه سازی متن سوال</ListItem>
                    <ListItem>سرویس رده بندی متن سوالات</ListItem>
                    <ListItem>سرویس پاسخ به سوالات دامنه باز</ListItem>
                  </UnorderedList>
                </VStack>
                <VStack
                  alignItems={"start"}
                  gap={"20px"}
                  height={"100%"}
                  w={"100%"}
                >
                  <Text color={"#3646B3"} fontSize={"20px"} fontWeight={"bold"}>
                    ارتباط با ما
                  </Text>
                  <HStack w={"100%"} alignItems={"start"} textAlign={"start"}>
                    <IconButton
                      icon={<IoLocation color="#29CCCC" fontSize={"20px"} />}
                    />
                    <Text width={"auto"}>
                      مازندران، بابل، یوسف پوری، خیابان آیت الله سعیدی، کوچه
                      پرستو، پلاک ۷
                    </Text>
                  </HStack>
                  <HStack>
                    <IconButton
                      icon={<IoCall color="#29CCCC" fontSize={"20px"} />}
                    />
                    <Text>۰۹۱۱۱۱۶۹۱۵۶</Text>
                  </HStack>
                  <VStack alignItems={"start"}>
                    <Text
                      color={"#3646B3"}
                      fontSize={"20px"}
                      fontWeight={"bold"}
                    >
                      شبکه های اجتماعی
                    </Text>
                    <HStack>
                      <IconButton
                        icon={
                          <IoLogoTwitter color="#29CCCC" fontSize={"20px"} />
                        }
                      />
                      <IconButton
                        icon={
                          <IoLogoInstagram color="#29CCCC" fontSize={"20px"} />
                        }
                      />
                      <IconButton
                        icon={<FaTelegram color="#29CCCC" fontSize={"20px"} />}
                      />
                      <IconButton
                        icon={
                          <IoLogoYoutube color="#29CCCC" fontSize={"20px"} />
                        }
                      />
                      <IconButton
                        icon={
                          <IoLogoLinkedin color="#29CCCC" fontSize={"20px"} />
                        }
                      />
                    </HStack>
                  </VStack>
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
