// Education type definitions
export interface EducationData {
  sectionId?: string;
  title?: string;
  subtitle?: string;
  layout?: LayoutConfig;
  degrees: Degree[];
  certifications?: Certification[];
  courses?: Course[];
}

export interface Degree {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  location?: string;
  gpa?: string;
  honors?: string[];
  coursework?: string[];
  thesis?: ThesisInfo;
  logo?: string;
  url?: string;
}

export interface ThesisInfo {
  title: string;
  advisor?: string;
  abstract?: string;
  url?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
  skills?: string[];
  logo?: string;
}

export interface Course {
  name: string;
  platform?: string;
  instructor?: string;
  completionDate?: string;
  certificateUrl?: string;
  skills?: string[];
  duration?: string;
}

export interface LayoutConfig {
  wrapperClass?: string;
  containerClass?: string;
  gridClass?: string;
}