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