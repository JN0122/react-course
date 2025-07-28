import { useDispatch, useSelector } from "react-redux";

import classes from "./Counter.module.css";
import { counterActions } from "../store";

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.counter);
  const show = useSelector((state) => state.counter.showCounter);

  const toggleCounterHandler = () => dispatch(counterActions.toggle());

  const incrementHandler = () => dispatch(counterActions.increment());
  const increaseByHandler = (value) =>
    dispatch(counterActions.increaseBy(value));
  const decrementHandler = () => dispatch(counterActions.decrement());

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={() => increaseByHandler(10)}>Increase by 10</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

// import { Component } from "react";
// import { connect } from "react-redux";

// import classes from "./Counter.module.css";

// class Counter extends Component {
//   decrementHandler() {
//     this.props.decrement();
//   }

//   incrementHandler() {
//     this.props.increment();
//   }

//   render() {
//     return (
//       <main className={classes.counter}>
//         <h1>Redux Counter</h1>
//         <div className={classes.value}>{this.props.counter}</div>
//         <div>
//           <button onClick={this.decrementHandler.bind(this)}>Increment</button>
//           <button onClick={this.incrementHandler.bind(this)}>Decrement</button>
//         </div>
//       </main>
//     );
//   }
// }

// const mapStateToProps = (state) => ({ counter: state.counter });
// const mapDispatchToProps = (dispatch) => ({
//   increment: () => dispatch({ type: "INCREMENT" }),
//   decrement: () => dispatch({ type: "DECREMENT" }),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Counter);

