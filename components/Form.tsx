import { useState } from "react";

type FormProps = {
  onSubmit: (data: { [key: string]: string | number }) => void;
};

type FormData = {
  mortgageAmount: '',
  interestRate: '',
  mortgageTerm: '',
  paymentFrequency: '',
};

type FormProps = {
  onSubmit: (data: FormData) => void;
};

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    mortgageAmount: "",
    interestRate: "",
    mortgageTerm: "",
    paymentFrequency: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="mortgageAmount"
        >
          Mortgage Amount
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="mortgageAmount"
          name="mortgageAmount"
          type="number"
          value={formData.mortgageAmount}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="interestRate"
        >
          Interest Rate (%)
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="interestRate"
          name="interestRate"
          type="number"
          step="0.01"
          value={formData.interestRate}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="mortgageTerm"
        >
          Mortgage Term (years)
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="mortgageTerm"
          name="mortgageTerm"
          type="number"
          value={formData.mortgageTerm}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="paymentFrequency"
        >
          Payment Frequency
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="paymentFrequency"
          name="paymentFrequency"
          value={formData.paymentFrequency}
          onChange={handleChange}
          required
        >
          <option value="">Select a payment frequency</option>
          <option value="12">Monthly</option>
          <option value="26">Biweekly (every 2 weeks)</option>
          <option value="52">Weekly</option>
        </select>
      </div>
      <div className="flex items-center justify-center">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Calculate
        </button>
      </div>
    </form>
  );
};

export default Form;
