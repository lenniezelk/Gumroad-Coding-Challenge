import { renderAddRatingDialog } from "./dialog";
import { AddReviewCallback, Product } from "./product.types";

export function addProductsDialog(callback: AddReviewCallback) {
  const bodyNode = document.getElementsByTagName("body")[0];
  const productDialogNode: HTMLElement | null =
    document.getElementById("product-dialog");
  if (productDialogNode === null) {
    const container = document.createElement("div");
    container.appendChild(renderAddRatingDialog(callback));
    bodyNode.appendChild(container);
  }
}

export function removeProductsDialog() {
  const elem = document.getElementById("product-dialog");
  elem.remove();
}
