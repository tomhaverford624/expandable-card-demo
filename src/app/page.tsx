import Link from "next/link";

export default function Page() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Expandable Card Demo</h1>
      <p className="mt-2">
        Go to the <Link className="underline" href="/(marketing)">marketing page</Link> to see the cards.
      </p>
    </main>
  );
}
