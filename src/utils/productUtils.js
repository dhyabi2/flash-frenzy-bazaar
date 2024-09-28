import { addBookmark, removeBookmark, fetchBookmarks } from './api';

export const shareProduct = (product) => {
  if (navigator.share) {
    navigator.share({
      title: product.name,
      text: `Check out this amazing deal: ${product.name} for ${product.price} ريال!`,
      url: window.location.href,
    }).then(() => {
      console.log('Successfully shared');
    }).catch((error) => {
      console.error('Error sharing:', error);
    });
  } else {
    // Fallback for browsers that don't support the Web Share API
    const shareText = `Check out this amazing deal: ${product.name} for ${product.price} ريال!\n${window.location.href}`;
    const tempInput = document.createElement('textarea');
    tempInput.value = shareText;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert('تم نسخ رابط المنتج إلى الحافظة. يمكنك مشاركته الآن.');
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