import { Exercise } from '@/types';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Text, Table } from '@chakra-ui/react';
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
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="background.50" color="onSurface">
                <ModalHeader>{day}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>{description}</Text>
                    <Table variant="simple">
                        <thead>
                            <tr>
                                <th>Exercise</th>
                                <th>Sets</th>
                                <th>Reps</th>
                                <th>Duration</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exercises.map((exercise, index) => (
                                <tr key={index}>
                                    <td>{exercise.exercise_name}</td>
                                    <td>{exercise.number_sets}</td>
                                    <td>{exercise.number_reps}</td>
                                    <td>{exercise.duration}</td>
                                    <td>{exercise.notes}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ViewWorkout;
