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
        name: "RCA Document Library Setup 0.9.0.exe",
        label: "Windows installer, 64-bit",
        sha512:
          "ca50e4b4daef2b7a5341d128bf83a556677f0baec3c5e139bb50d68e0c6497411f9d6fca0860eaf2cdb20f9bf7557bdd857e7483d428c728578f2b07a57e820e",
        sizeBytes: 251418054,
      },
    ],
  },
];
