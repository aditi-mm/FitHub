export interface InitialConfig {
    name: string;
    age: number;
    workout_location: string;
};

export interface UserChatMessage {
    initial_config?: InitialConfig;
    user_message?: string;
    thread_id?: string;
};

export interface GymieChatMessage {
    message: string;
    thread_id: string;
    is_finished: boolean;
};

export interface Exercise {
    exercise_name: string;
    number_sets?: number;
    number_reps?: number;
    duration?: number;
    notes?: string;
}

export interface WorkoutPlan {
    Monday: {
        description: string;
        exercises: Exercise[];
    },
    Tuesday: {
        description: string;
        exercises: Exercise[];
    },
    Wednesday: {
        description: string;
        exercises: Exercise[];
    },
    Thursday: {
        description: string;
        exercises: Exercise[];
    },
    Friday: {
        description: string;
        exercises: Exercise[];
    },
    Saturday: {
        description: string;
        exercises: Exercise[];
    },
    Sunday: {
        description: string;
        exercises: Exercise[];
    }
}