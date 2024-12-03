import React, { useState, useEffect } from "react";
import { Site } from "../lib/types";
import { Link, useLocation } from "react-router-dom";

interface LeftNavProps {
  site?: Site;
  usingDefaultPage?: string | boolean;
}

const LeftNav: React.FC<LeftNavProps> = ({ site, usingDefaultPage }) => {
  const [selected, setSelected] = useState<string>();
  const { pathname } = useLocation();

  useEffect(() => {
    const defaultGroup = site?.content?.globals?.navigation?.[0]?.group ?? "";
    const selected = site?.content?.globals?.navigation?.find((item) => item.links?.find((child) => pathname.endsWith(child.slug)));
    setSelected(selected?.group ?? defaultGroup);
  }, [site]);

  const selectedCss = "block w-full pl-3.5 before:pointer-events-none before:absolute before:left-0.5 before:top-1/2 before:h-0.5 before:w-1.5 before:-translate-y-1/2 text-sky-500 before:bg-sky-500";
  const blankCss = "block w-full pl-3.5 before:pointer-events-none before:absolute before:left-0.5 before:top-1/2 before:h-0.5 before:w-1.5 before:-translate-y-1/2 text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-900 hover:before:block";

  return (
    <div className="hidden lg:relative lg:block lg:flex-none">
      {site?.content?.globals?.navigation && (
        <div className="sticky -ml-0.5 w-64 overflow-x-hidden pl-0.5">
          <nav className="text-sm">
            <ul className="space-y-4">
              {site?.content?.globals?.navigation.map((item) => {
                return (
                  <li key={item.group}>
                    <div className="flex items-center cursor-pointer" onClick={() => setSelected(selected === item.group ? "" : item.group)}>
                      <h2 className="font-display font-semibold text-slate-900 me-1">{item.group}</h2>
                      {selected !== item.group ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </div>
                    {selected === item.group && (
                      <ul className="mt-4 space-y-4 border-slate-200 mb-6">
                        {item.links?.map((child, i) => (
                          <li className="relative" key={i}>
                            <Link className={pathname.endsWith(child.slug ?? "") || usingDefaultPage === child.slug ? selectedCss : blankCss} to={`/${child.slug}`}>
                              {child.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default LeftNav;
