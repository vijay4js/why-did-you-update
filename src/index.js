import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom";
import useWhyDidYouUpdate from "./use-why-did-you-update";
import "./styles.scss";

// Let's pretend this <Counter> component is expensive to re-render so ...
// ... we wrap with React.memo, but we're still seeing performance issues :/
// So we add useWhyDidYouUpdate and check our console to see what's going on.
const Counter = React.memo((props) => {
  useWhyDidYouUpdate("Counter", props);
  return <div style={props.style}>{props.count}</div>;
});

function App() {
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState(0);

  // Our console output tells use that the style prop for <Counter> ...
  // ... changes on every render, even when we only change userId state by ...
  // ... clicking the "switch user" button. Oh of course! That's because the
  // ... counterStyle object is being re-created on every render.
  // Thanks to our hook we figured this out and realized we should probably ...
  // ... move this object outside of the component body.
  const counterStyle = useMemo(() => {
    return {
      fontSize: "3rem",
      color: "red"
    };
  }, []);

  return (
    <div>
      <div className="counter">
        <Counter count={count} style={counterStyle} />
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
      <div className="user">
        <img src={`http://i.pravatar.cc/80?img=${userId}`} />
        <button onClick={() => setUserId(userId + 1)}>Switch User</button>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
