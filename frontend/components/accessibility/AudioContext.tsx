"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface AudioContextType {
  audioOn: boolean;
  setAudioOn: (on: boolean) => void;
  audioSpeed: number;
  setAudioSpeed: (speed: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
}

export function AudioProvider({ children }: { children: ReactNode }) {
  const [audioOn, setAudioOn] = useState(true);
  const [audioSpeed, setAudioSpeed] = useState(1);
  return (
    <AudioContext.Provider value={{ audioOn, setAudioOn, audioSpeed, setAudioSpeed }}>
      {children}
    </AudioContext.Provider>
  );
}