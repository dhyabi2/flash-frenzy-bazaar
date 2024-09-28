const DB_NAME = 'FlashSaleDB';
const DB_VERSION = 2;
const PRODUCT_STORE = 'products';
const BOOKMARK_STORE = 'bookmarks';
const LIKE_STORE = 'likes';

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
      if (!db.objectStoreNames.contains(LIKE_STORE)) {
        const likeStore = db.createObjectStore(LIKE_STORE, { keyPath: 'id', autoIncrement: true });
        likeStore.createIndex('productId', 'productId', { unique: false });
        likeStore.createIndex('ip', 'ip', { unique: false });
      }
    };
  });
};

export const addProduct = async (product) => {
  const db = await openDB();
  const transaction = db.transaction(PRODUCT_STORE, 'readwrite');
  const store = transaction.objectStore(PRODUCT_STORE);
  return new Promise((resolve, reject) => {
    const request = store.add({ ...product, likes: 0 });
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

export const addLike = async (productId, ip) => {
  const db = await openDB();
  const transaction = db.transaction([LIKE_STORE, PRODUCT_STORE], 'readwrite');
  const likeStore = transaction.objectStore(LIKE_STORE);
  const productStore = transaction.objectStore(PRODUCT_STORE);

  return new Promise((resolve, reject) => {
    const checkRequest = likeStore.index('productId').getAll(productId);
    checkRequest.onsuccess = () => {
      const existingLikes = checkRequest.result;
      if (!existingLikes.some(like => like.ip === ip)) {
        likeStore.add({ productId, ip });
        const getProductRequest = productStore.get(productId);
        getProductRequest.onsuccess = () => {
          const product = getProductRequest.result;
          product.likes = (product.likes || 0) + 1;
          productStore.put(product);
        };
        resolve(true);
      } else {
        resolve(false);
      }
    };
    checkRequest.onerror = () => reject(checkRequest.error);
  });
};

export const getLikes = async (productId) => {
  const db = await openDB();
  const transaction = db.transaction(LIKE_STORE, 'readonly');
  const store = transaction.objectStore(LIKE_STORE);
  return new Promise((resolve, reject) => {
    const request = store.index('productId').getAll(productId);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result.length);
  });
};