import React, { useState } from "react";
import { Car, Wrench, Settings, Activity, Loader2, Sparkles, Fuel, Calendar, AlertCircle } from "lucide-react";

type EstimatorFormProps = {
  onSubmit: (data: any) => void;
  isLoading: boolean;
};

const SYMPTOM_PRESETS = [
  { label: "Brake Grinding Noise", icon: "🚗" },
  { label: "AC Blowing Warm Air", icon: "❄️" },
  { label: "Engine Misfire / Jerking", icon: "⚡" },
  { label: "Suspension Knocking / Thud", icon: "🔊" },
  { label: "Clutch Slip / Hard Gears", icon: "⚙️" },
  { label: "Battery / Starting Problem", icon: "🔋" },
];

export function EstimatorForm({ onSubmit, isLoading }: EstimatorFormProps) {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: new Date().getFullYear().toString(),
    fuelType: "Petrol",
    symptoms: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePresetClick = (presetLabel: string) => {
    setFormData((prev) => {
      const current = prev.symptoms.trim();
      if (!current) return { ...prev, symptoms: presetLabel };
      if (current.includes(presetLabel)) return prev;
      return { ...prev, symptoms: `${current}. ${presetLabel}` };
    });
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white rounded-2xl border border-steel/20 p-6 md:p-10 shadow-xl shadow-slate-200/50 space-y-8"
    >
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-6 border-b border-steel/15 text-center sm:text-left">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 flex items-center justify-center shrink-0 shadow-inner">
          <Activity className="w-7 h-7 text-primary" />
        </div>
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> AI Digital Service Advisor
          </div>
          <h3 className="text-2xl font-display font-bold text-darker">Vehicle Symptom & Service Estimator</h3>
          <p className="text-dark/80 text-sm mt-1">
            Provide your vehicle details below to receive an immediate diagnostic breakdown, labor estimates, and parts pricing.
          </p>
        </div>
      </div>

      {/* Vehicle Details Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-darker font-display font-bold text-lg">
          <Car className="w-5 h-5 text-primary" />
          <h4>1. Vehicle Information</h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Make */}
          <div className="space-y-1.5">
            <label htmlFor="make-input" className="text-sm font-semibold text-darker flex items-center gap-1.5">
              Make / Manufacturer <span className="text-secondary">*</span>
            </label>
            <input
              id="make-input"
              type="text"
              name="make"
              required
              placeholder="e.g., Maruti Suzuki, Hyundai, Tata"
              value={formData.make}
              onChange={handleChange}
              className="w-full bg-light/60 border border-steel/30 rounded-xl px-4 py-3 text-darker font-medium placeholder:text-steel/70 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
          
          {/* Model */}
          <div className="space-y-1.5">
            <label htmlFor="model-input" className="text-sm font-semibold text-darker flex items-center gap-1.5">
              Vehicle Model <span className="text-secondary">*</span>
            </label>
            <input
              id="model-input"
              type="text"
              name="model"
              required
              placeholder="e.g., Swift, Creta, Nexon, City"
              value={formData.model}
              onChange={handleChange}
              className="w-full bg-light/60 border border-steel/30 rounded-xl px-4 py-3 text-darker font-medium placeholder:text-steel/70 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>

          {/* Year */}
          <div className="space-y-1.5">
            <label htmlFor="year-input" className="text-sm font-semibold text-darker flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-steel" /> Year of Manufacture <span className="text-secondary">*</span>
            </label>
            <input
              id="year-input"
              type="number"
              name="year"
              required
              min="1990"
              max={new Date().getFullYear()}
              value={formData.year}
              onChange={handleChange}
              className="w-full bg-light/60 border border-steel/30 rounded-xl px-4 py-3 text-darker font-medium focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>

          {/* Fuel Type */}
          <div className="space-y-1.5">
            <label htmlFor="fuel-input" className="text-sm font-semibold text-darker flex items-center gap-1.5">
              <Fuel className="w-4 h-4 text-steel" /> Fuel Type <span className="text-secondary">*</span>
            </label>
            <select
              id="fuel-input"
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
              className="w-full bg-light/60 border border-steel/30 rounded-xl px-4 py-3 text-darker font-medium focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all cursor-pointer"
            >
              <option value="Petrol" className="bg-white text-darker">Petrol</option>
              <option value="Diesel" className="bg-white text-darker">Diesel</option>
              <option value="CNG" className="bg-white text-darker">CNG</option>
              <option value="EV" className="bg-white text-darker">Electric (EV)</option>
              <option value="Hybrid" className="bg-white text-darker">Hybrid</option>
            </select>
          </div>
        </div>
      </div>

      {/* Symptoms Section */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-darker font-display font-bold text-lg">
            <Wrench className="w-5 h-5 text-primary" />
            <h4>2. Reported Symptoms & Issues</h4>
          </div>
        </div>

        {/* Quick Symptom Chips */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-steel mb-2.5">Quick Select Common Symptoms:</p>
          <div className="flex flex-wrap gap-2">
            {SYMPTOM_PRESETS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => handlePresetClick(preset.label)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-light hover:bg-primary/10 border border-steel/20 text-xs font-medium text-darker hover:text-primary transition-all active:scale-95 cursor-pointer"
              >
                <span>{preset.icon}</span>
                <span>{preset.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Symptoms Textarea */}
        <div className="space-y-1.5">
          <label htmlFor="symptoms-textarea" className="text-sm font-semibold text-darker flex items-center justify-between">
            <span>Detailed Symptoms Description <span className="text-secondary">*</span></span>
            <span className="text-xs text-steel font-normal">Be as descriptive as possible</span>
          </label>
          <textarea
            id="symptoms-textarea"
            name="symptoms"
            required
            rows={4}
            placeholder="Describe what happens (e.g., 'Grinding sound when braking at low speed', 'AC blows cold air for 10 mins then warm', 'Engine vibration while idling')."
            value={formData.symptoms}
            onChange={handleChange}
            className="w-full bg-light/60 border border-steel/30 rounded-xl px-4 py-3 text-darker font-medium placeholder:text-steel/70 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
          />
        </div>
      </div>

      {/* Notice Banner */}
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/15 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <p className="text-xs text-dark/90 leading-relaxed">
          <strong className="font-semibold text-darker">Indian Market Pricing Algorithm:</strong> Estimates are calculated using standard workshop labor rates, genuine/OEM parts pricing, and 18% GST applicable across Maharashtra & Indian workshop networks.
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-display font-bold text-base py-4 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-3 active:scale-[0.99] cursor-pointer"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin text-white" />
            <span>Analyzing Vehicle Symptoms with AI Engine...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5 text-secondary" />
            <span>Generate AI Service Estimate</span>
          </>
        )}
      </button>
    </form>
  );
}
