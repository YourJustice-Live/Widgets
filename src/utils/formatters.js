import { truncate } from 'lodash';

/**
 * Format profile first and last names to string with truncation.
 *
 * @param {Profile} profile Profile.
 * @param {number} length Max lenght of result string.
 * @returns Formatted string with first and last names or "Anonymous".
 */
export function formatProfileFirstLastName(profile, length = 36) {
  let profileFirstLastName = 'Anonymous';
  if (profile?.uriFirstName || profile?.uriLastName) {
    profileFirstLastName =
      (profile.uriFirstName || '') +
      ' ' +
      (profile.uriLastName || '');
  }
  return truncate(profileFirstLastName, { length: length });
}
