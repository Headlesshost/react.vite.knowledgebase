import { Author, PagedResponse, Section, Site } from "../lib/types";
import { useLocation } from "react-router-dom";
import ResolveSection from "./resolveSection";
import PageFoot from "./pageFoot";
import LeftNav from "./leftNav";
import OnThisPage from "./onThisPage";
import { useEffect } from "react";

interface BodyProps {
  site?: Site;
  authors?: PagedResponse<Author>;
}

const Body: React.FC<BodyProps> = ({ site, authors }) => {
  const location = useLocation();
  const { globals } = site?.content || {};
  const defaultPageName = globals?.content?.defaultPage || "home";
  if (!site) return <div>No site</div>;
  const pageIdentifier = location.pathname.substring(1);
  const selectedPage = site.content?.pages?.find((page) => page.identifier === pageIdentifier);
  const defaultPage = site.content?.pages?.find((page) => page.identifier === defaultPageName) || site.content?.pages?.[0];
  const page = selectedPage || defaultPage;
  if (!page) return <div>No page</div>;

  function ScrollToHash() {
    useEffect(() => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.getElementById(hash.replace("#", ""));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, [window.location.hash]);

    return null;
  }

  return (
    <>
      <ScrollToHash />
      <div className="container mx-auto flex flex-wrap max-w-7xl justify-center px-4 pt-6">
        <aside className="hidden lg:block lg:w-1/4 xl:w-1/6">
          <LeftNav site={site} usingDefaultPage={!selectedPage && defaultPage.identifier} pageIdentifier={pageIdentifier} />
        </aside>
        <>
          <main className="w-full lg:w-3/4 xl:w-2/3 py-4 px-8">
            <article>
              {page.sections?.map((section: Section) => (
                <ResolveSection section={section} key={section.id} authors={authors} site={site} pageIdentifier={pageIdentifier} />
              ))}
            </article>
            <PageFoot globals={site?.content?.globals} pageIdentifier={pageIdentifier} />
          </main>
          <aside className="hidden xl:block xl:w-1/6 p-4">
            <OnThisPage page={page} />
          </aside>
        </>
      </div>
    </>
  );
};

export default Body;
