import React from "react";
import { AlertTriangle, AlertCircle, Info, CheckCircle2 } from "lucide-react";

export type UrgencyLevel = "Critical" | "High" | "Medium" | "Low";

export function UrgencyBadge({ level }: { level: UrgencyLevel }) {
  const config = {
    Critical: {
      color: "bg-red-50 text-red-700 border-red-200 shadow-sm",
      icon: <AlertTriangle className="w-4 h-4 mr-1.5 shrink-0 text-red-600" />,
      dot: "bg-red-500 animate-pulse",
    },
    High: {
      color: "bg-orange-50 text-orange-700 border-orange-200 shadow-sm",
      icon: <AlertCircle className="w-4 h-4 mr-1.5 shrink-0 text-orange-600" />,
      dot: "bg-orange-500",
    },
    Medium: {
      color: "bg-amber-50 text-amber-800 border-amber-200 shadow-sm",
      icon: <Info className="w-4 h-4 mr-1.5 shrink-0 text-amber-600" />,
      dot: "bg-amber-500",
    },
    Low: {
      color: "bg-emerald-50 text-emerald-800 border-emerald-200 shadow-sm",
      icon: <CheckCircle2 className="w-4 h-4 mr-1.5 shrink-0 text-emerald-600" />,
      dot: "bg-emerald-500",
    },
  };

  const { color, icon, dot } = config[level] || config.Medium;

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide border ${color}`}
    >
      <span className={`w-2 h-2 rounded-full mr-2 ${dot}`} />
      {icon}
      {level} Urgency Repair
    </span>
  );
}
