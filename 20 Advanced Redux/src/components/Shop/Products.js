import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    title: "Test Product 1",
    price: 6,
    description: "This is a first product - amazing!",
  },
  {
    id: "p2",
    title: "Test Product 2",
    price: 7,
    description: "This is a second product - fantastic!",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;

