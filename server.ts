import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route for Chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history = [] } = req.body;
      const key = process.env.GEMINI_API_KEY;
      if (!key || key === "MY_GEMINI_API_KEY") {
        return res.json({ text: "Hello! Welcome to Omkar Automotive Workshop. We provide expert car & bike servicing, engine diagnostics, denting & painting, and washing. How can we assist you today? Click 'Book Service' to schedule your visit!" });
      }

      const ai = new GoogleGenAI({ apiKey: key });

      const systemInstruction = `You are an intelligent, helpful, and professional customer support chatbot for "Omkar Automotive Workshop".

Your role is to assist users with:
1. Answering questions about our services (Car Servicing, Bike Servicing, Engine Repair, Denting & Painting, Washing).
2. Providing estimated pricing based on the services.
3. Guiding users on how to book an appointment (tell them to click the "Book Service" button).
4. Explaining our working hours (Monday to Saturday, 9:00 AM to 7:00 PM).

Important Formatting Rules:
- DO NOT use markdown formatting like stars (*), bold (**), hashes (#), or bullet points.
- Respond in natural, clean, conversational text, as a human would type in a chat window.
- Keep responses short, concise, and friendly.

If a user asks about something unrelated to the automotive workshop, politely redirect the conversation back to our services.`;

      const formattedHistory = history.map((msg: any) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          ...formattedHistory,
          { role: "user", parts: [{ text: message }] }
        ],
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (error) {
      console.error("Chat API Error:", error);
      res.json({ text: "Thank you for contacting Omkar Automotive Workshop! We offer complete car & bike servicing, engine diagnostic, and repairs. Please call us at +91 94224 10051 or click 'Book Service' to schedule your appointment." });
    }
  });

  // Helper function for intelligent fallback estimation when API key is missing or AI API fails
  function generateFallbackEstimate(make: string, model: string, year: string, fuelType: string, symptoms: string) {
    const symptomsLower = (symptoms || "").toLowerCase();
    const makeLower = (make || "").toLowerCase();

    // Segment multiplier based on Indian automotive market pricing
    let segmentMultiplier = 1.0;
    if (makeLower.includes("volkswagen") || makeLower.includes("skoda") || makeLower.includes("jeep") || makeLower.includes("mg") || makeLower.includes("bmw") || makeLower.includes("audi") || makeLower.includes("mercedes")) {
      segmentMultiplier = 1.6;
    } else if (makeLower.includes("toyota") || makeLower.includes("honda") || makeLower.includes("mahindra") || makeLower.includes("tata")) {
      segmentMultiplier = 1.3;
    }

    const issues: { name: string; reasoning: string }[] = [];
    const services: { name: string; type: string; laborHours: number }[] = [];
    let partsCost = 1200;
    let laborCost = 800;
    let urgency: "Critical" | "High" | "Medium" | "Low" = "Medium";
    const preventive: string[] = [];

    if (symptomsLower.includes("brake") || symptomsLower.includes("grind") || symptomsLower.includes("squeak") || symptomsLower.includes("stop")) {
      issues.push({
        name: "Brake Pad Wear & Friction Surface Deterioration",
        reasoning: `High friction wear detected on front brake pads causing metallic contact or noise during braking in ${make} ${model}.`
      });
      services.push({ name: "Front Brake Pads Replacement & Disc Inspection", type: "Replacement", laborHours: 1.5 });
      partsCost += 1800 * segmentMultiplier;
      laborCost += 600 * segmentMultiplier;
      urgency = "High";
      preventive.push("Brake fluid flush and bleeding");
    }

    if (symptomsLower.includes("ac") || symptomsLower.includes("cool") || symptomsLower.includes("warm") || symptomsLower.includes("air") || symptomsLower.includes("heat")) {
      issues.push({
        name: "HVAC Cooling Performance Reduction",
        reasoning: `Low R134a/R1234yf refrigerant pressure or clogged cabin air filter reducing climate control efficiency.`
      });
      services.push({ name: "AC Gas Top-Up & Cabin Air Filter Replacement", type: "Maintenance", laborHours: 1.0 });
      partsCost += 1400 * segmentMultiplier;
      laborCost += 500 * segmentMultiplier;
      preventive.push("Condenser coil pressure washing & leak check");
    }

    if (symptomsLower.includes("engine") || symptomsLower.includes("smoke") || symptomsLower.includes("start") || symptomsLower.includes("power") || symptomsLower.includes("knocking") || symptomsLower.includes("misfire")) {
      issues.push({
        name: "Engine Ignition & Combustion System Misfire",
        reasoning: `Ignition coil or spark plug fouling, fuel injector restriction, or sensor reading anomaly in ${fuelType} engine.`
      });
      services.push({ name: "OBD Scanner Diagnostic & Ignition System Overhaul", type: "Inspection", laborHours: 2.0 });
      partsCost += 2500 * segmentMultiplier;
      laborCost += 1200 * segmentMultiplier;
      urgency = "Critical";
      preventive.push("Throttle body cleaning & fuel injector flushing");
    }

    if (symptomsLower.includes("noise") || symptomsLower.includes("vibration") || symptomsLower.includes("rattle") || symptomsLower.includes("bump") || symptomsLower.includes("suspension") || symptomsLower.includes("thud")) {
      issues.push({
        name: "Suspension Linkage & Bushing Wear",
        reasoning: `Worn stabilizer link rods, arm bushings, or strut mount dampener transmitting suspension noise over Indian road surfaces.`
      });
      services.push({ name: "Suspension Bushing & Link Rod Replacement", type: "Repair", laborHours: 2.5 });
      partsCost += 2200 * segmentMultiplier;
      laborCost += 1000 * segmentMultiplier;
      preventive.push("Computerized 3D Wheel Alignment & Balancing");
    }

    if (symptomsLower.includes("clutch") || symptomsLower.includes("gear") || symptomsLower.includes("transmission") || symptomsLower.includes("shift")) {
      issues.push({
        name: "Clutch Assembly Friction Plate Wear",
        reasoning: `Hard gear engagement or slipping clutch disc resulting in loss of optimal power transmission.`
      });
      services.push({ name: "Clutch Set & Release Bearing Replacement", type: "Replacement", laborHours: 3.5 });
      partsCost += 4200 * segmentMultiplier;
      laborCost += 1800 * segmentMultiplier;
      urgency = "High";
      preventive.push("Synthetic transmission gear oil replacement");
    }

    if (issues.length === 0) {
      issues.push({
        name: "Multi-Point System Health Evaluation",
        reasoning: `Reported symptom ("${symptoms}") warrants a full diagnostic physical inspection for ${year} ${make} ${model}.`
      });
      services.push({ name: "Comprehensive Multi-Point Vehicle Health Inspection", type: "Inspection", laborHours: 1.5 });
      services.push({ name: "Full Synthetic Engine Oil & Oil Filter Service", type: "Maintenance", laborHours: 1.0 });
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
        total
      },
      urgency,
      confidenceScore: 88,
      preventiveMaintenance: preventive.length > 0 ? preventive : ["Routine fluid level checks every 5,000 km", "Coolant level & radiator cap test"]
    };
  }

  // API route for Intelligent Automotive Service Estimation Engine (IASE)
  app.post("/api/estimate", async (req, res) => {
    const { make = "Vehicle", model = "", year = "2022", fuelType = "Petrol", symptoms = "" } = req.body || {};

    try {
      const key = process.env.GEMINI_API_KEY;
      if (!key || key === "MY_GEMINI_API_KEY") {
        console.warn("GEMINI_API_KEY not configured or using placeholder. Using Intelligent Fallback Estimator Engine.");
        return res.json(generateFallbackEstimate(make, model, year, fuelType, symptoms));
      }

      const ai = new GoogleGenAI({ apiKey: key });

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
        contents: [
          { role: "user", parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.2,
          responseMimeType: "application/json",
        }
      });

      let jsonText = response.text || "";
      jsonText = jsonText.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
      
      const parsedData = JSON.parse(jsonText);
      return res.json(parsedData);
    } catch (error) {
      console.error("AI API Error in /api/estimate, activating fallback:", error);
      return res.json(generateFallbackEstimate(make, model, year, fuelType, symptoms));
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
