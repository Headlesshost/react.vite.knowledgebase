import { ImageDetails, Section, Heading } from "../../lib/types";
import StandardHeading from "./standardHeading";

interface Contact {
  image: ImageDetails;
  name: string;
  role: string;
  email: string;
  phone: string;
}

interface ContactListSection extends Section {
  contacts: Contact[];
  heading: Heading;
}

interface ContactListProps {
  section: ContactListSection;
}

const ContactList: React.FC<ContactListProps> = ({ section }) => {
  if (!section) return null;

  return (
    <div className="overflow-x-auto mb-14">
      <StandardHeading section={section} />
      <div className="inline-block min-w-full align-middle scroll-mt-20" id={section.id}>
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Name
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Role
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Email
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Phone
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {section?.contacts.map((i) => (
              <tr key={i.name}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                  <div className="flex space-x-4 items-center">
                    <div>{i?.image?.url ? <img className="rounded-full" src={i.image.url} alt={i.name || "Contact"} width={40} height={40} /> : <img className="rounded-full" src="/user.png" alt="Author" width={40} height={40} />}</div>
                    <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{i?.name}</div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{i.role}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{i.email}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{i.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactList;
