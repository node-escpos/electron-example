import ReactDOM from "react-dom";

import {print} from "#preload";

ReactDOM.render(
  <div style={{ textAlign: "center" }}>
    <button onClick={print}>print</button>
  </div>,
  document.getElementById("app"),
);
