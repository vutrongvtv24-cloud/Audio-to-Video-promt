import React from 'react';
import { Palette } from 'lucide-react';
import { VIDEO_STYLES, TEXTS } from '../constants';

interface StyleSelectorProps {
  selectedStyleId: string;
  onSelect: (styleId: string) => void;
  disabled: boolean;
  language: 'en' | 'vi';
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyleId, onSelect, disabled, language }) => {
  const t = TEXTS[language];

  return (
    <div className="w-full max-w-6xl mx-auto mb-10 animate-fadeIn">
      <div className="flex items-center mb-6 space-x-2 px-2">
        <Palette className="w-5 h-5 text-cinematic-accent" />
        <h3 className="text-xl font-bold text-white">{t.chooseStyle}</h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2">
        {VIDEO_STYLES.map((style) => {
          const isSelected = selectedStyleId === style.id;
          return (
            <button
              key={style.id}
              onClick={() => onSelect(style.id)}
              disabled={disabled}
              className={`
                relative flex flex-col rounded-xl overflow-hidden transition-all duration-300 text-left group h-full
                ${isSelected 
                  ? 'ring-2 ring-cinematic-accent shadow-[0_0_20px_rgba(99,102,241,0.5)] transform scale-[1.02]' 
                  : 'hover:scale-[1.02] border border-cinematic-800 hover:border-cinematic-600'}
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {/* Image Container */}
              <div className="relative h-32 w-full overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-t from-cinematic-900 to-transparent z-10 ${isSelected ? 'opacity-40' : 'opacity-60 group-hover:opacity-40'}`}></div>
                <img 
                    src={style.image} 
                    alt={style.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {isSelected && (
                    <div className="absolute top-2 right-2 z-20 w-3 h-3 rounded-full bg-cinematic-accent shadow-[0_0_8px_rgba(99,102,241,0.8)] animate-pulse"></div>
                )}
              </div>

              {/* Text Content */}
              <div className={`flex flex-col flex-grow p-4 z-20 -mt-2 ${isSelected ? 'bg-cinematic-800' : 'bg-cinematic-900 group-hover:bg-cinematic-800'}`}>
                <div className={`font-bold text-sm mb-1 ${isSelected ? 'text-white' : 'text-gray-200 group-hover:text-white'}`}>
                    {language === 'vi' ? (style.name_vi || style.name) : style.name}
                </div>
                <div className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                  {language === 'vi' ? (style.description_vi || style.description) : style.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StyleSelector;