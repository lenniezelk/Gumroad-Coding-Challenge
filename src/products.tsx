import { AddReviewCallback, Product, Rating } from "./product.types";
import { sum, round, floor, ceil } from "lodash";
import { renderRatingStars } from "./star";
import { renderAddRatingDialog } from "./dialog";
import { addProductsDialog } from "./toggleAddProductsDialog";

const getProductRating = (product: Product): number => {
  const ratingSum = sum(product.ratings.map((rating) => rating.value));
  return round(ratingSum / product.ratings.length, 1);
};

type ProductProps = {
  product: Product;
  addReviewCallback: AddReviewCallback;
};

export const RenderProduct = ({ product, addReviewCallback }: ProductProps) => {
  return (
    <div className="py-4 max-w-sm">
      <h3 className="text-4xl mb-5 font-bold">${product.name}</h3>
      <div className="flex justify-between">
        <OverralRatings product={product} />
        <div>
          <button
            onClick={() => addProductsDialog(addReviewCallback)}
            className="px-2 py-1 border-2 rounded border-gray-300 text-sm text-gray-600 shadow-sm"
          >
            Add review
          </button>
        </div>
      </div>
      <hr className="h-1 bg-grey-400 my-5" />${renderReviews(product)}
    </div>
  );
};

const OverralRatings = ({ product }: { product: Product }) => {
  if (product.ratings.length === 0) return null;
  const rating = getProductRating(product);

  return (
    <div className="flex items-center">
      <span className="mr-2 text-2xl">${getProductRating(product)}</span>$
      {renderRatingStars(rating)}
    </div>
  );
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
