import LoginForm from "@/components/common/LoginForm";
import Image from "next/image";

export default async function page() {
  return (
    <main className="flex w-full h-[100vh] items-center justify-center bg-gradient-to-br">
      <LoginForm/>
    </main>
  );
}
