import React from "react";
import { UrgencyBadge, UrgencyLevel } from "./UrgencyBadge";
import { ShieldAlert, Wrench, IndianRupee, CheckCircle2, Clock, Calendar, ArrowLeft, Award, Sparkles } from "lucide-react";

export type EstimateData = {
  issues: { name: string; reasoning: string }[];
  services: { name: string; type: string; laborHours: number }[];
  costEstimate: { parts: number; labor: number; tax: number; total: number };
  urgency: UrgencyLevel;
  confidenceScore: number;
  preventiveMaintenance: string[];
};

type EstimatorResultProps = {
  data: EstimateData;
  onReset: () => void;
};

export function EstimatorResult({ data, onReset }: EstimatorResultProps) {
  const handleBooking = () => {
    window.dispatchEvent(new Event("open-booking"));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Top Navigation & Header Summary Card */}
      <div className="bg-white rounded-2xl border border-steel/20 p-6 md:p-8 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-steel/15">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Diagnostic Report Ready
            </div>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-darker">AI Pre-Service Consultation</h3>
            <p className="text-dark/80 text-sm mt-1">
              Estimated Diagnostic Analysis & Indian Workshop Cost Calculations
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <UrgencyBadge level={data.urgency} />
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-light border border-steel/20 text-xs font-bold text-darker">
              <Award className="w-4 h-4 text-secondary" />
              <span>Confidence: {data.confidenceScore}%</span>
            </div>
          </div>
        </div>

        {/* Highlighted Cost Callout Banner */}
        <div className="bg-gradient-to-r from-darker via-primary-dark to-darker rounded-xl p-6 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-steel/80 text-xs font-bold uppercase tracking-wider">Estimated Total Investment</p>
            <div className="flex items-baseline justify-center sm:justify-start gap-1">
              <span className="text-secondary text-3xl font-bold">₹</span>
              <span className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
                {data.costEstimate.total.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-steel ml-1 font-normal">(Incl. 18% GST)</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={handleBooking}
              className="bg-secondary hover:bg-secondary-dark text-white font-display font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-secondary/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 text-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment Now</span>
            </button>
            <button
              onClick={onReset}
              className="bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-3.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>New Estimate</span>
            </button>
          </div>
        </div>
      </div>

      {/* Diagnosed Issues & Reasoning Card */}
      <div className="bg-white rounded-2xl border border-steel/20 p-6 md:p-8 shadow-md space-y-5">
        <div className="flex items-center gap-2.5 text-darker font-display font-bold text-xl pb-3 border-b border-steel/15">
          <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5 text-secondary" />
          </div>
          <h4>Diagnosed Faults & Diagnostic Reasoning</h4>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {data.issues.map((issue, idx) => (
            <div key={idx} className="bg-light/70 p-5 rounded-xl border border-steel/20 space-y-2 hover:border-primary/30 transition-colors">
              <h5 className="font-display font-bold text-darker text-base flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {issue.name}
              </h5>
              <p className="text-sm text-dark leading-relaxed pl-4">{issue.reasoning}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Services Table Card */}
      <div className="bg-white rounded-2xl border border-steel/20 p-6 md:p-8 shadow-md space-y-5">
        <div className="flex items-center gap-2.5 text-darker font-display font-bold text-xl pb-3 border-b border-steel/15">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <Wrench className="w-5 h-5 text-primary" />
          </div>
          <h4>Recommended Workshop Services</h4>
        </div>

        <div className="overflow-x-auto rounded-xl border border-steel/20">
          <table className="w-full text-left text-sm">
            <thead className="bg-light text-darker font-display font-bold border-b border-steel/20">
              <tr>
                <th className="p-4">Service Description</th>
                <th className="p-4">Service Category</th>
                <th className="p-4 text-right">Est. Labor Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-steel/15 font-medium text-dark">
              {data.services.map((service, idx) => (
                <tr key={idx} className="hover:bg-light/40 transition-colors">
                  <td className="p-4 text-darker font-semibold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                    {service.name}
                  </td>
                  <td className="p-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-semibold">
                      {service.type}
                    </span>
                  </td>
                  <td className="p-4 text-right text-darker font-bold">{service.laborHours} hrs</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Cost Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cost Breakdown Card */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-steel/20 p-6 md:p-8 shadow-md space-y-4">
          <div className="flex items-center gap-2.5 text-darker font-display font-bold text-xl pb-3 border-b border-steel/15">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <IndianRupee className="w-5 h-5 text-emerald-600" />
            </div>
            <h4>Detailed Price Breakdown</h4>
          </div>

          <div className="space-y-3.5 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-steel/10 text-dark">
              <span className="font-medium text-darker">Spare Parts & Consumables</span>
              <span className="font-bold text-darker">₹{data.costEstimate.parts.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-steel/10 text-dark">
              <span className="font-medium text-darker">Workshop Labor Charges</span>
              <span className="font-bold text-darker">₹{data.costEstimate.labor.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-steel/10 text-dark">
              <span className="font-medium text-darker">Applicable Taxes (18% GST)</span>
              <span className="font-bold text-darker">₹{data.costEstimate.tax.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between items-center pt-3 text-lg font-display font-bold text-darker">
              <span>Total Estimated Cost</span>
              <span className="text-secondary text-2xl">₹{data.costEstimate.total.toLocaleString("en-IN")}</span>
            </div>
          </div>
          <p className="text-xs text-steel italic mt-2">
            * Estimate reflects standard Indian independent workshop tariffs. Actual final bill is calculated after physical dismantling & inspection.
          </p>
        </div>

        {/* Preventive Maintenance Card */}
        {data.preventiveMaintenance && data.preventiveMaintenance.length > 0 && (
          <div className="bg-white rounded-2xl border border-steel/20 p-6 shadow-md space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-darker font-display font-bold text-lg pb-3 border-b border-steel/15">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <h4>Preventive Advice</h4>
              </div>
              <ul className="mt-4 space-y-3">
                {data.preventiveMaintenance.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-dark font-medium">
                    <Clock className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4">
              <button
                onClick={handleBooking}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl shadow-md transition-all text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Visit</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="bg-white p-6 rounded-2xl border border-steel/20 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <h5 className="font-display font-bold text-darker text-base">Ready to get your vehicle serviced?</h5>
          <p className="text-xs text-dark/70">Book online today or visit Omkar Automotive Workshop for guaranteed quality.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={onReset}
            className="flex-1 sm:flex-initial px-5 py-3 rounded-xl border border-steel/30 text-darker font-semibold hover:bg-light transition-all text-sm cursor-pointer"
          >
            Start Over
          </button>
          <button
            onClick={handleBooking}
            className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-secondary hover:bg-secondary-dark text-white font-bold shadow-md shadow-secondary/20 transition-all text-sm cursor-pointer"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
