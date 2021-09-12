import { Product, Rating } from "./product.types";
import { sum, round, floor, ceil } from "lodash";
import { renderRatingStars } from "./star";
import { renderAddRatingDialog } from "./dialog";
import { addProductsDialog } from "./toggleAddProductsDialog";

const getProductRating = (product: Product): number => {
  const ratingSum = sum(product.ratings.map((rating) => rating.value));
  return round(ratingSum / product.ratings.length, 1);
};

export const renderProduct = (product: Product): HTMLElement => {
  const html = `
    <div class="py-4 max-w-sm">
      <h3 class="text-4xl mb-5 font-bold">${product.name}</h3>
      <div class="flex justify-between">
        <div>
            ${renderOverralRatings(product)}
        </div>
        <div>
            <button class="px-2 py-1 border-2 rounded border-gray-300 text-sm text-gray-600 shadow-sm">Add review</button>
        </div>
      </div>
      <hr class="h-1 bg-grey-400 my-5" />
      ${renderReviews(product)}
    </div>
  `;

  const elem = document.createElement("span");
  elem.innerHTML = html;
  elem.querySelector("button").addEventListener("click", addProductsDialog);
  return elem;
};

const renderOverralRatings = (product: Product) => {
  if (product.ratings.length === 0) return "";
  const rating = getProductRating(product);

  return `
    <div class="flex items-center">
        <span class="mr-2 text-2xl">${getProductRating(product)}</span>
        ${renderRatingStars(rating)}
    </div>
  `;
};

const renderReviews = (product: Product) => {
  if (product.ratings.length === 0) return "";

  const ratings = product.ratings
    .map((rating) => renderReview(rating))
    .join("");

  return `
    <h4 class="text-xl font-bold mb-2">Reviews</h4>
    ${ratings}
  `;
};

const renderReview = (rating: Rating) => {
  return `
        <div class="mb-1 flex items-center">
            <span class="mr-2 text-md">
                ${renderRatingStars(rating.value)}
            </span>
            <span class="font-bold text-md">${rating.value} ${
    rating.text === "" ? "" : ", "
  }</span>
            <span class="text-md text-gray-400 ml-1">${rating.text}</span>
        </div>
    `;
};
