// components/PhoneInput.tsx
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  Flex,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

const countries = [
  { code: "US", dialCode: "+1", label: "United States" },
  { code: "GB", dialCode: "+44", label: "United Kingdom" },
  { code: "FR", dialCode: "+33", label: "France" },
  { code: "IR", dialCode: "+98", label: "Iran" },
];

export default function PhoneInput({ fullNumber, setFullNumber }) {
  const [country, setCountry] = useState(countries[0]);
  const [number, setNumber] = useState("");

  const handleCountryChange = (e) => {
    const selected = countries.find((c) => c.code === e.target.value);
    if (selected) setCountry(selected);
  };

  const handleNumberChange = (e) => {
    const rawNumber = e.target.value;
    setNumber(rawNumber);
    setFullNumber(country.dialCode + rawNumber);
  };

  return (
    <Stack spacing={2} w={"100%"} height={"46px"}>
      <InputGroup w={"100%"} height={"46px"}>
        <Input
          dir="ltr"
          textIndent={"90px"}
          height={"46px"}
          value={number}
          onChange={handleNumberChange}
        />
        <InputRightElement width="8rem" pl={2} top={"5px"}>
          <Flex align="center">
            <Select
              value={country.code}
              onChange={handleCountryChange}
              border="none"
              fontSize="sm"
              bg="transparent"
              height={"36px"}
              pl={0}
              _hover={{ border: "none" }}
              _focusVisible={{ border: "none" }}
            >
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label} ({c.dialCode})
                </option>
              ))}
            </Select>
          </Flex>
        </InputRightElement>
      </InputGroup>
    </Stack>
  );
}
