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
                this.snapToAnchor(this.cards[0], 'slot-1');

                setTimeout(() => {
                    this.animateToAnchor(this.cards[0], 'slot-2');
                }, 1000);
                setTimeout(() => {
                    this.animateToAnchor(this.cards[0], 'slot-3', false);
                }, 3000);
                setTimeout(() => {
                    this.animateToAnchor(this.cards[0], 'slot-4', false, true);
                }, 5000);
                setTimeout(() => {
                    this.animateToAnchor(this.cards[0], 'slot-6', true);
                }, 8000);
                setTimeout(() => {
                    this.animateToAnchor(this.cards[1], 'slot-1');
                }, 10000);
                setTimeout(() => {
                    this.animateToAnchor(this.cards[2], 'slot-2');
                }, 10000);
                setTimeout(() => {
                    this.animateToAnchor(this.cards[3], 'slot-3');
                }, 10000);
                setTimeout(() => {
                    this.animateToAnchor(this.cards[4], 'slot-4', false, true);
                }, 10000);
                setTimeout(() => {
                    this.snapToAnchor(this.cards[5], 'slot-0');
                }, 10000);

                
                setTimeout(() => {
                    this.animateToAnchor(this.cards[4], 'slot-6', true);
                }, 11000);
                setTimeout(() => {
                    this.animateToAnchor(this.cards[3], 'slot-4', false, true);
                }, 11050);
                setTimeout(() => {
                    this.animateToAnchor(this.cards[2], 'slot-3');
                }, 11100);
                setTimeout(() => {
                    this.animateToAnchor(this.cards[1], 'slot-2');
                }, 11150);
                setTimeout(() => {
                    this.animateToAnchor(this.cards[5], 'slot-1');
                }, 11200);
            });
        },

        createButton(id) {
            const button = {
                id: id,
                label: `Button ${id}`,
                class: `slot slot-${id}`,
            };
            return button;
        }
    }))
});
