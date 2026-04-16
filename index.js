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

document.addEventListener('alpine:init', () => {

    Alpine.data('app', () => ({
        mistakes: 0,
        time: 0,
        currentCardId: 0,
        get formatTime() {
            const minutes = Math.floor(this.time / 60);
            const seconds = this.time % 60;
            return `${minutes}:${String(seconds).padStart(2, '0')}`;
        },
        init() {
            this.cards = words.map((word, index) => ({
                id: index,
                question: word.chinese,
                answer: word.english,
                comment: word.pinyin,
                class: 'slot slot-start',
            }));
            this.cards.sort(() => Math.random() - 0.5); // shuffle cards

            this.buttons = [
                this.createButton('btn-1'),
                this.createButton('btn-2'),
                this.createButton('btn-3'),
                this.createButton('btn-4'),
                this.createButton('btn-5'),
                this.createButton('btn-6'),
            ];

            this.$nextTick(() => {
                this.updateCardPositions();
            });
        },
        progressCard(button) {
            console.log(button);
            this.currentCardId++;
            this.updateCardPositions();
        },
        updateCardPositions() {
            const existsCard = (id) => {
                return id >= 0 && id < this.cards.length;
            };
            if (existsCard(this.currentCardId)) {
                this.cards[this.currentCardId].class = 'slot slot-main';
            }
            if (existsCard(this.currentCardId-1)) {
                this.cards[this.currentCardId-1].class = 'slot slot-reveal';
            }
            if (existsCard(this.currentCardId-2)) {
                this.cards[this.currentCardId-2].class = 'slot slot-reveal slot-under';
            }
            if (existsCard(this.currentCardId+1)) {
                this.cards[this.currentCardId+1].class = 'slot slot-3';
            }
            if (existsCard(this.currentCardId+2)) {
                this.cards[this.currentCardId+2].class = 'slot slot-2';
            }
            if (existsCard(this.currentCardId+3)) {
                this.cards[this.currentCardId+3].class = 'slot slot-1';
            }
        },

        createButton(id) {
            const button = {
                id: id,
                label: `Button ${id}`,
                disabled: false,
                get class() {
                    return { 'slot': true, [`slot-${id}`]: true, 'disabled': this.disabled };
                },
                action() {
                    this.disabled = true;
                    console.log(this);
                    console.log(`Button ${id} clicked`);
                },
            };
            return button;
        }
    }));
});
