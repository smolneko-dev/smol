import { type Image } from "./Image";

export interface Figure {
  id: string;
  character_id?: string;
  name: string;
  description?: string;
  type?: string;
  version?: string;
  size?: string;
  height?: number;
  materials?: string[];
  release_date?: Date;
  manufacturer?: string;
  links?: Link[];
  price?: string[];
  created_at: Date;
  updated_at: Date;
  is_nsfw: boolean;
  is_draft: boolean;
  preview?: Image;
}

export interface Link {
  type?: string;
  link?: string;
  description?: string;
}
