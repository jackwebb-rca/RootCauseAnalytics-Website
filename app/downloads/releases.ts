/**
 * The one list the downloads page renders from.
 *
 * A release entry is added by the release process (F6 in the app
 * repo's release plan): build the installer, record its SHA-512 and
 * size, publish the file to the releases repo under a tag, then add
 * the entry here. The page shows an honest "being prepared" state
 * while this list is empty - it must never show a link to a file that
 * does not exist yet.
 *
 * File links go through this domain's own redirects
 * (/downloads/release/<tag>/<file> in next.config.mjs), not straight
 * to GitHub, so the printed URL stays on rootcauseanalytics.com.au
 * and the file host can change without reprinting anything.
 */

export interface ReleaseFile {
  /** Exact file name as published under the release tag. */
  name: string;
  /** What the file is, in plain words ("Windows installer, 64-bit"). */
  label: string;
  /** SHA-512 of the published file, lower-case hex, 128 characters. */
  sha512: string;
  /** Size in bytes, as published. */
  sizeBytes: number;
}

export interface Release {
  /** App version, for example "0.9.0". */
  version: string;
  /** Release tag the files were published under, for example "v0.9.0". */
  tag: string;
  /** ISO date of the release, for example "2026-09-01". */
  date: string;
  files: ReleaseFile[];
}

export const releases: Release[] = [
  {
    version: "0.9.0",
    tag: "v0.9.0",
    date: "2026-08-27",
    files: [
      {
        name: "RCA-Document-Library-Setup-0.9.0.exe",
        label: "Windows installer, 64-bit",
        sha512:
          "0707eeba41d62b2acb8773ffe6a30016aebab200bc8e1b5103812a73131da2948be847273b9df4256331a360f5772ec695120c04952826a43246ec862a511013",
        sizeBytes: 251360049,
      },
    ],
  },
];
