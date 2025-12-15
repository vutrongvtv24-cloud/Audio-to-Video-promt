import React from 'react';
import { Palette, Film, Camera, Box, Zap, Tv, Image, Smile } from 'lucide-react';
import { VIDEO_STYLES } from '../constants';

interface StyleSelectorProps {
  selectedStyleId: string;
  onSelect: (styleId: string) => void;
  disabled: boolean;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyleId, onSelect, disabled }) => {
  
  const getIcon = (id: string) => {
    switch (id) {
      case 'cinematic': return <Film size={18} />;
      case 'photorealistic': return <Camera size={18} />;
      case '3d-animation': return <Box size={18} />;
      case 'anime': return <Zap size={18} />;
      case 'cyberpunk': return <Zap size={18} className="text-neon-pink" />;
      case 'vintage': return <Tv size={18} />;
      case 'claymation': return <Smile size={18} />;
      case 'fantasy': return <Image size={18} />;
      default: return <Palette size={18} />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 animate-fadeIn">
      <div className="flex items-center mb-4 space-x-2">
        <Palette className="w-5 h-5 text-cinematic-accent" />
        <h3 className="text-lg font-semibold text-white">Choose Visual Style</h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {VIDEO_STYLES.map((style) => {
          const isSelected = selectedStyleId === style.id;
          return (
            <button
              key={style.id}
              onClick={() => onSelect(style.id)}
              disabled={disabled}
              className={`
                relative flex flex-col p-3 rounded-xl border transition-all duration-200 text-left group
                ${isSelected 
                  ? 'bg-cinematic-800 border-cinematic-accent ring-1 ring-cinematic-accent' 
                  : 'bg-cinematic-900/50 border-cinematic-800 hover:border-cinematic-600 hover:bg-cinematic-800/50'}
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-cinematic-accent text-white' : 'bg-cinematic-800 text-gray-400 group-hover:text-gray-200'}`}>
                   {getIcon(style.id)}
                </div>
                {isSelected && <div className="w-2 h-2 rounded-full bg-cinematic-accent shadow-[0_0_8px_rgba(99,102,241,0.8)]"></div>}
              </div>
              
              <div className="font-medium text-sm text-gray-200 mb-1">{style.name}</div>
              <div className="text-xs text-gray-500 line-clamp-2 leading-tight">
                {style.description}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StyleSelector;