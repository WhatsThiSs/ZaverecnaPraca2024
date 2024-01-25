// dotaznik2.js
function submitQuestionnaire() {

    const answer1 = document.getElementById('emotion').value;
    const answer2 = document.getElementById('difficulty').value;
 
    console.log("Odpovědi na otázky:", answer1, answer2);
    window.location.href = 'thanks.html';
  
}
