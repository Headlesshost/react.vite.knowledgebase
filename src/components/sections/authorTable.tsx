import { Author, PagedResponse, Section } from "../../lib/types";

interface AuthorTableSection extends Section {
  title: string;
}

interface AuthorTableProps {
  section: AuthorTableSection;
  authors?: PagedResponse<Author>;
}

const AuthorTable: React.FC<AuthorTableProps> = ({ section, authors }) => {
  if (!section) return null;

  return (
    <div className="overflow-x-auto mb-14">
      <div className="inline-block min-w-full align-middle scroll-mt-20" id={section.id}>
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Name
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {authors?.result.map((i) => (
              <tr key={i.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                  <div className="flex space-x-4 items-center">
                    <div>{i?.content?.image?.url ? <img className="rounded-full" src={i.content.image.url} alt={i.content.name || "Author"} width={40} height={40} /> : <img className="rounded-full" src="/user.png" alt="Author" width={40} height={40} />}</div>
                    <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{i?.content?.name}</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuthorTable;
