import React from 'react';
import { BookOpen, ArrowRight, Quote } from 'lucide-react';
import { LOOKBOOK_STORIES } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { LookbookStory } from '../types';

export const LookbookSection: React.FC = () => {
  const { setActiveLookbookStory } = useStore();

  return (
    <section id="lookbook-section" className="py-20 bg-[#14181E] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#EAB308] font-medium mb-1 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Editorial Journal & Visual Anthology</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white">
              The Nexara Lookbook Stories
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md font-light">
            Documenting the intersection of high silicon, Dhaka architecture, and the tactile materials of Bengal.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LOOKBOOK_STORIES.map((story) => (
            <article
              key={story.id}
              onClick={() => setActiveLookbookStory(story)}
              className="group flex flex-col bg-[#1A202C]/60 rounded-xl overflow-hidden border border-slate-800 hover:border-slate-600 transition-all cursor-pointer"
            >
              {/* Cover Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                <img
                  src={story.coverImage}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14181E] via-transparent to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider font-semibold bg-black/60 backdrop-blur-md text-amber-300 px-2 py-0.5 rounded">
                  {story.edition}
                </span>
              </div>

              {/* Story Teaser Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-luxury text-xl font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 mb-2">
                    {story.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {story.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="text-[11px] text-slate-500">{story.season}</span>
                  <span className="text-amber-400 group-hover:underline flex items-center gap-1 font-medium">
                    Read Story <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
