import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { X } from 'lucide-react';
import React from 'react';

interface SearchFiltersProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  ratings: number[];
  selectedRatings: number[];
  onRatingChange: (ratings: number[]) => void;
  onClearFilters: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  categories,
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  ratings,
  selectedRatings,
  onRatingChange,
  onClearFilters
}) => {
  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  const handleRatingToggle = (rating: number) => {
    if (selectedRatings.includes(rating)) {
      onRatingChange(selectedRatings.filter(r => r !== rating));
    } else {
      onRatingChange([...selectedRatings, rating]);
    }
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedRatings.length > 0 ||
    (priceRange[0] > 0 || priceRange[1] < 150000);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Refine Your Search</CardTitle>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Reset Filters
          </button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Categories */}
        <div>
          <Label className="text-base font-semibold mb-3 block">Shop by Category</Label>
          <div className="space-y-2">
            {categories.map(category => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryToggle(category)}
                />
                <Label htmlFor={category} className="text-sm cursor-pointer">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <Label className="text-base font-semibold mb-3 block">
            Set Your Budget: ₹{priceRange[0].toLocaleString('en-IN')} - ₹{priceRange[1].toLocaleString('en-IN')}
          </Label>
          <Slider
            value={priceRange}
            onValueChange={(value) => onPriceRangeChange(value as [number, number])}
            max={150000}
            min={0}
            step={1000}
            className="w-full"
          />
        </div>

        {/* Ratings */}
        <div>
          <Label className="text-base font-semibold mb-3 block">Customer Reviews</Label>
          <div className="space-y-2">
            {ratings.map(rating => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={selectedRatings.includes(rating)}
                  onCheckedChange={() => handleRatingToggle(rating)}
                />
                <Label htmlFor={`rating-${rating}`} className="text-sm cursor-pointer flex items-center">
                  {rating}+ Stars
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div>
            <Label className="text-base font-semibold mb-3 block">Your Selected Filters</Label>
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map(category => (
                <Badge key={category} variant="secondary" className="cursor-pointer" onClick={() => handleCategoryToggle(category)}>
                  {category} <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
              {selectedRatings.map(rating => (
                <Badge key={rating} variant="secondary" className="cursor-pointer" onClick={() => handleRatingToggle(rating)}>
                  {rating}+ Stars <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
              {(priceRange[0] > 0 || priceRange[1] < 150000) && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => onPriceRangeChange([0, 150000])}>
                  ₹{priceRange[0].toLocaleString('en-IN')} - ₹{priceRange[1].toLocaleString('en-IN')} <X className="w-3 h-3 ml-1" />
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SearchFilters;
