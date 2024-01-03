export interface Document {
  id: string;
  title: string;
  content?: string;
  icon?: string;
  parentDocumentId?: string;
  coverImage?: string;
  isArchived: boolean;
  isPublished: boolean;
}
