import LoginForm from "./LoginForm";

export default function Login() {
  // className="bg-cover bg-center min-h-screen" style={{ backgroundImage: "url('/background.jpg')" }}
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96  text-slate-900">
        <h4 className="text-2xl font-semibold mb-4">Login Page</h4>
        <LoginForm />
      </div>
    </div>
  );
}
