import { Box, Button, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const IsLogin = ({ type }) => {
  const router = useRouter()
  const { t } = useTranslation();

  return (
    <Stack minHeight={'60vh'} alignItems={'center'}
      padding={'20px'} >
      <Box
        w={{ base: "fit-content", md: "fit-content" }}
        padding={"20px"}
        bgColor={"#3646B3"}
        borderRadius={"15px"}
        my={{ base: "0px", md: "0px" }}
        mt={{ base: "80px", md: "120px" }}
        position={'absolute'}
      >
        <HStack>
          <VStack w={"100%"} alignItems={"start"}>
            <Text
              fontWeight={"bold"}
              color={"white"}
              fontSize={"16px"}
              mb={"10px"}
            >
              {type == 'question' ? t("your_question") : t("your_answer")}
            </Text>
            <Text fontSize={"xs"} color={"white"}>
              {type == 'question' ? t("ask_question") : t("you_must_log")}
            </Text>
          </VStack>
          <Button
            onClick={e => router.push('/login')}
            bgColor={"#29CCCC"}
            fontWeight={"normal"}
            p={"10px"}
            w={{ base: "200px", md: "150px" }}
            size={"sm"}
          >
            {t("log_in_to_your_account")}
          </Button>
        </HStack>
      </Box>
    </Stack>
  )
}

export default IsLogin
