import Link from "next/link";

export default function Home() {
  return (
    <header className="bg-background fg-foreground flex flex-row px-4">
      <nav className="flex flex-row grow h-14">
        <Link
          href="/"
          className="grow self-center"
        >
          eki.cat
        </Link>

        <Link
          href="/photos"
          className="self-center"
        >
          Photos
        </Link>
      </nav>
    </header>
  );
}
