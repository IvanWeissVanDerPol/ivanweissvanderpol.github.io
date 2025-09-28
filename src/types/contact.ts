// Contact section type definitions
export interface ContactData {
  sectionId: string;
  title: string;
  subtitle?: string;
  layout?: LayoutConfig;
  email?: EmailConfig;
  phone?: PhoneConfig;
  location?: LocationConfig;
  availability?: AvailabilityConfig;
  form?: ContactForm;
  methods?: ContactMethod[];
  calendly?: CalendlyConfig;
}

export interface EmailConfig {
  address: string;
  label?: string;
  icon?: string;
  copyButton?: boolean;
}

export interface PhoneConfig {
  number: string;
  formatted?: string;
  label?: string;
  icon?: string;
  whatsapp?: boolean;
}

export interface LocationConfig {
  city?: string;
  state?: string;
  country?: string;
  timezone?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  icon?: string;
}

export interface AvailabilityConfig {
  status: 'available' | 'busy' | 'away';
  message?: string;
  hours?: BusinessHours;
  responseTime?: string;
}

export interface BusinessHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

export interface ContactForm {
  enabled?: boolean;
  endpoint?: string;
  fields?: FormField[];
  submitText?: string;
  successMessage?: string;
  errorMessage?: string;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox';
  required?: boolean;
  placeholder?: string;
  validation?: ValidationRule[];
  options?: SelectOption[];
}

export interface ValidationRule {
  type: 'required' | 'email' | 'phone' | 'minLength' | 'maxLength' | 'pattern';
  value?: any;
  message?: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface ContactMethod {
  type: 'email' | 'phone' | 'social' | 'form' | 'calendar';
  label: string;
  value: string;
  icon?: string;
  preferred?: boolean;
}

export interface CalendlyConfig {
  enabled?: boolean;
  url?: string;
  text?: string;
}

export interface LayoutConfig {
  wrapperClass?: string;
  containerClass?: string;
  gridClass?: string;
}