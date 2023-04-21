import { useState } from 'react';
import Form from '../components/Form';
import Table from '../components/Table';
import { writeFileSync } from 'xlsx';
import { saveAs } from 'file-saver';

type Payment = {
  Month: number;
  'Mortgage Remaining': number;
  'Interest Rate': number;
  'Principal Paid': number;
  'Interest Paid': number;
};

export default function Home() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);

  const handleSubmit = async (data: { [key: string]: string | number }) => {
    const res = await fetch('/api/mortgage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const payments = await res.json();
    setPayments(payments);

    // convert payments data to Excel file
    const worksheet = XLSX.utils.json_to_sheet(payments);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Mortgage Payments');
    const excelData = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // create download link for Excel file
    const blob = new Blob([excelData], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    setDownloadLink(url);
  };

  const handleDownload = () => {
    saveAs(downloadLink as string, 'mortgage-payments.xlsx');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-2 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <Form onSubmit={handleSubmit} />
          {payments.length > 0 ? (
            <div>
              <Table payments={payments} />
              {downloadLink && (
                <button
                  onClick={handleDownload}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-4"
                >
                  Download
                </button>
              )}
            </div>
          ) : (
            <p className="text-center mt-4">No results to display.</p>
          )}
           </div>
         </div>
       </div>
     );
   }
