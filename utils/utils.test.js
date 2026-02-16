const { test, describe } = require('node:test');
const assert = require('node:assert');
const { parseQueryString } = require('./utils.js');

describe('parseQueryString', () => {
  test('parses basic key-value pairs', () => {
    const result = parseQueryString('foo=bar&baz=qux');
    assert.deepStrictEqual(result, { foo: 'bar', baz: 'qux' });
  });

  test('handles empty query string', () => {
    assert.deepStrictEqual(parseQueryString(''), {});
    assert.deepStrictEqual(parseQueryString(null), {});
    assert.deepStrictEqual(parseQueryString(undefined), {});
  });

  test('handles leading question mark', () => {
    const result = parseQueryString('?foo=bar&baz=qux');
    assert.deepStrictEqual(result, { foo: 'bar', baz: 'qux' });
  });

  test('decodes URI components', () => {
    const result = parseQueryString('foo%20bar=baz%21');
    assert.deepStrictEqual(result, { 'foo bar': 'baz!' });
  });

  test('replaces + with space', () => {
    const result = parseQueryString('foo+bar=baz+qux');
    assert.deepStrictEqual(result, { 'foo bar': 'baz qux' });
  });

  test('handles multiple values for the same key', () => {
    const result = parseQueryString('foo=bar&foo=baz&foo=qux');
    assert.deepStrictEqual(result, { foo: ['bar', 'baz', 'qux'] });
  });

  test('handles keys without values', () => {
    const result = parseQueryString('foo=&bar');
    assert.deepStrictEqual(result, { foo: '', bar: '' });
  });

  test('handles malformed pairs', () => {
    const result = parseQueryString('foo=bar&&&baz=qux');
    assert.deepStrictEqual(result, { foo: 'bar', baz: 'qux' });
  });

  test('handles only key', () => {
      const result = parseQueryString('foo');
      assert.deepStrictEqual(result, { foo: '' });
  });
});
