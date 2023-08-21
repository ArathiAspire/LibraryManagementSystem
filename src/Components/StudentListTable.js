import React from "react";

const StudentListTable = ({ students }) => {
  return (
    <div className="w-full overflow-x-auto text-slate-900 p-8">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">First Name</th>
            <th className="border p-2">Last Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Contact</th>
            <th className="border p-2">Department</th>
            <th className="border p-2">Batch</th>
          </tr>
        </thead>
        <tbody className="bg-gray-900">
          {students.map((student) => (
            <tr key={student.id} className="text-slate-200">
              <td className="border p-2">{student.id}</td>

              <td className="border p-2">{student.firstName}</td>
              <td className="border p-2">{student.lastName}</td>
              <td className="border p-2">{student.email}</td>

              <td className="border p-2">{student.contact}</td>
              <td className="border p-2">{student.department}</td>
              <td className="border p-2">{student.batch}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentListTable;
