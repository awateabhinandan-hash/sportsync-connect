import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Star, Clock, Filter, Users, Trophy, Dumbbell } from "lucide-react";
import { coaches, academies, events } from "@/data/mockData";

type Tab = "coaches" | "academies" | "events";

const ExplorePage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("coaches");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs: { key: Tab; label: string; icon: typeof Users }[] = [
    { key: "coaches", label: "Coaches", icon: Users },
    { key: "academies", label: "Academies", icon: Dumbbell },
    { key: "events", label: "Events", icon: Trophy },
  ];

  return (
    <div className="px-4 pt-6 space-y-4">
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground">Explore</h1>
        <p className="text-sm text-muted-foreground">Discover opportunities near you</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search coaches, academies, events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-3 bg-card rounded-xl text-sm border border-border shadow-card focus:outline-none focus:ring-2 focus:ring-primary/30 text-card-foreground placeholder:text-muted-foreground"
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-primary">
          <Filter className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-muted rounded-xl p-1">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === key
                ? "bg-card text-primary shadow-card"
                : "text-muted-foreground"
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="space-y-3 pb-4"
        >
          {activeTab === "coaches" &&
            coaches
              .filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.sport.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((coach) => (
                <div key={coach.id} className="bg-card rounded-xl p-4 shadow-card flex gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
                    {coach.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-sm text-card-foreground">{coach.name}</p>
                        <p className="text-[11px] text-muted-foreground">{coach.sport} · {coach.specialization}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-sport-gold fill-sport-gold" />
                        <span className="text-xs font-medium text-card-foreground">{coach.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{coach.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{coach.experience}</span>
                    </div>
                  </div>
                </div>
              ))}

          {activeTab === "academies" &&
            academies
              .filter((a) => a.name.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((academy) => (
                <div key={academy.id} className="bg-card rounded-xl p-4 shadow-card">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-sm text-card-foreground">{academy.name}</p>
                      <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" />{academy.location} · {academy.distance}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-sport-gold fill-sport-gold" />
                      <span className="text-xs font-medium text-card-foreground">{academy.rating}</span>
                    </div>
                  </div>
                  <div className="flex gap-1.5 flex-wrap mt-2">
                    {academy.sports.map((s) => (
                      <span key={s} className="text-[10px] font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">{s}</span>
                    ))}
                  </div>
                  <div className="flex gap-1.5 flex-wrap mt-2">
                    {academy.facilities.map((f) => (
                      <span key={f} className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{f}</span>
                    ))}
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-2 flex items-center gap-1">
                    <Clock className="w-3 h-3" />{academy.timing}
                  </p>
                </div>
              ))}

          {activeTab === "events" &&
            events
              .filter((e) => e.title.toLowerCase().includes(searchQuery.toLowerCase()) || e.sport.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((event) => (
                <div key={event.id} className="bg-card rounded-xl p-4 shadow-card">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          event.type === "tournament" ? "bg-primary/10 text-primary" :
                          event.type === "selection" ? "bg-secondary/10 text-secondary" :
                          "bg-accent/10 text-accent"
                        }`}>
                          {event.type}
                        </span>
                        <span className="text-[10px] text-muted-foreground">{event.sport}</span>
                      </div>
                      <p className="font-semibold text-sm text-card-foreground mt-1.5">{event.title}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{event.date} · {event.venue}</p>
                    </div>
                  </div>
                  {event.registrationOpen && (
                    <button className="mt-3 w-full py-2 bg-gradient-hero text-primary-foreground text-xs font-semibold rounded-lg">
                      Register Now
                    </button>
                  )}
                </div>
              ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ExplorePage;
