import { dataActions } from "../reducer/data";

const urls = [
  "https://reqres.in/api/users?page=1",
  "https://reqres.in/api/users?page=2",
];

export const fetchUsersData = () => (dispatch) => {
  Promise.all(
    urls.map((url) =>
      fetch(url)
        .then((response) => response.json())
        .catch((error) => console.log("There was a problem!", error))
    )
  ).then((userData) => {
    const data1 = userData[0].data;
    const data2 = userData[1].data;

    dispatch(dataActions.setdata(data1.concat(data2)));
  });
};
export const sendUserData = (userData) => (dispatch) => {
  fetch("https://reqres.in/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Something went wrong");
    })
    .then((data) => {
      console.log(data);
      dispatch(dataActions.addData(data));
    });
};

export const deleteUserData = (id) => (dispatch) => {
  fetch(`https://reqres.in/api/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log(response);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  dispatch(dataActions.deleteData(id));
};
