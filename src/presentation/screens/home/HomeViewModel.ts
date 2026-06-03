import { TenowConfig } from '../../../core/config/TenowConfig';

export class HomeViewModel {
  constructor(private readonly config: TenowConfig) {}

  get appName(): string {
    return this.config.appName;
  }

  get tagline(): string {
    return this.config.tagline;
  }

  get welcomeTitle(): string {
    return `Welcome to ${this.config.appName}`;
  }

  get featureHighlights(): string[] {
    return [
      'Class TA — guided help grounded in your syllabus',
      'Teacher Assistant — rubric-aligned feedback drafts',
      'Process trail — transparent AI use on every submission',
    ];
  }
}
