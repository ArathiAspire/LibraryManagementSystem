import Link from "next/link";

export default function Admin() {
    return(
        <div>
             <h2 className="mx-auto p-4">Admin Home page</h2>
             <Link href="StudentList"><li>View Students</li></Link>
             <Link href="BookList"><li>View Books</li></Link>
             <Link href="AddLibrarian"><li>Add Librarian</li></Link>
             
        </div>
       
    )
}