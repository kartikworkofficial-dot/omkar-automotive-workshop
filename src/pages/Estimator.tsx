import React, { useState } from "react";
import { EstimatorForm } from "@/src/components/estimator/EstimatorForm";
import { EstimatorResult, EstimateData } from "@/src/components/estimator/EstimatorResult";
import { Bot, Sparkles, ShieldCheck, Zap, AlertCircle } from "lucide-react";

export function Estimator() {
  const [estimate, setEstimate] = useState<EstimateData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch estimate");
      }

      const data = await response.json();
      setEstimate(data);
    } catch (err) {
      console.error(err);
      setError("An error occurred while generating the estimate. Please check your network connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="pt-32 pb-24 min-h-screen bg-light">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            <span>Omkar AI Advisory Engine</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-display font-bold text-darker tracking-tight leading-tight">
            Intelligent <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-dark to-secondary">Service Estimator</span>
          </h1>

          <p className="text-lg md:text-xl text-dark leading-relaxed">
            Get an instant, transparent service diagnostic estimate for your vehicle based on Indian automotive market standards before visiting our workshop.
          </p>

          {/* Feature Badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-darker">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-steel/20 shadow-sm">
              <Zap className="w-4 h-4 text-secondary" />
              <span>Instant Diagnostic Analysis</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-steel/20 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>Genuine OEM Tariffs</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-steel/20 shadow-sm">
              <Bot className="w-4 h-4 text-emerald-600" />
              <span>Explainable AI Reasoning</span>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-8 p-5 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm flex items-center gap-3 shadow-sm animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Content Area */}
        {!estimate ? (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <EstimatorForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        ) : (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <EstimatorResult data={estimate} onReset={() => setEstimate(null)} />
          </div>
        )}

        {/* Disclaimer Footer */}
        <div className="mt-12 text-center text-steel text-xs font-medium flex items-center justify-center gap-2">
          <Bot className="w-4 h-4 text-primary shrink-0" />
          <span>AI-generated estimates are based on customer symptoms. Final pricing is confirmed after physical inspection at Omkar Automotive Workshop.</span>
        </div>
      </div>
    </main>
  );
}
