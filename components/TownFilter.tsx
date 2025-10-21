import React from 'react';

interface TownFilterProps {
  towns: string[];
  selectedTown: string;
  onSelectTown: (town: string) => void;
}

const TownFilter: React.FC<TownFilterProps> = ({ towns, selectedTown, onSelectTown }) => {
  const allTowns = ['Todos', ...towns];

  return (
    <div className="bg-slate-800 p-4 rounded-lg shadow-lg md:sticky md:top-24">
      <h3 className="text-2xl font-display text-amber-300 mb-4">Pueblos</h3>
      <div className="space-y-2 max-h-60 overflow-y-auto pr-2 md:max-h-[70vh]">
        {allTowns.map(town => (
          <button
            key={town}
            onClick={() => onSelectTown(town)}
            className={`w-full text-left p-2 rounded-md transition-colors text-base ${
              selectedTown === town
                ? 'bg-amber-400 text-slate-900 font-bold'
                : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            {town}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TownFilter;