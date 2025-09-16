import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  Heart, 
  ShoppingCart, 
  Star, 
  Eye,
  Grid,
  List,
  Truck,
  Shield,
  Tag,
  Clock
} from "lucide-react";
import Merch1 from "../assets/merch1.jpeg";

const merchItems = [
  {
    id: 1,
    name: "EMG Premium Hoodie",
    price: 2500,
    originalPrice: 3000,
    image: Merch1,
    category: "Apparel",
    brand: "EMG",
    rating: 4.8,
    reviews: 124,
    isNew: true,
    isTrending: true,
    isOnSale: true,
    discount: 17,
    description: "Premium quality hoodie with EMG branding. Made from 100% cotton blend for ultimate comfort.",
    deliveryTime: "3-5 days"
  },
  {
    id: 2,
    name: "EMG Snapback Hat",
    price: 1500,
    originalPrice: 1800,
    image: Merch1,
    category: "Accessories",
    brand: "EMG",
    rating: 4.6,
    reviews: 89,
    isNew: false,
    isTrending: true,
    isOnSale: true,
    discount: 17,
    description: "Classic snapback hat with embroidered EMG logo. Adjustable fit for all head sizes.",
    deliveryTime: "2-4 days"
  },
  {
    id: 3,
    name: "Artist Custom T-Shirt",
    price: 2000,
    originalPrice: 2000,
    image: Merch1,
    category: "Apparel",
    brand: "EMG Artists",
    rating: 4.7,
    reviews: 156,
    isNew: true,
    isTrending: false,
    isOnSale: false,
    discount: 0,
    description: "Custom designed t-shirt featuring your favorite EMG artists. High-quality print that lasts.",
    deliveryTime: "3-5 days"
  },
  {
    id: 4,
    name: "Limited Edition Vinyl",
    price: 3500,
    originalPrice: 4000,
    image: Merch1,
    category: "Music",
    brand: "EMG Records",
    rating: 4.9,
    reviews: 67,
    isNew: false,
    isTrending: true,
    isOnSale: true,
    discount: 13,
    description: "Limited edition vinyl featuring exclusive tracks from EMG artists. Collectors item.",
    deliveryTime: "5-7 days"
  },
  {
    id: 5,
    name: "EMG Wireless Earbuds",
    price: 4500,
    originalPrice: 5000,
    image: Merch1,
    category: "Electronics",
    brand: "EMG Audio",
    rating: 4.5,
    reviews: 203,
    isNew: true,
    isTrending: false,
    isOnSale: true,
    discount: 10,
    description: "Premium wireless earbuds with noise cancellation. Perfect for music lovers.",
    deliveryTime: "2-3 days"
  },
  {
    id: 6,
    name: "EMG Backpack",
    price: 3200,
    originalPrice: 3500,
    image: Merch1,
    category: "Accessories",
    brand: "EMG",
    rating: 4.4,
    reviews: 78,
    isNew: false,
    isTrending: false,
    isOnSale: true,
    discount: 9,
    description: "Durable backpack with EMG branding. Perfect for daily use and travel.",
    deliveryTime: "3-5 days"
  },
  {
    id: 7,
    name: "EMG Phone Case",
    price: 1200,
    originalPrice: 1500,
    image: Merch1,
    category: "Accessories",
    brand: "EMG",
    rating: 4.3,
    reviews: 145,
    isNew: true,
    isTrending: false,
    isOnSale: true,
    discount: 20,
    description: "Protective phone case with EMG design. Compatible with most smartphone models.",
    deliveryTime: "1-2 days"
  },
  {
    id: 8,
    name: "EMG Water Bottle",
    price: 800,
    originalPrice: 1000,
    image: Merch1,
    category: "Accessories",
    brand: "EMG",
    rating: 4.6,
    reviews: 92,
    isNew: false,
    isTrending: false,
    isOnSale: true,
    discount: 20,
    description: "Insulated water bottle with EMG logo. Keeps drinks cold for hours.",
    deliveryTime: "2-3 days"
  }
];

const categories = [
  { name: "All", count: merchItems.length },
  { name: "Apparel", count: merchItems.filter(item => item.category === "Apparel").length },
  { name: "Accessories", count: merchItems.filter(item => item.category === "Accessories").length },
  { name: "Music", count: merchItems.filter(item => item.category === "Music").length },
  { name: "Electronics", count: merchItems.filter(item => item.category === "Electronics").length }
];

const brands = ["All", "EMG", "EMG Artists", "EMG Records", "EMG Audio"];
const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under KSh 1,500", min: 0, max: 1500 },
  { label: "KSh 1,500 - 2,500", min: 1500, max: 2500 },
  { label: "KSh 2,500 - 3,500", min: 2500, max: 3500 },
  { label: "Above KSh 3,500", min: 3500, max: Infinity }
];

export default function Merch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);

  // Filter and search logic
  const filteredProducts = merchItems.filter(product => {
    const matchesSearch = searchQuery === "" || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesBrand = selectedBrand === "All" || product.brand === selectedBrand;
    const matchesPrice = product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max;
    
    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  });

  // Sort logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return b.isNew - a.isNew;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-blue-600/10" />
        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <h1 className="hero-title text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
              EMG Shop
            </h1>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              Discover exclusive EMG merchandise, artist gear, and premium music accessories.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-4 text-center hover:shadow-lg transition-all duration-300">
              <div className="bg-purple-100 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <ShoppingCart className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{merchItems.length}</p>
              <p className="text-gray-600 text-xs">Products</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-4 text-center hover:shadow-lg transition-all duration-300">
              <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Truck className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">Free</p>
              <p className="text-gray-600 text-xs">Shipping</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-4 text-center hover:shadow-lg transition-all duration-300">
              <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">100%</p>
              <p className="text-gray-600 text-xs">Secure</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-4 text-center hover:shadow-lg transition-all duration-300">
              <div className="bg-orange-100 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">24/7</p>
              <p className="text-gray-600 text-xs">Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-20 mt-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <div className="lg:w-80">
            <div className={`fixed inset-0 z-40 lg:relative lg:inset-auto ${filterSidebarOpen ? 'block' : 'hidden lg:block'}`}>
              <div className="absolute inset-0 bg-black/50 lg:hidden" onClick={() => setFilterSidebarOpen(false)} />
              <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl lg:relative lg:shadow-none lg:w-full">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Search & Filters</h3>
                    <button 
                      onClick={() => setFilterSidebarOpen(false)}
                      className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                    >
                      ×
                    </button>
                  </div>

                  {/* Search Bar */}
                  <div className="mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Category</h4>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category.name}
                          onClick={() => setSelectedCategory(category.name)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 ${
                            selectedCategory === category.name
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-purple-50'
                          }`}
                        >
                          {category.name} ({category.count})
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Brand Filter */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Brand</h4>
                    <div className="space-y-2">
                      {brands.map((brand) => (
                        <button
                          key={brand}
                          onClick={() => setSelectedBrand(brand)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 ${
                            selectedBrand === brand
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-purple-50'
                          }`}
                        >
                          {brand}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Price Range</h4>
                    <div className="space-y-2">
                      {priceRanges.map((range, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedPriceRange(range)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 ${
                            selectedPriceRange.label === range.label
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-purple-50'
                          }`}
                        >
                          {range.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Mobile Search & Filter Button */}
            <div className="lg:hidden mb-6">
              <button 
                onClick={() => setFilterSidebarOpen(true)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-300 flex items-center justify-center"
              >
                <Search className="w-5 h-5 mr-2" />
                Search & Filters
              </button>
            </div>

            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <h2 className="text-2xl font-bold text-gray-900">Products</h2>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                  {sortedProducts.length} items
                </span>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white/80 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>

                {/* View Mode Toggle */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-colors duration-300 ${
                      viewMode === "grid" 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-colors duration-300 ${
                      viewMode === "list" 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedProducts.map((product) => (
                  <div key={product.id} className="group bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 overflow-hidden hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-2">
                    <div className="relative overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col space-y-2">
                        {product.isNew && (
                          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                            <Tag className="w-3 h-3 mr-1" />
                            New
                          </span>
                        )}
                        {product.isTrending && (
                          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            🔥 Trending
                          </span>
                        )}
                        {product.isOnSale && (
                          <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            -{product.discount}% OFF
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="absolute top-4 right-4 flex flex-col space-y-2">
                        <button className="bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg hover:scale-110 transition-all duration-300">
                          <Heart className="w-4 h-4" />
                        </button>
                        <button className="bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg hover:scale-110 transition-all duration-300">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="mb-3">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
                        <p className="text-gray-600 text-sm">{product.brand}</p>
                      </div>
                      
                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`} 
                              fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-purple-600">KSh {product.price.toLocaleString()}</span>
                          {product.isOnSale && (
                            <span className="text-sm text-gray-500 line-through">KSh {product.originalPrice.toLocaleString()}</span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">{product.deliveryTime}</span>
                      </div>

                      <div className="flex space-x-2">
                        <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-xl font-semibold transition-colors duration-300 flex items-center justify-center">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedProducts.map((product) => (
                  <div key={product.id} className="group bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-1">
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-24 h-24 rounded-2xl object-cover group-hover:scale-110 transition-transform duration-300" 
                        />
                        {product.isNew && (
                          <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                            <Tag className="w-3 h-3" />
                          </div>
                        )}
                        {product.isOnSale && (
                          <div className="absolute -top-2 -left-2 bg-red-500 text-white rounded-full p-1 text-xs font-bold">
                            -{product.discount}%
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                          {product.isTrending && (
                            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                              🔥 Trending
                            </span>
                          )}
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <span className="flex items-center">
                            <Star className="w-4 h-4 mr-1 text-yellow-500" />
                            {product.rating} ({product.reviews} reviews)
                          </span>
                          <span className="flex items-center">
                            <Truck className="w-4 h-4 mr-1" />
                            {product.deliveryTime}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-purple-600">KSh {product.price.toLocaleString()}</span>
                            {product.isOnSale && (
                              <span className="text-lg text-gray-500 line-through">KSh {product.originalPrice.toLocaleString()}</span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-xl transition-colors duration-300">
                              <Heart className="w-4 h-4" />
                            </button>
                            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl font-semibold transition-colors duration-300 flex items-center">
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {sortedProducts.length === 0 && (
              <div className="text-center py-20">
                <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                <button 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                    setSelectedBrand("All");
                    setSelectedPriceRange(priceRanges[0]);
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-300"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
