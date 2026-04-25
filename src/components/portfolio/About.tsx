import { motion } from "framer-motion";
import { Code2, GraduationCap, Lightbulb, Rocket } from "lucide-react";

const stats = [
  { Icon: GraduationCap, label: "CS Student", value: "Final Year" },
  { Icon: Code2, label: "Core Stack", value: "Java + Web" },
  { Icon: Lightbulb, label: "Approach", value: "Problem Solver" },
  { Icon: Rocket, label: "Goal", value: "Build & Ship" },
];

const About = () => {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-14"
        >
          <div className="font-mono text-sm text-primary mb-3">// 01. about</div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-hero rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 space-y-5 text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            <p>
              I am a passionate{" "}
              <span className="text-foreground font-semibold">
                Computer Science student
              </span>{" "}
              with a strong interest in software development and web
              technologies.
            </p>
            <p>
              I enjoy{" "}
              <span className="text-primary font-semibold">
                solving real-world problems
              </span>{" "}
              through coding and continuously improving my skills. I have
              experience in{" "}
              <span className="text-secondary font-semibold">
                Java programming
              </span>{" "}
              and front-end development, and I love turning ideas into
              functional, well-crafted products.
            </p>
            <p>
              Currently based in <span className="text-foreground">Belagavi</span>,
              I'm focused on building meaningful projects, sharpening my
              fundamentals, and preparing to grow as a professional developer.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 grid grid-cols-2 gap-4"
          >
            {stats.map(({ Icon, label, value }, i) => (
              <div
                key={i}
                className="bg-gradient-card border border-border rounded-2xl p-5 hover:border-primary/50 hover:-translate-y-1 transition-all shadow-card"
              >
                <Icon className="text-primary mb-3" size={22} />
                <div className="text-xs text-muted-foreground mb-1">{label}</div>
                <div className="font-display font-semibold text-foreground">
                  {value}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
