import { Box, Flex, Avatar, Heading } from '@chakra-ui/react';

const Navbar: React.FC = () => {
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
            <Heading as="h1" size="lg">
                FitHub
            </Heading>

            {/* Avatar on the right */}
            <Box>
                <Avatar />
            </Box>
        </Flex>
    );
};

export default Navbar;
