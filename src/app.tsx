import "tailwindcss/tailwind.css";
import { initializeApp, FirebaseApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  Firestore,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { Product, Rating } from "./product.types";
import { RenderProduct } from "./products";
import { useEffect, useRef, useState } from "react";
import { uniqueId } from "lodash";
import { Unsubscribe } from "@firebase/util";

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
  const [ids, setIds] = useState(uniqueId());
  const unsubscribe = useRef<Unsubscribe>(null);

  // fetch products and ratings
  const fetchDocs = async () => {
    const productSnapshot = await getDocs(collection(db.current, "products"));
    productSnapshot.forEach(async (docSnapshot) => {
      const product: Product = docSnapshot.data() as Product;
      product.id = docSnapshot.id;

      // fetch product rating
      const ratingSnapshot = await getDocs(
        query(
          collection(db.current, `products/${product.id}/ratings`),
          orderBy("created", "desc")
        )
      );

      const ratings: Rating[] = [];

      ratingSnapshot.forEach((docSnapshot) => {
        const rating = docSnapshot.data() as Rating;
        rating.id = docSnapshot.id;
        ratings.push(rating);
      });

      if (unsubscribe.current) unsubscribe.current();

      // watch for changes to ratings
      unsubscribe.current = onSnapshot(
        collection(db.current, `products/${product.id}/ratings`),
        (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              setIds(uniqueId());
            }
          });
        }
      );

      product.ratings = ratings;
      setProducts([product]);
    });
  };

  useEffect(() => {
    app.current = initializeApp(firebaseConfig);
    db.current = getFirestore(app.current);
    fetchDocs();
  }, []);

  useEffect(() => {
    fetchDocs();
    return () => {
      if (unsubscribe.current) unsubscribe.current();
    };
  }, [ids]);

  const addReview = async (
    path: string,
    reviewText: string,
    rating: number
  ) => {
    const ratingDocRef = doc(collection(db.current, path));
    await setDoc(ratingDocRef, {
      value: rating,
      text: reviewText,
      created: serverTimestamp(),
    });
  };

  const renderProducts = () => {
    return products.map((product) => {
      const addProductReview = (reviewText: string, rating: number) =>
        addReview(`products/${product.id}/ratings`, reviewText, rating);
      return (
        <RenderProduct
          key={product.id}
          product={product}
          addReviewCallback={addProductReview}
        />
      );
    });
  };

  return <div className="md:container mx-auto px-5">{renderProducts()}</div>;
};
