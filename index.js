

document.addEventListener('alpine:init', () => {
    function app() {
        return {
            count: 0,
            reset() {
                this.count = 0;
            }
        }
    }
});