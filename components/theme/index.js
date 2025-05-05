// theme.ts or theme.js
import { extendTheme, withDefaultColorScheme, defineStyleConfig } from "@chakra-ui/react";

export const getTheme = (language) => {
  const isFa = language === "fa";

  return extendTheme(
    {
      direction: isFa ? "rtl" : "rtl",
      styles: {
        global: {
          html: {
            fontSize: "14px",
          },
          body: {
            bg: "white",
          },
        },
      },
      fonts: {
        heading: isFa ? "Estedadfd" : "Estedad",
        body: isFa ? "Estedadfd" : "Estedad",
      },
      components: {
        FormLabel: defineStyleConfig({
          baseStyle: {
            fontWeight: "bold",
            fontSize: "sm",
          },
        }),
        FormErrorMessage: defineStyleConfig({
          baseStyle: {
            mt: 0,
            fontSize: "xs",
          },
        }),
      },
    },
    withDefaultColorScheme({ colorScheme: "facebook" })
  );
};
