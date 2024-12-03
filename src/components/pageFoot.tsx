import { Link } from "react-router-dom";
import { Globals, LinkGroup } from "../lib/types";

interface NavigationItem {
  slug: string;
  title: string;
  children?: NavigationItem[];
}

interface PageFootProps {
  globals: Globals;
  pageIdentifier: string;
}

const PageFoot = ({ globals, pageIdentifier }: PageFootProps) => {
  const { navigation: links = [] } = globals;

  let nextLink: NavigationItem | undefined;
  let prevLink: NavigationItem | undefined;

  links.some((section: LinkGroup) => {
    const { links = [] } = section;
    const index = links.findIndex((child) => child.slug === pageIdentifier);
    if (index !== -1) {
      prevLink = links[index - 1];
      nextLink = links[index + 1];
      return true; // Break out of the loop
    }
    return false;
  });

  return (
    <>
      <dl className="mt-12 flex">
        {prevLink && (
          <div>
            <dt className="font-display text-sm font-semibold text-slate-900">Previous</dt>
            <dd className="mt-1">
              <Link className="text-sm text-slate-600 hover:text-slate-900" to={prevLink.slug}>
                <span aria-hidden="true">←</span> {prevLink.title}
              </Link>
            </dd>
          </div>
        )}
        {nextLink && (
          <div className="ml-auto text-right">
            <dt className="font-display text-sm font-semibold text-slate-900">Next</dt>
            <dd className="mt-1">
              <Link className="text-sm text-slate-600 hover:text-slate-900" to={nextLink.slug}>
                {nextLink.title} <span aria-hidden="true">→</span>
              </Link>
            </dd>
          </div>
        )}
      </dl>
      <div className="mt-12 flex flex-col items-center space-y-6 border-t border-slate-200 pt-10">
        <p className="text-slate-700 text-sm">
          This site is powered by{" "}
          <a className="underline hover:text-sky-500" href="https://headlesshost.com" target="_blank">
            Headlesshost
          </a>
        </p>
      </div>
    </>
  );
};

export default PageFoot;
