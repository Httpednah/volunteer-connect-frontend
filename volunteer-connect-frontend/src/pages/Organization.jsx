import React, { useState } from "react";
import { createOpportunity } from "../services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Organization() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    duration: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Retrieve user (in real app, use Context)
  const user = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (!user || user.role !== 'organization') {
        setError("Unauthorized: You must be an organization to create opportunities.");
        return;
    }

    try {
      const payload = {
          ...formData,
          organization_id: user.id // using logged in user's ID as org ID for simplicity per spec
      };
      
      const res = await createOpportunity(payload);
      if (res.id) {
        setSuccess("Opportunity created successfully!");
        setFormData({ title: "", description: "", location: "", duration: "" });
      } else {
        setError("Failed to create opportunity.");
      }
    } catch (err) {
      setError("An error occurred.");
    }
  };

  if (!user || user.role !== 'organization') {
      return (
          <div className="flex flex-col items-center justify-center min-h-screen text-center">
              <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
              <p className="mb-4">You must be logged in as an Organization to view this page.</p>
              <Button asChild><Link to="/login">Login</Link></Button>
          </div>
      )
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Organization Dashboard</h1>
            <Button variant="outline" asChild><Link to="/opportunities">View All Opportunities</Link></Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create New Opportunity</CardTitle>
            <CardDescription>Post a new volunteer opportunity.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g. Beach Cleanup"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the activity..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                    id="location"
                    name="location"
                    placeholder="e.g. City Beach"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="duration">Duration (hours)</Label>
                    <Input
                    id="duration"
                    name="duration"
                    type="number"
                    placeholder="3"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                    />
                </div>
              </div>

              {success && <p className="text-sm text-green-600">{success}</p>}
              {error && <p className="text-sm text-red-600">{error}</p>}

              <Button type="submit" className="w-full">Create Opportunity</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
