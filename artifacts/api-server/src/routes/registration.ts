
import { Router, Request, Response } from "express";
import { sendRegistrationEmail } from "../lib/mailer.js";

const router = Router();

router.post("/registration", async (req: Request, res: Response) => {
  try {
    const data = req.body;

    if (
      !data.name ||
      !data.email ||
      !data.phone ||
      !data.sport ||
      !data.enquiryType ||
      !data.message
    ) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    await sendRegistrationEmail(data);

    return res.status(200).json({
      success: true,
      message: "Registration submitted successfully",
    });
  } catch (error) {
    req.log.error(
      { error },
      "Failed to send registration email"
    );

    return res.status(500).json({
      error: "Failed to send registration email",
    });
  }
});

export default router;

