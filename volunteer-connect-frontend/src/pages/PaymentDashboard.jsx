// src/pages/PaymentDashboard.jsx
import React, { useEffect, useState } from "react";

export default function PaymentDashboard() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5555/payments/1") // replace 1 with dynamic user ID
      .then(res => res.json())
      .then(data => setPayments(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Payment Dashboard</h1>
      {payments.length === 0 ? (
        <p>No payments yet.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.id}>
                <td className="border px-4 py-2">{payment.id}</td>
                <td className="border px-4 py-2">${payment.amount}</td>
                <td className="border px-4 py-2">{payment.status}</td>
                <td className="border px-4 py-2">{new Date(payment.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
