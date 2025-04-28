import { NavigationLink, Section } from "../../lib/types";
import { Link } from "react-router-dom";

interface NavLinkSection extends Section {
  content: {
    link: NavigationLink;
  };
}

interface NavLinkProps {
  section: NavLinkSection;
}

const NavLink: React.FC<NavLinkProps> = ({ section }) => {
  if (!section) return null;
  const { link } = section?.content || {};
  const { title, slug, target } = link;
  return (
    <div className="mb-6">
      <Link to={slug} className="font-display hover:underline decoration-1 text-sky-500 scroll-mt-20" target={target} id={section.id}>
        {title}
      </Link>
    </div>
  );
};

export default NavLink;
