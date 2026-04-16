

document.addEventListener('alpine:init', () => {
    Alpine.data('app', () => ({
        mistakes: 0,
        time: 0,
        snapping: true,
        get formatTime() {
            const minutes = Math.floor(this.time / 60);
            const seconds = this.time % 60;
            return `${minutes}:${String(seconds).padStart(2, '0')}`;
        },
        cards: [
            { id: 1, question: '你好', answer: 'Hello' },
        ],

        init() {
            console.log('App initialized');
            this.cards[0].snapping = true;
            this.$nextTick(() => {
                this.snapToAnchor(this.cards[0], 'slot-1');

                setTimeout(() => {
                    this.animateToAnchor(this.cards[0], 'slot-2');
                }, 1000);
                setTimeout(() => {
                    this.snapToAnchor(this.cards[0], 'slot-3');
                }, 6000);
            });
        },

        refreshAll() {
            this.snapping = true;
            console.log('Refreshing positions for all cards');

            requestAnimationFrame(() => {
                console.log('Actually refreshing positions for all cards');
                this.cards.forEach(card => {
                    if (card.anchorId) {
                        const pos = this.getAnchorStyles(card.anchorId);
                        card.style = {
                            ...pos,
                            transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
                            opacity: 1
                        };
                    }
                });

                setTimeout(() => {
                    this.snapping = false;
                }, 100);
            });
        },

        getAnchorStyles(anchorId) {
            const board = document.querySelector('.game-board').getBoundingClientRect();
            const anchor = document.getElementById(anchorId).getBoundingClientRect();

            return {
                left: `${anchor.left - board.left}px`,
                top: `${anchor.top - board.top}px`,
                width: `${anchor.width}px`,
                height: `${anchor.height}px`
            };
        },

        snapToAnchor(card, anchorId) {
            this.snapping = true;
            card.anchorId = anchorId;
            const styles = this.getAnchorStyles(anchorId);
            card.style = { ...styles, opacity: 0 };
        },

        animateToAnchor(card, anchorId) {
            this.snapping = false;
            card.anchorId = anchorId;
            const styles = this.getAnchorStyles(anchorId);
            card.style = { ...styles, opacity: 1 };
        }
    }))
});
