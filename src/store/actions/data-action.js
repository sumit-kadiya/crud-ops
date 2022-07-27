import { dataActions } from "../reducer/data";

const urls = [
  "https://reqres.in/api/users?page=1",
  "https://reqres.in/api/users?page=2",
];

export const fetchUsersData = () => (dispatch) => {
  const fetchData = () => {
    Promise.all(
      urls.map((url) =>
        fetch(url)
          .then((response) => response.json())
          .catch((error) => console.log("There was a problem!", error))
      )
    ).then((userData) => {
      const data1 = userData[0].data;
      const data2 = userData[1].data;

      return data1.concat(data2);
    });
  };
  try {
    const usersData = fetchData();
    dispatch(dataActions.setdata(usersData));
  } catch (error) {
    console.log(error);
  }
};
