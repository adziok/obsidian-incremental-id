export class Version {
  constructor(
    private readonly major: number,
    private readonly minor: number,
    private readonly patch: number,
  ) {}

  static parse(stringVersion: string): Version {
    const [major, minor, patch] = stringVersion.split('.').map((v) => Number(v));
    return new Version(major, minor, patch);
  }

  isBefore(version: Version): boolean {
    return (
      this.major < version.major ||
      (this.major === version.major && this.minor < version.minor) ||
      (this.major === version.major && this.minor === version.minor && this.patch < version.patch)
    );
  }

  isBeforeOrEqual(version: Version): boolean {
    return this.isBefore(version) || this.isEqual(version);
  }

  isEqual(version: Version): boolean {
    return this.major === version.major && this.minor === version.minor && this.patch === version.patch;
  }
}
