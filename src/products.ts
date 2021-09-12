import { Product } from "./product.types";
import { sum, round, floor, ceil } from "lodash";
import { renderRatingStars } from "./star";

const getProductRating = (product: Product): number => {
  const ratingSum = sum(product.ratings.map((rating) => rating.value));
  return round(ratingSum / product.ratings.length, 1);
};

export const renderProduct = (product: Product): string => {
  return `
    <div class="py-4 max-w-sm">
      <h3 class="text-xl pb-3">${product.name}</h3>
      <div class="flex justify-between">
        <div>
            ${renderRatings(product)}
        </div>
        <div>
            <button>Add review</button>
        </div>
      </div>
    </div>
  `;
};

const renderRatings = (product: Product) => {
  if (product.ratings.length === 0) return "";
  const rating = getProductRating(product);

  return `
    <div class="flex items-center">
        <span class="mr-2">${getProductRating(product)}</span>
        ${renderRatingStars(rating)}
    </div>
  `;
};
