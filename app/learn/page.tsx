"use client";

import React, { useState } from 'react';
import { GraduationCap, Clock, CheckCircle2, Play } from 'lucide-react';

interface LearningTrack {
  id: string;
  title: string;
  level: 'Foundational' | 'Intermediate' | 'Advanced';
  duration: string;
  modulesCount: number;
  description: string;
  syllabus: string[];
  instructor: string;
}

export default function LearnPage() {
  const [selectedTrack, setSelectedTrack] = useState<LearningTrack | null>(null);

  const tracks: LearningTrack[] = [
    {
      id: 'track-1',
      title: 'Foundations of Scientific Research & Source Epistemology',
      level: 'Foundational',
      duration: '4 Weeks · 12 Hours',
      modulesCount: 6,
      description: 'Master how to evaluate primary vs secondary sources, construct testable research hypotheses, and conduct rigorous citation network audits.',
      syllabus: [
        'Module 1: Principles of Scientific Falsifiability & Epistemic Humility',
        'Module 2: Conducting Exhaustive Literature Reviews without Bias',
        'Module 3: Primary Source Auditing & Detecting Statistical Fallacies',
        'Module 4: Structuring Field Notes and Qualitative Synthesis',
        'Module 5: Peer-Review Standards and Open Access Ethics',
        'Module 6: Capstone: Drafting a Publishable Research Proposal',
      ],
      instructor: 'Dr. Evelyn Vance, Senior Fellow in Philosophy of Science',
    },
    {
      id: 'track-2',
      title: 'Distributed Systems & Network Architecture Primitives',
      level: 'Advanced',
      duration: '6 Weeks · 24 Hours',
      modulesCount: 8,
      description: 'Comprehensive study of consensus algorithms, fault-tolerant state replication, cryptographic identity standards, and decentralized data storage.',
      syllabus: [
        'Module 1: Clock Synchronization and Vector Clocks in Distributed Nodes',
        'Module 2: Paxos, Raft, and Byzantine Fault Tolerance Mechanisms',
        'Module 3: Cryptographic Primitives: Hash Ladders and Merkle Directed Acyclic Graphs',
        'Module 4: Peer-to-Peer Network Topologies and Distributed Hash Tables (DHT)',
        'Module 5: Zero-Knowledge Proofs and Private Verification Channels',
        'Module 6: High-Throughput Relational Storage Integration with Go & PostgreSQL',
        'Module 7: Latency Mitigation & Resilient Network Proxies',
        'Module 8: Capstone: Deploying a Multi-Region Consensus Cluster',
      ],
      instructor: 'Alex Rivera, Lead Infrastructure Architect',
    },
    {
      id: 'track-3',
      title: 'Ecological Resilience & Microgrid Energy Transitions',
      level: 'Intermediate',
      duration: '5 Weeks · 15 Hours',
      modulesCount: 5,
      description: 'Engineering decentralized energy grids, battery chemistry economics, solar lifecycle analysis, and municipal energy policy.',
      syllabus: [
        'Module 1: Thermodynamics of Energy Capture and Grid Inversion',
        'Module 2: Battery Storage Chemistries: Lithium, Iron-Air, and Sodium Flow',
        'Module 3: Decentralized Load Balancing and Demand-Response Architectures',
        'Module 4: Ecological Footprint Life-Cycle Assessment (LCA) Standards',
        'Module 5: Capstone: Municipal Microgrid Resilience Feasibility Plan',
      ],
      instructor: 'Prof. Ananya Sen, Clean Grid Laboratory',
    },
    {
      id: 'track-4',
      title: 'Cognitive Architecture & Deliberate Intellectual Practice',
      level: 'Foundational',
      duration: '3 Weeks · 8 Hours',
      modulesCount: 4,
      description: 'Tools for attention sovereignty, prolonged deep work, cognitive offloading, and personal knowledge management (PKM) systems.',
      syllabus: [
        'Module 1: Neuroscience of Context Switching and Attention Capital',
        'Module 2: Building a Reliable Second Brain with Zettelkasten & Linking',
        'Module 3: Protecting Deep Work Blocks Against Digital Invasions',
        'Module 4: Capstone: Personalized Intellectual Operating System',
      ],
      instructor: 'Febros16 Cognitive Sciences Collective',
    },
  ];

  return (
    <div className="pt-28 pb-24 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-blue-400 mb-2">
            <GraduationCap className="w-4 h-4" />
            <span>Structured Educational Syllabi</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Learn
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            Access modular educational curricula, university-grade study pathways, and foundational guides engineered for scholars, engineers, and independent thinkers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="p-7 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/60 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="text-blue-400 font-semibold">{track.level}</span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{track.duration}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-slate-400">{track.modulesCount} Modules</span>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-white leading-snug">
                  {track.title}
                </h2>

                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  {track.description}
                </p>

                <div className="mt-6 pt-4 border-t border-slate-800/80">
                  <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                    Curriculum Breakdown
                  </h3>
                  <div className="space-y-2">
                    {track.syllabus.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                    {track.syllabus.length > 3 && (
                      <div className="text-xs text-slate-400 pl-5">
                        +{track.syllabus.length - 3} additional advanced modules
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Led by <strong className="text-slate-300">{track.instructor}</strong>
                </span>
                <button
                  onClick={() => setSelectedTrack(track)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Start Syllabus</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedTrack && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-blue-400 font-semibold">{selectedTrack.level} Track</span>
                <button
                  onClick={() => setSelectedTrack(null)}
                  className="text-slate-400 hover:text-white text-xs px-2 py-1 bg-slate-800 rounded cursor-pointer"
                >
                  Close
                </button>
              </div>

              <h2 className="text-2xl font-bold text-white">{selectedTrack.title}</h2>
              <p className="mt-2 text-sm text-slate-300">{selectedTrack.description}</p>

              <div className="my-6">
                <h3 className="text-xs font-mono font-bold uppercase text-slate-400 mb-3">All Modules</h3>
                <div className="space-y-3">
                  {selectedTrack.syllabus.map((mod, i) => (
                    <div key={i} className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-blue-950 text-blue-400 flex items-center justify-center font-mono font-bold shrink-0">
                        {i + 1}
                      </span>
                      <span>{mod}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Prerequisites: Open Access Scholar Account</span>
                <button
                  onClick={() => {
                    alert('Enrolled! Course materials saved to your workspace profile.');
                    setSelectedTrack(null);
                  }}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Enroll in Track
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
