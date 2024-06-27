
import { authUserAction } from "@/actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const currectUser = await authUserAction();
  console.log(currectUser);
  return (
    <div>
      <h1 className="text-center text-2xl font-bold mt-4">Welcome To Next Auth 2024</h1>
      {
        currectUser ?
          <div className="my-3 text-center">
            <h2 className="text-center text-lg font-bold mt-4">{currectUser?.data.userName}</h2>
            <h2 className="text-center text-lg font-bold mt-4">{currectUser?.data.email}</h2>
            <Button className='mt-2'>Log out</Button>
          </div>
          :
          <div className="flex justify-center gap-5 my-3">
            <Link href={'/signin'} className="bg-purple-500 py-1 px-2 text-white rounded">SignIn</Link>
            <Link href={'/signup'} className="bg-blue-500 py-1 px-2 text-white rounded">SignUp</Link>
          </div>
      }
    </div>
  );
}
