import React from 'react'

function BookTakenEntryTable() {
  return (
    <div className="w-full overflow-x-auto text-slate-900 p-8">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
          <th className="border p-2">SL No.</th>

            <th className="border p-2">Book ID</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Author</th>
            <th className="border p-2">Department</th>
            <th className="border p-2">Issued to</th>
            <th className="border p-2">Issued Date</th>

          </tr>
        </thead>
        <tbody>
         
        </tbody>
      </table>
    </div>
  )
}

export default BookTakenEntryTable