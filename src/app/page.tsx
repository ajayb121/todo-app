import Todo from "@/app/components/Todo";

export default function Home() {
  return (
    <>
      <header className="pt-12 text-center pb-5">
        <h1 className="text-3xl font-bold">To-Do App</h1>
      </header>
      <main className='max-w-xl mx-auto'>
        <Todo />
      </main>
    </>
  );
}