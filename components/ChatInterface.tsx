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
import { GymieChatMessage, InitialConfig, WorkoutPlan } from '@/types';
import axios from 'axios';
import { selectAge, selectName, selectThreadId, selectWorkoutLocation, setAge, setName, setThreadId, setWorkoutLocation, setWorkoutPlan } from '@/slices/userSlice';
import { useDispatch, useSelector } from "react-redux";

const ChatInterface: React.FC = () => {

    const name = useSelector(selectName);
    const age = useSelector(selectAge);
    const workoutLocation = useSelector(selectWorkoutLocation);
    const threadId = useSelector(selectThreadId);
    const getInitialMessage = () => {
        if (name === '') {
            return ['Gymie: Welcome to FitHub! My name is Gymie! What should I call you?'];
        } else if (age === '') {
            return [`Gymie: Hello, ${name}! How many years young are you?`];
        } else if (workoutLocation === '') {
            return [`Gymie: Let's pick up where we left off! Will you be working out at home, at an apartment or community facility, outdoors, or at a commercial gym?`];
        }
        return ['Gymie: Welcome back! How can I help you today?'];
    };
    const [isTyping, setIsTyping] = useBoolean();
    const [messages, setMessages] = useState<string[]>(getInitialMessage());
    const [inputValue, setInputValue] = useState<string>('');

    const dispatch = useDispatch();

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

        const userInput = inputValue;

        const newMessage = `You: ${inputValue}`;
        setMessages((messages) => [...messages, newMessage]);
        setInputValue('');

        setIsTyping.on();

        // Create a delay to simulate the AI agent's response
        if (name === '' || age === '' || workoutLocation === '') {
            setTimeout(async () => {
                // Simulate the AI agent's response
                if (name === '') {
                    dispatch(setName(userInput));
                    setMessages((messages) => [...messages, `Gymie: Nice to meet you, ${userInput}! How many years young are you?`]);
                }
                else if (age === '') {
                    dispatch(setAge(userInput));
                    setMessages((messages) => [...messages, `Gymie: Got it! Will you be working out at home, at an apartment or community facility, outdoors, or at a commercial gym?`]);
                }
                else if (workoutLocation === '') {
                    dispatch(setWorkoutLocation(userInput));
                    const initialConfig: InitialConfig = {
                        name: name,
                        age: parseInt(age),
                        workout_location: userInput,
                    };
                    // call the chat endpoint 
                    // Data is of type GymieChatMessage
                    const { data } = await axios.post<GymieChatMessage>('/api/chat', { initial_config: initialConfig });
                    dispatch(setThreadId(data.thread_id));
                    setMessages((messages) => [...messages, `Gymie: ${data.message}`]);
                }
            }, 2000);
        } else {
            // call the chat endpoint 
            // Data is of type GymieChatMessage
            const { data } = await axios.post<GymieChatMessage>('/api/chat', { user_message: userInput, thread_id: threadId });
            if (data.is_finished) {
                const workoutPlan: WorkoutPlan = JSON.parse(data.message);
                dispatch(setWorkoutPlan(workoutPlan));
                setMessages((messages) => [...messages, `Gymie: Your workout plan is ready! 🎉`]);
            } else {
                setMessages((messages) => [...messages, `Gymie: ${data.message}`]);
            }
        }

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
            height={"full"}
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
                overflowY="auto"
                direction={'column'}
                justifyContent={'space-between'}
                height={'full'}
                bg="#e0d9cc"
            >
                <Box mb={4} overflow={"scroll"} bg="#e0d9cc" maxH={"500px"}>
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
                                {
                                    // Check if string contains Your workout plan is ready
                                    message.includes('Your workout plan is ready') && (
                                        <Tag
                                            size="sm"
                                            ml={2}
                                            colorScheme="tertiary"
                                            borderRadius="full"
                                        >
                                            <TagLabel>View Plan</TagLabel>
                                            <TagCloseButton />
                                        </Tag>
                                    )
                                }
                            </Box>
                        </Flex>
                    ))}
                    {/* {
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
                    } */}
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
