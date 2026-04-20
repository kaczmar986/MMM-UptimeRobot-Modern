# MMM-UptimeRobot-Modern [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/kaczmar986/MMM-UptimeRobot-Modern/raw/master/LICENSE)

MagicMirror² to get uptime data from http://uptimerobot.com API.

This is a modernized version of the original [MMM-uptimerobot](https://github.com/mrVragec/MMM-uptimerobot) module by **[mrVragec](https://github.com/mrVragec)**.

### Changes in this version:

- Switched from deprecated `request` library to native `fetch`.
- Updated for MagicMirror² version 2.x+ compatibility.
- Added Polish translation

## Examples

![](.github/text_color.png) ![](.github/icons_color.png)

## Instalation

1. Navigate into your MagicMirror's modules folder:
2. `cd ~/MagicMirror/modules`
3. Clone this repository in your MagicMirror installation under modules:
4. `git clone https://github.com/kaczmar986/MMM-UptimeRobot-Modern`
5. Add configuration to config.js

## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:

```js
modules: [
  {
    module: "MMM-UptimeRobot-Modern",
    position: "top_right",
    config: {
      api_key: "urXXX-XYZ",
      useColors: true,
      useIcons: true
    }
  }
];
```

## Requirements

You need to obtain free (for basic featrues) API Key from https://uptimerobot.com

## Configuration options

| Option           | Description                                                                                                                                                                                    |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `api_key`        | _Required_ API Key from https://uptimerobot.com. API Key is available under 'My Settings' in 'API Setting' section (click on Show/hide it and if not available generate new one).              |
| `useIcons`       | _Optional_ Flag to use icons (true) or text (false) values for status of monitor. <br><br>**Type:** `boolean` <br>Default: false - text values.                                                |
| `useColors`      | _Optional_ Flag to use colors (true) for status of monitor<br><br>**Type:** `boolean` <br>Default: false - without colors.                                                                     |
| `maximumEntries` | _Optional_ Number of items (monitors) to shown. <br><br>**Type:** `int` <br>Default: 10 items.                                                                                                 |
| `statuses`       | _Optional_ Filter out monitor by status (0 - paused; 1 - not checked yet; 2 - up; 8 - seems down; 9 - down<br><br>**Type:** `String` <br>Default: 0-1-2-8-9 (show monitors with all statuses). |
