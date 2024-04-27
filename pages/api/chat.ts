// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from "next";
import OpenAI from "openai";
import {GymieChatMessage, InitialConfig, UserChatMessage} from "@/types";

const openai = new OpenAI();
const ASSISTANT_ID = "asst_z7VUrJOky5IuIl2b47N5JgVz"


const WORKOUT_DELIMITER = "NOW STARTING WORKOUT";
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== 'POST') {
        res.status(405).send({message: 'Only POST requests allowed'})
        return
    }

    let userChatMessage: UserChatMessage = req.body;
    let threadId = null;
    let userMessage = null;
    if (userChatMessage.initial_config !== undefined) {
        // format the string to take initial_config.name
        let initialConfig: InitialConfig = userChatMessage.initial_config;
        userMessage = `My name is ${initialConfig.name}. I am ${initialConfig.age} years old and I work out at ${initialConfig.workout_location}.`;
        let thread = await openai.beta.threads.create();
        threadId = thread.id;
    } else {
        userMessage = userChatMessage.user_message;
        threadId = userChatMessage.thread_id;
    }

    // TODO: error handling

    await openai.beta.threads.messages.create(
        threadId,
        {
            role: "user",
            content: userMessage
        }
    );

    let run = await openai.beta.threads.runs.createAndPoll(
        threadId,
        {
            assistant_id: ASSISTANT_ID
        }
    );

    let messageFromAssistant = null;
    let isFinished = false;

    if (run.status === 'completed') {
        const messages = await openai.beta.threads.messages.list(
            run.thread_id
        );

        let newMessage = messages.data[0];
        messageFromAssistant = newMessage.content[0].text.value;
    } else if (run.status === 'requires_action') {

        messageFromAssistant = run.required_action?.submit_tool_outputs.tool_calls[0].function.arguments;
        // console.log(run.required_action)
        // console.log(run.required_action?.submit_tool_outputs)
        // console.log(run.required_action?.submit_tool_outputs.tool_calls)
        // console.log("Length of tools_calls is " + run.required_action?.submit_tool_outputs.tool_calls.length)
        //
        // let tool_id = run.required_action?.submit_tool_outputs.tool_calls[0].id;
        // run = await openai.beta.threads.runs.submitToolOutputsAndPoll(
        //     run.thread_id,
        //     run.id,
        //     { tool_outputs: [{
        //             tool_call_id: tool_id,
        //             output: "None",
        //         }] },
        // );
        //
        // let messages_ignored = await openai.beta.threads.messages.list(
        //     run.thread_id
        // );

        isFinished = true;
    }

    // create a GymieChatMessage
    let gymieChatMessage: GymieChatMessage = {
        message: messageFromAssistant,
        thread_id: threadId,
        is_finished: isFinished
    };

    return res.status(200).json(gymieChatMessage);
}
