/**
 * Volunteer Dashboard: Shows the volunteer's specialized view.
 * Demonstrates: A simple placeholder for future expansion (like showing applied opportunities).
 */
import React from 'react';
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const VolunteerDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
        <div className="max-w-4xl mx-auto">
            <header className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold dark:text-white">Volunteer Dashboard</h1>
                <div className="flex gap-4 items-center">
                    <ModeToggle />
                    <Button variant="outline" asChild><Link to="/">Home</Link></Button>
                </div>
            </header>
            
            <section className="bg-white dark:bg-slate-800 p-10 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 text-center">
                <h2 className="text-xl font-semibold mb-2 dark:text-white">Welcome to your dashboard!</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">This area will eventually show the volunteer opportunities you've applied for.</p>
                <Button asChild><Link to="/opportunities">Browse More Opportunities</Link></Button>
            </section>
        </div>
    </div>
  );
};

export default VolunteerDashboard;
