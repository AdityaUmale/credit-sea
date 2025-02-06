import express, { Request, Response } from "express";
import multer from "multer";
import { parseStringPromise } from "xml2js";
import Report from "../models/Report";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("file"), async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded. Please upload an XML file." });
      return;
    }

    const fileExtension = req.file.originalname.split(".").pop()?.toLowerCase();
    if (fileExtension !== "xml" || (req.file.mimetype !== "text/xml" && req.file.mimetype !== "application/xml")) {
      res.status(400).json({ error: "Invalid file format. Only XML files are allowed." });
      return;
    }

    const xmlData = req.file.buffer.toString("utf-8");
    const parsedData = await parseStringPromise(xmlData);

    console.log("Parsed XML Data:", JSON.stringify(parsedData, null, 2));

    const extractedData = {
      name: parsedData.INProfileResponse?.Current_Application?.[0]?.Current_Applicant_Details?.[0]?.First_Name?.[0] || "Unknown",
      mobilePhone: parsedData.INProfileResponse?.Current_Application?.[0]?.Current_Applicant_Details?.[0]?.MobilePhoneNumber?.[0] || "Unknown",
      pan: parsedData.INProfileResponse?.CAIS_Account?.[0]?.CAIS_Holder_ID_Details?.[0]?.Income_TAX_PAN?.[0] || "Unknown",
      creditScore: parsedData.INProfileResponse?.SCORE?.[0]?.BureauScore?.[0] || "Unknown",
      reportSummary: {
        totalAccounts: parseInt(parsedData.INProfileResponse?.CAIS_Account?.[0]?.CAIS_Summary?.[0]?.Credit_Account?.[0]?.CreditAccountTotal?.[0] || "0"),
        activeAccounts: parseInt(parsedData.INProfileResponse?.CAIS_Account?.[0]?.CAIS_Summary?.[0]?.Credit_Account?.[0]?.CreditAccountActive?.[0] || "0"),
        closedAccounts: parseInt(parsedData.INProfileResponse?.CAIS_Account?.[0]?.CAIS_Summary?.[0]?.Credit_Account?.[0]?.CreditAccountClosed?.[0] || "0"),
        currentBalance: parseInt(parsedData.INProfileResponse?.CAIS_Account?.[0]?.CAIS_Summary?.[0]?.Total_Outstanding_Balance?.[0]?.Outstanding_Balance_All?.[0] || "0"),
        securedAmount: parseInt(parsedData.INProfileResponse?.CAIS_Account?.[0]?.CAIS_Summary?.[0]?.Total_Outstanding_Balance?.[0]?.Outstanding_Balance_Secured?.[0] || "0"),
        unsecuredAmount: parseInt(parsedData.INProfileResponse?.CAIS_Account?.[0]?.CAIS_Summary?.[0]?.Total_Outstanding_Balance?.[0]?.Outstanding_Balance_UnSecured?.[0] || "0"),
        last7DaysEnquiries: 0, // Adjust this if applicable in XML
      },
      accounts: parsedData.INProfileResponse?.CAIS_Account?.[0]?.CAIS_Account_DETAILS?.map((account: any) => ({
        accountNumber: account?.Account_Number?.[0] || "Unknown",
        bank: account?.Subscriber_Name?.[0] || "Unknown",
        currentBalance: parseInt(account?.Current_Balance?.[0] || "0"),
        overdueAmount: parseInt(account?.Amount_Past_Due?.[0] || "0"),
      })) || [],
    };

    const report = new Report(extractedData);
    await report.save();

    res.status(200).json({ message: "File processed successfully.", report: report });
  } catch (err) {
    console.error("Error while processing the file:", err);
    res.status(500).json({ error: "An error occurred while processing the file. Please try again." });
  }
});

export default router;
