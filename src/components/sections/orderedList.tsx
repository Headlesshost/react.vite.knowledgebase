import { Section } from "../../lib/types";

interface OrderedListContent {
  items: string[];
}

interface OrderedList extends Section {
  content: OrderedListContent;
}

interface OrderedListProps {
  section: OrderedList;
}

const OrderedList: React.FC<OrderedListProps> = ({ section }) => {
  if (!section) return null;
  const { items } = section?.content || {};

  return (
    <ol className="custom-steps mb-14 scroll-mt-20" id={section.id}>
      {items.map((i, x) => (
        <li className="text-md text-slate-600" key={x}>
          {i}
        </li>
      ))}
    </ol>
  );
};

export default OrderedList;
