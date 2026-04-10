import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Calendar, MapPin, Users, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: event, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("events").select("*").eq("id", id!).single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const handleRegister = async () => {
    if (!user) {
      toast.error("Please sign in to register for events");
      navigate("/login");
      return;
    }
    try {
      const { error } = await supabase.from("event_registrations").insert({
        event_id: id!,
        user_id: user.id,
      });
      if (error) {
        if (error.code === "23505") {
          toast.info("You're already registered for this event!");
        } else {
          throw error;
        }
      } else {
        toast.success("Successfully registered! 🎉");
      }
    } catch (e: any) {
      toast.error(e.message || "Registration failed");
    }
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-[50vh]"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  if (!event) return <div className="p-6 text-center text-muted-foreground">Event not found</div>;

  const typeColor = event.event_type === "tournament" ? "bg-primary/10 text-primary" : event.event_type === "selection" ? "bg-secondary/10 text-secondary" : "bg-accent/10 text-accent";

  return (
    <div className="pb-4">
      <div className="relative bg-gradient-hero h-40 rounded-b-3xl flex items-end p-5">
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 w-9 h-9 rounded-full glass flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-primary-foreground" />
        </button>
        <div>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary-foreground/20 text-primary-foreground capitalize`}>{event.event_type}</span>
          <h1 className="text-xl font-bold font-display text-primary-foreground mt-2">{event.title}</h1>
        </div>
      </div>

      <div className="px-4 pt-5 space-y-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-3">
          {[
            { icon: Calendar, label: "Date", value: new Date(event.event_date).toLocaleDateString("en", { weekday: "short", month: "short", day: "numeric", year: "numeric" }) },
            { icon: MapPin, label: "Venue", value: event.venue || "TBD" },
            { icon: Trophy, label: "Sport", value: event.sport },
            { icon: Users, label: "Max", value: event.max_participants ? `${event.max_participants} participants` : "Unlimited" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-card rounded-xl p-3 shadow-card">
              <Icon className="w-4 h-4 text-primary mb-1" />
              <p className="text-[10px] text-muted-foreground">{label}</p>
              <p className="text-xs font-semibold text-card-foreground mt-0.5">{value}</p>
            </div>
          ))}
        </motion.div>

        {event.description && (
          <div className="bg-card rounded-xl p-4 shadow-card">
            <h3 className="text-sm font-bold font-display text-card-foreground mb-2">About</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
          </div>
        )}

        {event.registration_open ? (
          <button onClick={handleRegister} className="w-full py-3 bg-gradient-hero text-primary-foreground rounded-xl font-semibold text-sm shadow-elevated">
            Register Now
          </button>
        ) : (
          <div className="w-full py-3 bg-muted text-muted-foreground rounded-xl font-semibold text-sm text-center">
            Registration Closed
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetailPage;
