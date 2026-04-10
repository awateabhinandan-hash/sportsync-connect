import { motion } from "framer-motion";
import { MapPin, Trophy, Users, ArrowRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-sports.jpg";
import { sportCategories, events, coaches } from "@/data/mockData";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-b-3xl">
        <img src={heroImage} alt="Athletes in action" className="w-full h-64 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h1 className="text-2xl font-bold text-primary-foreground font-display">
              SportSync AI
            </h1>
            <p className="text-sm text-primary-foreground/80 mt-1">
              Where Talent Meets Opportunity
            </p>
            <button
              onClick={() => navigate("/explore")}
              className="mt-3 inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-elevated hover:opacity-90 transition-opacity"
            >
              Explore Now <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>

      <div className="px-4 space-y-6">
        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-3"
        >
          {[
            { icon: MapPin, label: "Nearby", value: "12+", color: "text-primary" },
            { icon: Trophy, label: "Events", value: "8", color: "text-sport-gold" },
            { icon: Users, label: "Coaches", value: "25+", color: "text-secondary" },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="bg-card rounded-xl p-3 shadow-card text-center">
              <Icon className={`w-5 h-5 mx-auto mb-1 ${color}`} />
              <p className="text-lg font-bold font-display text-card-foreground">{value}</p>
              <p className="text-[11px] text-muted-foreground">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Sport Categories */}
        <section>
          <h2 className="text-lg font-bold font-display text-foreground mb-3">Browse Sports</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {sportCategories.map((cat, i) => (
              <motion.button
                key={cat.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * i }}
                onClick={() => navigate("/explore")}
                className="flex-shrink-0 flex flex-col items-center gap-1.5 bg-card rounded-xl p-3 w-20 shadow-card hover:shadow-elevated transition-shadow"
              >
                <span className="text-2xl">{cat.emoji}</span>
                <span className="text-[11px] font-medium text-card-foreground">{cat.name}</span>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Upcoming Events */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold font-display text-foreground">Upcoming Events</h2>
            <button onClick={() => navigate("/explore")} className="text-xs font-medium text-primary">
              See All
            </button>
          </div>
          <div className="space-y-3">
            {events.slice(0, 3).map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                className="bg-card rounded-xl p-4 shadow-card flex items-center gap-3"
              >
                <div className="bg-gradient-hero rounded-lg w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-card-foreground truncate">{event.title}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{event.date} · {event.venue}</p>
                </div>
                {event.registrationOpen && (
                  <span className="text-[10px] font-semibold bg-secondary/10 text-secondary px-2 py-1 rounded-full flex-shrink-0">
                    Open
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Top Coaches */}
        <section className="pb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold font-display text-foreground">Top Coaches</h2>
            <button onClick={() => navigate("/explore")} className="text-xs font-medium text-primary">
              See All
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {coaches.slice(0, 4).map((coach, i) => (
              <motion.div
                key={coach.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="flex-shrink-0 bg-card rounded-xl p-4 w-40 shadow-card text-center"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-hero mx-auto flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {coach.avatar}
                </div>
                <p className="font-semibold text-sm mt-2 text-card-foreground">{coach.name}</p>
                <p className="text-[11px] text-muted-foreground">{coach.sport}</p>
                <div className="flex items-center justify-center gap-1 mt-1.5">
                  <Star className="w-3 h-3 text-sport-gold fill-sport-gold" />
                  <span className="text-xs font-medium text-card-foreground">{coach.rating}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
