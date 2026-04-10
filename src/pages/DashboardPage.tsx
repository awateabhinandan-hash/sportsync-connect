import { motion } from "framer-motion";
import { Trophy, Target, TrendingUp, Calendar, Medal, Zap } from "lucide-react";
import { performanceData } from "@/data/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const DashboardPage = () => {
  return (
    <div className="px-4 pt-6 space-y-5 pb-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground font-bold font-display">
          AK
        </div>
        <div>
          <h1 className="text-xl font-bold font-display text-foreground">Hi, Arjun! 👋</h1>
          <p className="text-xs text-muted-foreground">Player · Cricket · Delhi</p>
        </div>
      </div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 gap-3"
      >
        {[
          { icon: Trophy, label: "Tournaments", value: "12", sub: "3 wins", color: "text-sport-gold" },
          { icon: Target, label: "Sessions", value: "86", sub: "This year", color: "text-primary" },
          { icon: Medal, label: "Achievements", value: "8", sub: "2 new", color: "text-secondary" },
          { icon: Zap, label: "Streak", value: "14 days", sub: "Keep going!", color: "text-accent" },
        ].map(({ icon: Icon, label, value, sub, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * i }}
            className="bg-card rounded-xl p-4 shadow-card"
          >
            <Icon className={`w-5 h-5 ${color} mb-2`} />
            <p className="text-xl font-bold font-display text-card-foreground">{value}</p>
            <p className="text-[11px] text-muted-foreground">{label}</p>
            <p className="text-[10px] text-secondary font-medium mt-0.5">{sub}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Performance Chart */}
      <section className="bg-card rounded-xl p-4 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold font-display text-card-foreground flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-primary" /> Performance
          </h2>
          <span className="text-[10px] bg-secondary/10 text-secondary px-2 py-0.5 rounded-full font-medium">Last 6 months</span>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 90%)" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(215 15% 50%)" />
            <YAxis tick={{ fontSize: 11 }} stroke="hsl(215 15% 50%)" domain={[50, 100]} />
            <Tooltip
              contentStyle={{
                borderRadius: "0.75rem",
                border: "none",
                boxShadow: "var(--shadow-elevated)",
                fontSize: "12px",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "11px" }} />
            <Line type="monotone" dataKey="speed" stroke="hsl(217 91% 50%)" strokeWidth={2} dot={{ r: 3 }} name="Speed" />
            <Line type="monotone" dataKey="endurance" stroke="hsl(152 60% 45%)" strokeWidth={2} dot={{ r: 3 }} name="Endurance" />
            <Line type="monotone" dataKey="skill" stroke="hsl(38 92% 55%)" strokeWidth={2} dot={{ r: 3 }} name="Skill" />
          </LineChart>
        </ResponsiveContainer>
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="text-sm font-bold font-display text-foreground mb-3 flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-primary" /> Recent Activity
        </h2>
        <div className="space-y-2">
          {[
            { action: "Completed batting session", time: "Today, 7:30 AM", type: "session" },
            { action: "Registered for Cricket Championship", time: "Yesterday", type: "event" },
            { action: "New achievement: 10-day streak!", time: "2 days ago", type: "achievement" },
            { action: "Feedback from Coach Rajesh", time: "3 days ago", type: "feedback" },
          ].map((activity, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
              className="flex items-center gap-3 bg-card rounded-xl p-3 shadow-card"
            >
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                activity.type === "session" ? "bg-primary" :
                activity.type === "event" ? "bg-secondary" :
                activity.type === "achievement" ? "bg-sport-gold" : "bg-accent"
              }`} />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-card-foreground truncate">{activity.action}</p>
                <p className="text-[10px] text-muted-foreground">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
