import React, { useEffect, useState } from 'react';
import {
    Box,
    Flex,
    Input,
    Button,
    Text,
    Spacer,
    Textarea,
    Avatar,
    Tag,
    TagLabel,
    TagCloseButton,
    useBoolean,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { InitialConfig } from '@/types';
import axios from 'axios';

const ChatInterface: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [age, setAge] = useState<string>('');
    const [workoutLocation, setWorkoutLocation] = useState<string>('');
    const [isTyping, setIsTyping] = useBoolean();
    const [messages, setMessages] = useState<string[]>([
        'Gymie: What should I call you?',
    ]);
    const [inputValue, setInputValue] = useState<string>('');

    // Scrolling logic
    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (inputValue.trim() === '') return;

        const newMessage = `You: ${inputValue}`;
        setMessages((messages) => [...messages, newMessage]);

        setIsTyping.on();

        // Create a delay to simulate the AI agent's response
        if (name === '' || age === '' || workoutLocation === '') {
            setTimeout(async () => {
                // Simulate the AI agent's response
                if (name === '') {
                    setName(inputValue);
                    setMessages((messages) => [...messages, `Gymie: Nice to meet you, ${inputValue}! How many years young are you?`]);
                }
                else if (age === '') {
                    setAge(inputValue);
                    setMessages((messages) => [...messages, `Gymie: Got it! Will you be working out at home, at an apartment or community facility, outdoors, or at a commercial gym?`]);
                }
                else if (workoutLocation === '') {
                    setWorkoutLocation(inputValue);
                    setMessages((messages) => [...messages, `Gymie: Great! Let's get started with your personalized workout plan.`]);
                    const initialConfig: InitialConfig = {
                        name: name,
                        age: parseInt(age),
                        workout_location: inputValue,
                    };
                    // call the chat endpoint 
                    // const { data } = await axios.post('/api/chat', { initial_config: initialConfig });
                }
            }, 2000);
        } else {
            // 

        }

        setInputValue('');
        setIsTyping.off();
    };

    // Function to handle the click of the conversational chips
    const handleConversationalChipSelection = (value: string) => {
        setInputValue(value);
        handleSendMessage();
    };

    return (
        <Box
            width={"100%"}
            height={"100%"}
            mx="auto"
            mt={4}
            p={4}
            border="1px"
            borderColor="gray.200"
            borderRadius="lg"
            boxShadow="md"
            bg="#e0d9cc" // Use Chakra UI theme color
        >
            <Flex
                minHeight={{ base: 'full', md: 'full' }}
                overflowY="auto"
                direction={'column'}
                height={'full'}
            >
                <Box mb={4} height={'80%'} overflow={"scroll"}>
                    {messages.map((message, index) => (
                        <Flex
                            key={index}
                            mb={2}
                            alignItems="center"
                            justifyContent={message.startsWith('Gymie') ? 'flex-start' : 'flex-end'}
                        >
                            {message.startsWith('Gymie') && (
                                <Avatar name="Gymie" bg={"tertiary.500"} mr={4} />
                            )}
                            <Box
                                borderRadius="lg"
                                bg={message.startsWith('Gymie') ? 'surface.50' : 'primary.500'}
                                color={message.startsWith('Gymie') ? 'onSurface' : 'white'}
                                p={2}
                                maxWidth="70%"
                                wordBreak="break-word"
                            >
                                {message}
                            </Box>
                        </Flex>
                    ))}
                    {
                        isTyping && (
                            <Flex alignItems="center">
                                <Avatar name="Gymie" bg={"tertiary.500"} mr={4} />
                                <Box
                                    borderRadius="lg"
                                    bg="surface.50"
                                    color="onSurface"
                                    p={2}
                                    maxWidth="70%"
                                    wordBreak="break-word"
                                >
                                    Gymie is typing...
                                </Box>
                            </Flex>
                        )
                    }
                    <div id="chat-interface" ref={messagesEndRef} />
                </Box>
                <Flex alignItems={'end'}>
                    <Textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type your message..."
                        size="md"
                        flex="1"
                        mr={2}
                        bg="surface.100" // Use Chakra UI theme color
                    />
                    <Button
                        onClick={handleSendMessage}
                        size="md"
                        bg="tertiary.600" // Use Chakra UI theme color
                        _hover={{ bg: 'tertiary.50' }} // Use Chakra UI theme color
                    >
                        {/* Arrow icon from chakra ui */}
                        <ArrowForwardIcon color={"white"} />
                    </Button>
                </Flex>
            </Flex>
        </Box>
    );
};

export default ChatInterface;
