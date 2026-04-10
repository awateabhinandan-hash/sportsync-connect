import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Star, MapPin, Clock, Award, Mail } from "lucide-react";
import { motion } from "framer-motion";

const CoachDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: coach, isLoading } = useQuery({
    queryKey: ["coach", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("coaches").select("*").eq("id", id!).single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  if (isLoading) return <div className="flex items-center justify-center min-h-[50vh]"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  if (!coach) return <div className="p-6 text-center text-muted-foreground">Coach not found</div>;

  return (
    <div className="pb-4">
      <div className="relative bg-gradient-hero h-48 rounded-b-3xl">
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 w-9 h-9 rounded-full glass flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-primary-foreground" />
        </button>
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-20 h-20 rounded-full bg-card shadow-elevated flex items-center justify-center text-2xl font-bold font-display text-primary border-4 border-card">
            {coach.name.split(" ").map(n => n[0]).join("")}
          </div>
        </div>
      </div>

      <div className="px-4 pt-14 space-y-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="text-xl font-bold font-display text-foreground">{coach.name}</h1>
          <p className="text-sm text-muted-foreground">{coach.sport} · {coach.specialization}</p>
          <div className="flex items-center justify-center gap-1 mt-1">
            <Star className="w-4 h-4 text-sport-gold fill-sport-gold" />
            <span className="font-semibold text-foreground">{Number(coach.rating).toFixed(1)}</span>
            {coach.verified && <Award className="w-4 h-4 text-secondary ml-1" />}
          </div>
        </motion.div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Experience", value: `${coach.experience_years} yrs`, icon: Clock },
            { label: "Location", value: coach.location || "—", icon: MapPin },
            { label: "Rate", value: coach.hourly_rate ? `₹${coach.hourly_rate}/hr` : "—", icon: Star },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-card rounded-xl p-3 shadow-card text-center">
              <Icon className="w-4 h-4 mx-auto mb-1 text-primary" />
              <p className="text-sm font-bold font-display text-card-foreground">{value}</p>
              <p className="text-[10px] text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        {coach.bio && (
          <div className="bg-card rounded-xl p-4 shadow-card">
            <h3 className="text-sm font-bold font-display text-card-foreground mb-2">About</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{coach.bio}</p>
          </div>
        )}

        <button className="w-full py-3 bg-gradient-hero text-primary-foreground rounded-xl font-semibold text-sm shadow-elevated flex items-center justify-center gap-2">
          <Mail className="w-4 h-4" /> Contact Coach
        </button>
      </div>
    </div>
  );
};

export default CoachDetailPage;
