import { Section } from "../../lib/types";
import { CopyBlock, dracula } from "react-code-blocks";

interface CodeBlockSection extends Section {
  code: string;
  language: string;
  showLineNumbers: boolean;
}

interface CodeBlockProps {
  section: CodeBlockSection;
}

const CodeDisplay: React.FC<CodeBlockProps> = ({ section }) => {
  return (
    <div className="mb-14">
      <div id={section.id} className="scroll-mt-20">
        <CopyBlock text={section?.code} language={section?.language} showLineNumbers={section?.showLineNumbers} theme={dracula} codeBlock={true} />
      </div>
    </div>
  );
};

export default CodeDisplay;
