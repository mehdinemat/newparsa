import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const LoadingDots = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Text fontSize="14px" fontWeight="400" color="blue.500">
      درحال پردازش{dots}
    </Text>
  );
};

export default LoadingDots;
