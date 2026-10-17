export interface Concept {
  id: number;
  slug: string;
  title: string;
  page: number;
  description: string;
  remember: string;
  category: string;
  categoryIndex: number;
  readingTime: number;
}

export interface Category {
  name: string;
  startId: number;
  endId: number;
}
