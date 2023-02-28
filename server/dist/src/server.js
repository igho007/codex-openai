"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const openai_1 = require("openai");
const config_json_1 = __importDefault(require("../config.json"));
const configuration = new openai_1.Configuration({
    apiKey: config_json_1.default.OpenAiKey,
});
const openai = new openai_1.OpenAIApi(configuration);
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", async (_, res) => {
    res.status(200).send({ msg: "Hello from codex" });
});
app.post("/", async (req, res) => {
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
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ err });
    }
});
console.log(123);
app.listen(4000, () => console.log("listening to port 4000"));
//# sourceMappingURL=server.js.map