
import { useLocalStorage } from './useLocalStorage';
import { toast } from '@/components/ui/use-toast';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color?: string;
  size?: string;
}

export function useCart() {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('shopping-cart', []);

  const addToCart = (product: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    const quantity = product.quantity || 1;
    setCartItems(prev => {
      const existingItem = prev.find(item => 
        item.id === product.id && 
        item.color === product.color && 
        item.size === product.size
      );

      if (existingItem) {
        toast({
          title: "Cart Updated",
          description: `${product.name} quantity increased`,
        });
        return prev.map(item =>
          item.id === existingItem.id && 
          item.color === existingItem.color && 
          item.size === existingItem.size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        toast({
          title: "Added to Cart",
          description: `${product.name} has been added to your cart`,
        });
        return [...prev, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (id: number, color?: string, size?: string) => {
    setCartItems(prev => {
      const item = prev.find(item => 
        item.id === id && item.color === color && item.size === size
      );
      if (item) {
        toast({
          title: "Removed from Cart",
          description: `${item.name} has been removed from your cart`,
        });
      }
      return prev.filter(item => 
        !(item.id === id && item.color === color && item.size === size)
      );
    });
  };

  const updateQuantity = (id: number, newQuantity: number, color?: string, size?: string) => {
    if (newQuantity === 0) {
      removeFromCart(id, color, size);
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === id && item.color === color && item.size === size
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart",
    });
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal
  };
}
