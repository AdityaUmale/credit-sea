import express, { Request, Response, NextFunction, RequestHandler } from "express";
import Report from "../models/Report";

const router = express.Router();

/**
 * A helper that wraps async route handlers and passes any errors to next().
 */
const asyncHandler = (fn: RequestHandler): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// GET all reports
router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const reports = await Report.find();
    res.status(200).json(reports);
  })
);

// GET a report by ID
router.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const report = await Report.findById(req.params.id);
    if (!report) {
      res.status(404).json({ error: "Report not found." });
      return;
    }
    res.status(200).json(report);
  })
);

export default router;
