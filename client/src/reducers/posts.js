//reducers is simply a function that cotains state and action parameter and perform action according to the action type.

export default (posts = [], action) => {
  switch (
    action.type // the action type is obtained after the action has been dispatched from the action file, based on which we perform different operation.
  ) {
    case "DELETE":
      return posts.filter((post) => post._id !== action.payload);
    case "UPDATE":
    case "LIKE":
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case "FETCH_ALL":
      return action.payload; //return the data as payload which contains all the post fetched from the local server. http://localhost:3000/posts and can be renderd to the components screen.
    case "CREATE":
      return [...posts, action.payload];
    default:
      return posts;
  }
};
