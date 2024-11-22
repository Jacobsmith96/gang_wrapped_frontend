import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import "./App.css";

// Dummy data for demonstration
const dummyData = {
  messagesCount: [
    { username: "xXDragonSlayerXx", count: 15234, avatar: "/api/placeholder/40/40" },
    { username: "CyberNinja99", count: 12453, avatar: "/api/placeholder/40/40" },
    { username: "PixelWarrior", count: 10876, avatar: "/api/placeholder/40/40" },
  ],
  reactionKing: [
    { username: "MemeQueen", count: 5432, avatar: "/api/placeholder/40/40" },
    { username: "EmoteGod", count: 4567, avatar: "/api/placeholder/40/40" },
    { username: "ReactionMaster", count: 3789, avatar: "/api/placeholder/40/40" },
  ],
  voiceTime: [
    { username: "TalkativeTimmy", hours: 456, avatar: "/api/placeholder/40/40" },
    { username: "ChatMaster", hours: 389, avatar: "/api/placeholder/40/40" },
    { username: "VoiceKing", hours: 312, avatar: "/api/placeholder/40/40" },
  ]
};

const App = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const sections = [
    {
      title: "Message Champions",
      data: dummyData.messagesCount,
      format: (item) => `${item.count.toLocaleString()} messages`
    },
    {
      title: "Reaction Royalty",
      data: dummyData.reactionKing,
      format: (item) => `${item.count.toLocaleString()} reactions`
    },
    {
      title: "Voice Legends",
      data: dummyData.voiceTime,
      format: (item) => `${item.hours} hours`
    }
  ];

  const nextSection = () => {
    setCurrentSection((prev) => (prev + 1) % sections.length);
  };

  const prevSection = () => {
    setCurrentSection((prev) => (prev - 1 + sections.length) % sections.length);
  };

  return (
    <div>
    <head>
      <link href="./output.css" rel="stylesheet"></link>
    </head>
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-center mb-12 animate-glow">
          Gang Wrapped
        </h1>
        
        <div className="relative max-w-2xl mx-auto">
          <button 
            onClick={prevSection}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextSection}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
          >
            <ChevronRight size={24} />
          </button>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl transition-all duration-500">
            <h2 className="text-3xl font-bold mb-8 text-center">
              {sections[currentSection].title}
            </h2>
            
            <div className="space-y-6">
              {sections[currentSection].data.map((item, index) => (
                <div 
                  key={item.username}
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-lg transform hover:scale-105 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img 
                      src={item.avatar} 
                      alt={item.username}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.username}</h3>
                    <p className="text-purple-300">
                      {sections[currentSection].format(item)}
                    </p>
                  </div>
                  <div className="text-2xl font-bold text-purple-300">
                    #{index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default App;