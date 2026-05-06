import express from "express";
import { clerkMiddleware } from "@clerk/express";

import {
  cancelServiceAppointment,
  confirmServicePayment,
  createServiceAppointment,
  getServiceAppointmentById,
  getServiceAppointmentsByPatient,
  getServiceAppointmentStats,
  updateServiceAppointment
} from "../controllers/serviceAppointmentController.js";

const serviceAppointmentRouter = express.Router();

// Public
serviceAppointmentRouter.get("/confirm", confirmServicePayment);

// Protected (handled manually in controller)
serviceAppointmentRouter.get("/me", clerkMiddleware(), getServiceAppointmentsByPatient);

serviceAppointmentRouter.get("/stats/summary", clerkMiddleware(), getServiceAppointmentStats);

serviceAppointmentRouter.post("/", clerkMiddleware(), createServiceAppointment);

serviceAppointmentRouter.get("/:id", clerkMiddleware(), getServiceAppointmentById);

serviceAppointmentRouter.put("/:id", clerkMiddleware(), updateServiceAppointment);

serviceAppointmentRouter.post("/:id/cancel", clerkMiddleware(), cancelServiceAppointment);

export default serviceAppointmentRouter;