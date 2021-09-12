import { useState } from "react";
import { AddReviewCallback } from "./product.types";
import ReactStars from "react-stars";

export const AddRatingDialog = ({
  closeDialogCallback,
  addReviewCallback,
}: {
  addReviewCallback: AddReviewCallback;
  closeDialogCallback: VoidFunction;
}) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      id="product-dialog"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          onClick={closeDialogCallback}
          id="product-dialog-overlay"
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-12 py-12">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <h3
                  className="text-4xl leading-6 font-bold text-gray-900"
                  id="modal-title"
                >
                  What's your rating?
                </h3>
                <div className="mt-9">
                  <p className="text-2xl">Rating</p>
                </div>
                <div className="mt-9">
                  <ReactStars
                    half
                    value={rating}
                    size={50}
                    color1="#E0E0E0"
                    onChange={(newValue) => setRating(newValue)}
                  />
                </div>
                <div className="mt-9">
                  <p className="text-2xl">Review</p>
                </div>
                <div className="mt-9">
                  <input
                    type="text"
                    placeholder="Start typing....."
                    className="w-full"
                    id="review-txt"
                    value={reviewText}
                    onChange={(evt) => setReviewText(evt.target.value)}
                  />
                </div>
              </div>
            </div>
            <button
              id="submit-review"
              className="px-3 py-1 border-2 rounded border-gray-300 text-sm text-gray-600 shadow-sm mt-9"
              onClick={() => {
                addReviewCallback(reviewText, rating);
                closeDialogCallback();
              }}
            >
              Submit review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
