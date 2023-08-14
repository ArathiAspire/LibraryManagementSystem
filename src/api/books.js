export const fetcher = (path) =>
fetch(`https://librarymanagement-29ab2-default-rtdb.firebaseio.com/${path}`).then((res) =>
  res.json()
);