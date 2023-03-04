article: https://developer.chrome.com/docs/extensions/mv3/getstarted

## Extensions 101

files:
- manifest.json
  - resources, permissions
  - file declarations
- service worker
  - interacts with chrome API BUT NOT the page
- content scripts
  - runs JS on web page(s)
  - read/modify DOM
  - use subset of chrome API
    - accesses the rest by messaging the service worker
- popup + others
  - popup, options, other
  - can access Chrome APIs

further reads:
- [Architecture Overview](https://developer.chrome.com/docs/extensions/mv3/architecture-overview/)
- [Designing the user interface](https://developer.chrome.com/docs/extensions/mv3/user_interface/)

## Development basics

- create extension files
- turn on dev mode, load unpacked
- pin extension to access it faster
- reload extension on updates
- console logs and errors
  - logs: right click -> inspect
  - errors: on extension page, button to show error logs
- typescript
  - use the npm package [chrome-types](https://www.npmjs.com/package/chrome-types) to take advantage of auto-completion for the [Chrome API](https://developer.chrome.com/docs/extensions/reference/)

further reads:
- [Debugging extensions](https://developer.chrome.com/docs/extensions/mv3/tut_debugging/)

## Reading time

- read from the page
- added element to the page

further reads:
- [Manifest file format](https://developer.chrome.com/docs/extensions/mv3/manifest/)

## Focus Mode

- interact with Service Worker
- manifest.json
  - permissions
   - [activeTab](https://developer.chrome.com/docs/extensions/mv3/manifest/activeTab/#what-activeTab-allows)

further reads:
- [chrome.scripting](https://developer.chrome.com/docs/extensions/reference/scripting/)


## Tabs Manager

This tutorial builds a tabs manager to organize your Chrome extension and Chrome Web store documentation tabs.

- overview
  - interact with tabs
  - navigate to them
  - group and name them

further reads:
- [Tabs API](https://developer.chrome.com/docs/extensions/reference/tabs/)
- [optional permissions](https://developer.chrome.com/docs/extensions/reference/permissions/)