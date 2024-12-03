import { Section, ImageDetails } from "../../lib/types";

interface CmsImageSection extends Section {
  image: ImageDetails;
  title: string;
}

interface CmsImageProps {
  section: CmsImageSection;
}

const CmsImage: React.FC<CmsImageProps> = ({ section }) => {
  const { title = "Knowledgebase", image = { url: "", alt: "", width: 0, height: 0 } } = section;
  return (
    <div className="mb-14">
      <img src={image.url} alt={title} width={image.width} height={image.height} className="rounded-md border scroll-mt-20" id={section.id} />
    </div>
  );
};

export default CmsImage;
