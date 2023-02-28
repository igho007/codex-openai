import cors from "cors";
import express, { Request, Response } from "express";
import { Configuration, OpenAIApi } from "openai";
import config from "../config.json";

const configuration = new Configuration({
  apiKey: config.OpenAiKey,
});

const openai = new OpenAIApi(configuration);

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", async (_, res) => {
  res.status(200).send({ msg: "Hello from codex" });
});

app.post("/", async (req: Request, res: Response) => {
  try {
    const prompt = req.body.prompt;
    console.log(prompt);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });
    console.log(123);

    res.status(200).json({ bot: response.data.choices[0].text });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
});
console.log(123);

app.listen(4000, () => console.log("listening to port 4000"));
