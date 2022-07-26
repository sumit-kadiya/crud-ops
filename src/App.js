import { useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import AddUser from "./Components/Pages/AddUser";
import DisplayCard from "./Components/Pages/Card";
import List from "./Components/Pages/List";
import NotFound from "./Components/Pages/NotFound";

function App() {
  const [state, setState] = useState([]);

  const fetchDataHandler = useCallback(() => {
    Promise.all([
      fetch("https://reqres.in/api/users?page=1").then((value) => value.json()),
      fetch("https://reqres.in/api/users?page=2").then((value) => value.json()),
    ])
      .then((userData) => {
        let [el1, el2] = userData.map((el) => el.data);
        setState(el1.concat(el2));
        // console.log(el1.concat(el2));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetchDataHandler();
  }, [fetchDataHandler]);

  return (
    <>
      <Routes>
        <Route path="/" element={<List data={state} />} />
        <Route
          path="/:personId"
          element={<DisplayCard setState={setState} data={state} />}
        />
        <Route path="/adduser" element={<AddUser userData={state} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
