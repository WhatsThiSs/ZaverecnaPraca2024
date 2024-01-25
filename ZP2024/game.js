document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('game-canvas');
  const ctx = canvas.getContext('2d');
  const startButton = document.getElementById('start-button');
  const timerContainer = document.getElementById('timer-container');
  const scoreContainer = document.getElementById('score-container');
  const levelContainer = document.getElementById('level-container');

  let squares = [];
  let timeRemaining = 25; // Počiatočná doba trvania
  let score = 0;
  let level = 1;
  let totalClicks = 0;
  let uniqueClicks = 0;
  let misses = 0;
  let hits = 0;
  let gameEnded = false;
  let timerInterval; // Nová premenná na uchovávanie aktuálneho intervalu
  let prevMouseX, prevMouseY;
  let mouseSpeedSum = 0;
  let mouseMoveCount = 0;
  let clickCount = 0;

  const correctSound = new Audio('correct.wav');
  const incorrectSound = new Audio('incorrect.wav');

  function drawSquare(square) {
    ctx.fillStyle = square.color;
    ctx.fillRect(square.x, square.y, square.size, square.size);
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(square.number, square.x + square.size / 2 - 8, square.y + square.size / 2 + 8);
  }

  function drawSquares() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    squares.forEach(square => {
      drawSquare(square);
    });
  }

  function generateRandomSquare() {
    const size = Math.floor(Math.random() * 50) + 30; // Náhodná veľkosť medzi 30 a 80

    let x, y;
    do {
      x = Math.random() * (canvas.width - size);
      y = Math.random() * (canvas.height - size);
    } while (squares.some(square => isOverlap(square, { x, y, size })));

    const number = squares.length + 1;
    const color = getRandomColor();

    return { x, y, size, number, color };
  }

  function getRandomColor() {
    const midColors = [
      '#FFD700', '#FFA07A', '#87CEEB', '#98FB98', '#FF6347',
      '#7B68EE', '#038a03', '#2525c2', '#FA8072', '#00CED1',
      '#FF1493', '#32CD32', '#FF8C00', '#8B008B', '#40E0D0'
    ];
    return midColors[Math.floor(Math.random() * midColors.length)];
  }
  
  function shuffleSquares() {
    squares.sort(() => Math.random() - 0.5);
    squares.forEach((square, index) => {
      square.number = index + 1;
    });
  }

  function isOverlap(square1, square2) {
    return (
      square1.x < square2.x + square2.size &&
      square1.x + square1.size > square2.x &&
      square1.y < square2.y + square2.size &&
      square1.y + square1.size > square2.y
    );
  }

  function startLevel() {
    if (!gameEnded) {
      squares = [];
      let squareCount;
      let levelTime;

      if (level === 1) {
        squareCount = 12;
        levelTime = 25;
      } else if (level === 2) {
        squareCount = 12;
        levelTime = 20;
      } else if (level === 3) {
        squareCount = 12;
        levelTime = 20; // Zmenený čas pre level 3
      }

      timeRemaining = levelTime;

      // Aktualizácia textu v levelContainer
      levelContainer.innerText = `Level ${level}`;

      for (let i = 0; i < squareCount; i++) {
        squares.push(generateRandomSquare());
      }

      shuffleSquares();
      drawSquares();

      // Zastav existujúci interval
      clearInterval(timerInterval);

      timerInterval = setInterval(function () {
        timerContainer.innerText = `Čas: ${timeRemaining}`;

        if (timeRemaining <= 0) {
          clearInterval(timerInterval);
          gameEnded = true;
          alert(`Hra skončila! Vaše skóre: ${score}, Celkový počet kliknutí: ${totalClicks}, Unikátne kliknutia: ${uniqueClicks}, Zásahy: ${hits}, Missnutia: ${misses}`);
          if (level === 1 && score === 12) {
            alert(`Gratulujeme, dokončili ste úroveň 1 Vaše skóre: ${score}, Celkový počet kliknutí: ${totalClicks}, Unikátne kliknutia: ${uniqueClicks}, Zásahy: ${hits}`);
            level = 2;
            score = 0;
            gameEnded = false;
            startLevel();
          } else if (level === 2 && score === 12) {
            alert(`Gratulujeme, dokončili ste úroveň 2 Vaše skóre: ${score}, Celkový počet kliknutí: ${totalClicks}, Unikátne kliknutia: ${uniqueClicks}, Zásahy: ${hits}`);
            level = 3;
            score = 0;
            gameEnded = false;
            startLevel();
          } else if (level === 3 && score === 12) {
            alert(`Gratulujeme, dokončili ste úroveň 3 budete presmerovaný na dotazník, Vaše skóre: ${score}, Celkový počet kliknutí: ${totalClicks}, Zásahy: ${hits}`);

            // Po kliknutí na OK v alerte prejdi na stránku dotaznik2.html
            window.location.href = 'dotaznik2.html';
          }
          calculateAverageMouseSpeed();
          calculateClickFrequency();
        } else if (score === squareCount) {
          clearInterval(timerInterval);
          gameEnded = true;
          if (level === 1) {
            alert(`Gratulujeme, dokončili ste úroveň 1 Vaše skóre: ${score}, Celkový počet kliknutí: ${totalClicks}, Unikátne kliknutia: ${uniqueClicks}, Zásahy: ${hits}`);
            level = 2;
            score = 0;
            gameEnded = false;
            startLevel();
          } else if (level === 2 && score === 12) {
            alert(`Gratulujeme, dokončili ste úroveň 2 Vaše skóre: ${score}, Celkový počet kliknutí: ${totalClicks}, Unikátne kliknutia: ${uniqueClicks}, Zásahy: ${hits}`);
            level = 3;
            score = 0;
            gameEnded = false;
            startLevel();
          } else if (level === 3 && score === 12) {
            alert(`Gratulujeme, dokončili ste úroveň 3. Vaše skóre: ${score}, Celkový počet kliknutí: ${totalClicks}, Unikátne kliknutia: ${uniqueClicks}, Zásahy: ${hits}`);

            // Po kliknutí na OK v alerte prejdi na stránku dotaznik2.html
            window.location.href = 'dotaznik2.html';
          }
          calculateAverageMouseSpeed();
          calculateClickFrequency();
        } else {
          timeRemaining--; // Dekrementujte čas tu
        }
      }, 1000);

      canvas.addEventListener('mousemove', function (event) {
        if (!gameEnded) {
          const mouseX = event.clientX - canvas.getBoundingClientRect().left;
          const mouseY = event.clientY - canvas.getBoundingClientRect().top;

          if (prevMouseX !== undefined && prevMouseY !== undefined) {
            const distance = Math.sqrt((mouseX - prevMouseX) ** 2 + (mouseY - prevMouseY) ** 2);
            mouseSpeedSum += distance;
            mouseMoveCount++;
          }

          prevMouseX = mouseX;
          prevMouseY = mouseY;
        }
      });

      canvas.addEventListener('click', function (event) {
        if (!gameEnded) {
          clickCount++;

          const clickX = event.clientX - canvas.getBoundingClientRect().left;
          const clickY = event.clientY - canvas.getBoundingClientRect().top;
      
          totalClicks++;
          let correctClick = false;
      
          squares.forEach(square => {
            if (
              clickX >= square.x &&
              clickX <= square.x + square.size &&
              clickY >= square.y &&
              clickY <= square.y + square.size &&
              square.number === score + 1
            ) {
              correctClick = true;
              hits++;
              score++;
              uniqueClicks++;
              scoreContainer.innerText = `Skóre: ${score}`;
              squares.splice(squares.indexOf(square), 1);
              drawSquares();
              correctSound.play();
      
              if (score === squareCount) {
                clearInterval(timerInterval);
                gameEnded = true;
                if (level === 1) {
                  alert(`Gratulujeme, dokončili ste úroveň 1 Vaše skóre: ${score}, Celkový počet kliknutí: ${totalClicks}, Unikátne kliknutia: ${uniqueClicks}, Zásahy: ${hits}`);
                  level = 2;
                  score = 0;
                  gameEnded = false;
                  startLevel();
                } else if (level === 2 && score === 12) {
                  alert(`Gratulujeme, dokončili ste úroveň 2 Vaše skóre: ${score}, Celkový počet kliknutí: ${totalClicks}, Unikátne kliknutia: ${uniqueClicks}, Zásahy: ${hits}`);
                  level = 3;
                  score = 0;
                  gameEnded = false;
                  startLevel();
                } else if (level === 3 && score === 12) {
                  alert(`Gratulujeme, dokončili ste úroveň 3 budete presmerovaný na dotazník, Vaše skóre: ${score}, Celkový počet kliknutí: ${totalClicks}, Zásahy: ${hits}`);
      
                  // Po kliknutí na OK v alerte prejdi na stránku dotaznik2.html
                  window.location.href = 'dotaznik2.html';
                }
                calculateAverageMouseSpeed();
                calculateClickFrequency();
              }
            }
          });
      
          if (!correctClick) {
            misses++;
            squares.forEach(square => {
              if (
                clickX >= square.x &&
                clickX <= square.x + square.size &&
                clickY >= square.y &&
                clickY <= square.y + square.size
              ) {
                const originalColor = square.color;
                square.color = 'red';
                drawSquares();
      
                // Počkajte 200 ms a potom obnovte pôvodnú farbu
                setTimeout(() => {
                  square.color = originalColor;
                  drawSquares();
                }, 200);
                incorrectSound.play();
              }
            });
          }
        }
      });

      // Funkcia pre výpočet priemerného pomeru rýchlosti pohybu myši k počtu pohybov
      function calculateAverageMouseSpeed() {
        if (mouseMoveCount > 0) {
          const averageSpeed = mouseSpeedSum / mouseMoveCount;
          console.log(`Priemerná rýchlosť pohybu myši: ${averageSpeed}`);
        }
      }

      // Funkcia pre výpočet frekvencie kliknutí
      function calculateClickFrequency() {
        if (clickCount > 0) {
          const clickFrequency = clickCount / timeRemaining;
          console.log(`Frekvencia kliknutí: ${clickFrequency} kliknutí za sekundu`);
        }
      }
      
    }
  }

  startButton.addEventListener('click', startLevel);
});
