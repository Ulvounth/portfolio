import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import Button from "@/components/ui/Button";
import { site } from "@/data/site";

export default function CVDownload() {
  return (
    <Button href={site.cv} download variant="secondary" size="lg">
      <DocumentArrowDownIcon className="h-5 w-5" aria-hidden="true" />
      Download CV
    </Button>
  );
}
