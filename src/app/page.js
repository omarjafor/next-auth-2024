
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-center text-2xl font-bold mt-4">Welcome To Next Auth 2024</h1>
      <div className="flex justify-center gap-5 my-3">
        <Link href={'/signin'} className="bg-purple-500 py-1 px-2 text-white rounded">SignIn</Link>
        <Link href={'/signup'} className="bg-blue-500 py-1 px-2 text-white rounded">SignUp</Link>
      </div>
    </div>
  );
}
