import { useState, useEffect } from 'react';
import { productAPI } from '../api/endpoints.js';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../utils/helpers.js';

export const useProducts = (initialFilters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 12,
    ...initialFilters,
  });

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Remove empty filters
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
      );
      
      const response = await productAPI.getProducts(cleanFilters);
      
      if (response.success) {
        setProducts(response.data.products);
        setPagination(response.data.pagination);
      }
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1, // Reset to first page when filters change
    }));
  };

  const setPage = (page) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const refresh = () => {
    fetchProducts();
  };

  return {
    products,
    loading,
    error,
    pagination,
    filters,
    updateFilters,
    setPage,
    refresh,
  };
};