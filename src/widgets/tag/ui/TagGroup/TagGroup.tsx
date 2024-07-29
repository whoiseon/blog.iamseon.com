import Tag from '@/src/shared/ui/data-display/Tag';

interface TagGroupProps {
  tags: string[];
  className?: string;
  isHighlight?: boolean;
}

function TagGroup({ tags, className, isHighlight = true }: TagGroupProps) {
  return (
    <div className={`flex flex-wrap gap-x-1.5 gap-y-2 ${className}`}>
      {tags.map((tag: string) => (
        <Tag key={tag} name={tag} isHighlight={isHighlight} />
      ))}
    </div>
  );
}

export default TagGroup;
