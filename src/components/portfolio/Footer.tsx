import { Github, Heart, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-border mt-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-hero text-primary-foreground font-display font-bold">
              A
            </span>
            <div>
              <div className="font-display font-bold text-foreground">
                Abhinandan Awate
              </div>
              <div className="text-xs text-muted-foreground">
                Aspiring Software Developer
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {[
              { I: Github, href: "#" },
              { I: Linkedin, href: "#" },
              { I: Mail, href: "mailto:abhinandan.awate@email.com" },
            ].map(({ I, href }, i) => (
              <a
                key={i}
                href={href}
                className="w-10 h-10 grid place-items-center rounded-full glass text-muted-foreground hover:text-primary transition-colors"
              >
                <I size={16} />
              </a>
            ))}
          </div>

          <div className="text-sm text-muted-foreground flex items-center gap-1.5">
            © {year} Built with
            <Heart size={14} className="text-accent fill-accent" />
            by Abhinandan
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
