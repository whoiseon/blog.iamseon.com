import Tag from '@/src/shared/ui/data-display/Tag';

interface TagGroupProps {
  tags: string[];
}

function TagGroup({ tags }: TagGroupProps) {
  return (
    <div className="flex flex-wrap gap-x-1.5 gap-y-2">
      {tags.map((tag: string) => (
        <Tag key={tag} name={tag} />
      ))}
    </div>
  );
}

export default TagGroup;
