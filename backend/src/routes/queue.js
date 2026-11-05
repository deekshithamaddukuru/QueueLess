import express from "express";
import Token from "../models/Token.js";

const router = express.Router();
const SERVICES = ["Hospital", "Bank", "College Office"];
const AVG_SERVICE_MINUTES = 5;

// List available services.
router.get("/services", (_req, res) => {
  res.json(SERVICES);
});

// Create a token. Token numbers restart daily for each service.
router.post("/tokens", async (req, res, next) => {
  try {
    const customerName = String(req.body.customerName || "").trim();
    const service = String(req.body.service || "");

    if (!customerName || customerName.length > 60) {
      return res.status(400).json({ message: "Enter a name (maximum 60 characters)." });
    }
    if (!SERVICES.includes(service)) {
      return res.status(400).json({ message: "Please select a valid service." });
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const latest = await Token.findOne({
      service, createdAt: { $gte: startOfDay }
    }).sort({ tokenNumber: -1 });

    const token = await Token.create({
      customerName, service, tokenNumber: (latest?.tokenNumber || 0) + 1
    });

    res.status(201).json(token);
  } catch (error) {
    next(error);
  }
});

// Get queue status for one token.
router.get("/tokens/:id", async (req, res, next) => {
  try {
    const token = await Token.findById(req.params.id);
    if (!token) return res.status(404).json({ message: "Token not found." });

    const ahead = token.status === "waiting"
      ? await Token.countDocuments({
          service: token.service,
          status: "waiting",
          createdAt: { $lt: token.createdAt }
        })
      : 0;

    res.json({
      ...token.toObject(),
      peopleAhead: ahead,
      estimatedWaitMinutes: ahead * AVG_SERVICE_MINUTES
    });
  } catch (error) {
    next(error);
  }
});

// Get all active tokens for admin view.
router.get("/admin/tokens", async (_req, res, next) => {
  try {
    const tokens = await Token.find({
      status: { $in: ["waiting", "serving"] }
    }).sort({ service: 1, createdAt: 1 });
    res.json(tokens);
  } catch (error) {
    next(error);
  }
});

// Call the next waiting token for a selected service.
router.post("/admin/:service/next", async (req, res, next) => {
  try {
    if (!SERVICES.includes(req.params.service)) {
      return res.status(400).json({ message: "Invalid service." });
    }
    const token = await Token.findOneAndUpdate(
      { service: req.params.service, status: "waiting" },
      { status: "serving" },
      { sort: { createdAt: 1 }, new: true }
    );
    if (!token) return res.status(404).json({ message: "No waiting tokens for this service." });
    res.json(token);
  } catch (error) {
    next(error);
  }
});

// Complete a token.
router.patch("/admin/tokens/:id/complete", async (req, res, next) => {
  try {
    const token = await Token.findByIdAndUpdate(
      req.params.id,
      { status: "completed" },
      { new: true, runValidators: true }
    );
    if (!token) return res.status(404).json({ message: "Token not found." });
    res.json(token);
  } catch (error) {
    next(error);
  }
});

export default router;
