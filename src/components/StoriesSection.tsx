"use client";

import { motion } from "framer-motion";
import { Quote, ArrowRight, MapPin } from "lucide-react";

const stories = [
  {
    name: "Aarav Sharma",
    age: 17,
    location: "Jaipur, Rajasthan",
    startup: "EcoPackage",
    quote: "I thought startups were only for IIT graduates. Xentro showed me that age and college don't define your potential to create.",
    achievement: "Raised ₹5L seed funding",
    image: "/api/placeholder/100/100",
  },
  {
    name: "Priya Nair",
    age: 19,
    location: "Kochi, Kerala",
    startup: "LearnLocal",
    quote: "From a small town idea to a platform serving 10,000+ students. The mentors at Xentro believed in me before anyone else did.",
    achievement: "10K+ active users",
    image: "/api/placeholder/100/100",
  },
  {
    name: "Rohit Verma",
    age: 16,
    location: "Varanasi, UP",
    startup: "AgriTech Connect",
    quote: "Being from a Tier 3 city, I had the idea but no guidance. Xentro connected me with mentors who understood my vision.",
    achievement: "Featured in Economic Times",
    image: "/api/placeholder/100/100",
  },
];

function StoryCard({ story, index }: { story: typeof stories[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative h-full p-8 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl hover:border-indigo-500/30 transition-all duration-500">
        {/* Quote icon */}
        <Quote className="w-10 h-10 text-indigo-500/30 mb-6" />
        
        {/* Quote */}
        <p className="text-gray-300 text-lg leading-relaxed mb-8 italic">
          &ldquo;{story.quote}&rdquo;
        </p>
        
        {/* Achievement badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm text-indigo-300">{story.achievement}</span>
        </div>
        
        {/* Author info */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
            {story.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h4 className="text-white font-semibold">{story.name}, {story.age}</h4>
            <p className="text-indigo-400 text-sm">{story.startup}</p>
            <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
              <MapPin className="w-3 h-3" />
              {story.location}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function StoriesSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0f]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium mb-6">
            Founder Stories
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Tomorrow&apos;s Founders Are in
            <span className="gradient-text"> Today&apos;s Classrooms</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Real stories from student entrepreneurs who dared to start. Your story could be next.
          </p>
        </motion.div>

        {/* Stories grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stories.map((story, index) => (
            <StoryCard key={story.name} story={story} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-2xl hover:border-indigo-500/50 transition-all duration-300"
          >
            Read More Stories
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
