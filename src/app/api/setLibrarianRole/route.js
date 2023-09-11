import setLibrarianRole from "@/server/setClaims";

export async function POST(req, res) {
  const { uid } = req.body;

  try {
    await setLibrarianRole(uid);
    res.status(200).json({
      message: "Librarian role set successfully",
    });
  } catch (error) {
    console.log("Error setting librarian role:", error);
    res.status(500).json({error:"An error occured while setting the librarian role"})
  }
}
