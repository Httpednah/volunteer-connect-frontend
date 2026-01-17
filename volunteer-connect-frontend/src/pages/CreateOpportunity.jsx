// src/pages/CreateOpportunity.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Replace this with your actual backend URL
const API_URL = "http://localhost:5555/articles";

export default function CreateOpportunity() {
  const navigate = useNavigate();

  const initialValues = {
    title: "",
    author: "",
    content: "",
    preview: "",
    minutes_to_read: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
    content: Yup.string().required("Content is required"),
    preview: Yup.string()
      .max(50, "Preview must be 50 characters or less")
      .required("Preview is required"),
    minutes_to_read: Yup.number()
      .typeError("Must be a number")
      .positive("Must be positive")
      .integer("Must be an integer")
      .required("Minutes to read is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Error creating opportunity");
      } else {
        alert("Opportunity created successfully!");
        resetForm();
        navigate("/opportunities"); // redirect to list
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 px-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-md border border-slate-200">
        <h2 className="text-2xl font-bold mb-4">Create Opportunity</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  name="title"
                  placeholder="Title"
                  className="w-full px-3 py-2 border rounded"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <Field
                  name="author"
                  placeholder="Author"
                  className="w-full px-3 py-2 border rounded"
                />
                <ErrorMessage
                  name="author"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <Field
                  as="textarea"
                  name="content"
                  placeholder="Content"
                  className="w-full px-3 py-2 border rounded"
                  rows="4"
                />
                <ErrorMessage
                  name="content"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <Field
                  name="preview"
                  placeholder="Preview (max 50 chars)"
                  className="w-full px-3 py-2 border rounded"
                />
                <ErrorMessage
                  name="preview"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <Field
                  name="minutes_to_read"
                  placeholder="Minutes to read"
                  className="w-full px-3 py-2 border rounded"
                />
                <ErrorMessage
                  name="minutes_to_read"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {isSubmitting ? "Creating..." : "Create Opportunity"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
