function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

document.addEventListener('alpine:init', () => {

    Alpine.data('app', () => ({
        mode: 'CPE',
        words: [],
        questions: [],
        buttons: [],
        cards: [],
        mistakes: 0,
        time: 0,
        wordsCount: 0,
        timerFunction: null,
        currentQuestionId: 0,
        conclusionScreenVisible: false,
        wordsCount: 0,
        get formatTime() {
            const minutes = Math.floor(this.time / 60);
            const seconds = this.time % 60;
            return `${minutes}:${String(seconds).padStart(2, '0')}`;
        },
        async init() {
            const success = await this.loadWords();
            if (success) {
                this.initializeGame();
            } else {
                console.warn("Failed to load words. Game cannot be initialized.");
            }
        },

        async loadWords() {
            const urlParams = new URLSearchParams(window.location.search);
            this.mode = urlParams.get('mode') || 'CPE';
            const wordsetId = urlParams.get('set') || 'Test';
            try {
                const response = await fetch(`wordsets/${wordsetId}.txt`);
                if (!response.ok) {
                    throw new Error(`Set not found: ${wordsetId} (Error ${response.status})`);
                }
                const text = await response.text();

                this.words = text.trim().split('\n').map(line => {
                    const [chinese, pinyin, english] = line.split(';;');
                    return { chinese, pinyin, english };
                });
                
                console.log("Words loaded!");
                return true;
            } catch (error) {
                console.error("Error loading words:", error);
                return false;
            }
        },
        initializeGame() {
            function getField(word, field) {
                const mapping = {
                    'C': word.chinese,
                    'P': word.pinyin,
                    'E': word.english
                };
                return mapping[field];
            }

            this.questions = this.words.map((word, index) => ({
                id: index,
                question: getField(word, this.mode[0]),
                answer: getField(word, this.mode[2]),
                reveal: getField(word, this.mode[1]),
                buttonized: false,
            }));
            shuffleArray(this.questions);
            this.currentQuestionId = 0;
            this.wordsCount = this.questions.length;
            this.mistakes = 0;
            this.time = 0;
            
            const buttonSlots = ['slot-btn-1', 'slot-btn-2', 'slot-btn-3', 'slot-btn-4', 'slot-btn-5', 'slot-btn-6'];
            const cardSlots = ['slot-main', 'slot-3', 'slot-2', 'slot-1', 'slot-start'];
            shuffleArray(buttonSlots);

            this.buttons = this.questions.slice(0, 6).map((question, index) => this.createButton(question, buttonSlots[index]));
            this.cards = this.questions.slice(0, 5).map((question, index) => this.createCard(question, cardSlots[index]));

            this.timerFunction = setInterval(() => {
                this.time++;
            }, 1000);
        },
        concludeGame() {
            clearInterval(this.timerFunction);
            this.conclusionScreenVisible = true;
        },
        restartGame() {
            this.conclusionScreenVisible = false;
            this.initializeGame();
        },
        progressCards() {
            var toRemoveIndex = null;
            this.cards.forEach((card, index) => {
                if (card.class === 'slot-reveal slot-under') {
                    toRemoveIndex = index;
                }
                if (card.class === 'slot-reveal') {
                    card.class = 'slot-reveal slot-under';
                }
                if (card.class === 'slot-main') {
                    card.class = 'slot-reveal';
                }
                if (card.class === 'slot-3') {
                    card.class = 'slot-main';
                }
                if (card.class === 'slot-2') {
                    card.class = 'slot-3';
                }
                if (card.class === 'slot-1') {
                    card.class = 'slot-2';
                }
                if (card.class === 'slot-start') {
                    card.class = 'slot-1';
                }
            });
            if (this.questions.length > this.currentQuestionId + 4) {
                const newCard = this.createCard(this.questions[this.currentQuestionId + 4], 'slot-start');
                if (toRemoveIndex !== null) {
                    this.cards.splice(toRemoveIndex, 1, newCard);
                } else {
                    this.cards.push(newCard);
                }
            }
        },
        updateButtons(button) {
            const oldButtonIndex = this.buttons.findIndex(btn => btn.slot === button.slot && btn.released === true);
            button.released = true;

            var newButtonQuestion = null;
            if(this.questions.length > this.currentQuestionId + 4 && this.questions[this.currentQuestionId + 4].buttonized === false) {
                newButtonQuestion = this.questions[this.currentQuestionId + 4];
            }
            if (newButtonQuestion === null) {
                const potentialQuestion = this.questions.slice(this.currentQuestionId + 1, this.currentQuestionId + 7).filter(q => q.buttonized === false);
                if (potentialQuestion.length > 0) {
                    newButtonQuestion = potentialQuestion[getRandomInt(potentialQuestion.length)];
                }
            }
            if (newButtonQuestion !== null) {
                const newButton = this.createButton(newButtonQuestion, button.slot);
                if (oldButtonIndex !== -1) {
                    this.buttons.splice(oldButtonIndex, 1, newButton);
                } else {
                    this.buttons.push(newButton);
                }
            }
        },
        onClick(button) {
            const currentQuestion = this.questions[this.currentQuestionId];
            if (button.id === currentQuestion.id) {
                this.currentQuestionId++;
                this.progressCards();
                this.updateButtons(button);
                this.buttons.forEach(btn => { btn.disabled = false; });
                if (this.currentQuestionId >= this.questions.length) {
                    this.concludeGame();
                }
            } else {
                button.disabled = true;
                this.mistakes++;
            }
        },
        createCard(question, slot = 'slot-start') {
            return {
                id: question.id,
                class: slot,
                question: question.question,
                reveal: question.reveal
            }
        },
        createButton(question, slot) {
            question.buttonized = true;
            return {
                id: question.id,
                slot: slot,
                label: question.answer,
                released: false,
                disabled: false,
                get class() {
                    return { [`${this.slot}`]: true, 'disabled': this.disabled, 'released': this.released };
                },
            };
        }
    }));
});
