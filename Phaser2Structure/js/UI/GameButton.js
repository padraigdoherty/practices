window.MyGame.namespace('GameButton', {}, (function (game) {'use strict';
    var gameObject = game.gameObject,
        phaserButton = null,
        hoverSound = null,
        clickSound = null;

    return {
        GameButton: function (x, y, key, context, clickHandler, overHandler, outHandler, downHandler, upHandler, overSoundKey, downSoundKey,
                                overFrame, outFrame, downFrame, upFrame) {

            if (clickHandler !== null && clickHandler !== undefined && typeof clickHandler === 'function') {
                phaserButton = gameObject.add.button(x, y, key, clickHandler, context, overFrame, outFrame, downFrame, upFrame);

                if (overSoundKey !== null &&
                        overSoundKey !== undefined &&
                        typeof overSoundKey === 'string' &&
                        game.SoundAssetKeys.hasOwnProperty(overSoundKey)) {

                    hoverSound = gameObject.add.audio(game.SoundAssetKeys[overSoundKey]);

                } else {
                    hoverSound = null;
                }
                phaserButton.setOverSound(hoverSound);

                if (downSoundKey !== null &&
                        downSoundKey !== undefined &&
                        typeof downSoundKey === 'string' &&
                        game.SoundAssetKeys.hasOwnProperty(downSoundKey)) {

                    clickSound = gameObject.add.audio(game.SoundAssetKeys[downSoundKey]);

                } else {
                    clickSound = gameObject.add.audio(game.SoundAssetKeys.CLICK_SOUND);
                }
                phaserButton.setDownSound(clickSound);

                if (overHandler !== null && overHandler !== undefined && typeof overHandler === 'function') {
                    phaserButton.onInputOver.add(overHandler, context);
                }

                if (outHandler !== null && outHandler !== undefined && typeof outHandler === 'function') {
                    phaserButton.onInputOut.add(outHandler, context);
                }

                if (downHandler !== null && downHandler !== undefined && typeof downHandler === 'function') {
                    phaserButton.onInputDown.add(downHandler, context);
                }

                if (upHandler !== null && upHandler !== undefined && typeof upHandler === 'function') {
                    phaserButton.onInputUp.add(upHandler, context);
                }
            }
            return phaserButton;
        }
    };
    }(window.MyGame)));
