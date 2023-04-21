import { useState, useEffect } from 'react';


type PaymentSchedule = {
  'Mortgage Remaining': string;
  'Interest Rate': string;
  'Principal Paid': string;
  'Total Interest Paid': string;
};

const MortgageCalculator = () => {
  const [paymentSchedule, setPaymentSchedule] = useState<PaymentSchedule[]>([]);

  const calculatePaymentSchedule = (formData: {
    mortgageAmount: number;
    interestRate: number;
    mortgageTerm: number;
    paymentFrequency: number;
  }): void => {
    const mortgagePaymentSchedule = [];

    const mortgageAmount = formData.mortgageAmount;
    const interestRate = formData.interestRate / 100 / 12;
    const mortgageTermMonths = formData.mortgageTerm * 12;
    const paymentFrequency = formData.paymentFrequency;

    let totalPrincipalPaid = 0;

    for (let i = 0; i < mortgageTermMonths; i++) {
      const principal = mortgageAmount - totalPrincipalPaid;
      const interest = principal * interestRate;
      const payment = principal * (interestRate / (1 - Math.pow(1 + interestRate, -mortgageTermMonths)));
      const principalPaid = payment - interest;
      const totalInterestPaid = i > 0 ? mortgagePaymentSchedule[i - 1]['Total Interest Paid'] + interest : interest;

      mortgagePaymentSchedule.push({
        'Mortgage Remaining': principal.toFixed(2),
        'Interest Rate': (interestRate * 12 * 100).toFixed(2),
        'Principal Paid': principalPaid.toFixed(2),
        'Total Interest Paid': totalInterestPaid.toFixed(2),
      });

      totalPrincipalPaid += principalPaid;
    }

    setPaymentSchedule(mortgagePaymentSchedule);
  };

  useEffect(() => {
    const formData = {
      mortgageAmount: 100000,
      interestRate: 3.5,
      mortgageTerm: 25,
      paymentFrequency: 12,
    };

    calculatePaymentSchedule(formData);
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-4">Mortgage Calculator</h1>
      <Form onSubmit={calculatePaymentSchedule} />
      {paymentSchedule.length > 0 && (
        <table className="table-auto border-collapse border border-gray-400">
          <thead>
            <tr>
              {Object.keys(paymentSchedule[0]).map((key) => (
                <th key={key} className="border border-gray-400 px-4 py-2">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paymentSchedule.map((payment, index) => (
              <tr key={index}>
                {Object.values(payment).map((value, index) => (
                  <td key={index} className="border border-gray-400 px-4 py-2">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MortgageCalculator;
