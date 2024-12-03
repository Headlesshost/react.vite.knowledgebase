import { useState } from "react";
import Search from "./search";
import { Site } from "../lib/types";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { isTokenExpired } from "../lib/common";

interface HeaderProps {
  site: Site;
  instanceId: string | null | undefined;
}

export default function SiteHeader({ site, instanceId }: HeaderProps) {
  const { globals, header } = site.content;
  if (!header) return <div>Need to configure header in Headlesshost</div>;
  const [showNav, setShowNav] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { pathname } = location;
  const { navigation: links = [] } = globals;
  const { smallLogo, largeLogo, links: headerLinks = [] } = header;
  const exToken = isTokenExpired();
  const [expiredToken, setExpiredToken] = useState(exToken);

  const selectedCss = "block w-full pl-3.5 before:pointer-events-none before:absolute before:left-0.5 before:top-1/2 before:h-0.5 before:w-1.5 before:-translate-y-1/2 text-sky-500 before:bg-sky-500";
  const blankCss = "block w-full pl-3.5 before:pointer-events-none before:absolute before:left-0.5 before:top-1/2 before:h-0.5 before:w-1.5 before:-translate-y-1/2 text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-900 hover:before:block";
  const logout = () => {
    localStorage.removeItem("token");
    setExpiredToken(true);
    navigate(pathname);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-md shadow-slate-900/5 transition duration-500">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center space-x-8 justify-between px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <button type="button" className="relative lg:hidden mr-3" aria-label="Open navigation" onClick={() => setShowNav(true)}>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" className="h-6 w-6 stroke-slate-500">
                <path d="M4 7h16M4 12h16M4 17h16"></path>
              </svg>
            </button>
            <Link to="/" className="flex items-center space-x-2">
              {largeLogo && largeLogo.url ? <img className="h-7 hidden sm:block" src={largeLogo.url} alt={"Knowledgebase"} width={largeLogo.width} height={largeLogo.height} /> : <img className="h-7 hidden sm:block" src="/logo.png" alt="Knowledgebase" width={257} height={35} />}
              {smallLogo && smallLogo.url ? <img className="h-7 sm:hidden" src={smallLogo.url} alt={"Knowledgebase"} width={smallLogo.width} height={smallLogo.height} /> : <img className="h-7 sm:hidden" src="/logo-sm.png" alt="Knowledgebase" width={35} height={35} />}
            </Link>
            <nav className="hidden lg:flex lg:space-x-8 lg:ml-12 xl:ml-16">
              {headerLinks.map((link) =>
                link.slug?.startsWith("http") ? (
                  <a key={link.title} href={link.slug}>
                    {link.title}
                  </a>
                ) : (
                  <Link key={link.title} to={link.slug ?? ""} className="text-sm hover:text-sky-500 py-2.5 text-slate-900 font-display font-semibold">
                    {link.title}
                  </Link>
                )
              )}
            </nav>
          </div>
          <div className="flex items-center flex-1 justify-end">
            <Search instanceId={instanceId} />
            {import.meta.env.VITE_SIGNIN === "true" && (
              <>
                {expiredToken ? (
                  <Link to="/login">
                    <FontAwesomeIcon icon={faSignInAlt} className="ms-4 text-md hover:text-sky-500" />
                  </Link>
                ) : (
                  <div onClick={() => logout()}>
                    <FontAwesomeIcon icon={faSignOutAlt} className="ms-4 text-md hover:text-sky-500" />
                  </div>
                )}

                {expiredToken ? (
                  <Link to="/login" className="whitespace-nowrap text-sm hover:text-sky-500 py-2.5 text-slate-900 font-display font-semibold ms-2 hidden lg:block">
                    <span>Sign In</span>
                  </Link>
                ) : (
                  <div onClick={() => logout()} className="whitespace-nowrap cursor-pointer text-sm hover:text-sky-500 py-2.5 text-slate-900 font-display font-semibold ms-2 hidden lg:block">
                    <span>Sign Out</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </header>

      {showNav && (
        <div className="fixed inset-0 overflow-y-auto overflow-x-hidden bg-slate-900/20 backdrop-blur z-50 transform transition">
          <div className="min-h-full w-full bg-white max-w-xs pt-7 pb-16 px-6 xl:pr-16">
            <div className="flex justify-end">
              <button type="button" className="inline-flex items-center justify-center text-slate-500 hover:text-sky-500 focus:outline-none" aria-expanded="false" onClick={() => setShowNav(false)}>
                <span className="sr-only">Toggle main menu</span>
                <svg className="hh-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentcolor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <nav>
              <ul className="space-y-9">
                {links.map((item) => (
                  <li key={item.group}>
                    <h2 className="font-display font-semibold text-slate-900">{item.group}</h2>
                    <ul className="mt-3 space-y-3">
                      {item.links?.map((child) => (
                        <li className="relative" key={child.slug}>
                          <Link className={pathname.endsWith(child.slug ?? "") ? selectedCss : blankCss} onClick={() => setShowNav(false)} to={`${child.slug}`}>
                            {child.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
