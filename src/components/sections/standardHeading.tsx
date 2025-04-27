import React from "react";
import { Heading, Section } from "../../lib/types";

interface StandardHeadingSectionContent {
  heading: Heading;
}

interface StandardHeadingSection extends Section {
  content: StandardHeadingSectionContent;
}

interface StandardHeadingProps {
  section: StandardHeadingSection;
}

const StandardHeading: React.FC<StandardHeadingProps> = ({ section }) => {
  const { heading } = section?.content || {};
  const { headingType, title } = heading;
  const className = `text-${headingType === "h1" ? "3xl" : headingType === "h2" ? "2xl" : headingType === "h3" ? "xl" : headingType === "h4" ? "lg" : "base"}`;

  return (
    <div className={`${className} font-bold mb-6 scroll-mt-20`} id={section.id}>
      {title}
    </div>
  );
};

export default StandardHeading;
