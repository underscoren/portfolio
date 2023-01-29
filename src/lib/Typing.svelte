<script lang="ts">
	export let wordList: string[];
    export let startDelay: number;
    export let letterDelay: number;
    export let wordDelay: number;

    const wait = (time: number) => new Promise(resolve => setTimeout(resolve, time));
    const pickRandom = <T>(arr: T[]) => arr[Math.floor(Math.random()*arr.length)];

    let typedWord: string;

    (async () => {
        await wait(startDelay);

        while(true) {
            const word = pickRandom(wordList);
            
        }
    })();
</script>

<span id="typing">{typedWord}</span>

<style lang="sass">
    
</style>