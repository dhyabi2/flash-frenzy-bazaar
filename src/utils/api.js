const API_BASE_URL = 'https://kul-yoom.replit.app';

export const fetchProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/api/products`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};

export const addProduct = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/api/products`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) throw new Error('Failed to add product');
  return response.json();
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete product');
};

export const fetchBookmarks = async () => {
  const response = await fetch(`${API_BASE_URL}/api/bookmarks`);
  if (!response.ok) throw new Error('Failed to fetch bookmarks');
  return response.json();
};

export const addBookmark = async (product) => {
  const response = await fetch(`${API_BASE_URL}/api/bookmarks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error('Failed to add bookmark');
  return response.json();
};

export const removeBookmark = async (id) => {
  const response = await fetch(`${API_BASE_URL}/api/bookmarks/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to remove bookmark');
};

export const addLike = async (productId) => {
  const response = await fetch(`${API_BASE_URL}/api/likes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId }),
  });
  if (!response.ok) throw new Error('Failed to add like');
  return response.json();
};

export const getLikes = async (productId) => {
  const response = await fetch(`${API_BASE_URL}/api/likes/${productId}`);
  if (!response.ok) throw new Error('Failed to get likes');
  return response.json();
};