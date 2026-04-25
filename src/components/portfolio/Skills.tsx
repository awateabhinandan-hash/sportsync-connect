import { motion } from "framer-motion";
import { Code, Globe } from "lucide-react";

const groups = [
  {
    Icon: Code,
    title: "Programming",
    accent: "from-primary to-secondary",
    skills: [
      { name: "Java", level: "Advanced", pct: 90 },
      { name: "C", level: "Basic", pct: 55 },
    ],
  },
  {
    Icon: Globe,
    title: "Web Development",
    accent: "from-accent to-primary",
    skills: [
      { name: "HTML", level: "Proficient", pct: 90 },
      { name: "CSS", level: "Proficient", pct: 85 },
      { name: "JavaScript", level: "Intermediate", pct: 70 },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-radial opacity-50 pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-14"
        >
          <div className="font-mono text-sm text-primary mb-3">// 02. skills</div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            My <span className="text-gradient">Skills</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-hero rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {groups.map((g, gi) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.1 }}
              className="group bg-gradient-card border border-border rounded-3xl p-7 hover:border-primary/50 hover:shadow-elevated transition-all"
            >
              <div className="flex items-center gap-4 mb-7">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${g.accent} grid place-items-center text-primary-foreground shadow-glow`}
                >
                  <g.Icon size={22} />
                </div>
                <h3 className="text-xl font-bold">{g.title}</h3>
              </div>

              <div className="space-y-5">
                {g.skills.map((s, i) => (
                  <div key={s.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">{s.name}</span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {s.level}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                        className="h-full bg-gradient-hero rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
