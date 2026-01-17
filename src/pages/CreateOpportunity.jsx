import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const API_URL = "http://localhost:5555/opportunities"; // Update this to your Flask route

export default function CreateOpportunity() {
  const navigate = useNavigate();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    title: Yup.string()
      .min(5, "Title must be at least 5 characters")
      .required("Title is required"),
    description: Yup.string()
      .min(20, "Description must be at least 20 characters")
      .required("Description is required"),
    organization: Yup.string().required("Organization is required"),
    location: Yup.string().required("Location is required"),
  });

  // Handle form submission
  const handleSubmit = async (
    values,
    { setSubmitting, resetForm, setStatus },
  ) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus({ error: data.error || "Failed to create opportunity" });
      } else {
        setStatus({ success: "Opportunity created successfully!" });
        resetForm();
        // Redirect to opportunities page after short delay
        setTimeout(() => navigate("/opportunities"), 1500);
      }
    } catch (err) {
      console.error(err);
      setStatus({ error: "Server error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
      <div className="w-full max-w-lg bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md border dark:border-slate-700">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">
          Create Opportunity
        </h2>

        <Formik
          initialValues={{
            title: "",
            description: "",
            organization: "",
            location: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  name="title"
                  placeholder="Opportunity Title"
                  className="w-full px-3 py-2 border rounded dark:bg-slate-700 dark:text-white"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Field
                  name="description"
                  as="textarea"
                  placeholder="Opportunity Description"
                  rows={4}
                  className="w-full px-3 py-2 border rounded dark:bg-slate-700 dark:text-white"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Field
                  name="organization"
                  placeholder="Organization Name"
                  className="w-full px-3 py-2 border rounded dark:bg-slate-700 dark:text-white"
                />
                <ErrorMessage
                  name="organization"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Field
                  name="location"
                  placeholder="Location"
                  className="w-full px-3 py-2 border rounded dark:bg-slate-700 dark:text-white"
                />
                <ErrorMessage
                  name="location"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {status?.error && (
                <p className="text-red-500 text-sm">{status.error}</p>
              )}
              {status?.success && (
                <p className="text-green-500 text-sm">{status.success}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                {isSubmitting ? "Submitting..." : "Create Opportunity"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
