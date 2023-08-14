"use client"
import BookListTable from "@/Components/BookListTable";
import { useSearchParams } from "next/navigation";

export default function Librarian() {
  const searchParams=useSearchParams()
  const LibLogged=searchParams.get('LibLogged')
  return (
    <div className="mx-auto p-4">
    <BookListTable libLogged={LibLogged}/>
    </div>
  );
}
