export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};
  