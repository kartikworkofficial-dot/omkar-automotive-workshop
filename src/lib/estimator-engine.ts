import { GoogleGenAI } from "@google/genai";
import { EstimateData } from "@/src/components/estimator/EstimatorResult";

export type EstimateInput = {
  make: string;
  model: string;
  year: string;
  fuelType: string;
  symptoms: string;
};

// Intelligent offline fallback estimation engine for Indian automotive market
export function generateFallbackEstimate(
  make: string,
  model: string,
  year: string,
  fuelType: string,
  symptoms: string
): EstimateData {
  const symptomsLower = (symptoms || "").toLowerCase();
  const makeLower = (make || "").toLowerCase();

  // Segment multiplier based on Indian automotive market pricing
  let segmentMultiplier = 1.0;
  if (
    makeLower.includes("volkswagen") ||
    makeLower.includes("skoda") ||
    makeLower.includes("jeep") ||
    makeLower.includes("mg") ||
    makeLower.includes("bmw") ||
    makeLower.includes("audi") ||
    makeLower.includes("mercedes")
  ) {
    segmentMultiplier = 1.6;
  } else if (
    makeLower.includes("toyota") ||
    makeLower.includes("honda") ||
    makeLower.includes("mahindra") ||
    makeLower.includes("tata")
  ) {
    segmentMultiplier = 1.3;
  }

  const issues: { name: string; reasoning: string }[] = [];
  const services: { name: string; type: string; laborHours: number }[] = [];
  let partsCost = 1200;
  let laborCost = 800;
  let urgency: "Critical" | "High" | "Medium" | "Low" = "Medium";
  const preventive: string[] = [];

  if (
    symptomsLower.includes("brake") ||
    symptomsLower.includes("grind") ||
    symptomsLower.includes("squeak") ||
    symptomsLower.includes("stop")
  ) {
    issues.push({
      name: "Brake Pad Wear & Friction Surface Deterioration",
      reasoning: `High friction wear detected on front brake pads causing metallic contact or noise during braking in ${make} ${model}.`,
    });
    services.push({
      name: "Front Brake Pads Replacement & Disc Inspection",
      type: "Replacement",
      laborHours: 1.5,
    });
    partsCost += 1800 * segmentMultiplier;
    laborCost += 600 * segmentMultiplier;
    urgency = "High";
    preventive.push("Brake fluid flush and bleeding");
  }

  if (
    symptomsLower.includes("ac") ||
    symptomsLower.includes("cool") ||
    symptomsLower.includes("warm") ||
    symptomsLower.includes("air") ||
    symptomsLower.includes("heat")
  ) {
    issues.push({
      name: "HVAC Cooling Performance Reduction",
      reasoning: `Low R134a/R1234yf refrigerant pressure or clogged cabin air filter reducing climate control efficiency.`,
    });
    services.push({
      name: "AC Gas Top-Up & Cabin Air Filter Replacement",
      type: "Maintenance",
      laborHours: 1.0,
    });
    partsCost += 1400 * segmentMultiplier;
    laborCost += 500 * segmentMultiplier;
    preventive.push("Condenser coil pressure washing & leak check");
  }

  if (
    symptomsLower.includes("engine") ||
    symptomsLower.includes("smoke") ||
    symptomsLower.includes("start") ||
    symptomsLower.includes("power") ||
    symptomsLower.includes("knocking") ||
    symptomsLower.includes("misfire")
  ) {
    issues.push({
      name: "Engine Ignition & Combustion System Misfire",
      reasoning: `Ignition coil or spark plug fouling, fuel injector restriction, or sensor reading anomaly in ${fuelType} engine.`,
    });
    services.push({
      name: "OBD Scanner Diagnostic & Ignition System Overhaul",
      type: "Inspection",
      laborHours: 2.0,
    });
    partsCost += 2500 * segmentMultiplier;
    laborCost += 1200 * segmentMultiplier;
    urgency = "Critical";
    preventive.push("Throttle body cleaning & fuel injector flushing");
  }

  if (
    symptomsLower.includes("noise") ||
    symptomsLower.includes("vibration") ||
    symptomsLower.includes("rattle") ||
    symptomsLower.includes("bump") ||
    symptomsLower.includes("suspension") ||
    symptomsLower.includes("thud")
  ) {
    issues.push({
      name: "Suspension Linkage & Bushing Wear",
      reasoning: `Worn stabilizer link rods, arm bushings, or strut mount dampener transmitting suspension noise over Indian road surfaces.`,
    });
    services.push({
      name: "Suspension Bushing & Link Rod Replacement",
      type: "Repair",
      laborHours: 2.5,
    });
    partsCost += 2200 * segmentMultiplier;
    laborCost += 1000 * segmentMultiplier;
    preventive.push("Computerized 3D Wheel Alignment & Balancing");
  }

  if (
    symptomsLower.includes("clutch") ||
    symptomsLower.includes("gear") ||
    symptomsLower.includes("transmission") ||
    symptomsLower.includes("shift")
  ) {
    issues.push({
      name: "Clutch Assembly Friction Plate Wear",
      reasoning: `Hard gear engagement or slipping clutch disc resulting in loss of optimal power transmission.`,
    });
    services.push({
      name: "Clutch Set & Release Bearing Replacement",
      type: "Replacement",
      laborHours: 3.5,
    });
    partsCost += 4200 * segmentMultiplier;
    laborCost += 1800 * segmentMultiplier;
    urgency = "High";
    preventive.push("Synthetic transmission gear oil replacement");
  }

  if (issues.length === 0) {
    issues.push({
      name: "Multi-Point System Health Evaluation",
      reasoning: `Reported symptom ("${symptoms}") warrants a full diagnostic physical inspection for ${year} ${make} ${model}.`,
    });
    services.push({
      name: "Comprehensive Multi-Point Vehicle Health Inspection",
      type: "Inspection",
      laborHours: 1.5,
    });
    services.push({
      name: "Full Synthetic Engine Oil & Oil Filter Service",
      type: "Maintenance",
      laborHours: 1.0,
    });
    partsCost += 1600 * segmentMultiplier;
    laborCost += 700 * segmentMultiplier;
    preventive.push("12V Battery load testing & terminal anti-corrosion coating");
    preventive.push("Tyre tread depth & pressure calibration check");
  }

  const parts = Math.round(partsCost);
  const labor = Math.round(laborCost);
  const tax = Math.round((parts + labor) * 0.18); // 18% GST in India
  const total = parts + labor + tax;

  return {
    issues,
    services,
    costEstimate: {
      parts,
      labor,
      tax,
      total,
    },
    urgency,
    confidenceScore: 88,
    preventiveMaintenance:
      preventive.length > 0
        ? preventive
        : [
            "Routine fluid level checks every 5,000 km",
            "Coolant level & radiator cap test",
          ],
  };
}

export async function generateClientEstimate(input: EstimateInput): Promise<EstimateData> {
  const { make = "Vehicle", model = "", year = "2022", fuelType = "Petrol", symptoms = "" } = input;

  // Read Gemini API Key from Vite env or fallback env
  const envKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
  const processKey = typeof process !== "undefined" && process.env ? process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY : "";
  const apiKey = envKey || processKey || "";

  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    console.warn("VITE_GEMINI_API_KEY not configured or placeholder used. Running offline estimation engine.");
    return generateFallbackEstimate(make, model, year, fuelType, symptoms);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = `You are the Intelligent Automotive Service Estimation Engine (IASE) for "Omkar Automotive Workshop" in India.
Your role is to act as an AI-powered digital service advisor. You will receive customer-reported vehicle details and symptoms.
You must analyze the symptoms and provide a transparent, explainable service estimate.

CRITICAL RULES:
1. Base your estimates on the Indian automotive ecosystem (parts availability, labor rates in INR, common issues for the specified make/model).
2. Generate diagnostic reasoning.
3. Recommend specific inspection, repair, or replacement services.
4. Estimate costs in INR (Indian Rupees) realistically for an independent workshop.
5. Classify repair urgency as Critical, High, Medium, or Low based on safety and drivability.
6. Provide a confidence score for your diagnosis.
7. Return ONLY a valid JSON object matching this structure exactly:
{
  "issues": [
    {
      "name": "string",
      "reasoning": "string"
    }
  ],
  "services": [
    {
      "name": "string",
      "type": "Inspection | Repair | Replacement | Maintenance",
      "laborHours": number
    }
  ],
  "costEstimate": {
    "parts": number,
    "labor": number,
    "tax": number,
    "total": number
  },
  "urgency": "Critical | High | Medium | Low",
  "confidenceScore": number,
  "preventiveMaintenance": [
    "string"
  ]
}
`;

    const userMessage = `Vehicle: ${year} ${make} ${model} (${fuelType})
Symptoms: ${symptoms}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: userMessage }] }],
      config: {
        systemInstruction,
        temperature: 0.2,
        responseMimeType: "application/json",
      },
    });

    let jsonText = response.text || "";
    jsonText = jsonText.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
    
    const parsedData = JSON.parse(jsonText);
    return parsedData as EstimateData;
  } catch (error) {
    console.error("AI API Error during client-side estimation, using offline fallback:", error);
    return generateFallbackEstimate(make, model, year, fuelType, symptoms);
  }
}
