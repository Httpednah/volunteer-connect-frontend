/**
 * The Landing Page of the application.
 * It provides an overview of the platform and clear calls-to-action (CTA).
 */
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Globe, Users, ArrowRight, Sparkles } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
       {/* Navbar - Sticky at the top, stays visible when scrolling */}
       <header className="px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-indigo-100">
         <div className="flex items-center gap-2">
             <div className="bg-rose-500 p-2 rounded-full text-white">
                <Heart className="h-5 w-5 fill-current" />
             </div>
             <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-rose-500">
                Volunteer Connect
             </span>
         </div>
         <nav className="space-x-2 md:space-x-6 flex items-center">
            {/* Dark mode switch */}
            <ModeToggle />
            <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors dark:text-slate-300 dark:hover:text-indigo-400">Login</Link>
            <Button asChild size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 dark:shadow-none">
                <Link to="/register">Register</Link>
            </Button>
         </nav>
       </header>

      {/* Hero Section - The big attention-grabbing top part */}
      <main className="flex-1">
        <section className="relative py-20 px-6 overflow-hidden">
            {/* Background decorative blobs */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-200/50 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-rose-200/50 rounded-full blur-3xl -z-10"></div>
            
            <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 font-medium text-sm border border-indigo-100 shadow-sm">
                    <Sparkles className="h-4 w-4" />
                    <span>Join 10,000+ volunteers making an impact</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                    Ignite Your Passion for <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-rose-500">
                        Community Service
                    </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 text-pretty max-w-2xl mx-auto">
                    Discover local opportunities that match your skills. Connect, contribute, and create lasting change in your neighborhood.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
                    <Button asChild size="lg" className="h-14 px-8 text-lg rounded-full bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-200 transition-transform hover:-translate-y-1">
                        <Link to="/register">Start Volunteering <ArrowRight className="ml-2 h-5 w-5" /></Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-2 border-slate-200 hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all dark:text-white">
                        <Link to="/opportunities">Browse Opportunities</Link>
                    </Button>
                </div>
            </div>
        </section>

        {/* Features Section - Explaining what the app does */}
        <section className="py-20 px-6 bg-white dark:bg-slate-900/50">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Why Choose Volunteer Connect?</h2>
                    <p className="text-slate-500 max-w-xl mx-auto">We make it simple to find opportunities that resonate with your values and schedule.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <Card className="border-0 shadow-xl shadow-slate-200/50 dark:bg-slate-800 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
                        <div className="h-2 w-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                        <CardContent className="p-8 text-center space-y-4">
                            <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-indigo-100 transition-colors">
                                <Globe className="h-8 w-8 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Local Impact</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Find verified non-profits and community groups right in your neighborhood.</p>
                        </CardContent>
                    </Card>

                    {/* Feature 2 */}
                    <Card className="border-0 shadow-xl shadow-slate-200/50 dark:bg-slate-800 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
                        <div className="h-2 w-full bg-gradient-to-r from-rose-500 to-orange-500"></div>
                        <CardContent className="p-8 text-center space-y-4">
                            <div className="bg-rose-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-rose-100 transition-colors">
                                <Heart className="h-8 w-8 text-rose-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Meaningful Work</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Match your skills with causes you care about, from education to environment.</p>
                        </CardContent>
                    </Card>

                    {/* Feature 3 */}
                    <Card className="border-0 shadow-xl shadow-slate-200/50 dark:bg-slate-800 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
                        <div className="h-2 w-full bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                        <CardContent className="p-8 text-center space-y-4">
                            <div className="bg-emerald-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-emerald-100 transition-colors">
                                <Users className="h-8 w-8 text-emerald-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Growing Community</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Join thousands of volunteers and organizations building a better future together.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-slate-400">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
                 <Heart className="h-5 w-5 text-rose-500" />
                 <span className="text-lg font-semibold text-white">Volunteer Connect</span>
            </div>
            <p className="text-sm">&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
