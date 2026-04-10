import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCoaches } from "@/hooks/useData";
import { Users, Star, MessageSquare, ClipboardList, ArrowLeft } from "lucide-react";

const CoachDashboardPage = () => {
  const { user, userRole } = useAuth();
  const navigate = useNavigate();
  const { data: coaches = [] } = useCoaches();

  if (!user || userRole !== "coach") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <h2 className="text-xl font-bold font-display text-foreground">Coach Access Only</h2>
        <p className="text-sm text-muted-foreground mt-2">This dashboard is available for coaches only.</p>
        <button onClick={() => navigate("/dashboard")} className="mt-4 px-6 py-3 bg-gradient-hero text-primary-foreground rounded-xl font-semibold text-sm shadow-elevated">
          Go to Player Dashboard
        </button>
      </div>
    );
  }

  // Mock players data for coach view
  const players = [
    { name: "Arjun Kumar", sport: "Cricket", lastSession: "Today", progress: 85 },
    { name: "Sneha Reddy", sport: "Cricket", lastSession: "Yesterday", progress: 72 },
    { name: "Rahul Verma", sport: "Cricket", lastSession: "2 days ago", progress: 68 },
    { name: "Priya Nair", sport: "Cricket", lastSession: "3 days ago", progress: 91 },
  ];

  return (
    <div className="px-4 pt-6 space-y-5 pb-4">
      <div className="flex items-center gap-2">
        <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-muted-foreground" />
        </button>
        <h1 className="text-xl font-bold font-display text-foreground">Coach Dashboard</h1>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Users, label: "Players", value: "4", color: "text-primary" },
          { icon: ClipboardList, label: "Sessions", value: "28", color: "text-secondary" },
          { icon: MessageSquare, label: "Feedback", value: "12", color: "text-sport-gold" },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-card rounded-xl p-3 shadow-card text-center">
            <Icon className={`w-5 h-5 mx-auto mb-1 ${color}`} />
            <p className="text-lg font-bold font-display text-card-foreground">{value}</p>
            <p className="text-[10px] text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      <section>
        <h2 className="text-sm font-bold font-display text-foreground mb-3">My Players</h2>
        <div className="space-y-2">
          {players.map((player, i) => (
            <motion.div key={player.name} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }} className="bg-card rounded-xl p-4 shadow-card flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground font-bold text-xs">
                {player.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-card-foreground">{player.name}</p>
                <p className="text-[11px] text-muted-foreground">{player.sport} · Last: {player.lastSession}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-card-foreground">{player.progress}%</p>
                <div className="w-16 h-1.5 bg-muted rounded-full mt-1">
                  <div className="h-full bg-gradient-hero rounded-full" style={{ width: `${player.progress}%` }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CoachDashboardPage;
