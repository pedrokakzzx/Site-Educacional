// Inicializa a pontuação, vidas e high score
let score = 0;
let lives = 5;
let currentAnswer = 0;
let highScore = 0;

// Gera uma nova pergunta
function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operator = Math.random() > 0.5 ? '+' : '-';

    currentAnswer = operator === '+' ? num1 + num2 : num1 - num2;

    document.getElementById('question').textContent = `${num1} ${operator} ${num2} = ?`;
}

// Verifica a resposta do usuário
function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('answer').value);
    
    if (userAnswer === currentAnswer) {
        score += 2;
        document.getElementById('result').textContent = 'Correto!';
    } else {
        lives--;
        document.getElementById('result').textContent = 'Incorreto!';
    }

    if (lives <= 0) {
        window.location.href = 'gameover.html';
        // Atualiza o high score se necessário
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('highScore', highScore);
        }
        score = 0;
        lives = 5;
    }

    updateUI();
    generateQuestion();

    // Limpa o campo de resposta
    document.getElementById('answer').value = '';

    // Remove a mensagem de resultado após 0,5 segundos
    setTimeout(() => {
        document.getElementById('result').textContent = '';
    }, 500);
}

// Atualiza a interface com a pontuação, as vidas e o high score
function updateUI() {
    document.getElementById('score').textContent = score;
    document.getElementById('lives').textContent = lives;
    document.getElementById('high-score').textContent = highScore;
}

// Carrega o high score do localStorage
function loadScore() {
    highScore = parseInt(localStorage.getItem('highScore')) || 0;
    updateUI();
}

// Executa ao carregar a página
window.onload = function() {
    loadScore();
    generateQuestion();
};
