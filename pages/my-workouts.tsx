import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Text, useTheme } from '@chakra-ui/react';
import Image from 'next/image';
import MondayImage from '/public/images/monday.png';
import TuesdayImage from '/public/images/tuesday.png';
import WednesdayImage from '/public/images/wednesday.png';
import ThursdayImage from '/public/images/thursday.png';
import FridayImage from '/public/images/friday.png';
import SaturdayImage from '/public/images/saturday.png';
import SundayImage from '/public/images/sunday.png';
import { useState } from 'react';
import ViewWorkout from '@/components/ViewWorkout';
import { useSelector } from 'react-redux';
import { selectWorkoutPlan } from '@/slices/userSlice';
import { Exercise, WorkoutPlan } from '@/types';

const WorkoutPlanPage: React.FC = () => {
    const theme = useTheme();

    const workoutPlan: WorkoutPlan = useSelector(selectWorkoutPlan);

    const [day, setDay] = useState('Monday');
    const [description, setDescription] = useState('Start your week with a full-body strength training session.');
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Box p={4}>
            <ViewWorkout isOpen={isOpen} onClose={() => setIsOpen(false)} day={day} description={description} exercises={exercises} />
            <Heading as="h1" mb={4}>Your Week in Workouts</Heading>
            <Flex flexWrap="wrap" justifyContent="space-between">
                {
                    // Loop over all keys in the workoutPlan object
                    Object.keys(workoutPlan).map((day, index) => {
                        // Get the image for the day
                        let image = MondayImage;
                        switch (day) {
                            case 'Monday':
                                image = MondayImage;
                                break;
                            case 'Tuesday':
                                image = TuesdayImage;
                                break;
                            case 'Wednesday':
                                image = WednesdayImage;
                                break;
                            case 'Thursday':
                                image = ThursdayImage;
                                break;
                            case 'Friday':
                                image = FridayImage;
                                break;
                            case 'Saturday':
                                image = SaturdayImage;
                                break;
                            case 'Sunday':
                                image = SundayImage;
                                break;
                        }
                        // Return a Card component for each day
                        return (
                            <Card
                                key={index}
                                width={{ base: '100%', md: '48%' }}
                                mb={4}
                                borderColor={theme.colors.gray[200]}
                                borderWidth="1px"
                                borderRadius="lg"
                            >
                                <CardHeader bg={theme.colors.primary[500]} py={2} px={4} borderTopRadius="lg">
                                    <Heading as="h2" size="md" color="white">{day}</Heading>
                                </CardHeader>
                                <Image src={image} alt={`Workout for ${day}`} />
                                <CardBody>
                                    <Text mt={2}>{workoutPlan[day as keyof typeof workoutPlan].description}</Text>
                                </CardBody>
                                <CardFooter bg={theme.colors.gray[50]} borderBottomRadius="lg" py={2} px={4}>
                                    <Flex gap={4}>
                                        <Button colorScheme="primary.500" variant="outline"
                                            onClick={() => {
                                                setDay(day);
                                                setDescription(workoutPlan[day as keyof typeof workoutPlan].description);
                                                setExercises(workoutPlan[day as keyof typeof workoutPlan].exercises);
                                                setIsOpen(true);
                                            }}
                                        >View</Button>
                                        <Button colorScheme="tertiary">Start</Button>
                                    </Flex>
                                </CardFooter>
                            </Card>
                        );
                    })
                }
            </Flex>
        </Box>
    );
};

export default WorkoutPlanPage;
