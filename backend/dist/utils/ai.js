"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRoast = generateRoast;
const axios_1 = __importDefault(require("axios"));
// OpenRouter-only implementation
// Env:
// - OPENROUTER_API_KEY: required (https://openrouter.ai/api/v1)
// - AI_BASE_URL: optional override (default https://openrouter.ai/api/v1)
// - AI_MODEL: optional (default deepseek/deepseek-chat:free)
// - OPENROUTER_SITE_URL: optional header for OpenRouter (HTTP-Referer)
// - OPENROUTER_APP_TITLE: optional header for OpenRouter (X-Title)
function generateRoast(content) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const apiKey = process.env.OPENROUTER_API_KEY;
        if (!apiKey) {
            throw new Error("Missing OPENROUTER_API_KEY in environment");
        }
        const baseURL = process.env.AI_BASE_URL || "https://openrouter.ai/api/v1";
        const model = process.env.AI_MODEL || "deepseek/deepseek-chat-v3-0324:free";
        try {
            const response = yield axios_1.default.post(`${baseURL}/chat/completions`, {
                model,
                messages: [
                    {
                        role: "system",
                        content: "You are a professional roaster and stand-up comic. Your sole task is to roast resumes provided to you. Respond only with humorous and creative roast content relevant to the resume's details. Do not provide explanations, feedback, or any non-roast content. Keep the roast medium-sized so an average person doesn't spend more than a minute reading it. Keep the roast level very high and stick your context to the resume content only.",
                    },
                    { role: "user", content: "Here is the resume, roast this: " + content },
                ],
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                    "HTTP-Referer": process.env.OPENROUTER_SITE_URL || "http://localhost:5173",
                    "X-Title": process.env.OPENROUTER_APP_TITLE || "Roast My Resume",
                },
                timeout: 60000,
            });
            const reply = (_d = (_c = (_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.choices) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.message) === null || _d === void 0 ? void 0 : _d.content;
            return reply || undefined;
        }
        catch (err) {
            if (axios_1.default.isAxiosError(err)) {
                const status = (_e = err.response) === null || _e === void 0 ? void 0 : _e.status;
                const providerMessage = ((_h = (_g = (_f = err.response) === null || _f === void 0 ? void 0 : _f.data) === null || _g === void 0 ? void 0 : _g.error) === null || _h === void 0 ? void 0 : _h.message) ||
                    (typeof ((_j = err.response) === null || _j === void 0 ? void 0 : _j.data) === "string" ? (_k = err.response) === null || _k === void 0 ? void 0 : _k.data : undefined);
                if (status === 401) {
                    throw new Error("OpenRouter authentication failed (401): invalid API key");
                }
                if (status === 402) {
                    throw new Error(`OpenRouter billing/access issue (402): ${providerMessage || "insufficient credit or model not accessible"}`);
                }
                if (status === 404) {
                    const currentModel = process.env.AI_MODEL || "deepseek/deepseek-chat:free";
                    throw new Error(`OpenRouter model not found (404) for '${currentModel}'. Set AI_MODEL in backend/.env to an available model for your key (e.g., 'deepseek/deepseek-chat-v3-0324:free' or 'deepseek/deepseek-chat'). See https://openrouter.ai/api/v1/models`);
                }
                throw new Error(`OpenRouter API error (${status !== null && status !== void 0 ? status : "network"}): ${providerMessage || err.message}`);
            }
            throw err;
        }
    });
}
