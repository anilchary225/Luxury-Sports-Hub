import * as xlsx from 'xlsx';
import path from 'path';
import fs from 'fs';

export const EXCEL_FILE_PATH = path.join(process.cwd(), 'enquiries.xlsx');

export interface EnquiryData {
  name: string;
  email: string;
  phone: string;
  institution?: string;
  sport: string;
  enquiryType: string;
  preferredTiming?: string;
  attendanceType?: string;
  numberOfAttendees?: string;
  friendReferral?: string;
  referralMobile?: string;
  referralEmail?: string;
  message: string;
}

export function saveEnquiryToExcel(data: EnquiryData) {
  let workbook: xlsx.WorkBook;
  let worksheet: xlsx.WorkSheet;

  if (fs.existsSync(EXCEL_FILE_PATH)) {
    workbook = xlsx.readFile(EXCEL_FILE_PATH);
    worksheet = workbook.Sheets[workbook.SheetNames[0]];
    xlsx.utils.sheet_add_json(worksheet, [{
      ...data,
      Date: new Date().toLocaleString()
    }], { skipHeader: true, origin: -1 });
  } else {
    workbook = xlsx.utils.book_new();
    worksheet = xlsx.utils.json_to_sheet([{
      ...data,
      Date: new Date().toLocaleString()
    }]);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Enquiries');
  }

  try {
    xlsx.writeFile(workbook, EXCEL_FILE_PATH);
  } catch (error) {
    const timestamp = Date.now();
    const fallbackPath = path.join(process.cwd(), `enquiries_${timestamp}.xlsx`);
    xlsx.writeFile(workbook, fallbackPath);
  }
}
