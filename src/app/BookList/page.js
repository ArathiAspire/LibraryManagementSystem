"use client";

import Link from "next/link";
import useSWR from "swr";
import BookListTable from "./BookListTable";

const fetcher = (path) =>
  fetch(`https://librarymanagement-29ab2-default-rtdb.firebaseio.com/${path}`).then((res) =>
    res.json()
  );

export default function BookList() {
    const books = useSWR("books.json", fetcher);

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Book List</h1>
      <Link href="/BookList/AddBook">
        <button className="hover:text-slate-400">Add books</button>
      </Link>

      <BookListTable books={books} />
      {/* {students?.data?.results?.map((c) => (
        <ul key={c.id}>
          
            <li>{c.name}</li>
          
        </ul>
      ))} */}
    </>
  );
}
