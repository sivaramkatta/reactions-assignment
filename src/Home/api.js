const api_url = "https://artful-iudex.herokuapp.com";

const getRequest = route =>
  fetch(`${api_url}/${route}`).then(res => res.json());

const postRequest = (route, body) =>
  fetch(`${api_url}/${route}`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  }).then(res => res.json());

const deleteRequest = route =>
  fetch(`${api_url}/${route}`, { method: "delete" });

export const getReactions = () => getRequest("reactions");

export const getUsers = () => getRequest("users");

export const getUserContentReactions = () =>
  getRequest("user_content_reactions");

export const addReaction = body => postRequest("user_content_reactions", body);

export const deleteReaction = id =>
  deleteRequest(`user_content_reactions/${id}`);

export const logged_in = 25;
