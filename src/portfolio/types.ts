export type Skill = {
  name: string;
  value: number;
  type: 'skill' | 'tool';
};

export type Badge = {
  _id: string;
  name: string;
  imageSrc: string;
  href: string;
};

export type Project = {
  _id: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  dateRange: string;
  images: string[];
  longDescription: string;
  tags: string[];
  category: string;
  thumbnailSrc: string;
  videoLink?: string;
};
