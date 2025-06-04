import React, { useState, useCallback, ChangeEvent, useEffect, useRef } from "react";
import { debounce } from "../lib/debounce";
import { useSearch } from "../lib/_hooks";
import { useNavigate } from "react-router-dom";

interface SearchResult {
  sectionId: string;
  pageId: string;
  pageName: string;
  propertyTrimmed: string;
}

interface SearchProps {
  instanceId: string | null | undefined;
  locale: string | null | undefined;
  segment: string | null | undefined;
}

export default function Search({ instanceId, locale, segment }: SearchProps) {
  const [debouncedValue, setDebouncedValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const { data: searchResults } = useSearch(instanceId, debouncedValue, locale, segment);
  const navigate = useNavigate();
  const pageIds = searchResults ? Array.from(new Set(searchResults.map((s) => s.pageId))) : [];
  const tags = searchResults
    ?.filter((p) => p?.pageContent?.tags && p?.pageContent?.tags?.length > 0)
    .map((p) => p.pageContent.tags[0].value)
    .flat();
  const uniqueTags = Array.from(new Set(tags));
  if (uniqueTags.length === 0) {
    uniqueTags.push("NO_TAGS");
  }

  const dropdownRef = useRef<HTMLDivElement>(null);

  const debouncedUpdate = useCallback(
    debounce((nextValue: string) => setDebouncedValue(nextValue), 500),
    []
  );

  useEffect(() => {
    return () => {
      debouncedUpdate.cancel();
    };
  }, [debouncedUpdate]);

  useEffect(() => {
    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: { target: any }) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDebouncedValue("");
      setSearchValue("");
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    debouncedUpdate(event.target.value);
  };

  const searchItemClicked = (searchResult: SearchResult) => {
    setDebouncedValue("");
    setSearchValue("");
    navigate(`${searchResult.pageId}#${searchResult.sectionId}`);
  };

  return (
    <div className="w-full md:w-72 xl:w-[500px]">
      <div className="w-full">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative" ref={dropdownRef}>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd"></path>
            </svg>
          </div>
          <input id="search" value={searchValue} onChange={handleChange} name="search" data-minchars="1" data-maxitems="30" className="block w-full rounded-md border-0 bg-white py-2.5 pl-10 pr-3 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-slate-300 sm:text-sm sm:leading-6" placeholder="Search" type="search" />

          {searchResults && searchResults?.length > 0 && (
            <div className="absolute z-10 w-full mt-2 border border-slate-300 rounded-md shadow-lg bg-slate-300 overflow-y-auto max-h-[calc(100vh-100px)]">
              {uniqueTags.map((tag) => {
                const filteredPageIds = pageIds.filter((id) => searchResults?.some((r) => r.pageId === id && ((r?.pageContent?.tags?.length > 0 && r.pageContent.tags[0].value === tag) || tag === "NO_TAGS")));
                return (
                  <div className="p-6 rounded-lg bg-white m-2" key={tag}>
                    {tag !== "NO_TAGS" && (
                      <>
                        <div className="font-display font-semibold text-slate-900">{tag}</div>
                        <hr className="my-2 border-slate-300" />
                      </>
                    )}
                    {filteredPageIds.map((p) => {
                      const pageResults = searchResults.filter((r) => r.pageId === p);
                      return (
                        <React.Fragment key={p}>
                          <div className="font-display font-semibold text-slate-900 ms-3 pt-3">{pageResults.length > 0 && pageResults[0].pageName}</div>
                          <ul className="py-1">
                            {pageResults.map((item, i) => (
                              <li key={i} className="cursor-pointer px-4 py-1 text-slate-900 hover:bg-slate-100 sm:text-sm" onClick={() => searchItemClicked(item)} dangerouslySetInnerHTML={{ __html: item.propertyTrimmed }}></li>
                            ))}
                          </ul>
                        </React.Fragment>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
