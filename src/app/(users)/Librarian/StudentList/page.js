import Link from "next/link";
import { use } from "react";
import StudentListTable from "./StudentListTable";
import { students } from "@/api/students";
// https://rickandmortyapi.com/api/character
// https://jsonplaceholder.typicode.com/users

// const URL="https://jsonplaceholder.typicode.com/users"

// const URL="https://jsonplaceholder.typicode.com/users"
// async function getStudents() {
//   return await (
//     await fetch(URL)
//   ).json();
// }



const StudentList = () => {
  // const allStudents = use(getStudents());
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Student List</h1>
      <StudentListTable students={students}/>
      {/* {allStudents?.map((c) => (
        <ul key={c.id}>
          <Link href={c.name}>
            <li>{c.name}</li>
          </Link>
        </ul>
      ))} */}
    </div>
  );
};

export default StudentList;

// const response=await fetch('../api');
//         const data=await response.json()
//         console.log(data),
