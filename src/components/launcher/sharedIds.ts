/*
 * Framer Motion matches these ids across the two screens to morph one element
 * into another, so both sides must agree on them.
 */

export const PROFILE_AVATAR_ID = "profile-avatar";
export const PROFILE_NAME_ID = "profile-name";

/** Pairs a shortcut tile with the first box of the app it opens. */
export const sharedShellId = (appId: string) => `app-shell-${appId}`;
