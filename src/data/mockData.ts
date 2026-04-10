export interface Coach {
  id: string;
  name: string;
  sport: string;
  rating: number;
  experience: string;
  location: string;
  avatar: string;
  specialization: string;
}

export interface Academy {
  id: string;
  name: string;
  sports: string[];
  location: string;
  distance: string;
  rating: number;
  facilities: string[];
  timing: string;
}

export interface SportEvent {
  id: string;
  title: string;
  sport: string;
  date: string;
  venue: string;
  type: "tournament" | "selection" | "workshop";
  registrationOpen: boolean;
}

export interface PerformanceStat {
  month: string;
  speed: number;
  endurance: number;
  skill: number;
}

export const coaches: Coach[] = [
  { id: "1", name: "Rajesh Kumar", sport: "Cricket", rating: 4.8, experience: "12 years", location: "Delhi", avatar: "RK", specialization: "Batting" },
  { id: "2", name: "Priya Sharma", sport: "Badminton", rating: 4.9, experience: "8 years", location: "Hyderabad", avatar: "PS", specialization: "Singles" },
  { id: "3", name: "Amit Singh", sport: "Football", rating: 4.6, experience: "15 years", location: "Mumbai", avatar: "AS", specialization: "Midfield Strategy" },
  { id: "4", name: "Sanya Patel", sport: "Tennis", rating: 4.7, experience: "10 years", location: "Pune", avatar: "SP", specialization: "Serve & Volley" },
  { id: "5", name: "Vikram Reddy", sport: "Basketball", rating: 4.5, experience: "6 years", location: "Bangalore", avatar: "VR", specialization: "Guard Play" },
];

export const academies: Academy[] = [
  { id: "1", name: "Elite Sports Academy", sports: ["Cricket", "Football"], location: "MG Road, Delhi", distance: "2.3 km", rating: 4.7, facilities: ["Indoor Courts", "Gym", "Swimming Pool"], timing: "6 AM - 9 PM" },
  { id: "2", name: "Champions Arena", sports: ["Basketball", "Volleyball"], location: "Jubilee Hills, Hyderabad", distance: "4.1 km", rating: 4.5, facilities: ["Outdoor Courts", "Training Center"], timing: "5 AM - 10 PM" },
  { id: "3", name: "ProStar Training Hub", sports: ["Tennis", "Badminton"], location: "Koregaon Park, Pune", distance: "1.8 km", rating: 4.8, facilities: ["Clay Courts", "Fitness Center", "Nutrition Lab"], timing: "6 AM - 8 PM" },
];

export const events: SportEvent[] = [
  { id: "1", title: "Inter-City Cricket Championship", sport: "Cricket", date: "2026-05-15", venue: "National Stadium, Delhi", type: "tournament", registrationOpen: true },
  { id: "2", title: "State-Level Badminton Trials", sport: "Badminton", date: "2026-04-28", venue: "Sports Complex, Hyderabad", type: "selection", registrationOpen: true },
  { id: "3", title: "Youth Football Workshop", sport: "Football", date: "2026-05-05", venue: "Mumbai FC Ground", type: "workshop", registrationOpen: true },
  { id: "4", title: "National Tennis Open", sport: "Tennis", date: "2026-06-10", venue: "DLTA Complex, Delhi", type: "tournament", registrationOpen: false },
  { id: "5", title: "Basketball Talent Hunt", sport: "Basketball", date: "2026-05-20", venue: "Kanteerava Stadium, Bangalore", type: "selection", registrationOpen: true },
];

export const performanceData: PerformanceStat[] = [
  { month: "Nov", speed: 65, endurance: 58, skill: 70 },
  { month: "Dec", speed: 68, endurance: 62, skill: 72 },
  { month: "Jan", speed: 72, endurance: 67, skill: 75 },
  { month: "Feb", speed: 70, endurance: 72, skill: 78 },
  { month: "Mar", speed: 76, endurance: 75, skill: 80 },
  { month: "Apr", speed: 80, endurance: 78, skill: 85 },
];

export const sportCategories = [
  { name: "Cricket", emoji: "🏏", color: "hsl(217 91% 50%)" },
  { name: "Football", emoji: "⚽", color: "hsl(152 60% 45%)" },
  { name: "Basketball", emoji: "🏀", color: "hsl(38 92% 55%)" },
  { name: "Badminton", emoji: "🏸", color: "hsl(280 65% 55%)" },
  { name: "Tennis", emoji: "🎾", color: "hsl(152 60% 45%)" },
  { name: "Swimming", emoji: "🏊", color: "hsl(200 80% 50%)" },
];
