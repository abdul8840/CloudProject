import { useState } from 'react';
import { PRODUCT_CATEGORIES, SORT_OPTIONS } from '../../utils/constants.js';
import Input from '../common/Input.jsx';
import Button from '../common/Button.jsx';

const ProductFilter = ({ filters, onFilterChange, onReset }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (key, value) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    onFilterChange(localFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      category: '',
      minPrice: '',
      maxPrice: '',
      search: '',
      sort: '-createdAt',
    };
    setLocalFilters(resetFilters);
    onReset(resetFilters);
  };

  return (
    <div className="card mb-6">
      <h2 className="text-lg font-semibold mb-4">Filter Products</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <Input
          label="Search"
          placeholder="Search products..."
          value={localFilters.search || ''}
          onChange={(e) => handleChange('search', e.target.value)}
        />

        {/* Category */}
        <div>
          <label className="label">Category</label>
          <select
            className="input"
            value={localFilters.category || ''}
            onChange={(e) => handleChange('category', e.target.value)}
          >
            {PRODUCT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat === 'All' ? '' : cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Min Price */}
        <Input
          label="Min Price"
          type="number"
          placeholder="0"
          min="0"
          value={localFilters.minPrice || ''}
          onChange={(e) => handleChange('minPrice', e.target.value)}
        />

        {/* Max Price */}
        <Input
          label="Max Price"
          type="number"
          placeholder="1000"
          min="0"
          value={localFilters.maxPrice || ''}
          onChange={(e) => handleChange('maxPrice', e.target.value)}
        />
      </div>

      {/* Sort */}
      <div className="mt-4">
        <label className="label">Sort By</label>
        <select
          className="input max-w-xs"
          value={localFilters.sort || '-createdAt'}
          onChange={(e) => handleChange('sort', e.target.value)}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-6">
        <Button onClick={handleApply}>Apply Filters</Button>
        <Button variant="secondary" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default ProductFilter;