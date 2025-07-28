import { useDispatch } from "react-redux";
import classes from "./CartItem.module.css";
import { addToCart, removeFromCart } from "../../store/cart";

const CartItem = (props) => {
  const { id, title, quantity, price } = props.item;

  const dispatch = useDispatch();

  const incrementHandle = () => dispatch(addToCart({ id, title, price }));
  const decrementHandle = () => dispatch(removeFromCart(id));

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${(quantity * price).toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={decrementHandle}>-</button>
          <button onClick={incrementHandle}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;

