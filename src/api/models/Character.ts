export interface Character {
  id: string;
  name: string;
  description?: string;
  birth_at?: Date;
  created_at: Date;
  updated_at: Date;
  is_draft: boolean;
}
