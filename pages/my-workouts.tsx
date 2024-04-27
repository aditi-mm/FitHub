import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Image, Text, useTheme } from '@chakra-ui/react';

const WorkoutPlanPage: React.FC = () => {
    const theme = useTheme();

    const workoutDays = [
        {
            day: 'Monday',
            image: '/monday_workout_image.jpg',
            description: 'Start your week with a full-body strength training session.',
        },
        {
            day: 'Tuesday',
            image: '/tuesday_workout_image.jpg',
            description: 'Focus on cardio with a high-intensity interval training (HIIT) workout.',
        },
        {
            day: 'Wednesday',
            image: '/wednesday_workout_image.jpg',
            description: 'Engage your core and improve flexibility with a yoga session.',
        },
        {
            day: 'Thursday',
            image: '/thursday_workout_image.jpg',
            description: 'Target your lower body with a leg day workout.',
        },
        {
            day: 'Friday',
            image: '/friday_workout_image.jpg',
            description: 'Wrap up the week with a fun and energetic dance fitness class.',
        },
        // Add workout plans for the remaining days of the week if needed
    ];

    return (
        <Box p={4}>
            <Heading as="h1" mb={4}>7-Day Workout Plan</Heading>
            <Flex flexWrap="wrap" justifyContent="space-between">
                {workoutDays.map((day, index) => (
                    <Card
                        key={index}
                        width={{ base: '100%', md: '48%' }}
                        mb={4}
                        borderColor={theme.colors.gray[200]}
                        borderWidth="1px"
                        borderRadius="lg"
                    >
                        <CardHeader bg={theme.colors.primary[500]} py={2} px={4} borderTopRadius="lg">
                            <Heading as="h2" size="md" color="white">{day.day}</Heading>
                        </CardHeader>
                        <Image src={day.image} alt={`Workout for ${day.day}`} />
                        <CardBody>
                            <Text mt={2}>{day.description}</Text>
                        </CardBody>
                        <CardFooter bg={theme.colors.gray[50]} borderBottomRadius="lg" py={2} px={4}>
                            <Flex gap={4}>
                                <Button colorScheme="primary.500" variant="outline">View</Button>
                                <Button colorScheme="green">Start</Button>
                            </Flex>
                        </CardFooter>
                    </Card>
                ))}
            </Flex>
        </Box>
    );
};

export default WorkoutPlanPage;
