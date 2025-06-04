import Body from "./components/body";
import Header from "./components/header";
import { Routes, Route, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { resolveInstance } from "./lib/common";
import { useContentSite, useSiteList, useAuthors, useHotReload } from "./lib/_hooks";
import { Site } from "./lib/types";
import Guide from "./components/guide";
import SiteFooter from "./components/footer";
import Login from "./components/login";
import Loading from "./components/loading";
import Error from "./components/error";
import { useState } from "react";
import { isTokenExpired } from "./lib/common";

function App() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [instanceId] = useState(query.get("instance"));
  const [segment] = useState(query.get("segment"));
  const [locale] = useState(query.get("locale") || navigator.language);
  const { data: siteList } = useSiteList();
  const instanceIdResolved = resolveInstance(siteList, instanceId);
  const exToken = isTokenExpired();
  const { data: siteData, error: siteError, isLoading: siteLoading } = useContentSite(instanceIdResolved, exToken, locale, segment);
  const { data: authorData } = useAuthors(instanceIdResolved);

  useHotReload(instanceIdResolved);

  if (siteLoading) return <Loading message="Loading..." />;
  if (siteError) {
    if (siteError.message === "Unauthorized") {
      return <Login />;
    }
    return <Error message={siteError.message} />;
  }
  if (!siteData) return <Loading message="Loading data..." />;
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout site={siteData} instanceId={instanceIdResolved} locale={locale} segment={segment} />}>
        <Route index element={<Body site={siteData} authors={authorData} />} />
        <Route path="/guide" element={<Guide instanceId={instanceIdResolved} authors={authorData} site={siteData} pageIdentifier="Guide" />} />
        <Route path="*" element={<Body site={siteData} authors={authorData} />} />
      </Route>
    </Routes>
  );
}

export default App;

function Layout({ site, instanceId, locale, segment }: { site: Site; instanceId?: string | null | undefined; locale: string | null | undefined; segment: string | null | undefined }) {
  return (
    <>
      <Header site={site} instanceId={instanceId} locale={locale} segment={segment} />
      <Outlet />
      <SiteFooter />
    </>
  );
}
