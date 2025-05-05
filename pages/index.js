import Header from "@/components/home/header";
import MainLayout from "@/components/mainLayout";
import {
  Box,
  Button,
  Divider,
  Grid,
  GridItem,
  HStack,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Geist, Geist_Mono } from "next/font/google";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import LeftSidebar from "@/components/home/leftsidebar";
import QuestionMCard from "@/components/home/mobile/questionMCard";
import Pagination from "@/components/pagination";
import QuestionCard from "@/components/questionCars";
import SliderCom from "@/components/slider";
import { useRouter } from "next/router";

import SidebarTree from "@/components/base/sidebarTree";
import { baseUrl } from "@/components/lib/api";
import Head from "next/head";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import useSWR from "swr";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const items = [
  {
    image: "/img1.jpg",
    title: "آیت الله محمدتقی بهجت فومنی",
    button: "اطلاعات بیشتر",
  },
  {
    image: "/img2.jpg",
    title: "آیت الله جعفر سبحانی خیابانی تبریزی",
    button: "اطلاعات بیشتر",
  },
  {
    image: "/img3.jpg",
    title: "آیت الله سید عبدالکریم موسوی اردبیلی",
    button: "اطلاعات بیشتر",
  },
];
const items2 = [
  {
    image: "/img1.jpg",
  },
  {
    image: "/img2.jpg",
  },
  {
    image: "/img3.jpg",
  },
];

export default function Home({ children }) {
  const router = useRouter();
  const { locale } = useRouter();

  const [treeData, setTreeData] = useState([]);
  const [page, setPage] = useState(1);
  const [categoryId, setCategoryId] = useState("");

  const { t } = useTranslation();

  const {
    data: dataQuestion,
    error: errorQuestion,
    isLoading: isLoadingQuestion,
  } = useSWR(`user/question?lang=${locale}&page=${page}${categoryId && `&categories__id=${categoryId}`}`);
  const { data: dataGeneral, error: errorGeneral } = useSWR("user/general");
  const { data: dataSource, error: errorSource } = useSWR("user/source");
  const { data: dataReferences, error: errorReferences } =
    useSWR("user/public-figure");

  useSWR(`user/category?type=question`, {
    onSuccess: (res) => {
      if (res.status) {
        setTreeData(
          res.data.map((item) => ({
            key: item.id.toString(),
            title: item.name,
            isLeaf: false, // assume all root nodes can have children
          }))
        );
      }
    },
  });

  const onLoadData = (treeNode) => {
    const { key, children } = treeNode;

    // If already loaded, skip
    if (children) {
      return Promise.resolve();
    }

    return fetch(baseUrl + `user/category?parent_id=${key}`)
      .then((res) => res.json())
      .then((res) => {
        if (!res.status) return;

        const newChildren = res.data.map((child) => ({
          key: child.id.toString(),
          title: child.name,
          isLeaf: false, // or true if child has no further children
        }));

        // Add the new children to the correct parent in treeData
        setTreeData((origin) => updateTreeData(origin, key, newChildren));
      });
  };

  // Helper function to update treeData immutably
  const updateTreeData = (list, key, children) =>
    list.map((node) => {
      if (node.key === key) {
        return { ...node, children };
      } else if (node.children) {
        return {
          ...node,
          children: updateTreeData(node.children, key, children),
        };
      }
      return node;
    });

  const handleNewQuestionButton = () => {
    router.replace("/new_question");
  };

  return (
    <MainLayout>
      <Head>
        <title>{t("question")}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header data={dataGeneral?.data} t={t} />
      <Box
        w="100%"
        alignItems={"center"}
        justifyContent={"center"}
        maxW="container.xl"
        mx="auto"
        p={"20px"}
      >
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
          templateAreas={{
            base: `"main" "right" "left" "slider"`,
          }}
          gap={"20px"}
          w={"100%"}
        >
          {/* Right Sidebar */}

          <SidebarTree
            treeData={treeData}
            onLoadData={onLoadData}
            t={t}
            setCategoryId={setCategoryId}
          />

          {/* Main Content */}
          <Box
            p={{ base: 0, md: "6" }}
            order={{ base: 1, md: 2 }}
            as={GridItem}
            colSpan={{ md: 2 }}
            w="100%"
            overflowWrap="break-word"
            wordBreak="break-word"
            maxW="100vw"
            whiteSpace="normal"
            pr={{ base: 0, md: "21px" }}
          >
            <HStack
              w="100%"
              whiteSpace="normal"
              justifyContent={"space-between"}
              mb={{ base: "20px", md: "10px" }}
              alignItems={{ base: "center", md: "start" }}
            >
              <Text fontWeight={"700"} fontSize={"22px"} letterSpacing={0}>
                {t("suggested_questions")}
              </Text>

              <Button
                width={{ base: "152px", md: "189px" }}
                height={"50px"}
                bgColor={"#F9C96D"}
                color={"black"}
                fontWeight={"400"}
                fontSize={"16px"}
                lineHeight={"100%"}
                letterSpacing={0}
                borderRadius={"10px"}
                onClick={(e) => handleNewQuestionButton()}
              >
                {t("ask_your_question")}
              </Button>
            </HStack>

            {isLoadingQuestion ? (
              <HStack
                w={"100%"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Spinner />
              </HStack>
            ) : (
              <VStack display={{ base: "none", md: "flex" }}>
                {dataQuestion?.data?.result?.map((item, index) => (
                  <QuestionCard key={index} data={item} t={t} />
                ))}
                <Stack
                  w={"100%"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Pagination
                    totalPages={dataQuestion?.data?.total_count}
                    currentPage={page}
                    onPageChange={setPage}
                    t={t}
                  />
                </Stack>
              </VStack>
            )}

            <VStack display={{ base: "flex", md: "none" }}>
              <QuestionMCard />
              <Divider my={"20px"} />
              <QuestionMCard />
              <Divider my={"20px"} />
              <QuestionMCard />
              <Divider my={"20px"} />
              <QuestionMCard />
              <Divider my={"20px"} />
              <QuestionMCard />
              <Divider my={"20px"} />
              <QuestionMCard />
            </VStack>
          </Box>

          {/* Left Sidebar */}
          <Box
            order={3}
            as={GridItem}
            colSpan={"1"}
            w="100%"
            maxW={{ base: "calc( 100vw - 50px )", md: "100vw" }}
            whiteSpace="normal"
            overflowWrap="break-word"
          >
            <Box
              w={"100%"}
              p="4"
              border={"1px"}
              borderColor={"#EBEBEB"}
              borderRadius={"15px"}
              height={"min-content"}
              mb={"30px"}
            >
              <Text fontWeight={"bold"} fontSize={"16px"}>
                {t("question_sources")}
              </Text>
              <VStack mt={"20px"} w={"100%"} alignItems={"start"}>
                {dataSource?.data?.map((item, index) => (
                  <LeftSidebar key={index} data={item} t={t} />
                ))}
              </VStack>
            </Box>
            <Box
              w={"100%"}
              p="4"
              border={"1px"}
              borderColor={"#EBEBEB"}
              borderRadius={"15px"}
              bgColor={"#CFF186"}
              height={"min-content"}
            >
              <Text fontWeight={"bold"} fontSize={"16px"}>
                {t("hadith_of_the_day")}
              </Text>
              <Text mt={"10px"}>
                عن الامام الحسن علیه السلام: «رَأَیْتُ أُمِّی فَاطِمَةَ ع
                قَامَتْ فِی مِحْرَابِهَا لَیْلَةَ جُمُعَتِهَا فَلَمْ تَزَلْ
                رَاکِعَةً سَاجِدَةً حَتَّى اتَّضَحَ عَمُودُ الصُّبْحِ وَ
                سَمِعْتُهَا تَدْعُو لِلْمُؤْمِنِینَ» در محرابش ایستاده بود و
                پیوسته در حال رکوع و سجده بود تا اینکه روشنایی صبح نمایان شد و
                از او شنیدم که برای مردان و زنان مومن دعا می‌کرد و با اسم آنان
                را نام می‌برد و برایشان زیاد دعا می‌کرد. علل الشرائع، ج‏۱ ص ۱۸۱
                بحارالانوار، ج ۴۳ ص ۸۲ (۱۶۶۷)
              </Text>
            </Box>
          </Box>

          <GridItem
            order={4}
            colSpan={{ md: 3 }}
            w={"100%"}
            maxW={{ base: "calc( 100vw - 50px )", md: "100vw" }}
            whiteSpace="normal"
            overflowWrap="break-word"
          >
            {dataReferences?.data && (
              <SliderCom
                items={dataReferences?.data?.result?.map((val) => ({
                  title: val?.full_name,
                  image: val?.image_url,
                  buttoh: "اطلاعات بیشتر",
                }))}
                height={"380px"}
                borderRadius={"100%"}
                title={t("sources")}
              />
            )}
            <SliderCom
              items={items2}
              height={"270px"}
              width="350px"
              borderRadius={"0px"}
              title={t("parsa_supporters")}
            />
          </GridItem>
        </Grid>
      </Box>
    </MainLayout>
  );
}
