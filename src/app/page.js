
import { authUserAction } from "@/actions";
import Logout from "@/components/logout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const currectUser = await authUserAction();
  if(!currectUser?.success) redirect('/signin');
  console.log(currectUser);
  
  return (
    <div>
      <h1 className="text-center text-2xl font-bold mt-4">Welcome To Next Auth 2024</h1>
      {
        currectUser &&
          <div className="my-3 text-center">
            <h2 className="text-center text-lg capitalize font-bold mt-4">{currectUser?.data?.userName}</h2>
            <h2 className="text-center text-lg font-bold mt-1">{currectUser?.data?.email}</h2>
            <Logout />
          </div>
      }
    </div>
  );
}
