import * as Clipboard from 'expo-clipboard';

export interface ClipboardAccess {
  readText(): Promise<string | null>;
  writeText(text: string): Promise<void>;
}

export class ExpoClipboardAccess implements ClipboardAccess {
  readText(): Promise<string | null> {
    return Clipboard.getStringAsync();
  }

  async writeText(text: string): Promise<void> {
    await Clipboard.setStringAsync(text);
  }
}
