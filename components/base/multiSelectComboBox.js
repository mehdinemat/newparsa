import { Box, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import Select from "react-select";

const initialOptions = [
  { label: "React", value: "react" },
  { label: "Next.js", value: "nextjs" },
  { label: "Chakra UI", value: "chakra" },
  { label: "Tailwind", value: "tailwind" },
];

const customStyles = (bgColor, textColor) => ({
  control: (provided) => ({
    ...provided,
    backgroundColor: bgColor,
    color: textColor,
    borderColor: "#CBD5E0",
    width: "100%",
  }),
  container: (provided) => ({
    ...provided,
    width: "100%",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: bgColor,
    color: textColor,
    zIndex: 10,
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#E2E8F0",
  }),
});

export default function MultiSelectComboBox({ selectedOptions, setSelectedOptions, optionsList, setInputValue, inputValue }) {
  const [options, setOptions] = useState(optionsList || initialOptions);
  const bgColor = useColorModeValue("#FBFBFB", "#2D3748");
  const textColor = useColorModeValue("black", "white");
  console.log(optionsList)
  const handleInputChange = async (newValue) => {
    setInputValue(newValue);

    if (!newValue) {
      setOptions(optionsList);
      return;
    }

    const filtered = await fakeFetch(newValue);
    setOptions(filtered);
  };

  const handleChange = (selected) => {
    setSelectedOptions(selected || []);
    // You can also trigger something here (e.g., form update)
  };

  const fakeFetch = async (query) => {
    return optionsList.filter((opt) =>
      opt.label.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <Box width="100%" maxW="100%" mt={2}>
      <Select
        isMulti
        options={options}
        value={selectedOptions} // controlled
        onChange={handleChange} // track selection
        placeholder="موضوع خود را وارد کنید"
        styles={customStyles(bgColor, textColor)}
        onInputChange={handleInputChange}
        inputValue={inputValue}
      />
    </Box>
  );
}
