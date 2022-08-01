import { Routes, Route, BrowserRouter } from "react-router-dom";
import AddUser from "./Components/Pages/AddUser";
import DisplayCard from "./Components/Pages/Card";
import List from "./Components/Pages/List";
import NotFound from "./Components/Pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/:personId" element={<DisplayCard />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
