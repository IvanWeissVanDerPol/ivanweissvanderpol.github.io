// Central type definitions for the entire application
// Re-export specific types to avoid conflicts
export type {
  SiteConfig,
  ThemeConfig,
  Theme,
  ThemeColors,
  ThemeId,
  LayoutConfig
} from './config';

export type {
  HeroData,
  AboutData,
  Value,
  Stat,
  CallToAction,
  AnimationConfig,
  ImageAsset
} from './content';

export * from './components';

export type {
  ThemeSystem,
  ThemeDefinition,
  TypographyConfig,
  SpacingConfig,
  BorderConfig,
  ShadowConfig,
  CustomTheme
} from './theme';

export * from './navigation';

export type {
  SkillsData,
  Skillset,
  SkillCategory,
  Skill,
  Certification
} from './skills';

export type {
  PortfolioData,
  Project,
  ProjectImage,
  ProjectResult,
  TeamMember,
  ProjectCategory,
  FilterConfig
} from './portfolio';

export type {
  ContactData,
  EmailConfig,
  PhoneConfig,
  LocationConfig,
  AvailabilityConfig,
  BusinessHours,
  ContactForm,
  FormField,
  ValidationRule,
  SelectOption,
  ContactMethod,
  CalendlyConfig
} from './contact';

export * from './social';
export * from './personal';

export type {
  WorkData,
  WorkExperience,
  Achievement,
  TeamInfo,
  Reference,
  TimelineConfig
} from './work';

export type {
  EducationData,
  Degree,
  ThesisInfo,
  Course
} from './education';