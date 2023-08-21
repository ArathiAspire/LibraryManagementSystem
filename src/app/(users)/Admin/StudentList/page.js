import Link from "next/link";
import { use } from "react";
import StudentListTable from "@/Components/StudentListTable";
import { students } from "@/api/students";

const StudentList = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Student List</h1>
      <StudentListTable students={students} />
    </div>
  );
};

export default StudentList;
