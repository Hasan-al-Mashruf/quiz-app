const quizArray = [
    {
        id: 0,
        question: "Which is the most widely spoken language in the world?",
        options: ["Spanish", "Mandarin", "English", "German"],
        correct: "Mandarin",
    },
    {
        id: 1,
        question: "Which is the only continent in the world without a desert?",
        options: ["North America", "Asia", "Africa", "Europe"],
        correct: "Europe",
    },
    {
        id: 2,
        question: "Who invented Computer?",
        options: ["Charles Babbage", "Henry Luce", "Henry Babbage", "Charles Luce"],
        correct: "Charles Babbage",
    },
];

let quizIndex = 0;
let selectedanswer = []
const question = document.querySelector('#question h3')
const choices = document.querySelectorAll('.choices')
const btn = document.querySelector('button')
const progress = document.querySelector('.progress-bar')
const quizNumber = document.getElementById('quizNumber')




const displayQuiz = () => {

    showProgress()
    const options = quizArray[quizIndex].options
    question.innerHTML = quizArray[quizIndex].question
    choices.forEach((element, index) => {
        const option = options[index]
        element.innerHTML = option
        element.onclick = validAnswer
    });
}

const showProgress = () => {
    let dynamicProgrees;

    dynamicProgrees = (quizIndex + 1) / quizArray.length * 100
    console.log(dynamicProgrees)
    progress.style.width = `${dynamicProgrees}%`
    progress.innerHTML = Math.round(`${dynamicProgrees}`) + '%';

}

const validAnswer = (event) => {
    const answer = event.target.innerHTML
    const answerElement = event.target
    const checkAnswer = quizArray[quizIndex].correct.includes(answer)
    if (!checkAnswer) {
        answerElement.classList.add('notCorrect')
        return
    }
    console.log()
    storeAnswer(answer, answerElement)
}

const storeAnswer = (answer, answerElement) => {
    selectedanswer.push(answer)
    answerElement.classList.add('correct')
    correctAnswerUpdate()
    console.log(selectedanswer)
}

const nextQuiz = () => {
    for (const iterator of choices) {
        iterator.classList.remove('notCorrect', 'correct')
    }

    quizIndex++

    if (quizIndex > quizArray.length - 1) {
        document.querySelector('.my-modal').classList.remove('d-none')
        document.querySelector('.title').style.display = 'none'
        btn.setAttribute('disabled', true)
        clearInterval(myInterval);
        return
    }
    displayQuiz()
    updateQuizNumber()
}

const updateQuizNumber = () => {
    quizNumber.innerHTML = `${quizIndex + 1} out of ${quizArray.length}`
}
updateQuizNumber()
displayQuiz();

correctAnswerUpdate = () => {
    correctAnswer.innerHTML = `Correct answer : ${selectedanswer.length}`
}
correctAnswerUpdate()

const showAnswer = () => {
    choices.forEach((element, index) => {
        const options = element.innerHTML
        const answer = quizArray.find(quiz => quiz.correct.includes(options))
        if (answer) {
            element.classList.add('correct')
        }
    });
}

let second = 0
let minute = 0
let gettingSecond = document.getElementById('second')
let gettingMinute = document.getElementById('minute')
let finalTime = document.getElementById('finalTime')

const quizTime = () => {

    gettingMinute.innerHTML = minute

    if (second > 60) {
        second = 0
        minute++
    }

    if (second <= 9) {
        gettingSecond.innerHTML = `0${second}`
    } else {
        gettingSecond.innerHTML = second
    }

    if (minute <= 2) {
        gettingMinute.innerHTML = `0${minute}`
    } else {
        gettingMinute.innerHTML = minute
    }

    finalTime.innerHTML = `<h4>Total time: ${minute} minutes ${second} seconds</h4>`
    second++

}
const myInterval = setInterval(quizTime, 1000)