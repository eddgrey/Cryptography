import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 className="text-3xl text-center font-extrabold">Cryptography</h1>

      <Link href="/practica0">
        <a className="text-lg hover:underline">Practica 0</a>
      </Link>
    </main>
  );
}
