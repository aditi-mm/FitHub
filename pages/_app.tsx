import Navbar from "@/components/Navbar";
import { wrapper } from "@/store";
import "@/styles/globals.css";
import theme from "@/styles/theme";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Flex height={"100vh"} direction={"column"}> {/* Use Chakra UI theme color */}
        <Navbar />
        <Component {...pageProps} />
      </Flex>
    </ChakraProvider>
  );
}

export default wrapper.withRedux(App);
