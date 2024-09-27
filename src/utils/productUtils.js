import { openDB } from './indexedDB';

const BOOKMARK_STORE = 'bookmarks';

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
  const db = await openDB();
  const tx = db.transaction(BOOKMARK_STORE, 'readwrite');
  const store = tx.objectStore(BOOKMARK_STORE);

  try {
    const existingBookmark = await store.get(product.id);
    if (existingBookmark) {
      await store.delete(product.id);
      alert('تمت إزالة المنتج من المفضلة');
    } else {
      await store.add(product);
      alert('تمت إضافة المنتج إلى المفضلة');
    }
    await tx.complete;
  } catch (error) {
    console.error('Error toggling bookmark:', error);
    alert('حدث خطأ أثناء تحديث المفضلة');
  }
};

export const getBookmarks = async () => {
  const db = await openDB();
  const tx = db.transaction(BOOKMARK_STORE, 'readonly');
  const store = tx.objectStore(BOOKMARK_STORE);
  return store.getAll();
};