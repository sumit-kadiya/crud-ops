import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AddUser from "./Components/Pages/AddUser";
import DisplayCard from "./Components/Pages/Card";
import List from "./Components/Pages/List";
import NotFound from "./Components/Pages/NotFound";
import { fetchUsersData } from "./store/actions/data-action";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.data.data);

  useEffect(() => {
    dispatch(fetchUsersData());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/:personId" element={<DisplayCard data={userData} />} />
        <Route path="/adduser" element={<AddUser userData={userData} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
