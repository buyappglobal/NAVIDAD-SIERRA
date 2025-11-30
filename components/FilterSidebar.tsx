import React from 'react';
import TownFilter from './TownFilter';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import DateRangeFilter from './DateRangeFilter';
import { EventCategory } from '../types';
import CollapsibleFilterSection from './CollapsibleFilterSection';

interface Town {
  id: string;
  name: string;
}

interface FilterSidebarProps {
  towns: Town[];
  selectedTowns: string[]; // Changed to array
  onSelectTown: (townId: string) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  selectedCategories: string[];
  onCategoryToggle: (category: EventCategory) => void;
  startDate: string | null;
  endDate: string | null;
  onDateChange: (start: string | null, end: string | null) => void;
  onFilterAndClose?: () => void;
  availableCategories?: EventCategory[];
  eventCounts?: Record<string, number>;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
    towns, 
    selectedTowns, 
    onSelectTown, 
    searchQuery, 
    onSearchQueryChange,
    selectedCategories,
    onCategoryToggle,
    startDate,
    endDate,
    onDateChange,
    onFilterAndClose,
    availableCategories,
    eventCounts
}) => {

  const handleSelectTownAndClose = (townId: string) => {
    onSelectTown(townId);
    // Don't close immediately on town selection in multi-select mode to allow picking more
    // But if it's the desktop sidebar, onFilterAndClose is undefined anyway.
    // If it's modal, maybe we want to keep it open? 
    // Let's keep it open for multi-select experience.
    // onFilterAndClose?.(); 
  };

  const handleCategoryToggleAndClose = (category: EventCategory) => {
    onCategoryToggle(category);
    // onFilterAndClose?.(); // Keep open for multi select feel
  };

  const townSelectHandler = onSelectTown; // Always use direct handler, let user close modal manually with button
  const categoryToggleHandler = onCategoryToggle;

  return (
    <div className="space-y-4 md:space-y-8">
      <CollapsibleFilterSection title="Buscar Evento">
        <SearchBar query={searchQuery} onQueryChange={onSearchQueryChange} />
      </CollapsibleFilterSection>
      <CollapsibleFilterSection title="Filtrar por Fecha">
        <DateRangeFilter 
          startDate={startDate}
          endDate={endDate}
          onDateChange={onDateChange}
        />
      </CollapsibleFilterSection>
      <CollapsibleFilterSection title="Categorías" defaultOpen={true}>
        <CategoryFilter 
          selectedCategories={selectedCategories}
          onCategoryToggle={categoryToggleHandler}
          availableCategories={availableCategories}
        />
      </CollapsibleFilterSection>
      <CollapsibleFilterSection title="Pueblos" defaultOpen={true}>
        <TownFilter 
            towns={towns} 
            selectedTowns={selectedTowns} 
            onSelectTown={townSelectHandler} 
            eventCounts={eventCounts}
        />
      </CollapsibleFilterSection>
    </div>
  );
};

export default FilterSidebar;