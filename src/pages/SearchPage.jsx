import { AppHeader } from "../cmps/AppHeader.jsx";
import { BrowseAll } from "../cmps/BrowseAll.jsx";
import { SearchResults } from "../cmps/SearchResults.jsx";

export function SearchPage() {
  return (
    <section>
      <AppHeader />
      //before typing
      <BrowseAll />
      //after typing
      <SearchResults />
    </section>
  );
}
