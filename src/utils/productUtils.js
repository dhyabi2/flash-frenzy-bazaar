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

export const toggleBookmark = (product) => {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
  const index = bookmarks.findIndex(item => item.id === product.id);
  
  if (index > -1) {
    bookmarks.splice(index, 1);
    alert('تمت إزالة المنتج من المفضلة');
  } else {
    bookmarks.push(product);
    alert('تمت إضافة المنتج إلى المفضلة');
  }
  
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
};