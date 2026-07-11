"use client";

import React, { useState, useEffect, useRef } from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import PageReader from "@/components/accessibility/PageReader";
import { Gamepad2, Volume2, VolumeX, RotateCcw } from "lucide-react";
import TicTacToe from "@/components/activities/TicTacToe";
import MemoryGame from "@/components/activities/MemoryGame";

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
}

const COLORS = ["#f87171", "#fbbf24", "#34d399", "#60a5fa", "#a78bfa", "#f472b6"];

export default function ActivitiesPage() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);

  const playPopSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.1);
      
      gain.gain.setValueAtTime(0.5, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
      console.error("Audio error", e);
    }
  };

  const spawnBubble = () => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth - 70;
    const newBubble: Bubble = {
      id: Date.now() + Math.random(),
      x: Math.random() * width,
      y: containerRef.current.clientHeight + 60,
      size: Math.random() * 30 + 40,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      speed: Math.random() * 2 + 1.5,
    };
    setBubbles(prev => [...prev, newBubble]);
  };

  useEffect(() => {
    if (!isPlaying) return;

    let animationFrameId: number;
    let spawnTimeout: NodeJS.Timeout;

    const gameLoop = () => {
      setBubbles(prev => {
        const moved = prev.map(b => ({ ...b, y: b.y - b.speed }));
        return moved.filter(b => b.y + b.size > -50);
      });
      animationFrameId = requestAnimationFrame(gameLoop);
    };

    const spawner = () => {
      spawnBubble();
      spawnTimeout = setTimeout(spawner, Math.random() * 800 + 400);
    };

    animationFrameId = requestAnimationFrame(gameLoop);
    spawner();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(spawnTimeout);
    };
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;
    
    if (timeLeft <= 0) {
      setIsPlaying(false);
      const msg = new SpeechSynthesisUtterance("Game over! Your score is " + score);
      if (soundEnabled) window.speechSynthesis.speak(msg);
      return;
    }
    
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, soundEnabled, score]);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(30);
    setBubbles([]);
  };

  const handlePop = (id: number) => {
    if (!isPlaying) return;
    playPopSound();
    setScore(prev => prev + 10);
    setBubbles(prev => prev.filter(b => b.id !== id));
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <PageReader text="Activities and Games page. Bubble pop game. Press start to play." />
      <Sidebar />
      <div className="ml-64">
        <TopBar title="Activities & Games" />
        <main className="p-8">
          <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-[var(--border)] overflow-hidden">
            <div className="p-6 border-b border-[var(--border)] flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <Gamepad2 className="w-6 h-6" />
                Bubble Pop Challenge
              </h2>
              <div className="flex gap-4 items-center">
                <button 
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700"
                >
                  {soundEnabled ? <Volume2 className="w-5 h-5 opacity-70" /> : <VolumeX className="w-5 h-5" />}
                </button>
                <div className="text-lg font-medium opacity-80">Score: <span className="font-bold ml-1 text-2xl">{score}</span></div>
                <div className="text-lg font-medium opacity-80">Time: <span className="font-bold ml-1 text-red-500 text-2xl">{timeLeft}</span>s</div>
              </div>
            </div>
            
            <div ref={containerRef} className="relative h-[600px] bg-gradient-to-b from-blue-50/50 to-indigo-50/50 dark:from-slate-900 dark:to-slate-800 overflow-hidden">
              {!isPlaying && timeLeft === 30 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-10">
                  <button 
                    onClick={startGame} 
                    className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-2xl text-2xl hover:scale-105 active:scale-95 shadow-xl transition-all"
                  >
                    Start Game
                  </button>
                </div>
              )}
              
              {!isPlaying && timeLeft <= 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-10">
                  <h3 className="text-5xl font-extrabold text-white mb-6 drop-shadow-md">Time's Up!</h3>
                  <p className="text-2xl text-white mb-8 font-medium">You scored <span className="font-extrabold text-yellow-400 text-4xl">{score}</span> points!</p>
                  <button 
                    onClick={startGame} 
                    className="px-8 py-4 bg-white text-gray-900 font-bold rounded-2xl text-xl flex items-center gap-3 hover:scale-105 active:scale-95 shadow-xl transition-all"
                  >
                    <RotateCcw className="w-6 h-6" /> Play Again
                  </button>
                </div>
              )}

              {bubbles.map(bubble => (
                <button
                  key={bubble.id}
                  onClick={() => handlePop(bubble.id)}
                  aria-label="Pop bubble"
                  className="absolute rounded-full cursor-pointer transition-transform hover:scale-110 active:scale-90 touch-manipulation"
                  style={{
                    left: bubble.x,
                    top: bubble.y,
                    width: bubble.size,
                    height: bubble.size,
                    backgroundColor: bubble.color,
                    boxShadow: "inset -5px -5px 15px rgba(0,0,0,0.2), inset 5px 5px 15px rgba(255,255,255,0.6), 0 5px 10px rgba(0,0,0,0.1)",
                  }}
                >
                  <div className="absolute top-[15%] left-[20%] w-[30%] h-[30%] bg-white/40 rounded-full" />
                </button>
              ))}
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <MemoryGame />
            <TicTacToe />
          </div>
        </main>
      </div>
    </div>
  );
}
