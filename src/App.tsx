import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./contexts/AuthContext";
import MobileLayout from "./components/MobileLayout";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import ChatbotPage from "./pages/ChatbotPage";
import DashboardPage from "./pages/DashboardPage";
import CoachDetailPage from "./pages/CoachDetailPage";
import EventDetailPage from "./pages/EventDetailPage";
import CoachDashboardPage from "./pages/CoachDashboardPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/*"
              element={
                <MobileLayout>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/explore" element={<ExplorePage />} />
                    <Route path="/chatbot" element={<ChatbotPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/coach/:id" element={<CoachDetailPage />} />
                    <Route path="/event/:id" element={<EventDetailPage />} />
                    <Route path="/coach-dashboard" element={<CoachDashboardPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </MobileLayout>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
