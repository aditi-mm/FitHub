import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import theme from "@/styles/theme";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Flex height={"100vh"} direction={"column"}> {/* Use Chakra UI theme color */}
        <Navbar />
        <Component {...pageProps} />
      </Flex>
    </ChakraProvider>
  );
}
