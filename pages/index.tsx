import Head from "next/head";
import { Flex, Heading, Text } from "@chakra-ui/react";
import ChatInterface from "@/components/ChatInterface";

export default function Home() {
  return (
    <>
      <Head>
        <title>FitHub - Your Personal Fitness Assistant</title>
        <meta
          name="description"
          content="FitHub - Your personal fitness assistant. Get started on your fitness journey today!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        direction="column"
        align="center"
        justify="center"
        h="full"
        bg="background.50" // Use Chakra UI theme color
        padding={4}
      >
        <Text fontSize="lg" color="onSurface"> {/* Use Chakra UI theme color */}
          {`Welcome to FitHub, your personal fitness assistant. Let's get started!`}
        </Text>
        <ChatInterface />
      </Flex>
    </>
  );
}
