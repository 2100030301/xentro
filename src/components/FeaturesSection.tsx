"use client";

import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Rocket, 
  Users, 
  Target, 
  BookOpen, 
  TrendingUp,
  ArrowRight
} from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Learn",
    subtitle: "Startup Education",
    description: "Master practical startup concepts from idea validation to MVP building in a student-friendly way.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: Users,
    title: "Collaborate",
    subtitle: "Founder Stories",
    description: "Connect with young founders who've been there. Real journeys, real struggles, real wins.",
    color: "from-indigo-500 to-purple-600",
  },
  {
    icon: Target,
    title: "Build",
    subtitle: "Resources & Tools",
    description: "Access mentorship, tools, and resources that help you turn your ideas into real ventures.",
    color: "from-purple-500 to-pink-600",
  },
  {
    icon: Rocket,
    title: "Launch",
    subtitle: "Mindset & Motivation",
    description: "Develop the growth mindset and mental resilience every successful founder needs.",
    color: "from-pink-500 to-rose-600",
  },
];

const values = [
  { icon: BookOpen, label: "Empowerment", desc: "Every student deserves the right to create" },
  { icon: TrendingUp, label: "Innovation", desc: "Think beyond textbooks" },
  { icon: Users, label: "Community", desc: "Growth happens together" },
  { icon: Target, label: "Impact", desc: "Turn every idea into action" },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 rounded-3xl transition-opacity duration-500"
           style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }} 
      />
      <div className="relative p-8 bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-3xl hover:border-indigo-500/30 transition-all duration-500">
        {/* Icon */}
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
          <feature.icon className="w-7 h-7 text-white" />
        </div>
        
        {/* Content */}
        <div className="space-y-2 mb-4">
          <span className="text-sm text-indigo-400 font-medium">{feature.subtitle}</span>
          <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
        </div>
        <p className="text-gray-400 leading-relaxed mb-6">{feature.description}</p>
        
        {/* Learn more link */}
        <div className="flex items-center gap-2 text-indigo-400 group-hover:text-indigo-300 transition-colors cursor-pointer">
          <span className="text-sm font-medium">Learn more</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturesSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0f]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-sm font-medium mb-6">
            The Xentro Ecosystem
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Everything You Need to
            <span className="gradient-text"> Start Building</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            From learning the basics to launching your startup, we&apos;ve got you covered at every step of your entrepreneurial journey.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Core values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl" />
          <div className="relative p-8 md:p-12 bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Our Core Values</h3>
              <p className="text-gray-400">The principles that drive everything we do at Xentro</p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/30 transition-colors">
                    <value.icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{value.label}</h4>
                  <p className="text-sm text-gray-500">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
