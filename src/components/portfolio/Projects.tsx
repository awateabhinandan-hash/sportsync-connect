import { motion } from "framer-motion";
import { ArrowUpRight, Check, Github } from "lucide-react";

const projects = [
  {
    name: "Online Food Ordering Application for College Campus",
    description:
      "A web-based application designed for college students to browse menus and order food efficiently within campus.",
    features: [
      "Easy food ordering interface",
      "Menu browsing",
      "Order management",
    ],
    tech: ["HTML", "CSS", "JavaScript", "Java"],
    tag: "Full-Stack Web App",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-14"
        >
          <div className="font-mono text-sm text-primary mb-3">// 03. projects</div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Selected <span className="text-gradient">Projects</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-hero rounded-full" />
        </motion.div>

        <div className="grid gap-8">
          {projects.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden bg-gradient-card border border-border rounded-3xl p-7 sm:p-10 hover:border-primary/50 hover:shadow-elevated transition-all"
            >
              <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors" />

              <div className="relative grid lg:grid-cols-5 gap-8">
                <div className="lg:col-span-2">
                  {/* Visual */}
                  <div className="aspect-video rounded-2xl bg-gradient-hero p-1 shadow-glow">
                    <div className="w-full h-full rounded-2xl bg-card grid-bg grid place-items-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                      <div className="relative text-center px-4">
                        <div className="text-5xl mb-2">🍔</div>
                        <div className="font-mono text-xs text-muted-foreground">
                          campus.eats
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-3 space-y-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <span className="inline-block font-mono text-xs px-3 py-1 rounded-full bg-primary/15 text-primary">
                      {p.tag}
                    </span>
                    <div className="flex gap-2">
                      <a
                        href="#"
                        className="w-9 h-9 grid place-items-center rounded-full glass hover:text-primary transition-colors"
                        aria-label="GitHub"
                      >
                        <Github size={16} />
                      </a>
                      <a
                        href="#"
                        className="w-9 h-9 grid place-items-center rounded-full glass hover:text-primary transition-colors"
                        aria-label="Live"
                      >
                        <ArrowUpRight size={16} />
                      </a>
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold leading-tight">
                    {p.name}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    {p.description}
                  </p>

                  <ul className="space-y-2">
                    {p.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-3 text-sm text-foreground"
                      >
                        <span className="w-5 h-5 rounded-full bg-secondary/20 text-secondary grid place-items-center shrink-0">
                          <Check size={12} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-xs px-3 py-1.5 rounded-lg bg-muted text-muted-foreground border border-border hover:border-primary hover:text-primary transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
