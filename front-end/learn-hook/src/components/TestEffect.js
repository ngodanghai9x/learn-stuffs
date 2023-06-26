import React, { useState, useEffect } from 'react';
import {
  useHistory,
  useParams,
} from "react-router-dom";
function TestEffect() {
  const [count, setCount] = useState(0);
  // let history = useParams();
  // console.log("🚀 ~ file: index.js ~ line 15 ~ Admin ~ location", history)

  // useEffect(() => {
  //   console.log('effect ', count);
  //   // setCount(count + 1);
  //   // setTimeout(() => setCount(count + 1), 2000)
  //   return () => console.log('clean ', count);
  // }, [count]);

  // useEffect(() => {
  //   console.log('effect ', count);

  //   // const interval = setInterval(() => {
  //   //   console.log('loop ', count);
  //   //   setCount(count + 1); // effect phụ thuộc vào state `count`
  //   // }, 1000);

  //   const interval = setInterval(() => {
  //     console.log('loop ', count);
  //     setCount(c => c + 1); // ✅ Không phụ thuộc vào biến `count` bên ngoài
  //   }, 1000);

  //   return () => {
  //     console.log('clean ', count);
  //     clearInterval(interval);
  //   };
  // }, []); // ✅ effect của chúng ta không sử dụng bất kỳ biến nào trong phạm vi component

  console.log('render ', count);

  return (
    <div className="TestEffect">
      <p>
        TestEffect
      </p>
      <p>
        count = {count}
      </p>

      <button onClick={() => setCount(count + 1)}>
        Counter (basic)
      </button>

      <button onClick={() => setTimeout(() => setCount(count + 1), 2000)}>
        Delayed Counter (basic)
      </button>

      <button onClick={() => setTimeout(() => setCount(x => x + 1), 2000)}>
        Delayed Counter (functional)
      </button>
    </div>
  );
}

export default TestEffect;
