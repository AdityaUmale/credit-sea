import mongoose, { Schema, Document } from "mongoose";

interface Account {
  accountNumber: string;
  bank: string;
  currentBalance: number;
  overdueAmount: number;
}

interface ReportDocument extends Document {
  name: string;
  mobilePhone: string;
  pan: string;
  creditScore: number;
  reportSummary: {
    totalAccounts: number;
    activeAccounts: number;
    closedAccounts: number;
    currentBalance: number;
    securedAmount: number;
    unsecuredAmount: number;
    last7DaysEnquiries: number;
  };
  accounts: Account[];
}

const AccountSchema = new Schema<Account>({
  accountNumber: { type: String, required: true },
  bank: { type: String, required: true },
  currentBalance: { type: Number, required: true },
  overdueAmount: { type: Number, required: true },
});

const ReportSchema = new Schema<ReportDocument>({
  name: { type: String, required: true },
  mobilePhone: { type: String, required: true },
  pan: { type: String, required: true },
  creditScore: { type: Number, required: true },
  reportSummary: {
    totalAccounts: { type: Number, required: true },
    activeAccounts: { type: Number, required: true },
    closedAccounts: { type: Number, required: true },
    currentBalance: { type: Number, required: true },
    securedAmount: { type: Number, required: true },
    unsecuredAmount: { type: Number, required: true },
    last7DaysEnquiries: { type: Number, required: true },
  },
  accounts: [AccountSchema],
});

export default mongoose.model<ReportDocument>("Report", ReportSchema);
