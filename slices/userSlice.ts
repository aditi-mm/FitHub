import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { WorkoutPlan } from "@/types";

export interface UserState {
    name: string;
    age: string;
    workoutLocation: string;
    threadId: string;
    messages: string[];
    workoutPlan: WorkoutPlan;
}

const initialState: UserState = {
    name: '',
    age: '',
    workoutLocation: '',
    threadId: '',
    messages: [],
    workoutPlan: {
        Monday: {
            description: '',
            exercises: [],
        },
        Tuesday: {
            description: '',
            exercises: [],
        },
        Wednesday: {
            description: '',
            exercises: [],
        },
        Thursday: {
            description: '',
            exercises: [],
        },
        Friday: {
            description: '',
            exercises: [],
        },
        Saturday: {
            description: '',
            exercises: [],
        },
        Sunday: {
            description: '',
            exercises: [],
        },
    }
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setName: (state: { name: string; }, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setAge: (state: { age: string; }, action: PayloadAction<string>) => {
            state.age = action.payload;
        },
        setWorkoutLocation: (state: { workoutLocation: string; }, action: PayloadAction<string>) => {
            state.workoutLocation = action.payload;
        },
        setThreadId: (state: { threadId: string; }, action: PayloadAction<string>) => {
            state.threadId = action.payload;
        },
        setMessages: (state: { messages: string[]; }, action: PayloadAction<string[]>) => {
            state.messages = action.payload;
        },
        setWorkoutPlan: (state: { workoutPlan: WorkoutPlan; }, action: PayloadAction<WorkoutPlan>) => {
            state.workoutPlan = action.payload;
        },
    },
});

export const { setName, setAge, setWorkoutLocation, setThreadId, setMessages, setWorkoutPlan } = userSlice.actions;
export const selectName = (state: RootState) => state.user.name;
export const selectAge = (state: RootState) => state.user.age;
export const selectWorkoutLocation = (state: RootState) => state.user.workoutLocation;
export const selectThreadId = (state: RootState) => state.user.threadId;
export const selectMessages = (state: RootState) => state.user.messages;
export const selectWorkoutPlan = (state: RootState) => state.user.workoutPlan;

export default userSlice.reducer;
