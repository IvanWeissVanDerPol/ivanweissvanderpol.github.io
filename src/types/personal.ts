// Personal information type definitions
export interface PersonalData {
  firstName: string;
  lastName: string;
  fullName?: string;
  nickname?: string;
  pronouns?: string;
  title?: string;
  bio?: string;
  avatar?: ImageAsset;
  birthdate?: string;
  nationality?: string[];
  languages?: Language[];
  hobbies?: string[];
  personalWebsite?: string;
  blog?: string;
}

export interface Language {
  name: string;
  code: string;
  proficiency: 'Native' | 'Fluent' | 'Professional' | 'Intermediate' | 'Basic';
  certification?: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  placeholder?: string;
}