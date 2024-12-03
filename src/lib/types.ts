import { ReactNode } from "react";

export interface Section {
  id: string;
  type: string;
  title: string;
  code?: string;
  content: ReactNode;
  heading?: Heading;
  _meta?: Meta;
}

export interface Meta {
  name: string;
  description: string;
  tags: string[];
}

export interface Tag {
  value: string;
  label: string;
}

export interface PageContent {
  tags: Tag[];
}

export interface GuidePage extends Page {
  name?: string;
  notes?: string;
}

export interface Page {
  id: string;
  identifier: string;
  title: string;
  sections: Section[];
  content: PageContent;
}

export interface SiteContent {
  pages: Page[];
  globals: Globals;
  header: Header;
}

export interface SiteMeta {
  id: string;
  name: string;
}

export interface Site extends SiteMeta {
  content: SiteContent;
  isHead: boolean;
}

export interface Guide {
  content: GuidePage;
}

export interface SiteMetaStaging extends SiteMeta {
  isHead: boolean;
}

export interface SiteMetaProduction extends SiteMeta {
  isProduction: boolean;
}

export interface List {
  stagingSites: SiteMetaStaging[];
  publishedSites: SiteMetaProduction[];
}

export interface SectionProps {
  section: Section;
  instanceId: string | undefined;
}

export interface ImageDetails {
  url: string;
  width: number;
  height: number;
  id: string;
}

export interface NavigationLink {
  title: string;
  slug: string;
  target: string;
}

export interface LinkGroup {
  group: string;
  links: NavigationLink[];
}

export interface Globals {
  navigation?: LinkGroup[];
  defaultPage?: string;
}

export interface Heading {
  title: string;
  headingType: "h1" | "h2" | "h3" | "h4" | "h5" | "default" | undefined;
}

export interface Header {
  smallLogo: ImageDetails;
  largeLogo: ImageDetails;
  links: NavigationLink[];
}

export interface PagedResponse<T> {
  result: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface Author {
  id: string;
  cid: string;
  content: AuthorContent;
}

export interface AuthorContent {
  name: string;
  email: string;
  role: string;
  phone: string;
  image: ImageDetails;
}

export interface SearchResult {
  sectionId: string;
  pageId: string;
  pageName: string;
  propertyTrimmed: string;
  pageContent: PageContent;
}
