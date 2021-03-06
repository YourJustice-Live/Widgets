# Your Justice Widgets

[Widgets](https://github.com/YourJustice-Live/Widgets) that anyone can add to their own web application to integrate with the [YourJustice](https://yj.life/) platform.

## Profile Widget

![Profile Widget](doc/images/profile_widget.png)

This is a widget that displays the profile's overall reputation, a link to a specific jurisdiction, and a button to change the reputation by creating a case.

### Demo

[https://codesandbox.io/s/yourjurstice-profile-widget-demo-ppe8to](https://codesandbox.io/s/yourjurstice-profile-widget-demo-ppe8to)

### Usage

```html
<link
  href="https://cdn.jsdelivr.net/gh/YourJustice-Live/Widgets@0.1/dist/index.css"
  rel="stylesheet"
/>
<script src="https://cdn.jsdelivr.net/gh/YourJustice-Live/Widgets@0.1/dist/index.js"></script>

<div
  class="yj_profile"
  account="0x4306D7a79265D2cb85Db0c5a55ea5F4f6F73C4B1"
  jurisdiction="0xc20d4562ff9a883872e62e89c77bc8e39e7e287d"
></div>
```

Don't forget to replace the **account** and **jurisdiction** with your own values.

### Props

| Name                  | Default      | Description                                                                                                |
| --------------------- | ------------ | ---------------------------------------------------------------------------------------------------------- |
| account               | -            | Address of YourJustice account.                                                                            |
| jurisdiction          | -            | Address of YourJustice jurisdiction.                                                                       |
| variant               | "horizontal" | If "horizontal" then the button will be on the right. If "vertical" then the button will be at the bottom. |
| backgroundColor       | "#FFF"       | Color of widget background.                                                                                |
| primaryTextColor      | "#5E42CC"    | Color of profile link.                                                                                     |
| secondaryTextColor    | "#8198AF99"  | Color of brand label and jurisdiction link.                                                                |
| buttonBackgroundColor | "#AD9BF514"  | Color of button background.                                                                                |
| buttonTextColor       | "#5E42CC"    | Color of button text.                                                                                      |
| positiveColor         | "#05B5A1"    | Color of positive rating.                                                                                  |
| negativeColor         | "#E8475F"    | Color of negative rating.                                                                                  |

## Development

### Commands

- Runs the app in the development mode - `npm start`
- Build widget dist - `npm run build:widget`

### How to purge jsDelivr cache

- Open a URL similar to this in your browser - `https://purge.jsdelivr.net/gh/YourJustice-Live/Widgets@0.1/dist/index.js`

## Community

Join us on [Discord](https://discord.gg/aKKCCzCfgS)!
