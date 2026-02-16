/**
 * Parses a URL query string into an object.
 * @param {string} query - The query string to parse.
 * @returns {Object} - An object containing the parsed key-value pairs.
 */
function parseQueryString(query) {
  if (!query) {
    return {};
  }

  // Remove leading '?' if present
  if (query.startsWith('?')) {
    query = query.substring(1);
  }

  const params = {};
  const pairs = query.split('&');

  for (const pair of pairs) {
    if (!pair) continue;

    const [rawKey, rawValue] = pair.split('=');

    // Replace '+' with space and decode URI components
    const key = decodeURIComponent(rawKey.replace(/\+/g, ' '));
    const value = rawValue !== undefined
      ? decodeURIComponent(rawValue.replace(/\+/g, ' '))
      : '';

    if (!key) continue;

    if (Object.prototype.hasOwnProperty.call(params, key)) {
      if (Array.isArray(params[key])) {
        params[key].push(value);
      } else {
        params[key] = [params[key], value];
      }
    } else {
      params[key] = value;
    }
  }

  return params;
}

module.exports = { parseQueryString };
