import CategoryFilter from "./CategoryFilter";
import SearchFormLocal from "./SearchFormLocal";

function SearchSideBar() {
  return (
    <div id="search-filters" className="bg-white px-3 sticky-top">
      <SearchFormLocal />
      <CategoryFilter />
    </div>
  );
}

export default SearchSideBar;
