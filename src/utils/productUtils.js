import { addBookmark, removeBookmark, getBookmarks } from './indexedDB';

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
    const bookmarks = await getBookmarks();
    const isBookmarked = bookmarks.some(bookmark => bookmark.id === product.id);
    
    if (isBookmarked) {
      await removeBookmark(product.id);
      alert('تمت إزالة المنتج من المفضلة');
    } else {
      await addBookmark(product);
      alert('تمت إضافة المنتج إلى المفضلة');
    }
  } catch (error) {
    console.error('Error toggling bookmark:', error);
    alert('حدث خطأ أثناء تحديث المفضلة');
  }
};

export { getBookmarks };