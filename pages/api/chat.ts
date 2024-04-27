// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
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
    let thread =  await openai.beta.threads.create();
    threadId = thread.id;
  } else {
    userMessage = userChatMessage.user_message;
    threadId = userChatMessage.thread_id;
  }

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

  if (run.status === 'completed') {
    const messages = await openai.beta.threads.messages.list(
        run.thread_id
    );

    let newMessage = messages.data[0];
    messageFromAssistant = newMessage.content[0].text.value;
  } else {
    console.log(run.status);
    messageFromAssistant = "Sorry, I'm still learning. Try again later."
  }

  let isFinished = false;
  if (messageFromAssistant.includes(WORKOUT_DELIMITER)) {
    // extract everything that comess after "NOW STARTING WORKOUT"
    let startIndex = messageFromAssistant.indexOf(WORKOUT_DELIMITER) + WORKOUT_DELIMITER.length;
    let endIndex = messageFromAssistant.length;
    messageFromAssistant = messageFromAssistant.slice(startIndex, endIndex);
    isFinished = true;
  }

  // create a GymieChatMessage
  let gymieChatMessage: GymieChatMessage = {
    message: messageFromAssistant,
    thread_id: threadId,
    is_finished: isFinished
  };

  return res.status(200).json(gymieChatMessage);








  // const assistant = await openai.beta.assistants.create({
  //   name: "Gymie",
  //   instructions: "You are a personal fitness coach. You create personalized workouts for people based on their goals, workout location, any injuries, and available fitness equipment. You breakdown these workouts by day and provide the number of sets and reps for each exercise, if applicable",
  //   model: "gpt-4-turbo"
  // });

}
