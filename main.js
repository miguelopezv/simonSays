// Aquí tu código
        const levels = 15;
        let keys = generateKeys(levels);

        function nextLevel(actualLevel) {
            if(actualLevel == levels) {
                return swal({
                    title: 'Ganaste!',
                    icon: 'success'
                });
            }

            swal({
                timer: 1000,
                title: `Nivel: ${actualLevel + 1}`,
                buttons: false
            });

            for (let i = 0; i <= actualLevel; i++) {
                setTimeout(() => activate(keys[i]), 1000 * (i+1) + 1000);
            }

            let i = 0;
            let actualKey = keys[i];
            window.addEventListener('keydown', onKeyDown);

            function onKeyDown(ev) {
                if(ev.keyCode == actualKey) {
                    activate(ev.keyCode, {success: true});
                    i++;
                    if (i > actualLevel) {
                        window.removeEventListener('keydown', onKeyDown);
                        setTimeout(() => nextLevel(i), 1500);
                    }
                    actualKey = keys[i];
                } else {
                    activate(ev.keyCode, {fail: true});
                    activate(actualKey);
                    window.removeEventListener('keydown', onKeyDown);
                    setTimeout(() => swal({
                        title: 'Perdiste',
                        text: '¿Quieres volver a intentarlo?',
                        buttons: ['NO', true]
                    }).then((ok) => {
                        if (ok) {
                            teclas = generateKeys(levels);
                            nextLevel(0);
                        }
                    }), 500);
                }
            }
        }

        nextLevel(0);

        function generateKeys(levels) {
            return new Array(levels).fill(0).map(
                returnRandomKey
            );

        }

        function returnRandomKey() {
            const min = 65;
            const max = 90;
            return Math.floor(Math.random() * (max - min) + min);
        }

        function getElementByKeyCode(keyCode) {
            return document.querySelector(`[data-key="${keyCode}"]`);
        }

        function activate(keyCode, opts = {}) {
            const el = getElementByKeyCode(keyCode);
            el.classList.add('active');

            if(opts.success) {
                el.classList.add('success');
            } else if(opts.fail) {
                el.classList.add('fail');
            }
            setTimeout(() => deactivate(el), 500);
        }

        function deactivate(el) {
            el.className = "key";
        }