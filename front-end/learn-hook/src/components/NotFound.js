import React from "react";
import {
  useLocation
} from "react-router-dom";

function NotFound() {
  let location = useLocation();

  return (
    <div>
      <h3>
        Không tìm thấy trang cho đường dẫn <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

export default NotFound;