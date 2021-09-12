import { renderAddRatingDialog } from "./dialog";

export function addProductsDialog() {
  const bodyNode = document.getElementsByTagName("body")[0];
  const productDialogNode: HTMLElement | null =
    document.getElementById("product-dialog");
  if (productDialogNode === null) {
    const container = document.createElement("div");
    container.appendChild(renderAddRatingDialog());
    bodyNode.appendChild(container);
  }
}

export function removeProductsDialog() {
  const elem = document.getElementById("product-dialog");
  elem.remove();
}
