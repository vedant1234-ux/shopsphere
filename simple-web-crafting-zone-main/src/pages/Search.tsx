import ProductCard from '@/components/ProductCard';
import SearchFilters from '@/components/SearchFilters';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Filter, Grid, List, Search as SearchIcon, SortAsc } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

// Mock data
const allProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 14999,
    originalPrice: 18999,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    rating: 4.5,
    category: "Electronics",
    badge: "Best Seller"
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 22499,
    originalPrice: 29999,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    rating: 4.8,
    category: "Electronics",
    badge: "New"
  },
  {
    id: 3,
    name: "Professional Camera",
    price: 67499,
    originalPrice: 89999,
    image: "https://images.unsplash.com/photo-1606983340077-e4d4d2d11e46?w=300&h=300&fit=crop",
    rating: 4.7,
    category: "Electronics",
    badge: "Sale"
  },
  {
    id: 4,
    name: "Gaming Laptop",
    price: 97499,
    originalPrice: 119999,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop",
    rating: 4.6,
    category: "Electronics",
    badge: "Hot"
  },
  {
    id: 5,
    name: "Designer Jacket",
    price: 6749,
    originalPrice: 9749,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop",
    rating: 4.3,
    category: "Fashion"
  },
  {
    id: 6,
    name: "Running Shoes",
    price: 9749,
    originalPrice: 11999,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop",
    rating: 4.4,
    category: "Sports"
  },
  {
    id: 7,
    name: "Smart LED TV 55-inch",
    price: 44999,
    originalPrice: 54999,
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=300&h=300&fit=crop",
    rating: 4.6,
    category: "Electronics",
    badge: "Best Value"
  },
  {
    id: 8,
    name: "Wireless Earbuds Pro",
    price: 12499,
    originalPrice: 14999,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=300&fit=crop",
    rating: 4.7,
    category: "Electronics",
    badge: "Popular"
  },
  {
    id: 9,
    name: "Smartphone Pro Max",
    price: 79999,
    originalPrice: 89999,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300&h=300&fit=crop",
    rating: 4.8,
    category: "Electronics",
    badge: "New"
  },
  {
    id: 10,
    name: "Gaming Console",
    price: 39999,
    originalPrice: 44999,
    image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=300&h=300&fit=crop",
    rating: 4.9,
    category: "Electronics",
    badge: "Hot"
  },
  {
    id: 11,
    name: "Designer Handbag",
    price: 24999,
    originalPrice: 29999,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=300&fit=crop",
    rating: 4.5,
    category: "Fashion",
    badge: "Luxury"
  },
  {
    id: 12,
    name: "Men's Formal Suit",
    price: 14999,
    originalPrice: 19999,
    image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=300&h=300&fit=crop",
    rating: 4.4,
    category: "Fashion"
  },
  {
    id: 13,
    name: "Women's Dress",
    price: 5999,
    originalPrice: 7999,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=300&fit=crop",
    rating: 4.6,
    category: "Fashion",
    badge: "Trending"
  },
  {
    id: 14,
    name: "Yoga Mat Premium",
    price: 2499,
    originalPrice: 3499,
    image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=300&h=300&fit=crop",
    rating: 4.7,
    category: "Sports",
    badge: "Best Seller"
  },
  {
    id: 15,
    name: "Fitness Dumbbells Set",
    price: 4499,
    originalPrice: 5999,
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&h=300&fit=crop",
    rating: 4.5,
    category: "Sports"
  },
  {
    id: 16,
    name: "Smart Home Speaker",
    price: 8999,
    originalPrice: 11999,
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=300&h=300&fit=crop",
    rating: 4.6,
    category: "Electronics",
    badge: "Smart Home"
  },
  {
    id: 17,
    name: "Coffee Maker",
    price: 5499,
    originalPrice: 6999,
    image: "https://images.unsplash.com/photo-1570088935863-d68397ff8b44?w=300&h=300&fit=crop",
    rating: 4.4,
    category: "Home & Kitchen",
    badge: "Popular"
  },
  {
    id: 18,
    name: "Smart Watch Series",
    price: 19999,
    originalPrice: 24999,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=300&h=300&fit=crop",
    rating: 4.7,
    category: "Electronics",
    badge: "New"
  },
  {
    id: 19,
    name: "Wireless Keyboard & Mouse",
    price: 3499,
    originalPrice: 4499,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop",
    rating: 4.5,
    category: "Electronics"
  },
  {
    id: 20,
    name: "Portable Bluetooth Speaker",
    price: 3999,
    originalPrice: 4999,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
    rating: 4.6,
    category: "Electronics",
    badge: "Best Value"
  }
];

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 150000]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  const categories = ['Electronics', 'Fashion', 'Sports', 'Home & Kitchen'];
  const ratings = [4, 3, 2, 1];

  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Search term filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.includes(product.category)
      );
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Rating filter
    if (selectedRatings.length > 0) {
      filtered = filtered.filter(product =>
        selectedRatings.some(rating => product.rating >= rating)
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [searchTerm, selectedCategories, priceRange, selectedRatings, sortBy]);

  const handleSearch = () => {
    setIsLoading(true);
    setSearchParams({ q: searchTerm });
    setTimeout(() => setIsLoading(false), 500);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 150000]);
    setSelectedRatings([]);
  };

  const ProductSkeleton = () => (
    <Card>
      <CardContent className="p-0">
        <Skeleton className="h-48 w-full rounded-t-lg" />
        <div className="p-4 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-6 w-1/3" />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">ShopSphere</h1>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Try searching for 'headphones', 'electronics', or 'sports gear'..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10"
                />
              </div>
              <Button onClick={handleSearch}>Search</Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {searchTerm ? `Showing results for "${searchTerm}"` : 'Browse Our Products'}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* View Mode Toggle */}
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SortAsc className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Customer Rating</SelectItem>
                <SelectItem value="name">Name: A to Z</SelectItem>
              </SelectContent>
            </Select>

            {/* Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <SearchFilters
              categories={categories}
              selectedCategories={selectedCategories}
              onCategoryChange={setSelectedCategories}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              ratings={ratings}
              selectedRatings={selectedRatings}
              onRatingChange={setSelectedRatings}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {[...Array(6)].map((_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <SearchIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">No products found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </CardContent>
              </Card>
            ) : (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
