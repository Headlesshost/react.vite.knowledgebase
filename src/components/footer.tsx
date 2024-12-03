export default function SiteFooter() {
  return (
    <footer>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 lg:px-8 lg:pt-28">
        <div className="mt-16 border-t border-slate-200 pt-8 md:flex md:items-center md:justify-between">
          <p className="mt-8 text-xs leading-5 text-slate-500 md:order-1 md:mt-0">2024 Headlesshost. Ver:{import.meta.env.VITE_VER} </p>
        </div>
      </div>
    </footer>
  );
}
