document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.getElementById('submit-button');
    const expectationEmojiContainer = document.getElementById('expectation-emoji-container');
    const expectationWordsCheckboxes = document.querySelectorAll('input[name="expectation-words"]');

    // Aktualizácia smajlíka pri posunutí slideru pre úroveň očakávania
    expectationSlider.addEventListener('input', function () {
        updateExpectationEmoji();
    });

    function updateExpectationEmoji() {
        const expectationValue = expectationSlider.value;
        expectationEmojiContainer.innerHTML = getEmoji(expectationValue);
    }

    // Spracovanie vybraných slov pre očakávania
    submitButton.addEventListener('click', function () {
        const selectedExpectationWords = Array.from(expectationWordsCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        // Pridajte logiku na využitie vybraných slov v správe alebo uložte do databázy
        console.log('Vybrané slová očakávania:', selectedExpectationWords);

        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const gender = document.getElementById('gender').value;
        const handedness = document.getElementById('handedness').value;
 
        const currentEmotion = document.getElementById('current-emotion').value;

      
        

        if (name && age && gender && handedness && currentEmotion) {
            // Zodpovedané musia byť všetky otázky

            const userData = {
                name: name,
                age: age,
                gender: gender,
                handedness: handedness,
                currentEmotion: currentEmotion
            };

            setTimeout(function () {
                window.location.href = 'game.html';
            }, 1000); // Oneskorenie som pridal kvôli výpisu do konzole
        } else {
            alert('Vyplňte všechny otázky.');
        }
    });
});
