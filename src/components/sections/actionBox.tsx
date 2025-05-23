import { Link } from "react-router-dom";
import { NavigationLink, Section } from "../../lib/types";

interface ActionBoxSection extends Section {
  content: {
    link: NavigationLink;
    content: string; // specify the type of content
    title: string;
  };
}

interface ActionBoxProps {
  section: ActionBoxSection;
}

const ActionBox: React.FC<ActionBoxProps> = ({ section }) => {
  const { link, title, content } = section?.content || {};
  const linkLabel = link?.title;

  return (
    <div className="mb-14">
      <div className="md:col-span-2 relative rounded-xl p-8 shadow-xl shadow-slate-200 bg-sky-950 group overflow-hidden scroll-mt-20" id={section.id}>
        <div className="relative">
          <h2 className="font-display font-bold text-2xl text-white mt-2">{title}</h2>
          <p className="mt-3 text-base text-slate-100 leading-relaxed max-w-2xl whitespace-pre-wrap">{content}</p>
          {linkLabel && (
            <Link to={link.slug} target={link.target}>
              <div className="inline-block mt-6 rounded-md bg-sky-500 px-3.5 py-2 text-sm font-semibold font-display text-white group-hover:bg-sky-600">{linkLabel}</div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActionBox;
