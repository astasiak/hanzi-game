words = [
    { chinese: '你好', pinyin: 'nǐ hǎo', english: 'Hello' },
    { chinese: '再见', pinyin: 'zài jiàn', english: 'Goodbye' },
    { chinese: '谢谢', pinyin: 'xièxie', english: 'Thank you' },
    { chinese: '对不起', pinyin: 'duìbù qǐ', english: 'Sorry' },
    { chinese: '请问', pinyin: 'qǐng wèn', english: 'Excuse me' },
    { chinese: '我爱你', pinyin: 'wǒ ài nǐ', english: 'I love you' },
    { chinese: '早上好', pinyin: 'zǎo shang hǎo', english: 'Good morning' },
    { chinese: '晚安', pinyin: 'wǎn ān', english: 'Good night' },
    { chinese: '水', pinyin: 'shuǐ', english: 'Water' },
    { chinese: '食物', pinyin: 'shíwù', english: 'Food' },
    { chinese: '茶', pinyin: 'chá', english: 'Tea' },
    { chinese: '咖啡', pinyin: 'kāfēi', english: 'Coffee' },
    { chinese: '朋友', pinyin: 'péngyou', english: 'Friend' },
    { chinese: '家庭', pinyin: 'jiātíng', english: 'Family' },
    { chinese: '学校', pinyin: 'xuéxiào', english: 'School' },
    { chinese: '工作', pinyin: 'gōngzuò', english: 'Work' },
    { chinese: '快乐', pinyin: 'kuàilè', english: 'Happy' },
    { chinese: '悲伤', pinyin: 'bēishāng', english: 'Sad' },
    { chinese: '美丽', pinyin: 'měilì', english: 'Beautiful' },
    { chinese: '强大', pinyin: 'qiángdà', english: 'Strong' },
]

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

document.addEventListener('alpine:init', () => {

    Alpine.data('app', () => ({
        mistakes: 0,
        time: 0,
        currentQuestionId: 0,
        get formatTime() {
            const minutes = Math.floor(this.time / 60);
            const seconds = this.time % 60;
            return `${minutes}:${String(seconds).padStart(2, '0')}`;
        },
        init() {
            this.questions = words.map((word, index) => ({
                id: index,
                question: word.chinese,
                answer: word.english,
                reveal: word.pinyin,
            }));

            this.initializeGame();

            this.$nextTick(() => {
                //this.updateCardPositions();
            });
        },
        initializeGame() {
            shuffleArray(this.questions);
            this.currentQuestionId = 0;
            this.mistakes = 0;
            this.time = 0;
            
            const buttonSlots = ['slot-btn-1', 'slot-btn-2', 'slot-btn-3', 'slot-btn-4', 'slot-btn-5', 'slot-btn-6'];
            const cardSlots = ['slot-main', 'slot-3', 'slot-2', 'slot-1'];
            shuffleArray(buttonSlots);

            this.buttons = this.questions.slice(0, 6).map((question, index) => this.createButton(question, buttonSlots[index]));
            this.cards = this.questions.slice(0, 4).map((question, index) => this.createCard(question, cardSlots[index]));
        },
        createCard(question, slot = 'slot-0') {
            return {
                id: question.id,
                class: slot,
                question: question.question,
                reveal: question.reveal
            }
        },
        createButton(question, slot) {
            return {
                id: question.id,
                slot: slot,
                label: question.answer,
                disabled: false,
                get class() {
                    return { [`${this.slot}`]: true, 'disabled': this.disabled };
                },
            };
        }
    }));
});
