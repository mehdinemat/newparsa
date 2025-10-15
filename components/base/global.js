import { Global } from "@emotion/react";

export const Fonts = ({ lang }) => (
  <Global
    styles={`
      @font-face {
        font-family: 'Estedadfd';
        src: url('/fonts/estedadfd.woff2') format('woff2');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }

      @font-face {
        font-family: 'Estedad';
        src: url('/fonts/estedad.woff2') format('woff2');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }

      
      @font-face {
        font-family: 'morabba';
        src: url('/fonts/moraba/Morabba-Regular.ttf') format('truetype');
        font-weight: 400;
        font-style: normal;
        
        font-display: swap;
      }
      
           @font-face {
        font-family: 'iransans';
        src: url('/fonts/iransans/IRANSansXFaNum-UltraLight.otf') format('opentype');
        font-weight: 200;
        font-style: normal;
        font-display: swap;
      }

      @font-face {
        font-family: 'iransans';
        src: url('/fonts/iransans/IRANSansXFaNum-Thin.otf') format('opentype');
        font-weight: 100;
        font-style: normal;
        font-display: swap;
      }

      @font-face {
        font-family: 'iransans';
        src: url('/fonts/iransans/IRANSansXFaNum-Light.otf') format('opentype');
        font-weight: 300;
        font-style: normal;
        font-display: swap;
      }

      @font-face {
        font-family: 'iransans';
        src: url('/fonts/iransans/IRANSansXFaNum-Regular.otf') format('opentype');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }

      @font-face {
        font-family: 'iransans';
        src: url('/fonts/iransans/IRANSansXFaNum-Medium.otf') format('opentype');
        font-weight: 500;
        font-style: normal;
        font-display: swap;
      }

      @font-face {
        font-family: 'iransans';
        src: url('/fonts/iransans/IRANSansXFaNum-DemiBold.otf') format('opentype');
        font-weight: 600;
        font-style: normal;
        font-display: swap;
      }

      @font-face {
        font-family: 'iransans';
        src: url('/fonts/iransans/IRANSansXFaNum-Bold.otf') format('opentype');
        font-weight: 700;
        font-style: normal;
        font-display: swap;
      }

      @font-face {
        font-family: 'iransans';
        src: url('/fonts/iransans/IRANSansXFaNum-ExtraBold.otf') format('opentype');
        font-weight: 800;
        font-style: normal;
        font-display: swap;
      }

      @font-face {
        font-family: 'iransans';
        src: url('/fonts/iransans/IRANSansXFaNum-Black.otf') format('opentype');
        font-weight: 900;
        font-style: normal;
        font-display: swap;
      }

           @font-face {
        font-family: 'doran';
        src: url('/fonts/doran/Doran-Bold.otf') format('opentype');
        font-weight: 700;
        font-style: normal;
        font-display: swap;
      }
           @font-face {
        font-family: 'doran';
        src: url('/fonts/doran/Doran-Regular.otf') format('opentype');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }



      html {
        font-feature-settings: ${lang === "fa" ? `"locl", "ss01"` : "normal"};
      }
    `}
  />
);
