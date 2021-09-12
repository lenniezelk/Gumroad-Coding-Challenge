import { renderRatingStars } from "./star";
import { removeProductsDialog } from "./toggleAddProductsDialog";

export const renderAddRatingDialog = () => {
  const html = `
<!-- This example requires Tailwind CSS v2.0+ -->
<div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" id="product-dialog">
  <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
    <div id="product-dialog-overlay" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

    <!-- This element is to trick the browser into centering the modal contents. -->
    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

    <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->
    <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
      <div class="bg-white px-12 py-12">
        <div class="sm:flex sm:items-start">
          <div class="mt-3 text-center sm:mt-0 sm:text-left">
            <h3 class="text-4xl leading-6 font-bold text-gray-900" id="modal-title">
              What's your rating?
            </h3>
            <div class="mt-9">
              <p class="text-2xl">
                Rating
              </p>
            </div>
            <div class="mt-9">
                ${renderRatingStars(4)}
            </div>
            <div class="mt-9">
              <p class="text-2xl">
                Review
              </p>
            </div>
            <div class="mt-9">
                <input type="text" placeholder="Start typing....." class="w-full"/>
            </div>
          </div>
        </div>
        <button id="cancel" class="px-3 py-1 border-2 rounded border-gray-300 text-sm text-gray-600 shadow-sm mt-9">Submit review</button>
      </div>
    </div>
  </div>
</div>
    `;

  const elem = document.createElement("span");
  elem.innerHTML = html;
  elem
    .querySelector("#product-dialog-overlay")
    .addEventListener("click", removeProductsDialog);

  return elem;
};
