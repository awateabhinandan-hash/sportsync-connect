import { motion } from "framer-motion";
import { Trophy, Target, TrendingUp, Calendar, Medal, Zap, LogIn } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useAuth } from "@/contexts/AuthContext";
import { useMyPerformance, useMyRegistrations } from "@/hooks/useData";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const { user, userRole, signOut } = useAuth();
  const navigate = useNavigate();
  const { data: performance = [] } = useMyPerformance(user?.id);
  const { data: registrations = [] } = useMyRegistrations(user?.id);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center mb-4 shadow-glow">
          <LogIn className="w-7 h-7 text-primary-foreground" />
        </div>
        <h2 className="text-xl font-bold font-display text-foreground">Sign in to view your dashboard</h2>
        <p className="text-sm text-muted-foreground mt-2">Track your performance, achievements, and registrations.</p>
        <button onClick={() => navigate("/login")} className="mt-4 px-6 py-3 bg-gradient-hero text-primary-foreground rounded-xl font-semibold text-sm shadow-elevated">
          Sign In
        </button>
      </div>
    );
  }

  const chartData = performance.length > 0
    ? performance.map((r) => ({
        date: new Date(r.recorded_at).toLocaleDateString("en", { month: "short", day: "numeric" }),
        speed: Number(r.speed_score) || 0,
        endurance: Number(r.endurance_score) || 0,
        skill: Number(r.skill_score) || 0,
      }))
    : [
        { date: "Nov", speed: 65, endurance: 58, skill: 70 },
        { date: "Dec", speed: 68, endurance: 62, skill: 72 },
        { date: "Jan", speed: 72, endurance: 67, skill: 75 },
        { date: "Feb", speed: 70, endurance: 72, skill: 78 },
        { date: "Mar", speed: 76, endurance: 75, skill: 80 },
        { date: "Apr", speed: 80, endurance: 78, skill: 85 },
      ];

  const displayName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Athlete";

  return (
    <div className="px-4 pt-6 space-y-5 pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground font-bold font-display">
            {displayName.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-bold font-display text-foreground">Hi, {displayName}! 👋</h1>
            <p className="text-xs text-muted-foreground capitalize">{userRole || "Player"}</p>
          </div>
        </div>
        <button onClick={signOut} className="text-xs text-muted-foreground hover:text-destructive transition-colors">Sign Out</button>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-3">
        {[
          { icon: Trophy, label: "Events Joined", value: String(registrations.length), sub: "Total", color: "text-sport-gold" },
          { icon: Target, label: "Records", value: String(performance.length), sub: "Tracked", color: "text-primary" },
          { icon: Medal, label: "Achievements", value: "—", sub: "Coming soon", color: "text-secondary" },
          { icon: Zap, label: "Active", value: "✓", sub: "Keep going!", color: "text-accent" },
        ].map(({ icon: Icon, label, value, sub, color }, i) => (
          <motion.div key={label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 * i }} className="bg-card rounded-xl p-4 shadow-card">
            <Icon className={`w-5 h-5 ${color} mb-2`} />
            <p className="text-xl font-bold font-display text-card-foreground">{value}</p>
            <p className="text-[11px] text-muted-foreground">{label}</p>
            <p className="text-[10px] text-secondary font-medium mt-0.5">{sub}</p>
          </motion.div>
        ))}
      </motion.div>

      <section className="bg-card rounded-xl p-4 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold font-display text-card-foreground flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-primary" /> Performance
          </h2>
          <span className="text-[10px] bg-secondary/10 text-secondary px-2 py-0.5 rounded-full font-medium">
            {performance.length > 0 ? "Your data" : "Sample data"}
          </span>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 90%)" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(215 15% 50%)" />
            <YAxis tick={{ fontSize: 11 }} stroke="hsl(215 15% 50%)" domain={[50, 100]} />
            <Tooltip contentStyle={{ borderRadius: "0.75rem", border: "none", boxShadow: "var(--shadow-elevated)", fontSize: "12px" }} />
            <Legend wrapperStyle={{ fontSize: "11px" }} />
            <Line type="monotone" dataKey="speed" stroke="hsl(217 91% 50%)" strokeWidth={2} dot={{ r: 3 }} name="Speed" />
            <Line type="monotone" dataKey="endurance" stroke="hsl(152 60% 45%)" strokeWidth={2} dot={{ r: 3 }} name="Endurance" />
            <Line type="monotone" dataKey="skill" stroke="hsl(38 92% 55%)" strokeWidth={2} dot={{ r: 3 }} name="Skill" />
          </LineChart>
        </ResponsiveContainer>
      </section>

      {registrations.length > 0 && (
        <section>
          <h2 className="text-sm font-bold font-display text-foreground mb-3 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-primary" /> My Registrations
          </h2>
          <div className="space-y-2">
            {registrations.map((reg: any) => (
              <div key={reg.id} className="flex items-center gap-3 bg-card rounded-xl p-3 shadow-card">
                <div className="w-2 h-2 rounded-full bg-secondary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-card-foreground truncate">{reg.events?.title || "Event"}</p>
                  <p className="text-[10px] text-muted-foreground capitalize">{reg.status}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default DashboardPage;
