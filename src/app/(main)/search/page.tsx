import TrendsSidebar from "@/components/navigation/trends-sidebar";
import SearchResults from "@/components/search-result";
import { SearchParams } from "@/lib/types";
import { Metadata } from "next";

export async function generateMetadata(props: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const q = searchParams.q || "";
  return {
    title: `Search results for "${q}"`,
  };
}

export default async function Page(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const q = searchParams.q || "";

  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <div className="bg-card rounded-2xl p-5 shadow-sm">
          <h1 className="line-clamp-2 text-center text-2xl font-bold break-all">
            Search results for &quot;{q}&quot;
          </h1>
        </div>
        <SearchResults query={q as string} />
      </div>
      <TrendsSidebar />
    </main>
  );
}
