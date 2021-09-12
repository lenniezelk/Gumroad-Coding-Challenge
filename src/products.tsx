import { AddReviewCallback, Product, Rating } from "./product.types";
import { sum, round } from "lodash";
import { RatingStars } from "./star";
import { useState } from "react";
import { AddRatingDialog } from "./dialog";

const getProductRating = (product: Product): number => {
  const ratingSum = sum(product.ratings.map((rating) => rating.value));
  return round(ratingSum / product.ratings.length, 1);
};

type ProductProps = {
  product: Product;
  addReviewCallback: AddReviewCallback;
};

type OnlyProductProps = {
  product: Product;
};

export const RenderProduct = ({ product, addReviewCallback }: ProductProps) => {
  const [showAddRatingDialog, setShowAddRatingDialog] = useState(false);

  const toggleDialog = () => setShowAddRatingDialog(!showAddRatingDialog);

  return (
    <>
      {showAddRatingDialog && (
        <AddRatingDialog
          addReviewCallback={addReviewCallback}
          closeDialogCallback={toggleDialog}
        />
      )}
      <div className="py-4 max-w-md">
        <h3 className="text-4xl mb-5 font-bold">{product.name}</h3>
        <div className="flex justify-between">
          <OverralRatings product={product} />
          <div>
            <button
              onClick={toggleDialog}
              className="px-2 py-1 border-2 rounded border-gray-300 text-sm text-gray-600 shadow-sm"
            >
              Add review
            </button>
          </div>
        </div>
        <hr className="h-1 bg-grey-400 my-5" />
        <Reviews product={product} />
      </div>
    </>
  );
};

const OverralRatings = ({ product }: OnlyProductProps) => {
  if (product.ratings.length === 0) return null;
  const rating = getProductRating(product);

  return (
    <div className="flex items-center">
      <span className="mr-2 text-2xl">{getProductRating(product)}</span>
      <RatingStars rating={rating} />
    </div>
  );
};

const Reviews = ({ product }: OnlyProductProps) => {
  if (product.ratings.length === 0) return null;

  const ratings = product.ratings.map((rating, index) => (
    <Review rating={rating} key={index} />
  ));

  return (
    <>
      <h4 className="text-xl font-bold mb-2">Reviews</h4>
      {ratings}
    </>
  );
};

const Review = ({ rating }: { rating: Rating }) => {
  return (
    <div className="mb-1 flex items-center">
      <span className="mr-2 text-md">
        <RatingStars rating={rating.value} />
      </span>
      <span className="font-bold text-md">
        {rating.value} {rating.text === "" ? "" : ", "}
      </span>
      <span className="text-md text-gray-400 ml-1">{rating.text}</span>
    </div>
  );
};
