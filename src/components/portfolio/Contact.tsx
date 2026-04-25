import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields");
      return;
    }
    setSending(true);
    setTimeout(() => {
      toast.success("Message sent! I'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
      setSending(false);
    }, 800);
  };

  const items = [
    { Icon: MapPin, label: "Address", value: "Belagavi, Karnataka, India" },
    { Icon: Phone, label: "Phone", value: "+91 80731 02907", href: "tel:+918073102907" },
    { Icon: Mail, label: "Email", value: "abhinandan.awate@email.com", href: "mailto:abhinandan.awate@email.com" },
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-radial opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-14"
        >
          <div className="font-mono text-sm text-primary mb-3">// 04. contact</div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Contact <span className="text-gradient">Me</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Have a project in mind or just want to say hello? Drop a message —
            I'd love to hear from you.
          </p>
          <div className="h-1 w-20 bg-gradient-hero rounded-full mt-4" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            {items.map(({ Icon, label, value, href }) => {
              const Inner = (
                <div className="flex items-start gap-4 bg-gradient-card border border-border rounded-2xl p-5 hover:border-primary/50 hover:-translate-y-1 transition-all shadow-card">
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-primary/15 text-primary grid place-items-center">
                    <Icon size={20} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground mb-1">{label}</div>
                    <div className="font-medium text-foreground break-words">{value}</div>
                  </div>
                </div>
              );
              return href ? (
                <a key={label} href={href}>{Inner}</a>
              ) : (
                <div key={label}>{Inner}</div>
              );
            })}

            <div className="bg-gradient-card border border-border rounded-2xl p-5">
              <div className="text-xs text-muted-foreground mb-3">Find me on</div>
              <div className="flex gap-3">
                {[Github, Linkedin, Twitter].map((I, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 grid place-items-center rounded-full bg-muted text-muted-foreground hover:bg-gradient-hero hover:text-primary-foreground transition-all"
                  >
                    <I size={18} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={submit}
            className="lg:col-span-3 bg-gradient-card border border-border rounded-3xl p-7 sm:p-8 shadow-card space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-background/50 border-border h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="bg-background/50 border-border h-11"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Tell me about your project or just say hi..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="bg-background/50 border-border min-h-[140px] resize-none"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={sending}
              className="w-full sm:w-auto bg-gradient-hero hover:opacity-90 text-primary-foreground border-0 shadow-glow"
            >
              {sending ? "Sending..." : "Send Message"}
              <Send size={16} />
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
