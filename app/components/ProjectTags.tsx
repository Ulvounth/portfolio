export default function ProjectTags({ tags }: { tags: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
      {tags.map((tag) => (
        <li key={tag} className="px-2 py-1 text-sm border text-white rounded">
          {tag}
        </li>
      ))}
    </ul>
  );
}
