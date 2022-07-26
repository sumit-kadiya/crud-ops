import { useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import AddUser from "./Components/Pages/AddUser";
import DisplayCard from "./Components/Pages/Card";
import List from "./Components/Pages/List";
import NotFound from "./Components/Pages/NotFound";

const urls = [
  "https://reqres.in/api/users?page=1",
  "https://reqres.in/api/users?page=2",
];

function App() {
  const [state, setState] = useState([]);

  const fetchDataHandler = useCallback(() => {
    Promise.all(
      urls.map((url) =>
        fetch(url)
          .then((response) => response.json())
          .catch((error) => console.log("There was a problem!", error))
      )
    ).then((userData) => {
      const data1 = userData[0].data;
      const data2 = userData[1].data;

      console.log(data1.concat(data2));
      setState(data1.concat(data2));
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
