import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useCoaches = () =>
  useQuery({
    queryKey: ["coaches"],
    queryFn: async () => {
      const { data, error } = await supabase.from("coaches").select("*").order("rating", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

export const useAcademies = () =>
  useQuery({
    queryKey: ["academies"],
    queryFn: async () => {
      const { data, error } = await supabase.from("academies").select("*").order("rating", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

export const useEvents = () =>
  useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data, error } = await supabase.from("events").select("*").order("event_date", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

export const useMyRegistrations = (userId: string | undefined) =>
  useQuery({
    queryKey: ["registrations", userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from("event_registrations")
        .select("*, events(*)")
        .eq("user_id", userId);
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

export const useMyPerformance = (userId: string | undefined) =>
  useQuery({
    queryKey: ["performance", userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from("performance_records")
        .select("*")
        .eq("player_id", userId)
        .order("recorded_at", { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
