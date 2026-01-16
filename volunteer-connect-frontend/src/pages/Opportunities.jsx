import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOpportunities, applyForOpportunity } from "../services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Opportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Fetch opportunities
    async function fetchOpps() {
      try {
        const data = await getOpportunities();
        if (Array.isArray(data)) {
          setOpportunities(data);
        } else {
             // If api error, maybe set empty or handle error
             console.error("Failed to load opportunities", data);
             setOpportunities([]); // fallback
        }
      } catch (err) {
        console.error("Error fetching opportunities", err);
        setError("Could not load opportunities.");
      }
    }
    fetchOpps();
  }, []);

  const handleApply = async (oppId) => {
    if (!user) {
        alert("Please login to apply");
        return;
    }
    try {
        const res = await applyForOpportunity({
            user_id: user.id,
            opportunity_id: oppId,
            motivation_message: "I am interested!" // Hardcoded for now per spec simplicity/time
        });
        if (res) {
            alert("Application submitted successfully!");
        }
    } catch (err) {
        alert("Failed to apply");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Volunteer Opportunities</h1>
            <div className="space-x-4">
                {!user ? (
                   <>
                     <Button asChild variant="outline"><Link to="/login">Login</Link></Button>
                     <Button asChild><Link to="/register">Register</Link></Button>
                   </>
                ) : (
                    <Button variant="ghost" onClick={() => {
                        localStorage.removeItem("user");
                        window.location.reload();
                    }}>Logout</Button>
                )}
            </div>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((opp) => (
            <Card key={opp.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{opp.title}</CardTitle>
                <CardDescription>{opp.location} • {opp.duration} hours</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground">{opp.description}</p>
              </CardContent>
              <CardFooter>
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
          {opportunities.length === 0 && !error && (
            <p className="text-muted-foreground col-span-full text-center py-10">No opportunities found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
