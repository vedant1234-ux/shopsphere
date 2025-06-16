import { Product } from '@/components/ProductCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { Heart, MapPin, Package, Trash2, User } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    joinDate: "January 2023",
    totalOrders: 15,
    totalSpent: 2847.50
  };

  const recentOrders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "Delivered",
      total: 199.99,
      items: 2
    },
    {
      id: "ORD-002",
      date: "2024-01-10",
      status: "Shipped",
      total: 299.99,
      items: 1
    },
    {
      id: "ORD-003",
      date: "2024-01-05",
      status: "Processing",
      total: 129.99,
      items: 3
    }
  ];

  const handleAddToCartFromWishlist = (item: Product) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue={user.email} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                </div>
                <Button>Update Profile</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{user.totalOrders}</div>
                    <div className="text-sm text-gray-600">Total Orders</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">${user.totalSpent}</div>
                    <div className="text-sm text-gray-600">Total Spent</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{user.joinDate}</div>
                    <div className="text-sm text-gray-600">Member Since</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'orders':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map(order => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-semibold">{order.id}</div>
                      <div className="text-sm text-gray-600">{order.date} • {order.items} items</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${order.total}</div>
                      <Badge variant={order.status === 'Delivered' ? 'default' : order.status === 'Shipped' ? 'secondary' : 'outline'}>
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 'wishlist':
        return (
          <Card>
            <CardHeader>
              <CardTitle>My Wishlist ({wishlistItems.length} items)</CardTitle>
            </CardHeader>
            <CardContent>
              {wishlistItems.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 dark:text-gray-300">Your wishlist is empty</p>
                  <Link to="/products">
                    <Button className="mt-4">Browse Products</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {wishlistItems.map(item => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-lg font-bold text-blue-600">${item.price}</p>
                      </div>
                      <div className="space-x-2">
                        <Button size="sm" onClick={() => handleAddToCartFromWishlist(item)}>
                          Add to Cart
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeFromWishlist(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 'addresses':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Saved Addresses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">Home Address</h4>
                      <p className="text-gray-600">123 Main Street<br />City, State 12345<br />United States</p>
                    </div>
                    <Badge>Default</Badge>
                  </div>
                </div>
                <Button variant="outline">Add New Address</Button>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return <div>Select a tab</div>;
    }
  };

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
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-6 text-sm">
          <Link to="/" className="text-blue-600 hover:underline">Home</Link>
          <span className="text-gray-500">/</span>
          <span className="text-gray-900 dark:text-white">My Account</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center space-x-2 p-2 rounded-lg text-left ${activeTab === 'profile' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`w-full flex items-center space-x-2 p-2 rounded-lg text-left ${activeTab === 'orders' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                  >
                    <Package className="w-4 h-4" />
                    <span>Orders</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('wishlist')}
                    className={`w-full flex items-center space-x-2 p-2 rounded-lg text-left ${activeTab === 'wishlist' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                  >
                    <Heart className="w-4 h-4" />
                    <span>Wishlist ({wishlistItems.length})</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('addresses')}
                    className={`w-full flex items-center space-x-2 p-2 rounded-lg text-left ${activeTab === 'addresses' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Addresses</span>
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
