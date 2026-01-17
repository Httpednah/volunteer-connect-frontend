import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function CreateArticle() {
  const navigate = useNavigate();

  const initialValues = {
    title: "",
    author: "",
    content: "",
    preview: "",
    minutes_to_read: ""
  };

  const validationSchema = Yup.object({
    title: Yup.string().min(5, "Too short").required("Required"),
    author: Yup.string().required("Required"),
    content: Yup.string().min(20, "Content too short").required("Required"),
    preview: Yup.string().required("Required"),
    minutes_to_read: Yup.number().positive().required("Required")
  });

  const handleSubmit = (values) => {
    fetch("http://127.0.0.1:5555/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then(res => res.json())
      .then(() => navigate("/articles"));
  };

  return (
    <div>
      <h1>Create Article</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          <div>
            <label>Title</label>
            <Field name="title" />
            <ErrorMessage name="title" component="div" />
          </div>
          <div>
            <label>Author</label>
            <Field name="author" />
            <ErrorMessage name="author" component="div" />
          </div>
          <div>
            <label>Content</label>
            <Field as="textarea" name="content" />
            <ErrorMessage name="content" component="div" />
          </div>
          <div>
            <label>Preview</label>
            <Field name="preview" />
            <ErrorMessage name="preview" component="div" />
          </div>
          <div>
            <label>Minutes to Read</label>
            <Field type="number" name="minutes_to_read" />
            <ErrorMessage name="minutes_to_read" component="div" />
          </div>
          <button type="submit">Create</button>
        </Form>
      </Formik>
    </div>
  );
}
