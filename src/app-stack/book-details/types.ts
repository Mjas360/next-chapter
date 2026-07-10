import { View } from "react-native";

export interface GutendexBook {
  id: number;
  title: string;
  authors: {
    name: string;
  }[];
  summaries: string[];
  subjects: string[];
  bookshelves: string[];
  languages: string[];
  download_count: number;
  copyright: boolean;
  media_type: string;
  formats: Record<string, string>;
}

export interface BookComponentProps {
  book: GutendexBook;
  ref?: React.RefObject<View | any>;
  onAddToCart?: () => void;
}