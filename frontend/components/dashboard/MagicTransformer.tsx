"use client";

import React, { useState } from 'react';
import { Sparkles, Video, FileText, Type, UploadCloud, Loader2 } from 'lucide-react';

export default function MagicTransformer() {
  const [text, setText] = useState("");
  const [ytLink, setYtLink] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTransform = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("text_input", text);
    formData.append("yt_link", ytLink);
    if (file) formData.append("file", file);

    try {
      // Connect to the new FastAPI endpoint
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${API_URL}/api/transformer/transform`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data.choices[0].message.content);
    } catch (err) {
      console.error(err);
      setResult("Error transforming data. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-slate-50 text-slate-900 p-8 flex flex-col items-center font-sans dark:bg-slate-900 dark:text-slate-100">
      <div className="max-w-3xl w-full space-y-8 z-10 relative mt-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-4 bg-indigo-600 rounded-3xl shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20 mb-4 transition-transform hover:scale-105">
            <Sparkles className="text-white w-8 h-8" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-800 dark:text-white">Magic Transformer</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">Synthesize knowledge from text, video, and documents instantly.</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-700 space-y-6">
          
          {/* Text Input */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <Type size={18} className="text-indigo-500"/> Brain Dump / Notes
            </label>
            <textarea 
              className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all h-28 resize-none bg-slate-50 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-800 dark:text-white"
              placeholder="Paste your ideas or notes here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          {/* YouTube Input */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <Video size={18} className="text-red-500"/> YouTube Link
            </label>
            <input 
              type="text"
              className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-slate-50 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-800 dark:text-white"
              placeholder="https://youtube.com/watch?v=..."
              value={ytLink}
              onChange={(e) => setYtLink(e.target.value)}
            />
          </div>

          {/* Drag & Drop Area */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <FileText size={18} className="text-blue-500"/> PDF or Image Document
            </label>
            <div 
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]);
              }}
              className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl p-8 text-center hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-400 transition-colors cursor-pointer relative bg-slate-50 dark:bg-slate-900"
            >
              <input 
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                onChange={(e) => e.target.files && setFile(e.target.files[0])}
              />
              <UploadCloud className="mx-auto text-slate-400 mb-3" size={36} />
              {file ? (
                <div className="bg-indigo-100/50 dark:bg-indigo-900/40 inline-block px-4 py-2 rounded-lg">
                  <p className="text-indigo-700 dark:text-indigo-300 font-medium">Successfully added: {file.name}</p>
                </div>
              ) : (
                <p className="text-slate-500 dark:text-slate-400">Drag & Drop PDF here or <span className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">browse files</span></p>
              )}
            </div>
          </div>

          {/* Action Button */}
          <button 
            onClick={handleTransform}
            disabled={loading || (!text && !ytLink && !file)}
            className="w-full py-4 mt-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 disabled:from-slate-300 disabled:to-slate-300 dark:disabled:from-slate-700 dark:disabled:to-slate-700 disabled:text-slate-500 dark:disabled:text-slate-500 text-white rounded-2xl font-bold text-lg shadow-lg shadow-indigo-200 dark:shadow-none transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
            {loading ? "Transforming..." : "Transform Contents"}
          </button>
        </div>

        {/* Result Area */}
        {result && (
          <div className="bg-white dark:bg-slate-800 border-2 border-indigo-100 dark:border-indigo-900/30 shadow-xl p-8 rounded-3xl animate-in fade-in slide-in-from-bottom-4 duration-500 mb-12">
            <h3 className="text-indigo-900 dark:text-indigo-300 font-bold text-xl mb-6 flex items-center gap-2 pb-4 border-b border-indigo-50 dark:border-indigo-900/30">
              <Sparkles className="w-6 h-6 text-indigo-500 dark:text-indigo-400"/> Transformation Complete
            </h3>
            <div className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap prose prose-indigo dark:prose-invert max-w-none">
              {result}
            </div>
          </div>
        )}
      </div>

      {/* Decorative Blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div
          className="absolute rounded-full opacity-20 dark:opacity-10 blur-3xl animate-blob"
          style={{
            width: 600, height: 600, top: "-100px", left: "-100px",
            background: "radial-gradient(circle, #818cf8, #c4b5fd)",
            animationDuration: "12s",
          }}
        />
        <div
          className="absolute rounded-full opacity-20 dark:opacity-10 blur-3xl animate-blob"
          style={{
            width: 500, height: 500, top: "40%", right: "-100px",
            background: "radial-gradient(circle, #6ee7b7, #93c5fd)",
            animationDuration: "15s", animationDelay: "2s",
          }}
        />
      </div>
    </div>
  );
}
