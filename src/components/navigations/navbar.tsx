import Link from "next/link";
import UserButton from "../buttons/user-button";
import SearchField from "./search-field";

export default function Navbar() {
  return (
    <header className="bg-card sticky top-0 z-10 shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-5 px-5 py-3">
        <Link href="/" className="text-primary text-2xl font-bold">
          bugbook
        </Link>
        <SearchField />
        <UserButton className="sm:ms-auto" />
      </div>
    </header>
  );
}
