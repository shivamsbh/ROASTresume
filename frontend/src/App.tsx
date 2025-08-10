import "./App.css";
import { useState, useCallback } from "react";
import { Upload, FileText, Loader2, Share2, RotateCcw, Sparkles, Target, Zap } from "lucide-react";
import ReactMarkdown from "react-markdown";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [roast, setRoast] = useState<string>("");
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string>("");
  const BACKENDURL = import.meta.env.VITE_BACKEND_URL;

  const handleFileUpload = useCallback((uploadedFile: File) => {
    if (uploadedFile.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      return;
    }
    if (uploadedFile.size > 10 * 1024 * 1024) { // 10MB limit
      setError("File size must be less than 10MB.");
      return;
    }
    setFile(uploadedFile);
    setError("");
    setRoast("");
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragActive(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        handleFileUpload(droppedFile);
      }
    },
    [handleFileUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        handleFileUpload(selectedFile);
      }
    },
    [handleFileUpload]
  );

  async function handleGenerateRoast() {
    if (!file) {
      setError("Please upload a PDF file first.");
      return;
    }

    setIsLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("resume", file);

    const base = (BACKENDURL || "").replace(/\/+$/, "");
    const url = base + "/roast/resume";

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        let message = "Failed to upload resume";
        try {
          const err = await response.json();
          if (err?.message) message = err.message;
        } catch (_) {
          // ignore parse errors
        }
        throw new Error(message);
      }

      const data = await response.json();
      
      if (data.roast) {
        setRoast(data.roast);
      } else {
        throw new Error("No roast content received from server");
      }
    } catch (error: any) {
      console.error("Error uploading resume:", error);
      setError(error?.message || "Failed to upload resume. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const resetApp = () => {
    setFile(null);
    setRoast("");
    setError("");
  };

  const shareResults = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Resume Roast Results',
          text: roast,
        });
      } catch (err) {
        // Fallback to clipboard
        navigator.clipboard.writeText(roast);
      }
    } else {
      navigator.clipboard.writeText(roast);
    }
  };

  if (roast) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-google-gray-50 to-google-gray-100">
        {/* Header */}
        <header className="bg-white shadow-google sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-google-blue to-google-green rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-xl font-google font-semibold text-google-gray-900">
                  Resume Roaster
                </h1>
              </div>
              <div className="flex items-center space-x-2 text-google-gray-600">
                <span className="w-2 h-2 bg-google-green rounded-full animate-pulse"></span>
                <span className="text-sm font-medium">Analysis Complete</span>
              </div>
            </div>
          </div>
        </header>

        {/* Results Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-fade-in">
            {/* Results Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-google-red to-google-yellow rounded-full mb-4 animate-bounce-gentle">
                <span className="text-2xl">🔥</span>
              </div>
              <h2 className="text-4xl font-google font-bold text-google-gray-900 mb-2">
                Your Resume Roast
              </h2>
              <p className="text-google-gray-600 text-lg">
                Here's what our AI thinks about your resume
              </p>
            </div>

            {/* Results Card */}
            <div className="card-google p-8 mb-8">
              <div className="prose prose-lg max-w-none">
                <div className="bg-gradient-to-r from-google-blue-light to-google-gray-50 rounded-xl p-6 border-l-4 border-google-blue">
                  <div className="text-google-gray-800 leading-relaxed">
                    <ReactMarkdown 
                      components={{
                      h1: ({children}) => <h1 className="text-2xl font-bold text-google-gray-900 mb-4 flex items-center"><Target className="w-6 h-6 mr-2 text-google-blue" />{children}</h1>,
                      h2: ({children}) => <h2 className="text-xl font-semibold text-google-gray-900 mb-3 mt-6 flex items-center"><Zap className="w-5 h-5 mr-2 text-google-yellow" />{children}</h2>,
                      h3: ({children}) => <h3 className="text-lg font-medium text-google-gray-900 mb-2 mt-4">{children}</h3>,
                      p: ({children}) => <p className="mb-4 text-google-gray-700 leading-relaxed">{children}</p>,
                      ul: ({children}) => <ul className="list-none mb-4 space-y-2">{children}</ul>,
                      li: ({children}) => <li className="text-google-gray-700 flex items-start"><span className="text-google-blue mr-2 mt-1">•</span><span>{children}</span></li>,
                      strong: ({children}) => <strong className="font-semibold text-google-gray-900 bg-yellow-100 px-1 rounded">{children}</strong>,
                      em: ({children}) => <em className="italic text-google-blue">{children}</em>,
                      blockquote: ({children}) => <blockquote className="border-l-4 border-google-yellow bg-google-gray-50 p-4 my-4 italic">{children}</blockquote>,
                      code: ({children}) => <code className="bg-google-gray-100 text-google-gray-800 px-2 py-1 rounded text-sm font-mono">{children}</code>,
                      }}
                    >
                      {roast}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetApp}
                className="btn-secondary text-lg px-8 py-4 group"
              >
                <RotateCcw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-300" />
                Try Another Resume
              </button>
              <button
                onClick={shareResults}
                className="btn-primary text-lg px-8 py-4 group"
              >
                <Share2 className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                Share Results
              </button>
            </div>
          </div>
        </main>
        
        {/* Footer Banner */}
        <footer className="bg-white border-t border-google-gray-200 py-6 mt-12">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-3">
              <a 
                href="https://www.linkedin.com/in/shivam-saurabh-b5bb22279/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
              
              <a 
                href="https://github.com/shivamsbh" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            </div>
            
            <p className="text-google-gray-600 text-sm">
              Made by <span className="font-semibold text-google-gray-800">shivamsbh</span> with ❤️
            </p>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-google-gray-50 to-google-gray-100">
      {/* Header */}
      <header className="bg-white shadow-google">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-google-blue to-google-green rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-google font-semibold text-google-gray-900">
                Resume Roaster
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-fade-in">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-5xl font-google font-bold text-google-gray-900 mb-4">
              Get your resume
              <span className="bg-gradient-to-r from-google-red to-google-yellow bg-clip-text text-transparent"> roasted</span>
            </h2>
            <p className="text-xl text-google-gray-600 max-w-2xl mx-auto leading-relaxed">
              Upload your resume and get brutally honest feedback powered by AI. 
              Discover what recruiters really think about your CV.
            </p>
          </div>

          {/* Upload Section */}
          <div className="card-google p-8 mb-8 animate-slide-up">
            <div
              className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 cursor-pointer group ${
                dragActive 
                  ? 'border-google-blue bg-google-blue-light scale-105 shadow-google-lg' 
                  : file 
                    ? 'border-google-green bg-green-50' 
                    : 'border-google-gray-300 hover:border-google-blue hover:bg-google-blue-light hover:shadow-google-lg'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onClick={() => document.getElementById("file-input")?.click()}
            >
              <div className="space-y-6">
                <div className={`transition-all duration-300 ${dragActive ? 'animate-bounce-gentle scale-110' : 'group-hover:scale-110'}`}>
                  {file ? (
                    <div className="w-16 h-16 bg-google-green rounded-full flex items-center justify-center mx-auto">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                  ) : dragActive ? (
                    <div className="w-16 h-16 bg-google-blue rounded-full flex items-center justify-center mx-auto">
                      <Upload className="w-8 h-8 text-white animate-bounce" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-google-gray-200 group-hover:bg-google-blue rounded-full flex items-center justify-center mx-auto transition-colors duration-300">
                      <Upload className="w-8 h-8 text-google-gray-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-google font-medium text-google-gray-900 mb-2">
                    {file ? file.name : dragActive ? 'Drop it here!' : 'Upload your resume'}
                  </h3>
                  <p className="text-google-gray-600 mb-2">
                    {file ? 'Ready to roast!' : 'Drag and drop your PDF here, or click to browse'}
                  </p>
                  <p className="text-sm text-google-gray-500">
                    PDF files only • Max 10MB
                  </p>
                </div>
              </div>
              <input
                id="file-input"
                type="file"
                accept=".pdf"
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg animate-slide-up">
                <div className="flex items-center">
                  <span className="text-red-500 text-xl mr-3">⚠️</span>
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              </div>
            )}

            {file && (
              <div className="mt-8 text-center animate-slide-up">
                <button
                  onClick={handleGenerateRoast}
                  disabled={isLoading}
                  className={`btn-primary text-lg px-8 py-4 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-3">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Roasting your resume...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>🔥</span>
                      <span>Start the roast</span>
                      <span>🔥</span>
                    </div>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { 
                icon: <Sparkles className="w-8 h-8 text-google-blue" />, 
                title: 'AI-Powered Analysis', 
                desc: 'Advanced AI thoroughly analyzes your resume content and structure' 
              },
              { 
                icon: <Zap className="w-8 h-8 text-google-yellow" />, 
                title: 'Instant Results', 
                desc: 'Get comprehensive feedback in seconds, not days' 
              },
              { 
                icon: <Target className="w-8 h-8 text-google-green" />, 
                title: 'Actionable Insights', 
                desc: 'Receive specific, actionable suggestions to improve your CV' 
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="card-google p-6 text-center animate-fade-in hover:scale-105 transition-transform duration-300" 
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-lg font-google font-semibold text-google-gray-900 mb-2">{feature.title}</h3>
                <p className="text-google-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-google-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
              <a 
                href="https://www.linkedin.com/in/shivam-saurabh-b5bb22279/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
              
              <a 
                href="https://github.com/shivamsbh" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            </div>
            
            <p className="text-google-gray-600">
              Made by <span className="font-semibold text-google-gray-800">shivamsbh</span> with ❤️ • Get honest feedback to improve your career prospects
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;