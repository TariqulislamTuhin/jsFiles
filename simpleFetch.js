const csrfToken = document
  .querySelector('meta[name="csrf-token"]')
  .getAttribute("content");

fetch("https://jsonplaceholder.typicode.com/users/3", {
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "X-CSRF-TOKEN": csrfToken,
  },
  method: "PUT",
  body: JSON.stringify({
    username: "Elon Musk",
    email: "elonmusk@gmail.com",
  }),
});
