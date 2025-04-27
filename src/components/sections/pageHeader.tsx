import * as utils from "../../lib/common";
import React from "react";
import { Author, PagedResponse, Section, Site } from "../../lib/types";

interface PageHeaderSectionContent {
  introduction: string | undefined;
  authorSelect: string;
  parent: string | undefined;
  created: string | undefined;
  title: string;
}

interface PageHeaderSection extends Section {
  content: PageHeaderSectionContent;
}

interface PageHeaderProps {
  section: PageHeaderSection;
  authors?: PagedResponse<Author>;
  site?: Site;
  pageIdentifier: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ section, authors, site, pageIdentifier }) => {
  const { introduction, authorSelect, title, created } = section?.content || {};
  const author = authors?.result?.find((a) => a.cid === authorSelect);
  const defaultGroup = site?.content?.globals?.navigation?.[0]?.group ?? "";
  const selected = site?.content?.globals?.navigation?.find((item) => item.links?.find((child) => child.slug === pageIdentifier));
  const group = selected?.group ?? defaultGroup;

  return (
    <header className="mb-8">
      <p className="font-display text-sm font-semibold text-sky-500 mb-1 scroll-mt-20" id={section.id}>
        {group}
      </p>
      <h1 className="font-display text-3xl tracking-tight text-slate-900 font-semibold mt-3">{title}</h1>
      <div className="flex space-x-4 mt-4">
        <div className="flex-none">{author?.content?.image?.url ? <img className="rounded-full" src={author.content.image.url} alt={author.content.name || "Author"} width={40} height={40} /> : <img className="rounded-full" src="/user.png" alt="Author" width={40} height={40} />}</div>
        <div className="flex-1">
          <p className="font-display font-semibold text-sm text-slate-900">{author?.content?.name}</p>
          <p className="text-sm text-slate-500">Created: {utils.dateToYMD(created)}</p>
        </div>
      </div>
      <p className="text-md text-slate-600 mt-9 whitespace-pre-wrap">{introduction}</p>
    </header>
  );
};

export default PageHeader;
