import * as Clipboard from 'expo-clipboard';
import { ExpoClipboardAccess } from '#shared';

jest.mock('expo-clipboard', () => ({
  getStringAsync: jest.fn(),
  setStringAsync: jest.fn(),
}));

describe('ExpoClipboardAccess', () => {
  const clipboard = new ExpoClipboardAccess();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('reads text from the device clipboard', async () => {
    jest.mocked(Clipboard.getStringAsync).mockResolvedValue('MATH8DEMO');

    await expect(clipboard.readText()).resolves.toBe('MATH8DEMO');
    expect(Clipboard.getStringAsync).toHaveBeenCalledTimes(1);
  });

  it('writes text to the device clipboard', async () => {
    await clipboard.writeText('ABC123');

    expect(Clipboard.setStringAsync).toHaveBeenCalledWith('ABC123');
  });
});
