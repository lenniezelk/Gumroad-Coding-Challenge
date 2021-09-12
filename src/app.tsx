import "tailwindcss/tailwind.css";
import { initializeApp, FirebaseApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  Firestore,
} from "firebase/firestore";
import { Product, Rating } from "./product.types";
import { RenderProduct } from "./products";
import { Subject } from "rxjs";
import { useEffect, useRef, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyDc8RzRYtxlIekQyPBu--0qwKombEXN9W4",
  authDomain: "gumroad-coding-challenge.firebaseapp.com",
  projectId: "gumroad-coding-challenge",
  storageBucket: "gumroad-coding-challenge.appspot.com",
  messagingSenderId: "853818007743",
  appId: "1:853818007743:web:b243172d8012b48467a60a",
  measurementId: "G-LXCP9GCLW8",
};

export const App = () => {
  const app = useRef<FirebaseApp>(null);
  const db = useRef<Firestore>(null);
  const [products, setProducts] = useState<Product[]>([]);

  // fetch products and ratings
  const fetchDocs = async () => {
    const productSnapshot = await getDocs(collection(db.current, "products"));
    productSnapshot.forEach(async (doc) => {
      const product: Product = doc.data() as Product;
      product.id = doc.id;

      // fetch product rating
      const ratingSnapshot = await getDocs(
        collection(db.current, `products/${product.id}/ratings`)
      );

      const ratings: Rating[] = [];

      ratingSnapshot.forEach((doc) => {
        const rating = doc.data() as Rating;
        rating.id = doc.id;
        ratings.push(rating);
      });

      product.ratings = ratings;
      setProducts([...products, product]);
    });
  };

  useEffect(() => {
    app.current = initializeApp(firebaseConfig);
    db.current = getFirestore(app.current);
    fetchDocs();
  }, []);

  const addReview = async (path: string, reviewText: string) => {
    const ratingDocRef = doc(collection(db.current, path));
    await setDoc(ratingDocRef, { value: 5, text: reviewText });
  };

  const renderProducts = () => {
    return products.map((product) => {
      const addProductReview = (reviewText: string) =>
        addReview(`products/${product.id}/ratings`, reviewText);
      return (
        <RenderProduct product={product} addReviewCallback={addProductReview} />
      );
    });
  };

  return <>{renderProducts()}</>;
};
