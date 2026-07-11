"use client";

import MagicTransformer from "@/components/dashboard/MagicTransformer";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import PageReader from "@/components/accessibility/PageReader";
import Head from "next/head";

export default function MagicTransformerPage() {
  return (
    <>
      <title>Magic Transformer | Anvaya</title>
      <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex">
        <PageReader text="Magic Transformer active. Drag and drop PDF files or Images, or add YouTube links, and I will generate a smart, simplified summary for you." />
        <Sidebar />
        <div className="flex-1 ml-64 flex flex-col min-h-screen h-screen overflow-hidden">
          <TopBar title="Magic Transformer ✨" />
          <main className="flex-1 overflow-auto relative rounded-tl-3xl bg-[var(--color-surface)] shadow-lg mx-6 mt-6 mb-6">
            <MagicTransformer />
          </main>
        </div>
      </div>
    </>
  );
}