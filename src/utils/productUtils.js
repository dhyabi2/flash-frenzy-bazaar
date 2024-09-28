import { addBookmark, removeBookmark, fetchBookmarks } from './api';

export const shareProduct = (product) => {
  if (navigator.share) {
    navigator.share({
      title: product.name,
      text: `Check out this amazing deal: ${product.name} for ${product.price} SAR!`,
      url: window.location.href,
    }).then(() => {
      console.log('Successfully shared');
    }).catch((error) => {
      console.error('Error sharing:', error);
    });
  } else {
    alert(`Share this product: ${product.name}\nPrice: ${product.price} SAR\nURL: ${window.location.href}`);
  }
};

export const toggleBookmark = async (product) => {
  try {
    const bookmarks = await fetchBookmarks();
    const isBookmarked = bookmarks.some(bookmark => bookmark.id === product.id);
    
    if (isBookmarked) {
      await removeBookmark(product.id);
      return false;
    } else {
      await addBookmark(product);
      return true;
    }
  } catch (error) {
    console.error('Error toggling bookmark:', error);
    return false;
  }
};

export const isBookmarked = async (productId) => {
  try {
    const bookmarks = await fetchBookmarks();
    return bookmarks.some(bookmark => bookmark.id === productId);
  } catch (error) {
    console.error('Error checking bookmark status:', error);
    return false;
  }
};

export const getBookmarks = fetchBookmarks;