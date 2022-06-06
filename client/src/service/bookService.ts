import { GRAPHQL_URL } from './../apis/graphql';

const getUserData = async () => {
  const token = localStorage.getItem('token');

  const graphqlQuery = {
    query: `
      {
        user {
          name
          email
          favoriteBooks {
            id
            title
            author
            imageUrl
            category
            url
          }
        }
      }
    `
  };

  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(graphqlQuery)
  });
  const { data } = await response.json();

  return data;
};

const userService = { getUserData };

export default userService;
