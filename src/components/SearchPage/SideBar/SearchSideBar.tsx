import CategoryFilter from "./inner/CategoryFilter";
import SearchFormLocal from "./inner/SearchFormLocal";

function SearchSideBar() {
  return (
    <div id="search-filters" className="bg-white px-3 sticky-top">
      <SearchFormLocal />
      <CategoryFilter />
    </div>
  );
}

export default SearchSideBar;
