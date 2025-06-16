import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Filter, Grid, Heart, List, Search, ShoppingCart, Star } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 150000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Mock products data
  const products = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 14999,
      originalPrice: 18999,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      rating: 4.5,
      reviews: 128,
      category: "Electronics",
      description: "High-quality wireless headphones with noise cancellation"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 22499,
      originalPrice: 29999,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      rating: 4.8,
      reviews: 256,
      category: "Electronics",
      description: "Advanced fitness tracking with heart rate monitor"
    },
    {
      id: 3,
      name: "Professional Camera",
      price: 67499,
      originalPrice: 89999,
      image: "https://images.unsplash.com/photo-1606983340077-e4d4d2d11e46?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 89,
      category: "Electronics",
      description: "Professional DSLR camera for photography enthusiasts"
    },
    {
      id: 4,
      name: "Gaming Laptop",
      price: 97499,
      originalPrice: 119999,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 167,
      category: "Electronics",
      description: "High-performance gaming laptop with RTX graphics"
    },
    {
      id: 5,
      name: "Designer Jacket",
      price: 6749,
      originalPrice: 9749,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop",
      rating: 4.3,
      reviews: 45,
      category: "Fashion",
      description: "Stylish designer jacket for all seasons"
    },
    {
      id: 6,
      name: "Running Shoes",
      price: 9749,
      originalPrice: 11999,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop",
      rating: 4.4,
      reviews: 203,
      category: "Sports",
      description: "Comfortable running shoes with advanced cushioning"
    },
    {
      id: 7,
      name: "Smart LED TV 55-inch",
      price: 44999,
      originalPrice: 54999,
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 189,
      category: "Electronics",
      description: "4K Ultra HD Smart TV with HDR and built-in streaming apps"
    },
    {
      id: 8,
      name: "Wireless Earbuds Pro",
      price: 12499,
      originalPrice: 14999,
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 312,
      category: "Electronics",
      description: "True wireless earbuds with active noise cancellation"
    },
    {
      id: 9,
      name: "Smartphone Pro Max",
      price: 79999,
      originalPrice: 89999,
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300&h=300&fit=crop",
      rating: 4.8,
      reviews: 445,
      category: "Electronics",
      description: "Latest flagship smartphone with advanced camera system"
    },
    {
      id: 10,
      name: "Gaming Console",
      price: 39999,
      originalPrice: 44999,
      image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=300&h=300&fit=crop",
      rating: 4.9,
      reviews: 278,
      category: "Electronics",
      description: "Next-gen gaming console with 4K gaming support"
    },
    {
      id: 11,
      name: "Designer Handbag",
      price: 24999,
      originalPrice: 29999,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=300&fit=crop",
      rating: 4.5,
      reviews: 89,
      category: "Fashion",
      description: "Luxury designer handbag with premium leather"
    },
    {
      id: 12,
      name: "Men's Formal Suit",
      price: 14999,
      originalPrice: 19999,
      image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=300&h=300&fit=crop",
      rating: 4.4,
      reviews: 156,
      category: "Fashion",
      description: "Classic formal suit for professional wear"
    },
    {
      id: 13,
      name: "Women's Dress",
      price: 5999,
      originalPrice: 7999,
      image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 234,
      category: "Fashion",
      description: "Elegant evening dress for special occasions"
    },
    {
      id: 14,
      name: "Yoga Mat Premium",
      price: 2499,
      originalPrice: 3499,
      image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 178,
      category: "Sports",
      description: "High-quality yoga mat with perfect grip"
    },
    {
      id: 15,
      name: "Fitness Dumbbells Set",
      price: 4499,
      originalPrice: 5999,
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&h=300&fit=crop",
      rating: 4.5,
      reviews: 145,
      category: "Sports",
      description: "Adjustable dumbbells set for home workout"
    },
    {
      id: 16,
      name: "Smart Home Speaker",
      price: 8999,
      originalPrice: 11999,
      image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 267,
      category: "Electronics",
      description: "Voice-controlled smart speaker with premium sound"
    },
    {
      id: 17,
      name: "Coffee Maker",
      price: 5499,
      originalPrice: 6999,
      image: "https://images.unsplash.com/photo-1570088935863-d68397ff8b44?w=300&h=300&fit=crop",
      rating: 4.4,
      reviews: 189,
      category: "Home & Kitchen",
      description: "Programmable coffee maker with thermal carafe"
    },
    {
      id: 18,
      name: "Smart Watch Series",
      price: 19999,
      originalPrice: 24999,
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 334,
      category: "Electronics",
      description: "Advanced smartwatch with health monitoring"
    },
    {
      id: 19,
      name: "Wireless Keyboard & Mouse",
      price: 3499,
      originalPrice: 4499,
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop",
      rating: 4.5,
      reviews: 156,
      category: "Electronics",
      description: "Ergonomic wireless keyboard and mouse combo"
    },
    {
      id: 20,
      name: "Portable Bluetooth Speaker",
      price: 3999,
      originalPrice: 4999,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 289,
      category: "Electronics",
      description: "Waterproof portable speaker with 20-hour battery"
    }
  ];

  const categories = ['Electronics', 'Fashion', 'Sports', 'Home & Kitchen'];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesCategory && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">ShopSphere</h1>
            </Link>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 w-64"
                />
              </div>

              <Link to="/cart">
                <Button variant="ghost" size="sm">
                  <ShoppingCart className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </h3>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium mb-3 text-gray-900 dark:text-white">Categories</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <label htmlFor={category} className="text-sm text-gray-600 dark:text-gray-300">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3 text-gray-900 dark:text-white">Price Range</h4>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={150000}
                  step={10}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSelectedCategories([]);
                  setPriceRange([0, 150000]);
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Products Area */}
          <div className="flex-1">
            {/* Sort and View Controls */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <p className="text-gray-600 dark:text-gray-300">
                  Showing {sortedProducts.length} products
                </p>

                <div className="flex items-center space-x-4">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                    </SelectContent>
                  </Select>

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
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
              : 'grid-cols-1'
              }`}>
              {sortedProducts.map(product => (
                <Card key={product.id} className={`group hover:shadow-xl transition-all duration-300 ${viewMode === 'list' ? 'flex' : ''
                  }`}>
                  <CardContent className={`p-0 relative ${viewMode === 'list' ? 'flex w-full' : ''}`}>
                    <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>

                      <Link to={`/product/${product.id}`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className={`w-full object-cover ${viewMode === 'list' ? 'h-full rounded-l-lg' : 'h-48 rounded-t-lg'
                            }`}
                        />
                      </Link>
                    </div>

                    <div className={`p-4 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
                      <div>
                        <Link to={`/product/${product.id}`}>
                          <h4 className="font-semibold mb-2 text-gray-900 dark:text-white hover:text-blue-600 transition-colors">
                            {product.name}
                          </h4>
                        </Link>

                        {viewMode === 'list' && (
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                            {product.description}
                          </p>
                        )}

                        <div className="flex items-center mb-2">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 ml-2">
                            ({product.rating}) {product.reviews} reviews
                          </span>
                        </div>

                        <div className="flex items-center mb-4">
                          <span className="text-xl font-bold text-blue-600">${product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through ml-2">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      <Button className={`${viewMode === 'list' ? 'w-32' : 'w-full'}`}>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
