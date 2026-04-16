

document.addEventListener('alpine:init', () => {
    Alpine.data('app', () => ({
        mistakes: 0,
        time: 0,
        get formatTime() {
            const minutes = Math.floor(this.time / 60);
            const seconds = this.time % 60;
            return `${minutes}:${String(seconds).padStart(2, '0')}`;
        },
        cards: [
            { id: 1, question: '你好', answer: 'Hello' },
            { id: 2, question: '再见', answer: 'Goodbye' },
            { id: 3, question: '谢谢', answer: 'Thank you' },
            { id: 4, question: '对不起', answer: 'Sorry' },
            { id: 5, question: '请问', answer: 'Excuse me' },
            { id: 6, question: '我爱你', answer: 'I love you' },
        ],

        init() {
            console.log('App initialized');
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

        getStyles(card, snap = false) {
            const board = document.querySelector('.game-board').getBoundingClientRect();
            const anchor = document.getElementById(card.anchorId).getBoundingClientRect();

            const styles =  {
                left: `${anchor.left - board.left}px`,
                top: `${anchor.top - board.top}px`,
                width: `${anchor.width}px`,
                height: `${anchor.height}px`,
                opacity: (card.visible ? 1 : 0),
            };
            if (snap) {
                styles.transition = 'none';
            }
            return styles;
        },

        snapToAnchor(card, anchorId, visible = false) {
            card.anchorId = anchorId;
            card.visible = visible;
            const styles = this.getStyles(card, true);
            console.log('Snapping to anchor:', anchorId, styles);
            card.style = { ...styles };
        },

        animateToAnchor(card, anchorId, reveal = false, highlight = false) {
            card.anchorId = anchorId;
            card.visible = true;
            card.highlighted = highlight;
            const styles = this.getStyles(card);
            console.log('Animating to anchor:', anchorId, styles);
            card.style = { ...styles };
            if (reveal) {
                card.revealed = true;
            }
        },

        refreshAll() {
            requestAnimationFrame(() => {
                this.cards.forEach(card => {
                    if (card.anchorId) {
                        const styles = this.getStyles(card, true);
                        console.log('Refreshing to anchor:', card.anchorId, styles);
                        card.style = { ...styles };
                    }
                });
            });
        },
    }))
});
