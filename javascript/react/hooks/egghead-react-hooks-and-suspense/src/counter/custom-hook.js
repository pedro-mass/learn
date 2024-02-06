import React, { useState } from "react";

function useCounter(initialState = 0, step = 1) {
  const [count, setCount] = useState(initialState);
  const increment = () => setCount(count + step);

  return { count, increment };
}

export default function Counter() {
  const { count, increment } = useCounter(5, 3);
  return <button onClick={increment}>{count}</button>;
}
