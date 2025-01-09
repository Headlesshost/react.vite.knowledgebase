import { Author, PagedResponse, Section, Site } from "../lib/types";
import ResolveSection from "./resolveSection";
import { useContentSiteGuide } from "../lib/_hooks";

interface GuideProps {
  instanceId: string | undefined;
  authors?: PagedResponse<Author>;
  site: Site;
  pageIdentifier: string;
}

export default function Guide({ instanceId, authors, site, pageIdentifier }: GuideProps) {
  const { data, error, isLoading } = useContentSiteGuide(instanceId);
  if (isLoading) return null;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="container mx-auto flex flex-wrap max-w-7xl justify-center px-4 pt-6">
        <aside className="hidden lg:block lg:w-1/4 xl:w-1/6"></aside>
        <>
          <main className="w-full lg:w-3/4 xl:w-2/3 py-4 px-8">
            <article>
              <div className="text-3xl font-bold my-3">{data?.content?.name}</div>
              <div className="whitespace-pre-wrap">{data?.content?.notes}</div>
              {data?.content?.sections?.map((section: Section) => (
                <div key={section.id} className="hh-guide">
                  <div className="flex">
                    <div className="text-sm my-3 mb-10 font-semibold mb-0 mr-1">{section?._meta?.name}</div>
                    <div className="text-sm my-3 mb-10 text-slate-500 mb-1 ">- {section?._meta?.description}</div>
                  </div>
                  <ResolveSection section={section} key={section.id} authors={authors} site={site} pageIdentifier={pageIdentifier} />
                </div>
              ))}
            </article>
          </main>
          <aside className="hidden xl:block xl:w-1/6 p-4"></aside>
        </>
      </div>
    </>
  );
}
