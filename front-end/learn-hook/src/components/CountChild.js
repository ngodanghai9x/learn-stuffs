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

function CountChild(props) {
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
    <div className="CountChild-cmp">
      <hr />
      <div className="">
        Count child = {count} --- {Math.random()}
      </div>
      <button onClick={() => setCount(pre => pre + 1)}> +1 </button>
    </div>
  );
}

export default CountChild;