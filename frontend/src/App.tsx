import "./App.css";
import { useState } from "react";
import { Upload, FileText, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [roast, setRoast] = useState<string>("");
  const BACKENDURL = import.meta.env.VITE_BACKEND_URL;

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
    console.log(file?.name);
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
    console.log(file?.name);
  }

  async function handleGenerateRoast() {
    if (!file) {
      alert("Please upload a resume first!");
      return;
    }

    setIsLoading(true);
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
      console.log("Response data:", data);
      
      if (data.roast) {
        setRoast(data.roast);
      } else {
        console.error("No roast in response:", data);
        throw new Error("No roast content received from server");
      }
    } catch (error: any) {
      console.error("Error uploading resume:", error);
      alert(error?.message || "Failed to upload resume. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  if (roast) {
    return (
      <div className="min-h-screen bg-[#0e0e0e] p-4 md:p-8 flex items-center justify-center">
        <div className="w-full max-w-4xl space-y-8 bg-transparent">
          <div className="bg-gradient-to-b from-[#0e0e0e] to-[#100000] border border-[#3e3e3e] rounded-xl p-6 md:p-8 text-white shadow-2xl">
            <div className="flex items-center gap-3 mb-6 bg-transparent">
              <div className="bg-red-500 rounded-full p-2">
                <FileText size={24} className="text-[#0e0e0e] bg-transparent" />
              </div>
              <h2 className="font-bold text-xl md:text-2xl text-red-500 bg-transparent">
                Can you handle this roast ?{" "}
              </h2>
            </div>
            <div className="prose prose-invert max-w-none bg-transparent">
              <div className="leading-relaxed text-gray-300 bg-transparent">
                <ReactMarkdown 
                  components={{
                  // Custom styling for markdown elements
                  p: ({children, ...props}) => <p className="mb-4 leading-relaxed text-gray-300" {...props}>{children}</p>,
                  strong: ({children, ...props}) => <strong className="text-red-400 font-bold" {...props}>{children}</strong>,
                  em: ({children, ...props}) => <em className="text-yellow-400 italic" {...props}>{children}</em>,
                  h1: ({children, ...props}) => <h1 className="text-2xl font-bold text-red-500 mb-4" {...props}>{children}</h1>,
                  h2: ({children, ...props}) => <h2 className="text-xl font-bold text-red-400 mb-3" {...props}>{children}</h2>,
                  h3: ({children, ...props}) => <h3 className="text-lg font-bold text-red-300 mb-2" {...props}>{children}</h3>,
                  ul: ({children, ...props}) => <ul className="list-disc list-inside mb-4 space-y-1" {...props}>{children}</ul>,
                  ol: ({children, ...props}) => <ol className="list-decimal list-inside mb-4 space-y-1" {...props}>{children}</ol>,
                  li: ({children, ...props}) => <li className="text-gray-300" {...props}>{children}</li>,
                  blockquote: ({children, ...props}) => <blockquote className="border-l-4 border-red-500 pl-4 italic text-gray-400 mb-4" {...props}>{children}</blockquote>,
                  code: ({children, ...props}) => <code className="bg-gray-800 text-green-400 px-1 py-0.5 rounded text-sm" {...props}>{children}</code>,
                }}
                >
                  {roast}
                </ReactMarkdown>
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <button
                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
                onClick={() => {
                  setRoast("");
                  setFile(null);
                }}
              >
                Roast Another Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen bg-[#0e0e0e] p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="font-black text-4xl md:text-6xl lg:text-7xl text-center text-white font-mono mt-8 md:mt-12">
            Roast my Resume
          </h1>

          <div className=" flex flex-col space-y-4">
            <p className="text-[#6a6a6a] text-center">
              Upload your resume to get started!
            </p>

            <div
              className={`
                bg-[#0e0e0e] border-2 border-dashed border-[#3e3e3e] rounded-lg
                flex flex-col items-center justify-center p-6 md:p-10
                min-h-[300px] md:min-h-[400px] transition-colors
                ${!file ? "hover:border-red-500/50 cursor-pointer" : ""}
              `}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {file ? (
                <div className="text-center space-y-3">
                  <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
                    <FileText className="h-6 w-6 text-green-500 bg-transparent" />
                  </div>
                  <p className="text-green-500">File selected: {file.name}</p>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="h-12 w-12 rounded-full bg-red-500/20 flex items-center justify-center mx-auto">
                    <Upload className="h-6 w-6 text-red-500 bg-transparent" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-white">Drag & drop your resume here</p>
                    <p className="text-sm text-[#6a6a6a]">or</p>
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#2e2e2e] rounded-md cursor-pointer hover:bg-[#3e3e3e] transition-colors">
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf"
                        onChange={handleFileUpload}
                      />
                      <span className="text-white bg-transparent">
                        Choose file
                      </span>
                    </label>
                  </div>
                  <p className="text-sm text-[#6a6a6a]">PDF files only</p>
                </div>
              )}
            </div>
            <div className="flex justify-center items-center">
              <button
                className={`w-1-/2 md:w-1/2 px-8 py-3 rounded-lg font-semibold
                  flex items-center justify-center gap-2
                  transition-all duration-200
                  ${
                    isLoading
                      ? "bg-red-500/50 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600 active:scale-95"
                  }
                `}
                onClick={handleGenerateRoast}
                disabled={isLoading || !file}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin bg-transparent" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FileText className="h-5 w-5 bg-transparent" />
                    Generate Roast!
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
