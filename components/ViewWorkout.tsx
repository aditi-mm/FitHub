import { Exercise } from '@/types';
import { CloseIcon } from '@chakra-ui/icons';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Text, VStack, Heading, Card, Image, Flex, Button, CardHeader, CardBody } from '@chakra-ui/react';
import React from 'react';

interface ViewWorkoutProps {
    isOpen: boolean;
    onClose: () => void;
    day: string;
    description: string;
    exercises: Exercise[];
}

const ViewWorkout: React.FC<ViewWorkoutProps> = ({ isOpen, onClose, day, description, exercises }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
            <ModalOverlay />
            <ModalContent bg="background.50" color="onSurface">
                <Flex justify={"space-between"} alignItems={"center"} px={2}>
                    <ModalHeader fontSize={"3xl"}>{day}</ModalHeader>
                    <Button onClick={onClose} bg={"none"}>
                        {/* Close icon */}
                        <CloseIcon />
                    </Button>
                </Flex>
                <ModalBody>
                    <Text fontSize={"xl"} mb={4} px={2}>{description}</Text>
                    <VStack align="start" spacing={2}>
                        {exercises.map((exercise, index) => (
                            <Card
                                key={index}
                                width={{ base: '100%', md: '48%' }}
                                mb={4}
                                borderColor="gray.200"
                                borderWidth="1px"
                                borderRadius="lg"
                            >
                                <CardHeader bg="primary.500" py={2} px={4} borderTopRadius="lg">
                                    <Heading as="h2" size="md" color="white">{exercise.exercise_name}</Heading>
                                </CardHeader>
                                <CardBody>
                                    {
                                        exercise.number_sets &&
                                        <Text mt={2}>Number of Sets: {exercise.number_sets}</Text>
                                    }
                                    {
                                        exercise.number_reps &&
                                        <Text mt={2}>Number of Reps: {exercise.number_reps}</Text>
                                    }
                                    {
                                        exercise.duration &&
                                        <Text mt={2}>Duration: {exercise.duration}</Text>
                                    }
                                    {
                                        exercise.notes &&
                                        <Text mt={2}>Notes: {exercise.notes}</Text>
                                    }
                                </CardBody>
                            </Card>
                        ))}
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ViewWorkout;
