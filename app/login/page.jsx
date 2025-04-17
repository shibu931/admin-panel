import LoginForm from "@/components/common/LoginForm";

export default async function page() {
  return (
    <main className="flex w-full h-[100vh] items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950">
      <LoginForm/>
    </main>
  );
}
