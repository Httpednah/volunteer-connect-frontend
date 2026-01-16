/**
 * Organization Dashboard: Allows organizations to post new opportunities.
 * Demonstrates: Protected routes (simulated), Form validation, and complex state payload.
 */
import React, { useState } from "react";
import { createOpportunity } from "../services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";

export default function Organization() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    duration: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Get the logged in user from storage
  const user = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    // Simple security check: Only allow 'organization' role
    if (!user || user.role !== 'organization') {
        setError("Unauthorized: You must be an organization to create opportunities.");
        return;
    }

    try {
      const payload = {
          ...formData,
          organization_id: user.id 
      };
      
      const res = await createOpportunity(payload);
      if (res.id) {
        setSuccess("Opportunity created successfully!");
        setFormData({ title: "", description: "", location: "", duration: "" });
      } else {
        setError("Failed to create opportunity.");
      }
    } catch (err) {
      setError("An error occurred while creating the opportunity.");
    }
  };

  // If user is not an organization, show an "Access Denied" view
  if (!user || user.role !== 'organization') {
      return (
          <div className="flex flex-col items-center justify-center min-h-screen text-center bg-slate-50 dark:bg-slate-900 px-4">
              <h1 className="text-2xl font-bold mb-4 dark:text-white">Access Denied</h1>
              <p className="mb-4 text-slate-600 dark:text-slate-400">You must be logged in as an Organization to view this page.</p>
              <div className="flex gap-4">
                  <Button asChild><Link to="/login">Login</Link></Button>
                  <Button asChild variant="outline"><Link to="/">Go Home</Link></Button>
              </div>
          </div>
      )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight dark:text-white">Organization Dashboard</h1>
            <div className="flex items-center gap-4">
                <ModeToggle />
                <Button variant="outline" asChild><Link to="/opportunities">View Global Feed</Link></Button>
            </div>
        </div>

        <Card className="dark:bg-slate-800">
          <CardHeader>
            <CardTitle className="dark:text-white">Create New Opportunity</CardTitle>
            <CardDescription className="dark:text-slate-400">Post a new volunteer opportunity for everyone to see.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Opportunity Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g. Wildlife Conservation"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the activity and what volunteers will do..."
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
                    placeholder="e.g. Center Park"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="duration">Estimated Duration (hours)</Label>
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

              {success && <p className="text-sm font-medium text-green-600 dark:text-green-400">{success}</p>}
              {error && <p className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p>}

              <Button type="submit" className="w-full">Post Opportunity</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
