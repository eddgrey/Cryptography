import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <h1 className="text-3xl text-center font-extrabold">Cryptography</h1>

      <div className="flex flex-col space-y-2">
        <Link href="/practica1" className="text-lg hover:underline">
          Practica 1
        </Link>
        <Link href="/practica2" className="text-lg hover:underline">
          Practica 2
        </Link>
        <Link href="/practica3" className="text-lg hover:underline">
          Practica 3
        </Link>
      </div>
    </main>
  );
}
