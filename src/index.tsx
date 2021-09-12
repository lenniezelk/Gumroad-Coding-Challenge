import "tailwindcss/tailwind.css";
import { join } from "lodash";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import { Product, Rating } from "./product.types";
import { renderProduct } from "./products";
import { Subject } from "rxjs";
import * as ReactDOM from "react-dom";
import { App } from "./app";

const firebaseConfig = {
  apiKey: "AIzaSyDc8RzRYtxlIekQyPBu--0qwKombEXN9W4",
  authDomain: "gumroad-coding-challenge.firebaseapp.com",
  projectId: "gumroad-coding-challenge",
  storageBucket: "gumroad-coding-challenge.appspot.com",
  messagingSenderId: "853818007743",
  appId: "1:853818007743:web:b243172d8012b48467a60a",
  measurementId: "G-LXCP9GCLW8",
};

const startApp = async () => {
  // fetch firebase app and db
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  let products: Product[] = [];

  // use Subject to render products async
  const productSubject = new Subject<Product>();
  productSubject.subscribe(() => {
    renderProducts();
  });

  // fetch products and ratings
  const productSnapshot = await getDocs(collection(db, "products"));
  productSnapshot.forEach(async (doc) => {
    const product: Product = doc.data() as Product;
    product.id = doc.id;

    // fetch product rating
    const ratingSnapshot = await getDocs(
      collection(db, `products/${product.id}/ratings`)
    );

    const ratings: Rating[] = [];

    ratingSnapshot.forEach((doc) => {
      const rating = doc.data() as Rating;
      rating.id = doc.id;
      ratings.push(rating);
    });

    product.ratings = ratings;
    products = [...products, product];
    productSubject.next(product);
  });

  const addReview = async (path: string, reviewText: string) => {
    const ratingDocRef = doc(collection(db, path));
    await setDoc(ratingDocRef, { value: 5, text: reviewText });
  };

  // add products to DOM
  const renderProducts = () => {
    const productItem = products.map((product) => {
      const addProductReview = (reviewText: string) =>
        addReview(`products/${product.id}/ratings`, reviewText);
      return renderProduct(product, addProductReview);
    });
    const productsNode = document.getElementById("products");
    productsNode.append(...productItem);
  };
};

// startApp();

ReactDOM.render(<App />, document.getElementById("root"));