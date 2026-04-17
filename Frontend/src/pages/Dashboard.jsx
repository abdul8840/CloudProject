// Dashboard.jsx
import React from 'react';
import { useProducts } from '../hooks/useProducts.js';
import { useAuth } from '../hooks/useAuth.js';
import ProductList from '../components/products/ProductList.jsx';
import ProductFilter from '../components/products/ProductFilter.jsx';
import Button from '../components/common/Button.jsx';

const Dashboard = () => {
  const { user } = useAuth();
  const {
    products,
    loading,
    pagination,
    filters,
    updateFilters,
    setPage,
  } = useProducts();

  const handleFilterChange = (newFilters) => {
    updateFilters(newFilters);
  };

  const handleResetFilters = (resetFilters) => {
    updateFilters(resetFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">
            Explore our collection of amazing products
          </p>
        </div>

        {/* Filters */}
        <ProductFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
        />

        {/* Products Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Products
              {pagination && (
                <span className="text-sm text-gray-500 ml-2">
                  ({pagination.totalProducts} total)
                </span>
              )}
            </h2>
          </div>

          <ProductList products={products} loading={loading} />
        </div>

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
            <Button
              variant="secondary"
              disabled={pagination.currentPage === 1}
              onClick={() => setPage(pagination.currentPage - 1)}
            >
              Previous
            </Button>

            <div className="flex flex-wrap gap-2">
              {[...Array(pagination.totalPages)].map((_, index) => {
                const page = index + 1;
                // Show only nearby pages
                if (
                  page === 1 ||
                  page === pagination.totalPages ||
                  (page >= pagination.currentPage - 1 &&
                    page <= pagination.currentPage + 1)
                ) {
                  return (
                    <Button
                      key={page}
                      variant={
                        page === pagination.currentPage ? 'primary' : 'secondary'
                      }
                      onClick={() => setPage(page)}
                    >
                      {page}
                    </Button>
                  );
                } else if (
                  page === pagination.currentPage - 2 ||
                  page === pagination.currentPage + 2
                ) {
                  return <span key={page} className="px-2 text-gray-500">...</span>;
                }
                return null;
              })}
            </div>

            <Button
              variant="secondary"
              disabled={pagination.currentPage === pagination.totalPages}
              onClick={() => setPage(pagination.currentPage + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;