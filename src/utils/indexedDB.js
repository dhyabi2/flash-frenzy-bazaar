const DB_NAME = 'FlashSaleDB';
const DB_VERSION = 1;
const PRODUCT_STORE = 'products';
const BOOKMARK_STORE = 'bookmarks';

export const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(PRODUCT_STORE)) {
        db.createObjectStore(PRODUCT_STORE, { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains(BOOKMARK_STORE)) {
        db.createObjectStore(BOOKMARK_STORE, { keyPath: 'id' });
      }
    };
  });
};

export const addProduct = async (product) => {
  const db = await openDB();
  const transaction = db.transaction(PRODUCT_STORE, 'readwrite');
  const store = transaction.objectStore(PRODUCT_STORE);
  return new Promise((resolve, reject) => {
    const request = store.add(product);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
};

export const getProducts = async () => {
  const db = await openDB();
  const transaction = db.transaction(PRODUCT_STORE, 'readonly');
  const store = transaction.objectStore(PRODUCT_STORE);
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
};

export const addBookmark = async (product) => {
  const db = await openDB();
  const transaction = db.transaction(BOOKMARK_STORE, 'readwrite');
  const store = transaction.objectStore(BOOKMARK_STORE);
  return new Promise((resolve, reject) => {
    const request = store.put(product);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
};

export const removeBookmark = async (productId) => {
  const db = await openDB();
  const transaction = db.transaction(BOOKMARK_STORE, 'readwrite');
  const store = transaction.objectStore(BOOKMARK_STORE);
  return new Promise((resolve, reject) => {
    const request = store.delete(productId);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
};

export const getBookmarks = async () => {
  const db = await openDB();
  const transaction = db.transaction(BOOKMARK_STORE, 'readonly');
  const store = transaction.objectStore(BOOKMARK_STORE);
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
};