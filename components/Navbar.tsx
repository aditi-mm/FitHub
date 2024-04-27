import { CalendarIcon, ChatIcon } from '@chakra-ui/icons';
import { Box, Flex, Avatar, Heading, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { useRouter } from "next/router";

const Navbar: React.FC = () => {
    const router = useRouter();

    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            padding="1rem"
            bg="primary.500" // Use Chakra UI theme color
            color="white" // Text color
        >
            {/* Logo on the left */}
            <Heading as="h1" size="lg"
                onClick={
                    () => {
                        router.push('/');
                    }
                }
            >
                FitHub
            </Heading>

            {/* Avatar on the right */}
            <Box>
                <Menu>
                    <MenuButton as={Avatar} /> {/* Use Chakra UI Avatar component */}
                    <MenuList textColor={"black"}>
                        <MenuItem onClick={
                            () => {
                                router.push('/')
                            }
                        }>
                            <ChatIcon mr={2} />
                            Chat with Gymie
                        </MenuItem>
                        <MenuItem onClick={
                            () => {
                                router.push('/my-workouts')
                            }
                        }>
                            <CalendarIcon mr={2} />
                            My Workout Plan
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Box>
        </Flex>
    );
};

export default Navbar;
