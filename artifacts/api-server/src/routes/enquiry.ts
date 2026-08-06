import { Router, Request, Response } from "express";
import fs from "fs";
import { saveEnquiryToExcel, EnquiryData, EXCEL_FILE_PATH } from "../lib/excel.js";

const router = Router();

// Registration (alias for enquiry)
router.post("/registration", async (req: Request, res: Response) => {
  try {
    const data: EnquiryData = req.body;
    if (!data.name || !data.email || !data.phone || !data.sport || !data.enquiryType || !data.message) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    saveEnquiryToExcel(data);
    return res.status(200).json({ success: true, message: "Registration saved successfully" });
  } catch (error) {
    req.log.error({ error }, "Failed to save registration");
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/enquiry", async (req: Request, res: Response) => {
  try {
    const data: EnquiryData = req.body;
    if (!data.name || !data.email || !data.phone || !data.sport || !data.enquiryType || !data.message) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    saveEnquiryToExcel(data);
    return res.status(200).json({ success: true, message: "Enquiry saved successfully" });
  } catch (error) {
    req.log.error({ error }, "Failed to save enquiry");
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Download the enquiries Excel sheet — requires Authorization: Bearer <ADMIN_DOWNLOAD_SECRET>
router.get("/download-enquiries", (req: Request, res: Response) => {
  const secret = process.env.ADMIN_DOWNLOAD_SECRET;
  if (!secret) {
    return res.status(503).json({ error: "Download not configured: ADMIN_DOWNLOAD_SECRET is not set." });
  }

  const authHeader = req.headers["authorization"] ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!token || token !== secret) {
    return res.status(401).json({ error: "Unauthorized: valid admin token required." });
  }

  if (fs.existsSync(EXCEL_FILE_PATH)) {
    return res.download(EXCEL_FILE_PATH, "enquiries.xlsx");
  }
  
  return res
    .status(404)
    .json({ error: "No enquiries yet. Submit some registrations first!" });
});

export default router;
