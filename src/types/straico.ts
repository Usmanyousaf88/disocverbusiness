export interface StraicoUser {
  first_name: string;
  last_name: string;
  coins: number;
  plan: string;
}

export interface StraicoRagBase {
  _id: string;
  user_id: string;
  name: string;
  rag_url: string;
  original_filename: string;
  chunking_method: string;
  chunk_size: number;
  chunk_overlap: number;
  createdAt: string;
  updatedAt: string;
}

export interface StraicoResponse<T> {
  success: boolean;
  data: T;
}