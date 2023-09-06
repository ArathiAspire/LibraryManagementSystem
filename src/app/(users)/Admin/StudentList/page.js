import StudentListTable from "@/Components/StudentListTable";

const StudentList = () => {
  return (
    <div className="bg-gray-900">
      <div className="text-center">
        <h1 className="text-2xl font-semibold p-2">Student List</h1>
      </div>
      <StudentListTable/>
    </div>
  );
};

export default StudentList;
