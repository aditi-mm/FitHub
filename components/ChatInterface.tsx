import React, { useState } from 'react';
import {
    Box,
    Flex,
    Input,
    Button,
    Text,
    Spacer,
    Textarea,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const ChatInterface: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>('');

    const handleMessageSend = () => {
        if (inputValue.trim() === '') return;
        const newMessage = `You: ${inputValue}`;
        setMessages([...messages, newMessage]);
        setInputValue('');
        // Here you would send the user input to your AI agent
        // and handle the response accordingly
    };

    return (
        <Box
            width={{ base: '100%', md: '50%' }}
            height={{ base: '50vh', md: '60vh' }}
            mx="auto"
            mt={8}
            p={4}
            border="1px"
            borderColor="gray.200"
            borderRadius="lg"
            boxShadow="md"
        >
            <Flex minHeight={{ base: 'full', md: 'full' }} overflowY="auto" direction={"column"} height={"full"}>
                <Box mb={4} height={"80%"}>
                    {messages.map((message, index) => (
                        <Text key={index} mb={2}>
                            {message}
                        </Text>
                    ))}
                </Box>
                <Flex alignItems={"end"}>
                    <Textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type your message..."
                        size="md"
                        flex="1"
                        mr={2}
                    />
                    <Button onClick={handleMessageSend} colorScheme="blue" size="md">
                        {/* Arrow icon from chakra ui */}
                        <ArrowForwardIcon />
                    </Button>
                </Flex>
            </Flex>
        </Box>
    );
};

export default ChatInterface;
