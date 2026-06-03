import { TenowConfig } from '../../../core/config/TenowConfig';
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
    return "You're not in any classes yet. Pick the option that fits how you want to use TeNow.";
  }

  get actions(): readonly HomeActionItem[] {
    return [
      {
        id: 'join-class',
        title: 'Join a class',
        description: 'Have a code from your teacher? Join your class here.',
      },
      {
        id: 'create-class',
        title: 'Create a class',
        description: 'Set up a class and invite students.',
      },
      {
        id: 'create-organization',
        title: 'Create organization',
        description: 'Manage multiple classes under one school or team.',
      },
    ];
  }
}
