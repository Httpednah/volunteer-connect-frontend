import React, { useEffect, useState } from "react";

export default function ApplicationsDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchApplications() {
      try {
        const res = await fetch("http://localhost:5555/applications");
        if (!res.ok) throw new Error("Failed to fetch applications");
        const data = await res.json();
        setApplications(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load applications. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchApplications();
  }, []);

  if (loading) return <p className="p-4">Loading applications...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">My Applications</h2>

      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3 text-left">ID</th>
                <th className="border p-3 text-left">Opportunity</th>
                <th className="border p-3 text-left">Organization</th>
                <th className="border p-3 text-left">Status</th>
                <th className="border p-3 text-left">Payment</th>
                <th className="border p-3 text-left">Applied On</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="border p-2">{app.id}</td>
                  <td className="border p-2">{app.opportunity_title}</td>
                  <td className="border p-2">{app.organization_name}</td>
                  <td
                    className={`border p-2 font-semibold ${
                      app.status === "Accepted"
                        ? "text-green-600"
                        : app.status === "Pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {app.status}
                  </td>
                  <td className="border p-2">
                    {app.payment_status === "Paid" ? (
                      <span className="text-green-600 font-semibold">
                        ₦{app.payment_amount}
                      </span>
                    ) : (
                      <span className="text-yellow-600">Pending</span>
                    )}
                  </td>
                  <td className="border p-2">
                    {new Date(app.applied_on).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
