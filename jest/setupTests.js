
import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost',
});
global.window = dom.window;
global.document = dom.window.document;
global.navigator = {
  userAgent: 'node.js',
};
global.fetch = fetch;

