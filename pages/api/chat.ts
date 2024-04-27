// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
const openai = new OpenAI();
const ASSISTANT_ID = "asst_z7VUrJOky5IuIl2b47N5JgVz"


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.status(405).send({message: 'Only POST requests allowed'})
    return
  }

  // extract the threadId from the request body
  let threadId = req.body.threadId;
  let messageFromUser = req.body.message;
  if (threadId === undefined) {
    let thread =  await openai.beta.threads.create();
    threadId = thread.id;
  }

  await openai.beta.threads.messages.create(
      threadId,
      {
        role: "user",
        content: messageFromUser
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

  return res.status(200).json({messageFromAssistant, threadId, isFinished: false});








  // const assistant = await openai.beta.assistants.create({
  //   name: "Gymie",
  //   instructions: "You are a personal fitness coach. You create personalized workouts for people based on their goals, workout location, any injuries, and available fitness equipment. You breakdown these workouts by day and provide the number of sets and reps for each exercise, if applicable",
  //   model: "gpt-4-turbo"
  // });

}
