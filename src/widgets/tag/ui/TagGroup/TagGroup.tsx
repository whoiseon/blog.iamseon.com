import Tag from '@/src/shared/ui/data-display/Tag';

interface TagGroupProps {
  tags: string[];
  className?: string;
  isHighlight?: boolean;
  tagSize?: 'md' | 'lg';
}

function TagGroup({
  tags,
  className,
  isHighlight = true,
  tagSize = 'md',
}: TagGroupProps) {
  return (
    <div className={`flex flex-wrap gap-x-1.5 gap-y-2 ${className}`}>
      {tags.map((tag: string) => (
        <Tag key={tag} name={tag} isHighlight={isHighlight} size={tagSize} />
      ))}
    </div>
  );
}

export default TagGroup;
