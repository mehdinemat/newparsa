import {
  Avatar,
  Box,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  VStack
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { HiBellAlert } from "react-icons/hi2";
import { IoSearch, IoSettingsSharp } from "react-icons/io5";
import { PiDiamondThin } from "react-icons/pi";
import useSWR from "swr";

const Header = () => {
  const [search, setSearch] = useState("");

  const { data: dataMe, isLoading: isLoadingMe } = useSWR(`user/client/me`)

  const router = useRouter();

  const { t } = useTranslation();

  const handleClickSearch = () => { };
  const handleClickSemanticSearch = () => { };


  useEffect(() => {
    console.log(dataMe?.data?.[0]?.username)
  }, [dataMe?.data])

  return (
    <HStack
      alignItems={"center"}
      w={"100%"}
      height={"100%"}
      justifyContent={"space-between"}
    >
      <HStack pr={'12px'}>
        <IconButton
          icon={<HiOutlineMenuAlt3 color="black" fontSize={"40px"} />}
        />
        <HStack gap={2}>
          {" "}
          <InputGroup width={"327px"} display={{ base: "none", md: "block" }}>
            <Input
              height={"46px"}
              placeholder={t("search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleClickSearch();
                }
              }}
            />
            <InputRightElement h="100%" ml="10px">
              <Flex align="center" gap="2">
                <IoSearch
                  fontSize="20px"
                  style={{ marginTop: "2px" }}
                  color="black"
                  onClick={handleClickSearch}
                  cursor={"pointer"}
                />
              </Flex>
            </InputRightElement>
          </InputGroup>
          <IconButton
            height={"46px"}
            width={"46px"}
            icon={<PiDiamondThin color="white" />}
            onClick={handleClickSemanticSearch}
            fontSize="20px"
            bgColor={"black"}
          />
        </HStack>
      </HStack>
      <HStack w={"100%"} height={"100%"} justifyContent={"end"} p={"5px"}>
        <Stack
          w={"76px"}
          h={"100%"}
          bgColor={"white"}
          borderRadius={"10px"}
          alignItems={"center"}
          justifyContent={"center"}
          position={"relative"}
        >
          <Box
            w={"9px"}
            h={"9px"}
            bgColor={"red"}
            right={"6px"}
            top={"6px"}
            borderRadius={"50px"}
            position={"absolute"}
          />
          <HiBellAlert fontSize={"30px"} />
        </Stack>
        <HStack
          w={"265px"}
          h={"100%"}
          bgColor={"white"}
          borderRadius={"10px"}
          justifyContent={"end"}
          padding={"16px"}
        >
          <VStack alignItems={"end"} gap={0}>
            <Text>{dataMe?.data?.[0]?.first_name + ' ' + dataMe?.data?.[0]?.last_name}</Text>
            <Text>{dataMe?.data?.[0]?.email}</Text>
          </VStack>
          <HStack position={"relative"}>
            <IoSettingsSharp style={{ position: "absolute", top: '-10px', left: '-10px', color: '#3646B3' }} />
            <Box w={'9px'} h={'9px'} bgColor={'#00FF99'} bottom={'-3px'} borderRadius={'50px'} position={'absolute'} left={'17px'} zIndex={'99999'} />
            <Avatar />
          </HStack>
        </HStack>
      </HStack>
    </HStack>
  );
};

export default Header;
