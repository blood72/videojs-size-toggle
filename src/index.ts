import videojs from 'video.js';

interface SizeTogglePlayerOption extends videojs.PlayerOptions {
  playerOptions: {
    sizeToggle: SizeToggleOption,
  },
}

interface SizeToggleOption {
  activeOnly: boolean,
  disableStyles: boolean,
  minClientWidth: number,
  styles?: {
    [key: string]: string,
  },
}

class SizeToggleButton extends videojs.getComponent('Button') {
  private readonly toggleOptions: SizeToggleOption;

  /**
   * @param {videojs.Player} player
   * @param {videojs.PlayerOptions} options
   */
  constructor(player: videojs.Player, options?: SizeTogglePlayerOption) {
    super(player, options);

    const defaultOptions: SizeToggleOption = {
      activeOnly: false,
      disableStyles: false,
      minClientWidth: 300,
      styles: {
        position: 'relative',
        width: '100%',
      },
    };
    this.toggleOptions = Object.assign(defaultOptions, options?.playerOptions.sizeToggle || {});

    this.injectCSS();

    this.controlText(this.localize('Size Toggle'));

    this.on(player, 'sizetoggled', this.toggleSize);
    this.on(player, 'fullscreenchange', this.sizeDown);
    this.on(player, ['ready', 'resize', 'playerresize'], this.toggleButtonIfNeeded);
  }

  /**
   * Inject video CSS when size toggled.
   *
   * @return {void}
   */
  protected injectCSS(): void {
    if (this.toggleOptions.disableStyles || document.querySelector('style[data-vjs-size-toggle]')) {
      return;
    }

    let $style = '.vjs-size-toggled {';

    for (const [key, value] of Object.entries(this.toggleOptions?.styles || {})) {
      $style += `${key}: ${value};`;
    }

    $style += '}';

    const style = document.createElement('style');
    style.dataset.vjsSizeToggle = '';
    style.sheet?.insertRule
      ? style.sheet?.insertRule($style, 0)
      : style.innerHTML += $style;
    document.head.appendChild(style);
  }

  /**
   * Return the actual element of the control button from the player.
   *
   * @return {HTMLElement | null}
   */
  getPlayerEl(): HTMLElement {
    return (this.player_.el() as HTMLElement);
  }

  /**
   * Return the actual element of the control button from the player.
   *
   * @return {HTMLElement | null}
   */
  getControlEl(): HTMLElement | null {
    return this.getPlayerEl().querySelector<HTMLElement>('.vjs-size-toggle-control');
  }

  /**
   * @inheritDoc
   */
  buildCSSClass(): string {
    return `vjs-size-toggle-control ${super.buildCSSClass()}`;
  }

  /**
   * @inheritDoc
   */
  handleClick(): void {
    this.player_.trigger('sizetoggled');
  }

  /**
   * Toggle buttons according to display policy
   *
   * @return {void}
   */
  toggleButtonIfNeeded(): void {
    if (this.shouldHideButton()) {
      this.sizeDown();
      this.hideButton();
    } else {
      this.showButton();
    }
  }

  /**
   * Toggle the video player size.
   *
   * @return {void}
   */
  toggleSize(): void {
    if (this.hasToggled()) {
      this.sizeDown();
    } else {
      this.sizeUp();
    }

    this.player_.trigger('playerresize'); // resize immediately
  }

  /**
   * Check the size of the video player.
   *
   * @return {boolean}
   */
  hasToggled(): boolean {
    return this.player_.hasClass('vjs-size-toggled');
  }

  /**
   * Size up the video player.
   *
   * @return {void}
   */
  sizeUp(): void {
    if (this.toggleOptions?.activeOnly) {
      // size down for all other players
      document.querySelectorAll('.vjs-size-toggled').forEach((element: Element) => {
        element.classList.remove('vjs-size-toggled');
      });
    }

    this.player_.addClass('vjs-size-toggled');
  }

  /**
   * Size down the video player.
   *
   * @return {void}
   */
  sizeDown(): void {
    this.player_.removeClass('vjs-size-toggled');
  }

  /**
   * Check the button should be hidden.
   *
   * @return {boolean}
   */
  shouldHideButton(): boolean {
    return this.getPlayerEl().clientWidth < this.toggleOptions.minClientWidth;
  }

  /**
   * Hide the button.
   *
   * @return {void}
   */
  hideButton(): void {
    this.getControlEl()?.classList.add('vjs-size-toggle-hidden');
  }

  /**
   * Show the button.
   *
   * @return {void}
   */
  showButton(): void {
    this.getControlEl()?.classList.remove('vjs-size-toggle-hidden');
  }
}

videojs.registerComponent('SizeToggleButton', SizeToggleButton);

export default SizeToggleButton;
