import { Section } from "../../lib/types";
import React from "react";

interface VideoSectionContent {
  title: string;
  link: string;
}

interface VideoSection extends Section {
  content: VideoSectionContent;
}

interface VideoProps {
  section: VideoSection;
}

const Video: React.FC<VideoProps> = ({ section }) => {
  const { title, link } = section?.content || {};
  return (
    <div id={section.id} className="py-2 mb-10 scroll-mt-20">
      <div id={title} className="aspect-w-16 aspect-h-9" style={{ height: "400px" }}>
        <iframe style={{ width: "100%", height: "100%" }} src={link} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>
    </div>
  );
};

export default Video;
