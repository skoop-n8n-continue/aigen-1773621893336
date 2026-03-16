document.addEventListener('DOMContentLoaded', () => {
    const state = {
        alpha: null,
        bravo: null,
        charlie: null
    };

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    function generateRandomCode(length) {
        const array = new Uint32Array(length);
        window.crypto.getRandomValues(array);
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(array[i] % characters.length);
        }
        return result;
    }

    function updateCombinedKey() {
        if (state.alpha && state.bravo && state.charlie) {
            const combined = state.alpha.substring(0, 2) +
                           state.bravo.substring(0, 2) +
                           state.charlie.substring(0, 2);

            const combinedSection = document.getElementById('combined-section');
            const combinedKeyDisplay = document.getElementById('combined-key');

            combinedKeyDisplay.textContent = combined.toUpperCase();
            combinedSection.classList.remove('hidden');
        }
    }

    function handleButtonClick(id) {
        const code = generateRandomCode(6);
        state[id] = code;

        const display = document.getElementById(`display-${id}`);
        display.textContent = code;

        updateCombinedKey();
    }

    document.getElementById('btn-alpha').addEventListener('click', () => handleButtonClick('alpha'));
    document.getElementById('btn-bravo').addEventListener('click', () => handleButtonClick('bravo'));
    document.getElementById('btn-charlie').addEventListener('click', () => handleButtonClick('charlie'));
});
