export function fetchPosts() {
  return fetch("https://randomuser.me/api/?results=10&inc=name,login,picture", {
    method: "GET",
    headers: {
      "content-type": "application/json",
    }
  }).then(resp => resp.json())
}