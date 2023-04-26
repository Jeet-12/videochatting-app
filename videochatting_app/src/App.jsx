import { Routes, Route } from "react-router-dom";

import Home from "./Component/Home"
import Room from "./Component/Room"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:roomId" element={<Room />} />
      </Routes>
    </div>
  );
}

export default App;
