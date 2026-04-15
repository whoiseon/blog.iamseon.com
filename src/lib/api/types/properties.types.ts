// --- Select ---

export type Select = {
  id: string;
  color: string;
  name: string;
};

export interface SelectProperties {
  id: string;
  type: "select";
  select: Select;
}

export interface MultiSelectProperties {
  id: string;
  type: "multi_select";
  multi_select: Select[];
}

// --- Date ---

export interface DateProperties {
  id: string;
  type: "date";
  date: {
    end: null;
    start: string;
    time_zone: string;
  };
}

// --- Text ---

export interface RichTextProperties {
  id: string;
  type: "rich_text";
  rich_text: RichText[];
}

export type RichText = {
  annotations: {
    bold: boolean;
    code: boolean;
    color: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: string;
  };
  href: string | null;
  plain_text: string;
  text: {
    content: string;
    link: string | null;
  };
  type: "text";
};

export interface TitleProperties {
  id: string;
  type: "title";
  title: RichText[];
}

// --- ID ---

export interface UniqueIdProperties {
  id: string;
  type: "unique_id";
  unique_id: {
    prefix: string;
    number: number;
  };
}

// --- URL ---

export interface UrlProperties {
  id: string;
  type: "url";
  url: string;
}
