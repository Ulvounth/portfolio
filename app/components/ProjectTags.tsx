import Tag from "@/components/ui/Tag";

export default function ProjectTags({ tags }: { tags: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
      {tags.map((tag) => (
        <li key={tag}>
          <Tag>{tag}</Tag>
        </li>
      ))}
    </ul>
  );
}
