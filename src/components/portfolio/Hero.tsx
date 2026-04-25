import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/30 rounded-full blur-[120px] animate-glow-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-glow-pulse" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-7"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted-foreground"
            >
              <Sparkles size={14} className="text-primary" />
              <span>Available for opportunities</span>
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05]">
              <span className="block text-foreground">Hi, I'm</span>
              <span className="block text-gradient mt-2">
                Abhinandan Vaibhav
              </span>
              <span className="block text-foreground">Awate.</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground font-medium">
              Aspiring Software Developer{" "}
              <span className="text-primary">|</span> Java Enthusiast{" "}
              <span className="text-primary">|</span> Web Developer
            </p>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
              I build efficient, scalable, and user-friendly web applications
              with modern technologies.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                size="lg"
                onClick={() => scrollTo("projects")}
                className="bg-gradient-hero hover:opacity-90 text-primary-foreground border-0 shadow-glow group"
              >
                View Projects
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo("contact")}
                className="border-border hover:border-primary hover:bg-primary/10"
              >
                <Mail size={18} />
                Contact Me
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="text-muted-foreground hover:text-foreground"
              >
                <Download size={18} />
                Resume
              </Button>
            </div>

            <div className="flex items-center gap-5 pt-4">
              {[
                { Icon: Github, href: "#" },
                { Icon: Linkedin, href: "#" },
                { Icon: Mail, href: "#contact" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-10 h-10 grid place-items-center rounded-full glass text-muted-foreground hover:text-primary hover:shadow-glow transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative animate-float">
              <div className="absolute inset-0 bg-gradient-hero rounded-full blur-3xl opacity-40" />
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-hero p-1 shadow-elevated">
                <div className="w-full h-full rounded-full bg-card grid place-items-center overflow-hidden">
                  <span className="text-8xl sm:text-9xl font-display font-bold text-gradient">
                    AA
                  </span>
                </div>
              </div>
              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 glass rounded-2xl px-4 py-3 shadow-elevated"
              >
                <div className="font-mono text-xs text-secondary">{"<java/>"}</div>
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -left-4 glass rounded-2xl px-4 py-3 shadow-elevated"
              >
                <div className="font-mono text-xs text-primary">{"</web>"}</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
