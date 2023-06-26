import React, { useState } from "react";
import {
  useSelector,
  useDispatch,
} from 'react-redux';

import {
  add,
  sub,
  changeKey,
} from '../actions/count';

import CountChild from './CountChild';

function Count(props) {
  const [count, setCount] = useState(0);
  console.log("🚀 ~ file: CountChild", count)
  // const count = useSelector(state => state.count.count);
  // const key = useSelector(state => state.count.key);
  // const dispatch = useDispatch();
  // console.table("🚀 ~ file: Count.js ~ line 8 ~ Count ~ count", { count, key })

  // const handleAdd = () => {
  //   const action = add();
  //   dispatch(action);
  // }

  // const handleSub = () => {
  //   dispatch(sub());
  // }

  // const handleChangeKey = (key) => {
  //   dispatch(changeKey(key));
  // }
  return (
    <div className="count-cmp">
      <div className="">
        {/* Count = {count} */}
      </div>
      <div className="">
        {/* Key = {key} */}
      </div>
      <hr />
      <div className="">
        Count = {count} --- {Math.random()}
      </div>
      <button onClick={() => setCount(pre => pre + 1)}> +1 </button>
      <div className="">
        {/* <button onClick={() => handleAdd()}>
          Increase
        </button>
        <button onClick={handleSub}>
          Decrease
        </button>
        <button onClick={() => handleChangeKey(Math.round(Math.random() * 1000 + 1))}>
          Random key
        </button> */}
        <CountChild
          count={count}
        />
      </div>
    </div>
  );
}

export default Count;