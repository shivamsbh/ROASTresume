import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import { generateRoast } from "./utils/ai";
import pdfParse from "pdf-parse";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Configure multer for file upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ message: "working" });
});

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    provider: "openrouter",
    model: process.env.AI_MODEL || "deepseek/deepseek-chat-v3-0324:free",
    baseURL: process.env.AI_BASE_URL || "https://openrouter.ai/api/v1",
    hasKey: Boolean(process.env.OPENROUTER_API_KEY),
  });
});

app.post("/save", (req: Request, res: Response) => {
  console.log(req.body?.roast);
  res.status(200).json({ id: "ajdashldas" });
});

app.post(
  "/roast/resume",
  upload.single("resume"),
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({ message: "No resume file provided" });
        return;
      }

      if (req.file.mimetype !== "application/pdf") {
        res.status(400).json({ message: "Only PDF files are supported" });
        return;
      }

      const pdfData = await pdfParse(req.file.buffer);
      const resumeContent = (pdfData.text || "").trim();

      if (!resumeContent) {
        res.status(400).json({ message: "Could not extract text from PDF" });
        return;
      }

      const roast = await generateRoast(resumeContent);
      res.status(200).json({ message: "Success", roast });
    } catch (error) {
      console.error("Error processing resume:", error);
      const message = error instanceof Error ? error.message : "Error processing resume";
      res.status(500).json({ message });
    }
  }
);

// Multer error handler (e.g., file too large)
(app as any).use((err: any, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "File too large. Max size is 5MB" });
    }
    return res.status(400).json({ message: `Upload error: ${err.message}` });
  }
  return next(err);
});

// General error handler fallback
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = Number(process.env.PORT) || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
