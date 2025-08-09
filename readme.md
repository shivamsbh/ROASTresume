
# 🔥 Roast My Resume

A hilarious web application that roasts your resume using AI-powered humor. Upload your PDF resume and get ready for some brutal (but entertaining) feedback!

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Environment Configuration](#environment-configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Frontend Architecture](#frontend-architecture)
- [Backend Architecture](#backend-architecture)
- [Development Workflow](#development-workflow)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

**Roast My Resume** is a full-stack web application that provides humorous critiques of resumes using AI. The application takes a user's resume in PDF format and generates a comedic "roast" using OpenRouter's DeepSeek AI model, highlighting aspects of the resume in a lighthearted and entertaining way.

### Key Highlights
- **AI-Powered Humor**: Uses DeepSeek's chat completion API via OpenRouter
- **PDF Processing**: Extracts and analyzes text from uploaded PDF resumes
- **Modern UI**: Clean, responsive design with dark theme
- **Real-time Processing**: Instant feedback with loading states
- **Type-Safe**: Full TypeScript implementation across frontend and backend

## ✨ Features

### Core Features
- 📄 **PDF Resume Upload**: Drag-and-drop or click-to-upload PDF files
- 🤖 **AI-Generated Roasts**: Humorous critiques powered by DeepSeek AI
- 💡 **Real-time Processing**: Live feedback with loading indicators
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- 🎨 **Dark Theme UI**: Modern, eye-friendly dark interface
- ⚡ **Fast Performance**: Optimized with Vite and efficient backend

### Technical Features
- 🔒 **Type Safety**: Full TypeScript implementation
- 📊 **Error Handling**: Comprehensive error management and user feedback
- 🛡️ **File Validation**: PDF-only uploads with size restrictions (5MB max)
- 🔄 **Health Monitoring**: Backend health check endpoint
- 📈 **Analytics**: Integrated Vercel Analytics for usage tracking

## 🛠️ Tech Stack

### Frontend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | ^18.3.1 | UI library for building interactive components |
| **TypeScript** | ~5.6.2 | Type-safe JavaScript development |
| **Vite** | ^6.0.1 | Lightning-fast build tool and dev server |
| **Tailwind CSS** | ^3.4.16 | Utility-first CSS framework |
| **Framer Motion** | ^11.14.0 | Animation library for smooth interactions |
| **Lucide React** | ^0.468.0 | Beautiful, customizable SVG icons |
| **Axios** | ^1.7.9 | HTTP client for API requests |
| **React Router DOM** | ^7.0.2 | Client-side routing |
| **PDF.js** | ^4.9.155 | PDF rendering and text extraction |
| **Vercel Analytics** | ^1.4.1 | Performance and usage analytics |

### Backend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | - | JavaScript runtime environment |
| **Express.js** | ^4.21.2 | Web application framework |
| **TypeScript** | ^5.6.3 | Type-safe server-side development |
| **Multer** | ^1.4.5-lts.1 | Middleware for handling file uploads |
| **pdf-parse** | ^1.1.1 | PDF text extraction library |
| **Axios** | ^1.7.9 | HTTP client for AI API requests |
| **CORS** | ^2.8.5 | Cross-Origin Resource Sharing middleware |
| **dotenv** | ^16.4.7 | Environment variable management |

### AI & External Services
- **OpenRouter API**: AI model routing service
- **DeepSeek Chat v3**: Advanced language model for generating roasts
- **Vercel**: Deployment and analytics platform

## 📁 Project Structure

```
ROASTresume/
├── 📄 readme.md                    # This comprehensive documentation
├── 🖥️ frontend/                    # React frontend application
│   ├── 📦 package.json             # Frontend dependencies and scripts
│   ├── ⚙️ vite.config.ts           # Vite build configuration
│   ├── 🎨 tailwind.config.js       # Tailwind CSS configuration
│   ├── 📝 tsconfig.json            # TypeScript configuration
│   ├── 🌐 index.html               # Main HTML template
│   ├── 🔧 .env.example             # Environment variables template
│   ├── 📂 src/
│   │   ├── 🚀 main.tsx              # Application entry point
│   │   ├── 📱 App.tsx               # Main React component
│   │   ├── 🎨 App.css               # Component-specific styles
│   │   ├── 🎨 index.css             # Global styles and Tailwind imports
│   │   ├── 🔧 vite-env.d.ts         # Vite environment type definitions
│   │   └── 📂 assets/               # Static assets (icons, images)
│   └── 📂 public/                   # Public static files
└── 🖥️ backend/                     # Express.js backend server
    ├── 📦 package.json              # Backend dependencies and scripts
    ├── 🔧 tsconfig.json             # TypeScript configuration
    ├── 🔧 .env.example              # Environment variables template
    └── 📂 src/
        ├── 🚀 index.ts              # Express server entry point
        └── 📂 utils/
            └── 🤖 ai.ts             # OpenRouter AI integration utilities
```

## 🚀 Installation & Setup

### Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download here](https://git-scm.com/)
- **OpenRouter API Key** - [Get one here](https://openrouter.ai/)

### Step-by-Step Installation

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd ROASTresume
```

#### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file from template
cp .env.example .env

# Edit .env file with your configuration (see Environment Configuration section)
nano .env  # or use your preferred editor
```

#### 3. Frontend Setup
```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Create environment file from template
cp .env.example .env

# Edit .env file with backend URL
nano .env  # or use your preferred editor
```

#### 4. Build and Start

**Option A: Development Mode (Recommended for development)**
```bash
# Terminal 1: Start backend in development mode
cd backend
npm run dev

# Terminal 2: Start frontend in development mode
cd frontend
npm run dev
```

**Option B: Production Build**
```bash
# Build backend
cd backend
npm run build
npm start

# Build and serve frontend
cd frontend
npm run build
npm run preview
```

## ⚙️ Environment Configuration

### Backend Environment Variables (`backend/.env`)

Create a `.env` file in the `backend` directory with the following configuration:

```env
# 🔑 REQUIRED: OpenRouter API Key
# Get your key from: https://openrouter.ai/
OPENROUTER_API_KEY=your_openrouter_api_key_here

# 🔧 OPTIONAL: API Configuration
# Override the default OpenRouter API base URL
AI_BASE_URL=https://openrouter.ai/api/v1

# Override the default AI model
AI_MODEL=deepseek/deepseek-chat-v3-0324:free

# 🏷️ OPTIONAL: OpenRouter Attribution Headers
# Your website URL for OpenRouter attribution
OPENROUTER_SITE_URL=http://localhost:5173

# Your application title for OpenRouter
OPENROUTER_APP_TITLE=Roast My Resume

# 🌐 OPTIONAL: Server Configuration
# Port for the Express server (default: 3001)
PORT=3001
```

### Frontend Environment Variables (`frontend/.env`)

Create a `.env` file in the `frontend` directory:

```env
# 🌐 Backend API URL
# URL where your backend server is running (no trailing slash)
# For local development:
VITE_BACKEND_URL=http://localhost:3001

# For production, replace with your deployed backend URL:
# VITE_BACKEND_URL=https://your-backend-domain.com
```

### Environment Variable Details

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `OPENROUTER_API_KEY` | ✅ Yes | - | Your OpenRouter API key for AI model access |
| `AI_BASE_URL` | ❌ No | `https://openrouter.ai/api/v1` | OpenRouter API base URL |
| `AI_MODEL` | ❌ No | `deepseek/deepseek-chat-v3-0324:free` | AI model to use for roasts |
| `OPENROUTER_SITE_URL` | ❌ No | `http://localhost:5173` | Attribution URL for OpenRouter |
| `OPENROUTER_APP_TITLE` | ❌ No | `Roast My Resume` | Attribution title for OpenRouter |
| `PORT` | ❌ No | `3001` | Backend server port |
| `VITE_BACKEND_URL` | ✅ Yes | - | Frontend's backend API endpoint |

## 📖 Usage

### For End Users

1. **Access the Application**
   - Open your browser and navigate to the frontend URL
   - Local development: `http://localhost:5173`

2. **Upload Your Resume**
   - Drag and drop your PDF resume onto the upload area
   - Or click "Choose file" to select from your computer
   - ⚠️ **Requirements**: PDF format only, maximum 5MB file size

3. **Generate Your Roast**
   - Click the "Generate Roast!" button
   - Wait for the AI to process your resume (usually 10-30 seconds)
   - Enjoy your personalized roast! 🔥

4. **Share and Enjoy**
   - Share your roast with friends (carefully! 😄)
   - Upload a different resume to get a new roast

### For Developers

```bash
# Start development servers
npm run dev  # In both frontend and backend directories

# Build for production
npm run build  # In both directories

# Run type checking
npx tsc --noEmit  # Check TypeScript without emitting files

# Lint code (frontend)
npm run lint
```

## 🔌 API Documentation

### Base URL
- **Development**: `http://localhost:3001`
- **Production**: Your deployed backend URL

### Endpoints

#### 1. Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "provider": "openrouter",
  "model": "deepseek/deepseek-chat-v3-0324:free",
  "baseURL": "https://openrouter.ai/api/v1",
  "hasKey": true
}
```

#### 2. Root Endpoint
```http
GET /
```

**Response:**
```json
{
  "message": "working"
}
```

#### 3. Generate Resume Roast
```http
POST /roast/resume
Content-Type: multipart/form-data
```

**Request Body:**
- `resume`: PDF file (multipart/form-data)

**Success Response (200):**
```json
{
  "message": "Success",
  "roast": "Your hilarious AI-generated roast text here..."
}
```

**Error Responses:**

*400 - No file provided:*
```json
{
  "message": "No resume file provided"
}
```

*400 - Invalid file type:*
```json
{
  "message": "Only PDF files are supported"
}
```

*400 - File too large:*
```json
{
  "message": "File too large. Max size is 5MB"
}
```

*400 - PDF parsing failed:*
```json
{
  "message": "Could not extract text from PDF"
}
```

*500 - Server error:*
```json
{
  "message": "Error processing resume"
}
```

#### 4. Save Roast (Placeholder)
```http
POST /save
Content-Type: application/json
```

**Request Body:**
```json
{
  "roast": "The roast content to save"
}
```

**Response:**
```json
{
  "id": "ajdashldas"
}
```

## 🏗️ Frontend Architecture

### Component Structure

#### Main Application (`App.tsx`)
The application consists of a single-page React component with two main states:

1. **Upload State**: File upload interface with drag-and-drop functionality
2. **Roast Display State**: Shows the generated roast in a formatted layout

### Key Features Implementation

#### File Upload Handling
```typescript
// Drag and drop support
function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
  e.preventDefault();
  e.stopPropagation();
  e.dataTransfer.dropEffect = "copy";
}

function handleDrop(e: React.DragEvent<HTMLDivElement>) {
  e.preventDefault();
  e.stopPropagation();
  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
    setFile(e.dataTransfer.files[0]);
    e.dataTransfer.clearData();
  }
}
```

#### API Integration
```typescript
async function handleGenerateRoast() {
  const formData = new FormData();
  formData.append("resume", file);
  
  const response = await fetch(`${BACKEND_URL}/roast/resume`, {
    method: "POST",
    body: formData,
  });
  
  const data = await response.json();
  setRoast(data.roast);
}
```

### Styling Architecture

#### Tailwind CSS Configuration
- **Dark Theme**: Primary background `#0e0e0e`
- **Accent Colors**: Red theme (`red-500`, `red-600`)
- **Responsive Design**: Mobile-first approach with `md:` and `lg:` breakpoints
- **Custom Utilities**: Extended spacing and color utilities

#### Typography
- **Primary Font**: System fonts with fallbacks
- **Heading Font**: `font-mono` for the main title
- **Font Weights**: `font-black` for headings, `font-semibold` for buttons

### State Management

```typescript
interface AppState {
  file: File | null;           // Uploaded PDF file
  isLoading: boolean;          // Loading state during API call
  roast: string;              // Generated roast content
}
```

## 🔧 Backend Architecture

### Server Structure (`index.ts`)

#### Express.js Configuration
```typescript
const app = express();
app.use(cors());                    // Enable CORS for frontend communication
app.use(express.json());            // Parse JSON request bodies
```

#### File Upload Configuration
```typescript
const upload = multer({
  storage: multer.memoryStorage(),   // Store files in memory
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});
```

### PDF Processing Pipeline

1. **File Validation**
   - Check file presence
   - Validate MIME type (`application/pdf`)
   - Enforce size limits

2. **Text Extraction**
   ```typescript
   const pdfData = await pdfParse(req.file.buffer);
   const resumeContent = (pdfData.text || "").trim();
   ```

3. **AI Processing**
   ```typescript
   const roast = await generateRoast(resumeContent);
   ```

### AI Integration (`utils/ai.ts`)

#### OpenRouter Configuration
```typescript
const baseURL = process.env.AI_BASE_URL || "https://openrouter.ai/api/v1";
const model = process.env.AI_MODEL || "deepseek/deepseek-chat-v3-0324:free";
```

#### AI Prompt Engineering
```typescript
const systemPrompt = `You are a professional roaster and stand-up comic. 
Your sole task is to roast resumes provided to you. Respond only with 
humorous and creative roast content relevant to the resume's details. 
Do not provide explanations, feedback, or any non-roast content. 
Keep the roast medium-sized so an average person doesn't spend more 
than a minute reading it. Keep the roast level very high and stick 
your context to the resume content only.`;
```

#### Error Handling
- **401 Unauthorized**: Invalid API key
- **402 Payment Required**: Insufficient credits or model access
- **404 Not Found**: Invalid model specification
- **Network Errors**: Timeout and connection issues

### Security Features

1. **File Type Validation**: Only PDF files accepted
2. **File Size Limits**: 5MB maximum to prevent abuse
3. **CORS Configuration**: Controlled cross-origin access
4. **Input Sanitization**: PDF text extraction with validation
5. **Error Information Limiting**: No sensitive data in error responses

## 🔄 Development Workflow

### Code Quality

#### TypeScript Configuration
- **Strict Mode**: Enabled for both frontend and backend
- **ES2016 Target**: Modern JavaScript features
- **Module System**: ESModules for frontend, CommonJS for backend

#### Linting and Formatting
```bash
# Frontend linting
cd frontend
npm run lint

# Type checking
npx tsc --noEmit
```

### Build Process

#### Frontend Build (Vite)
```bash
npm run build
# Outputs to: frontend/dist/
```

#### Backend Build (TypeScript Compiler)
```bash
npm run build
# Outputs to: backend/dist/
```

### Development Scripts

| Command | Directory | Purpose |
|---------|-----------|---------|
| `npm run dev` | frontend | Start Vite dev server with HMR |
| `npm run dev` | backend | Build and start Node.js server |
| `npm run build` | both | Compile TypeScript and build assets |
| `npm start` | backend | Run compiled JavaScript |
| `npm run preview` | frontend | Preview production build locally |
| `npm run lint` | frontend | Run ESLint checks |

## 🚀 Deployment

### Frontend Deployment (Vercel - Recommended)

1. **Connect Repository**
   ```bash
   # Deploy with Vercel CLI
   npm i -g vercel
   cd frontend
   vercel
   ```

2. **Environment Variables**
   - Add `VITE_BACKEND_URL` in Vercel dashboard
   - Set to your deployed backend URL

3. **Build Configuration**
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Backend Deployment Options

#### Option 1: Railway
```bash
# Deploy to Railway
npm i -g @railway/cli
railway login
railway init
railway up
```

#### Option 2: Heroku
```bash
# Deploy to Heroku
npm i -g heroku
heroku create your-app-name
git push heroku main
```

#### Option 3: Digital Ocean App Platform
1. Connect your GitHub repository
2. Set environment variables in the dashboard
3. Configure build and run commands

### Environment Variables for Production

#### Backend Production Environment
```env
OPENROUTER_API_KEY=your_production_api_key
AI_MODEL=deepseek/deepseek-chat-v3-0324:free
OPENROUTER_SITE_URL=https://your-frontend-domain.com
OPENROUTER_APP_TITLE=Roast My Resume
PORT=3001
```

#### Frontend Production Environment
```env
VITE_BACKEND_URL=https://your-backend-domain.com
```

### Deployment Checklist

- [ ] Environment variables configured
- [ ] OpenRouter API key is valid and has credits
- [ ] CORS settings allow your frontend domain
- [ ] Backend URL is correctly set in frontend environment
- [ ] Build processes complete without errors
- [ ] Health endpoint returns successful response
- [ ] PDF upload functionality works end-to-end

## 🤝 Contributing

### Getting Started

1. **Fork the Repository**
2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Your Changes**
   - Follow existing code style
   - Add TypeScript types for new functionality
   - Update documentation if needed

4. **Test Your Changes**
   ```bash
   # Test backend
   cd backend
   npm run build
   npm start

   # Test frontend
   cd frontend
   npm run lint
   npm run build
   ```

5. **Commit and Push**
   ```bash
   git commit -m "Add amazing feature"
   git push origin feature/amazing-feature
   ```

6. **Create Pull Request**

### Development Guidelines

#### Code Style
- Use **TypeScript** for all new code
- Follow **React best practices** for components
- Use **async/await** for asynchronous operations
- Implement proper **error handling**

#### Commit Messages
- Use clear, descriptive commit messages
- Start with verb: "Add", "Fix", "Update", "Remove"
- Reference issue numbers when applicable

#### Pull Request Guidelines
- Include description of changes
- Add screenshots for UI changes
- Ensure all tests pass
- Update documentation if needed

## 🐛 Troubleshooting

### Common Issues and Solutions

#### Backend Issues

**Issue: "Missing OPENROUTER_API_KEY in environment"**
```bash
# Solution: Add API key to backend/.env
echo "OPENROUTER_API_KEY=your_key_here" >> backend/.env
```

**Issue: "OpenRouter authentication failed (401)"**
- Verify your API key is correct
- Check if your OpenRouter account has sufficient credits
- Ensure no extra spaces in the .env file

**Issue: "OpenRouter model not found (404)"**
- Check if the AI_MODEL in your .env is correct
- Visit https://openrouter.ai/api/v1/models to see available models
- Try using the default: `deepseek/deepseek-chat-v3-0324:free`

**Issue: "File too large" error**
- PDF file exceeds 5MB limit
- Compress your PDF or use a smaller file
- File size limit is configured in `backend/src/index.ts`

#### Frontend Issues

**Issue: "Network Error" when uploading**
- Check if backend is running on correct port
- Verify VITE_BACKEND_URL in frontend/.env
- Ensure CORS is properly configured

**Issue: Build errors in frontend**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Issue: Tailwind styles not loading**
- Check that `index.css` imports are correct
- Verify `tailwind.config.js` content paths
- Restart the development server

#### PDF Processing Issues

**Issue: "Could not extract text from PDF"**
- PDF might be image-based (scanned document)
- Try using a text-based PDF
- Check if PDF is corrupted or password-protected

**Issue: Empty or garbled text extraction**
- Some PDFs have complex formatting
- Try recreating the PDF with simpler formatting
- Use a different PDF creation tool

### Debug Mode

#### Backend Debugging
```bash
# Add debug logging to ai.ts
console.log("PDF content:", resumeContent.substring(0, 200));
console.log("AI response:", response.data);
```

#### Frontend Debugging
```javascript
// Add to App.tsx for debugging
console.log("File uploaded:", file);
console.log("Backend URL:", VITE_BACKEND_URL);
console.log("API response:", data);
```

### Performance Issues

**Issue: Slow AI response times**
- OpenRouter free tier has rate limits
- Consider upgrading to paid OpenRouter plan
- Check OpenRouter status page for service issues

**Issue: Large bundle size**
- Audit dependencies: `npm run build -- --analyze`
- Remove unused imports
- Consider code splitting for larger applications

### Getting Help

1. **Check the Issues**: Look for similar problems in GitHub issues
2. **Debug Logs**: Enable console logging to identify the problem
3. **Documentation**: Review this README and official docs
4. **Community**: Ask questions in discussions or create an issue.

## 🙏 Acknowledgments

- **OpenRouter** for providing AI model access
- **DeepSeek** for the excellent language model
- **Vercel** for hosting and analytics
- **React & Vite teams** for amazing development tools
- **Tailwind CSS** for the utility-first CSS framework

---

**Built with ❤️ and a sense of humor**

*Ready to get roasted? Upload your resume and find out! 🔥*
