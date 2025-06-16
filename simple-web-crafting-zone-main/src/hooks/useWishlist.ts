
import { useLocalStorage } from './useLocalStorage';
import { toast } from '@/components/ui/use-toast';

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

export function useWishlist() {
  const [wishlistItems, setWishlistItems] = useLocalStorage<WishlistItem[]>('wishlist', []);

  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems(prev => {
      if (prev.find(wishItem => wishItem.id === item.id)) {
        toast({
          title: "Already in Wishlist",
          description: `${item.name} is already in your wishlist`,
        });
        return prev;
      }
      toast({
        title: "Added to Wishlist",
        description: `${item.name} has been added to your wishlist`,
      });
      return [...prev, item];
    });
  };

  const removeFromWishlist = (id: number) => {
    setWishlistItems(prev => {
      const item = prev.find(item => item.id === id);
      if (item) {
        toast({
          title: "Removed from Wishlist",
          description: `${item.name} has been removed from your wishlist`,
        });
      }
      return prev.filter(item => item.id !== id);
    });
  };

  const isInWishlist = (id: number) => {
    return wishlistItems.some(item => item.id === id);
  };

  return {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  };
}
