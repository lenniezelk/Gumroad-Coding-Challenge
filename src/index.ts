import "tailwindcss/tailwind.css";
import { join } from "lodash";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDc8RzRYtxlIekQyPBu--0qwKombEXN9W4",
  authDomain: "gumroad-coding-challenge.firebaseapp.com",
  projectId: "gumroad-coding-challenge",
  storageBucket: "gumroad-coding-challenge.appspot.com",
  messagingSenderId: "853818007743",
  appId: "1:853818007743:web:b243172d8012b48467a60a",
  measurementId: "G-LXCP9GCLW8",
};

type Rating = {
  value: number;
  text: string;
  id: string;
};

type Product = {
  id: string;
  name: string;
  ratings: Rating[];
};

const startApp = async () => {
  // fetch firebase app and db
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // fetch products and ratings
  const productSnapshot = await getDocs(collection(db, "products"));
  productSnapshot.forEach(async (doc) => {
    const product: Product = doc.data() as Product;
    product.id = doc.id;

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
  });
};

startApp();
