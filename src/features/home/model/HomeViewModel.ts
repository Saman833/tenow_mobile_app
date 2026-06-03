import { TenowConfig } from '#shared';
import { HomeActionItem } from './HomeActionItem';

export class HomeViewModel {
  constructor(private readonly config: TenowConfig) {}

  get appName(): string {
    return this.config.appName;
  }

  get welcomeHeadline(): string {
    return 'Welcome back';
  }

  get workspaceSubtitle(): string {
    return "Here's what's happening in your workspace.";
  }

  get getStartedTitle(): string {
    return 'Get started';
  }

  get getStartedDescription(): string {
    return 'Create an organization if you manage classes across a school or team.';
  }

  get actions(): readonly HomeActionItem[] {
    return [
      {
        id: 'create-organization',
        title: 'Create organization',
        description: 'Manage multiple classes under one school or team.',
      },
    ];
  }
}
