import { v4 as uuidv4 } from 'uuid';

import { authAxiosInstance } from './authAxiosInstance';

/* Copy pasted from pirates story */

let BEARER_TOKEN;

/**
 * gets the user_uid from local storage.
 * @param {string} uid - the uid assigned to the user.
 */
const set_user_id_in_browser_storage = (uid) => {
  var user = { 'uid': uid, }
  try {
    localStorage.setItem('user_uid', JSON.stringify(user));
  } catch (e) {
    console.warn('Cannot set uid to local storage', e);
  }
}

/**
 * gets the user_uid from local storage.
 * @returns {string}
 */
const retrieve_user_id_from_browser_storage = () => {
  let uid;

  if (!localStorage.getItem('user_uid')) {
    return uid
  }

  try {
    let user = localStorage.getItem('user_uid');
    uid = JSON.parse(user).uid
  } catch (e) {
    console.warn('Cannot get uid from local storage', e);
  }

  return uid;
}

/**
 * Clears the user_uid from local storage resetting the experience.
 */
export const clear_user_id_from_browser_storage = () => {
  try {
    localStorage.removeItem('user_uid');
    location.reload();
  } catch (e) {
    console.warn('Cannot remove uid from local storage', e);
  }
}

/**
 * Gets the bearer token from  api using a unique user id.
 * Returning the gathered token.
 * @returns {string}
 */
export const getBearerToken = async () => {
  if (!BEARER_TOKEN) {
    const cached_uuid = retrieve_user_id_from_browser_storage();

    // Set uid of the user, use a random uid if one does not exist.
    const random_uid = uuidv4();
    const uid = cached_uuid || random_uid;
    // Post to get an anonymous token.
    const result = await authAxiosInstance.post('/api/v1/auth/anonymous-token', {
      user_id: uid,
    });

    // Store the token in the local var
    BEARER_TOKEN = result.data;

    // Store the users uid in browser storage.
    set_user_id_in_browser_storage(uid);
  }
  return BEARER_TOKEN.id_token;
};
