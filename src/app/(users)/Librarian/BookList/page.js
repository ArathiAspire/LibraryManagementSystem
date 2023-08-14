"use client";

import Link from "next/link";
import useSWR from "swr";
import BookListTable from "../../../../Components/BookListTable";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

// const fetcher = (path) =>
//   fetch(`https://rickandmortyapi.com/${path}`).then((res) =>
//     res.json()
//   );
const fetcher = (path) =>
  fetch(`https://librarymanagement-29ab2-default-rtdb.firebaseio.com/${path}`).then((res) =>
    res.json()
  );

export default function BookList() {
  // const students = useSWR("api/character", fetcher);
    const books = useSWR("books.json", fetcher);
    const searchParams = useSearchParams();
    const LoggedIn = searchParams.get("LoggedIn");
    const LibLoggedIn = searchParams.get("LibLoggedIn");
  // const [books, setBooks] = useState("");

  // const fetchBooks = async () => {
  //   const response = await fetch(
  //     "https://librarymanagement-29ab2-default-rtdb.firebaseio.com/books.json"
  //   );
  //   const data = await response.json();
  //   const loadedBooks = [];
  //   for (const key in data) {
  //     loadedBooks.push({
  //       id: key,
  //       title: data[key].title,
  //       author: data[key].author,
  //       genre: data[key].genre,
  //       availability: data[key].availability,
  //     });
  //   }
  //   setBooks(loadedBooks)
  // };
  // useEffect(()=>{
  //   fetchBooks();
  // },[])
  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Book List</h1>
    

      <BookListTable books={books} />
      {/* {students?.data?.results?.map((c) => (
        <ul key={c.id}>
          
            <li>{c.name}</li>
          
        </ul>
      ))} */}
    </>
  );
}
