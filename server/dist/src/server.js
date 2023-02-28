"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const openai_1 = require("openai");
const config_json_1 = __importDefault(require("../config.json"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
console.log({ config: config_json_1.default.OpenAiKey });
console.log({ dotenv: process.env.OPEN_AI });
const configuration = new openai_1.Configuration({
    apiKey: process.env.OPEN_AI,
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