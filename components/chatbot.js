// components/ChatBot.js
"use client";

import {
  Box,
  HStack,
  Heading,
  IconButton,
  Input,
  Text,
  VStack
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { AiFillAudio } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { IoAdd, IoSend } from "react-icons/io5";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { StringParam, useQueryParams, withDefault } from "use-query-params";
import { baseUrl } from "./lib/api";
import LoadingDots from "./loadingDots";

const chats = [
  {
    "id": 85,
    "content": "از امام صادق (ع) روایت شده است:\n\n**«لَا یَزَالُ اللَّهُ یَغْفِرُ لِمَنْ حَافَظَ عَلَى الْجُمُعَةِ، وَ لَزِمَ الْخُطْبَةَ، إِلَّا وَ هُوَ مُعْتَقٌ مِنَ النَّارِ»**\n\n**ترجمه:**\n\n«خداوند همواره کسی را که نماز جمعه را حفظ کند و به خطبه‌ها پایبند باشد، می‌آمرزد و او را از آتش دوزخ آزاد می‌کند.»\n\n**منبع:** الكافي، ج 5، ص 86\n\nاین حدیث بر اهمیت حفظ نماز جمعه و حضور در خطبه‌ها و پاداش الهی آن تاکید می‌کند.",
    "role": 3,
    "level": 24
  },
  {
    "id": 84,
    "content": "یک حدیث از نماز جمعه\n\n",
    "role": 2,
    "level": 23
  },
  {
    "id": 83,
    "content": "از حضرت محمد (ص) روایت شده است:\n\n**«مَنْ وُجِدَ مُتَعَوِّدًا عَلَى الْجُمُعَةِ وَ لَمْ یَشْغَلْهُ عُذْرٌ وَمَاتَ، أُدْخِلَهُ اللَّهُ الْجَنَّةَ.»**\n\n**ترجمه:**\n\n«هر کس به طور عادت به نماز جمعه می‌رفت و عذری هم برای عدم حضورش وجود نداشت و می‌مرد، خداوند او را به بهشت وارد می‌کند.»\n\n**منبع:** مکارم الأخلاق، ص 244\n\nاین حدیث پاداش بزرگ و ارزشمند شرکت در نماز جمعه را بیان می‌کند.",
    "role": 3,
    "level": 22
  },
  {
    "id": 82,
    "content": "یک حدیث از نماز جمعه\n\n",
    "role": 2,
    "level": 21
  },
  {
    "id": 81,
    "content": "از امام علی (ع) نقل شده است:\n\n**«اَلْجُمُعَةُ یَوْمُ عِیدٍ وَ هِیَ اَفضَلُ اَیَّامِ الاُسْبُوعِ، فَاجْتَنِبُوا فِیها اَلْمُؤْذِیَاتِ وَ اِسْتَبْشِرُوا بِرَبِّکُم.»**\n\n**ترجمه:**\n\n«جمعه روز عید است و بهترین روزهای هفته است، پس در آن از کارهای ناپسند و آزاردهنده اجتناب کنید و به رب خود بشارت دهید و شادمان باشید.»\n\n**منبع:** مکارم الاخلاق، ص 243\n\nاین حدیث به فضیلت روز جمعه و اهمیت دوری از گناه و انجام کارهای نیک در این روز اشاره دارد.",
    "role": 3,
    "level": 20
  },
  {
    "id": 80,
    "content": "یک حدیث از نماز جمعه\n\n",
    "role": 2,
    "level": 19
  },
  {
    "id": 79,
    "content": "از امام صادق (ع) روایت شده است:\n\n**«مَنْ أَدْرَکَ الْجُمُعَةَ فَلْیَغْسِلْ رَأْسَهُ، وَیَتَطَهَّرْ کُلَّهُ، وَیَمْسَحْ بِرَأْسِهِ، وَیَتَوَدَّکُ بِالرَّائِحَةِ الطَیِّبَةِ، وَیَکُونُ الْأَوَّلُ مِنَ الْقَوْمِ الدَّاخِلِینَ، فَإِنَّهَا مُبَارَکَةٌ.»**\n\n**ترجمه:**\n\n«هر کس نماز جمعه را درک کرد، سرش را بشوید و همه بدنش را پاکیزه کند و به سرش روغن بمالد و با عطر خوشبو شود و از اولین کسانی باشد که وارد می‌شوند، زیرا جمعه مبارک است.»\n\n**منبع:** تهذيب‌الاحکام، ج1، ص326\n\nاین حدیث به آداب و مستحبات مربوط به نماز جمعه اشاره دارد و بر اهمیت پاکیزگی و آماده‌شدن برای این نماز تاکید می‌کند.",
    "role": 3,
    "level": 18
  },
  {
    "id": 78,
    "content": "یک حدیث از نماز جمعه\n\n",
    "role": 2,
    "level": 17
  },
  {
    "id": 77,
    "content": "بر اساس احادیث ارائه شده، نماز جمعه واجب است و تنها چند گروه خاص از این واجب معذورند:\n\n*   **زنان**\n*   **بردگان (که در زمان حاضر کاربردی ندارد)**\n*   **مسافران**\n*   **بیماران**\n*   **کودکان**\n\nهمچنین، احادیث به این نکته اشاره دارند که اگر تعداد افراد حاضر به حد نصاب نرسد (کمتر از پنج نفر)، نماز جمعه واجب نیست. به این معنی که اگر در یک محل کمتر از پنج مرد مسلمان مأمن و بدون ترس از دشمن وجود داشته باشد، نماز جمعه بر آنها واجب نیست.\n\nهمچنین امام باقر (ع) ترک سه جمعه پیاپی بدون عذر را نشانه نفاق می‌داند.",
    "role": 3,
    "level": 16
  },
  {
    "id": 76,
    "content": "بر چه اساس نماز جمعه واجب نیست ؟ ",
    "role": 2,
    "level": 15
  }
]

const postRequest = (url, { arg }) => {
  return axios.post(baseUrl + url, arg)
}

export default function ChatBot() {

  const [filters, setFilters] = useQueryParams({
    chat: withDefault(StringParam, '')
  })

  const [chatHistory, setChatHistory] = useState([]); // initial chat messages
  const messagesEndRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [botStream, setBotStream] = useState("");

  const [conditionStream, setConditionStream] = useState("")

  const [chatSession, setChatSession] = useState('')
  const [isStreaming, setIsStreaming] = useState(false);
  const { data: dataChat, isLoading: isLoadingChat, mutate } = useSWR(chatSession && `user/chat/${chatSession}`, null, { refreshInterval: false, revalidateOnFocus: false, revalidateIfStale: false })

  const { trigger: triggerSession } = useSWRMutation(`user/chat/session`, postRequest, {
    onSuccess: (data) => {
      setChatSession(data?.data?.data?.id)
    }
  })

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    // Fake bot reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Hello 👋 I’m a bot!" },
      ]);
    }, 500);

    setInput("");
  };

  const handleOpenChatBot = () => {
    triggerSession()
    setIsOpen(true)
  }

  const handleSubmit = async (userMessage) => {
    setInput('')
    setIsStreaming(true)

    const userId = Date.now();

    const newUserMsg = {
      id: userId,
      role: 2, // user
      content: userMessage,
      level: (chatHistory?.length ?? 0) + 1, // increment level
    };

    // add user message
    setChatHistory((prev) => {
      const base = Array.isArray(prev) ? prev : [];
      return [...base, newUserMsg];
    });

    // add placeholder assistant message
    const streamId = userId + 1;
    let botMessage = "";
    setChatHistory((prev) => [
      ...(Array.isArray(prev) ? prev : []),
      { id: streamId, role: 3, content: "", level: (chatHistory?.length ?? 0) + 2 },
    ]);

    // reset stream state
    setBotStream("");

    // make request
    const res = await fetch(`https://parsa.api.t.etratnet.ir/user/chat/${chatSession}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ content: userMessage }),
    });

    if (!res.body) {
      setIsStreaming(false)
      console.error("No streaming body in response");
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";
    let done = false;

    while (!done) {

      const { value, done: doneReading } = await reader.read();
      done = !!doneReading;
      if (value) buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split(/\r?\n/);
      buffer = lines.pop() ?? "";

      for (const rawLine of lines) {
        const line = rawLine.trim();
        if (!line.startsWith("data:")) continue;

        const jsonStr = line.replace(/^data:\s*/, "");
        if (jsonStr === "[DONE]") {
          done = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);

          if (parsed.error) {
            console.error("Stream error:", parsed.error);
            done = true;
            break;
          }

          if (!parsed?.chunk) {
            setConditionStream(parsed?.state)
          }

          if (parsed.chunk) {
            setConditionStream('')
            setIsStreaming(false)
            botMessage += parsed.chunk;
            console.log(parsed)
            // update assistant message in history
            setChatHistory((prev) =>
              prev.map((msg) =>
                msg.id === streamId ? { ...msg, content: botMessage } : msg
              )
            );
          }

          if (parsed.done) {
            done = true;
            break;
          }
        } catch (err) {
          console.error("Could not parse stream JSON:", jsonStr, err);
        }
      }
    }

    // clear botStream state if you don’t need it
    setBotStream("");
  };


  useEffect(() => {
    if (!dataChat) return;
    // handle both shapes: API might return { chats: [...] } or directly [...]
    const initial = Array.isArray(dataChat)
      ? dataChat
      : Array.isArray(dataChat?.chats)
        ? dataChat.chats
        : [];
    setChatHistory(initial);
  }, [dataChat]);

  useEffect(() => {
    if (dataChat?.data?.chats) {
      setChatHistory(dataChat.data.chats);
    }
  }, [dataChat?.data?.chats]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto" }); // "auto" is smoother than "smooth" for frequent updates
    }
  }, [chatHistory, botStream]);

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <Box bgGradient="linear(58.61deg, #3646B3 42.05%, #29CCCC 180.32%)" w={'160px'} h={'61px'} position="fixed" bottom="20px"
          right="20px" boxShadow="0px 7px 11.2px 0px #00000026" borderRadius={'15px'} borderBottomLeftRadius={'0px'} as={HStack} padding={'15px'} alignItems={'center'} justifyContent={'center'} onClick={() => handleOpenChatBot()} cursor={'pointer'} zIndex={9999}
        >
          <Text fontWeight={'bold'} color={'white'}>گفتگو بات</Text>
          <IconButton
            icon={<FaRegComments size={30} />}
            borderRadius="full"
            size="lg"

          />
        </Box>
      )}

      {/* Chat window */}
      {isOpen && (
        <Box
          bgGradient="linear(58.61deg, #3646B3 42.05%, #29CCCC 180.32%)"
          position="fixed"
          bottom="20px"
          right="20px"
          w="386px"
          h="586px"
          border="1px solid #ccc"
          borderRadius="md"

          display="flex"
          flexDirection="column"
          zIndex={9999}
          padding={'3px'}
          boxShadow="0px 7px 11.2px 0px #00000026"
        >
          {/* Header */}

          <HStack w={'100%'} alignItems={'center'} padding={'10px'} justifyContent={'space-between'}>
            <IconButton
              icon={<FiX size={18} />}
              aria-label="Close Chat"
              size="sm"
              onClick={() => setIsOpen(false)}
            />
            <HStack >
              <Text fontWeight="bold" color={'white'}>گفتگو بات</Text>
              <FaRegComments color="white" fontSize={'30px'} />
            </HStack>
          </HStack>
          {/* Messages */}
          <VStack
            flex="1"
            p={2}
            spacing={2}
            align="stretch"
            overflowY="auto"
            bgColor={'#C3C3C3'}
            borderTopRightRadius={'13px'}
            borderTopLeftRadius={'13px'}
          >
            {chatHistory?.map((chat, index) => {
              const isLast = index === chatHistory.length - 1;

              return (
                <Box
                  key={chat.id}
                  id={chat.role === 2 ? 'user' : 'bot'}
                  alignSelf={chat.role === 2 ? 'flex-start' : 'flex-end'}
                  border={'.3px'}
                  bgColor={chat.role === 2 ? '#3646B3' : '#FFFFFF'}
                  px={'18px'}
                  py={'5px'}
                  borderRadius={'20px'}
                  borderBottomRightRadius={chat.role === 2 ? '0px' : '20px'}
                  w={'auto'}
                  maxW={'80%'}
                  mb={'15px'}
                  boxShadow="0px 1px 5.6px 0px #0000001A"
                  justifyContent={'start'}
                >
                  {
                    chat.role != 2
                      ?
                      <Box
                        padding={"5px"}
                        borderRadius={"30px"}

                      >
                        <ReactMarkdown
                          remarkPlugins={[remarkBreaks]}
                          components={{
                            h1: (props) => (
                              <Heading as="h2" size="lg" my={2} {...props} />
                            ),
                            h2: (props) => (
                              <Heading as="h3" size="md" my={2} {...props} />
                            ),
                            h3: (props) => (
                              <Heading as="h4" size="sm" my={2} {...props} />
                            ),
                            p: (props) => (
                              <Text
                                fontSize="20px"
                                fontWeight="400"
                                my={1}
                                {...props}
                              />
                            ),
                            a: ({ href, children }) => (
                              <Link
                                href={href}
                                color="blue.500"
                                isExternal
                                _hover={{
                                  textDecoration: "underline",
                                  color: "blue.600",
                                }}
                              >
                                {children}
                              </Link>
                            ),
                          }}
                        >
                          {chat?.content}
                        </ReactMarkdown>
                      </Box>
                      :
                      <Text
                        fontSize={chat.role === 2 ? '13px' : '14px'}
                        fontWeight={'400'}
                        whiteSpace="pre-wrap"
                        color={chat.role === 2 ? 'white' : 'black'}
                      >
                        {chat.content}
                      </Text>
                  }


                  {isStreaming && chat.role !== 2 && isLast && (

                    <LoadingDots size="sm" color="blue.500" conditionStream={conditionStream} />
                  )}
                </Box>
              );
            })}

            <div ref={messagesEndRef} />
          </VStack>

          {/* Input */}
          <HStack w={'100%'} gap={'1px'} bgColor={'#C3C3C3'}>
            <IconButton icon={<IoAdd color="#BCBCBC" />} bgColor={'#FFFFFF'} height={'29px'} />
            <HStack p={1} borderTop="1px solid #ddd" bgColor={'#FFFFFF'} borderRadius={'5px'} height={'29px'} w={'100%'} paddingY={'0px'}>
              <AiFillAudio color="#BCBCBC" width={'29px'} height={'29px'} />
              <Input
                placeholder="نوشتن متن..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit(input)}
                color={'black'}
                height={'auto'}
                bgColor={'#EBEBEB'}
                w={'100%'}
              />
              <IoSend color="#29CCCC" onClick={e => handleSubmit(input)} style={{ transform: 'rotate(180deg)' }} cursor={'pointer'} />
            </HStack>
          </HStack>
        </Box>
      )}
    </>
  );
}
