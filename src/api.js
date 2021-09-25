const api_url = "https://artful-iudex.herokuapp.com";

export const getReactions = () =>
  fetch(`${api_url}/reactions`).then(res => res.json());

export const getUsers = () => fetch(`${api_url}/users`).then(res => res.json());

export const getUserContentReactions = () =>
  fetch(`${api_url}/user_content_reactions`).then(res => res.json());

export const addReaction = data =>
  fetch(`${api_url}/user_content_reactions`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json());

export const deleteReaction = id =>
  fetch(`${api_url}/user_content_reactions/${id}`, { method: "delete" });

export const logged_in = 25;
