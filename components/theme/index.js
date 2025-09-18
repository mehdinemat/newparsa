// theme.ts or theme.js
import { defineStyleConfig, extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

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
        heading: isFa ? "iransans" : "iransans",
        body: isFa ? "iransans" : "iransans",
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
