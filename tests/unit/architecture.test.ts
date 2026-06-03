import * as fs from 'node:fs';
import * as path from 'node:path';

const SRC_ROOT = path.join(__dirname, '../../src');
const LEGACY_IMPORT_PATTERN =
  /(?:^|\/)(?:application|core|infrastructure|presentation)(?:\/|$)|domain\/entities/;

const FEATURES = ['auth', 'home', 'classes', 'settings', 'orgs'] as const;

function listSourceFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...listSourceFiles(fullPath));
      continue;
    }

    if (/\.(ts|tsx)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

function relativeImportPaths(source: string): string[] {
  const imports: string[] = [];
  const importPattern = /from\s+['"]([^'"]+)['"]/g;

  let match = importPattern.exec(source);

  while (match) {
    imports.push(match[1]);
    match = importPattern.exec(source);
  }

  return imports;
}

describe('modlet architecture boundaries', () => {
  const sourceFiles = listSourceFiles(SRC_ROOT);

  it('does not reference removed layer folders', () => {
    const offenders = sourceFiles.flatMap((filePath) => {
      const relativePath = path.relative(SRC_ROOT, filePath).replace(/\\/g, '/');
      const content = fs.readFileSync(filePath, 'utf8');
      const imports = relativeImportPaths(content);

      return imports
        .filter((importPath) => LEGACY_IMPORT_PATTERN.test(importPath))
        .map((importPath) => `${relativePath} -> ${importPath}`);
    });

    expect(offenders).toEqual([]);
  });

  it('keeps feature-to-feature imports on public feature entrypoints', () => {
    const offenders = sourceFiles.flatMap((filePath) => {
      const relativePath = path.relative(SRC_ROOT, filePath).replace(/\\/g, '/');
      const featureMatch = /^features\/([^/]+)\//.exec(relativePath);

      if (!featureMatch) {
        return [];
      }

      const owningFeature = featureMatch[1];
      const content = fs.readFileSync(filePath, 'utf8');

      return relativeImportPaths(content).flatMap((importPath) => {
        const crossFeatureMatch = /^#features\/([^/]+)(?:\/(.+))?$/.exec(
          importPath,
        );

        if (!crossFeatureMatch) {
          return [];
        }

        const targetFeature = crossFeatureMatch[1];
        const targetSubpath = crossFeatureMatch[2];

        if (targetFeature === owningFeature || !targetSubpath) {
          return [];
        }

        return [`${relativePath} -> ${importPath}`];
      });
    });

    expect(offenders).toEqual([]);
  });

  it('exposes each feature through an index entrypoint', () => {
    for (const feature of FEATURES) {
      const indexPath = path.join(SRC_ROOT, 'features', feature, 'index.ts');
      expect(fs.existsSync(indexPath)).toBe(true);
    }
  });

  it('exposes shared resources through #shared entrypoint', () => {
    expect(fs.existsSync(path.join(SRC_ROOT, 'shared', 'index.ts'))).toBe(true);
  });
});
