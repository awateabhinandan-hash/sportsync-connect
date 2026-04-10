import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"player" | "coach">("player");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isRegister) {
        await signUp(email, password, role, displayName);
        toast.success("Account created! Check your email to verify.");
      } else {
        await signIn(email, password);
        toast.success("Welcome back!");
        navigate("/");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-background">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-hero mx-auto flex items-center justify-center mb-4 shadow-glow">
            <span className="text-2xl font-bold text-primary-foreground font-display">SS</span>
          </div>
          <h1 className="text-2xl font-bold font-display text-foreground">SportSync AI</h1>
          <p className="text-sm text-muted-foreground mt-1">Where Talent Meets Opportunity</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="Full Name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required className="w-full pl-10 pr-4 py-3 bg-card rounded-xl text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 text-card-foreground placeholder:text-muted-foreground" />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full pl-10 pr-4 py-3 bg-card rounded-xl text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 text-card-foreground placeholder:text-muted-foreground" />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full pl-10 pr-10 py-3 bg-card rounded-xl text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 text-card-foreground placeholder:text-muted-foreground" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {isRegister && (
            <div>
              <p className="text-xs font-medium text-foreground mb-2">I am a:</p>
              <div className="flex gap-2">
                {(["player", "coach"] as const).map((r) => (
                  <button key={r} type="button" onClick={() => setRole(r)} className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${role === r ? "bg-gradient-hero text-primary-foreground shadow-elevated" : "bg-muted text-muted-foreground"}`}>
                    {r === "player" ? "🏃 Player" : "🏅 Coach"}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-hero text-primary-foreground rounded-xl font-semibold text-sm shadow-elevated flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50">
            {loading ? "Please wait..." : isRegister ? "Create Account" : "Sign In"} {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button onClick={() => setIsRegister(!isRegister)} className="text-primary font-semibold">
            {isRegister ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
