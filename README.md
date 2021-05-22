# video.js Size Toggler

![vjs-size-toggle](https://user-images.githubusercontent.com/24821306/119183211-bb09f580-baae-11eb-9cd7-d6040ff09e8d.gif)

Personally used video.js size toggle on/off button package.

This is an extension that controls the size of the video through the ON/OFF button.
<br>
(imagined the feeling of YouTube movie theater mode)

## Index

- [Requirement](#requirement)
- [Installation](#installation)
- [Usage](#usage)
- [Options](#options)
- [Example](#example)
- [Browser Support](#browser-support)
- [License](#license)

## Requirement

- [video.js](https://videojs.com/) >= 7.0.0

## Installation

- CDN
  ```http
  https://unpkg.com/videojs-size-toggle@latest/dist/videojs-size-toggle.min.js
  ```
- ESM
  ```javascript
  import 'videojs-size-toggle';
  ```

## Usage

Components are registered immediately upon import and display on screen when you add a list to the control bar. When creating a videojs instance, you can use it by typing the options together.

Add a value for `sizeToggleButton` like this.

```javascript
const options = {
  controlBar: {
    children: [
        'playToggle',
        'volumePanel',
        'progressControl',

        'sizeToggleButton',

        'fullscreenToggle',
    ],
  },
};
```

## options

- `activeOnly`\: Only one of the instances you just clicked will be activated \(default `false`\).
- `disableStyles`\: Ignore the styles option \(default `false`\).
- `minClientWidth`\: Client length condition value with button disappearing. \(default `300`\)
- `styles`\: Customized style value to apply when switching sizes \(default `position: relative; width: 100%;`\).

Put the options above in `sizeToggle` and pass on the options.

```javascript
const video = document.querySelector('video');
const options = {
  controlBar: {
    'pictureInPictureToggle': false,
    children: [
      'playToggle',
      'volumePanel',
      'progressControl',
      'sizeToggleButton',
      'fullscreenToggle',
    ],
  },
  sizeToggle: {
    // activeOnly: false,
    // disableStyles: false,
    // minClientWidth: 300,
    styles: {
      position: 'fixed',
      padding: 'min(21.125rem, 24%) 0', // IE11 not work
    },
  },
};

videojs(video, options);
```

## Example

You can see some samples in the [example](/example) folder.

## Browser Support

- Chrome
- Firefox
- IE11; below polyfill required
  - `Object.assign`
  - `Object.entries`
  - `NodeList.prototype.forEach`

## License

This package is open-sourced software licensed under the MIT license.
