import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-center p-4">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
        Volunteer Connect
      </h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-[600px]">
        Connecting volunteers with organizations to make a difference in the community.
      </p>
      <div className="flex gap-4">
        <Button asChild size="lg">
            <Link to="/login">Login</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
            <Link to="/register">Register</Link>
        </Button>
      </div>
      <div className="mt-12 flex gap-4 text-sm text-muted-foreground">
        <Link to="/opportunities" className="hover:underline">Browse Opportunities</Link>
        <span>•</span>
        <Link to="/organization" className="hover:underline">Organization Dashboard</Link>
      </div>
    </div>
  );
}
