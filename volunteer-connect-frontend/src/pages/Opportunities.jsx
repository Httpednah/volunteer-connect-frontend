/**
 * Opportunities Page: Displays a list of all volunteer work available.
 * Demonstrates: useEffect for data fetching, dynamic mapping of data to Card components,
 * and user-role-based button actions.
 */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOpportunities, applyForOpportunity } from "../services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ModeToggle } from "@/components/mode-toggle";

export default function Opportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  // Runs when the component first loads (Mounting)
  useEffect(() => {
    // 1. Check if a user is logged in by reading localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // 2. Fetch the list of opportunities from our API
    async function fetchOpps() {
      try {
        const data = await getOpportunities();
        if (Array.isArray(data)) {
          setOpportunities(data);
        } else {
             console.error("Failed to load opportunities", data);
             setOpportunities([]); 
        }
      } catch (err) {
        console.error("Error fetching opportunities", err);
        setError("Could not load opportunities.");
      }
    }
    fetchOpps();
  }, []);

  // Function to handle clicking the 'Apply' button
  const handleApply = async (oppId) => {
    if (!user) {
        alert("Please login to apply");
        return;
    }
    try {
        const res = await applyForOpportunity({
            user_id: user.id,
            opportunity_id: oppId,
            motivation_message: "I am interested in helping out!" 
        });
        if (res) {
            alert("Application submitted successfully!");
        }
    } catch (err) {
        alert("Failed to apply");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Area */}
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight dark:text-white">Volunteer Opportunities</h1>
            <div className="flex items-center gap-4">
                <ModeToggle />
                {!user ? (
                   <>
                     <Button asChild variant="outline"><Link to="/login">Login</Link></Button>
                     <Button asChild><Link to="/register">Register</Link></Button>
                   </>
                ) : (
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">Hey, {user.name}</span>
                        <Button variant="ghost" onClick={() => {
                            localStorage.removeItem("user");
                            window.location.reload();
                        }}>Logout</Button>
                    </div>
                )}
            </div>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Grid of Opportunity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((opp) => (
            <Card key={opp.id} className="flex flex-col dark:bg-slate-800">
              <CardHeader>
                <CardTitle className="dark:text-white">{opp.title}</CardTitle>
                <CardDescription className="dark:text-slate-400">{opp.location} • {opp.duration} hours</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-slate-600 dark:text-slate-400">{opp.description}</p>
              </CardContent>
              <CardFooter>
                {/* Logic to show different button depending on user role */}
                {user && user.role === 'volunteer' ? (
                     <Button className="w-full" onClick={() => handleApply(opp.id)}>Apply Now</Button>
                ) : user && user.role === 'organization' ? (
                    <Button className="w-full" variant="secondary" disabled>Organization View</Button>
                ) : (
                    <Button className="w-full" asChild><Link to="/login">Login to Apply</Link></Button>
                )}
              </CardFooter>
            </Card>
          ))}
          {/* Show a message if no opportunities are found */}
          {opportunities.length === 0 && !error && (
            <p className="text-muted-foreground col-span-full text-center py-10">Searching for opportunities...</p>
          )}
        </div>
      </div>
    </div>
  );
}
