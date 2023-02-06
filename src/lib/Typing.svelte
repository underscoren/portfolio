<script lang="ts">
    import type { InputData } from "../lib/InputCapture.svelte"

	export let wordList: InputData[];
    export let startDelay: number = 1750;
    export let wordDelay: number = 5000;
    export let newWordDelay: number = 750;
    export let deleteDelay: number = 33;
    export let deleteFirstDelay: number = 500;

    const wait = (time: number) => new Promise(resolve => setTimeout(resolve, time));

    let typedWord: string = "";
    let cycledWordList = [...wordList];
    let isTyping = false;

    (async () => {
        await wait(startDelay);

        while(true) {
            const word = cycledWordList.shift() as InputData;
            cycledWordList.push(word); // cycle word list

            // type word
            isTyping = true;
            for(const [char, time] of word) {
                typedWord += char;
                
                if(time)
                    await wait(time);
            }
            isTyping = false;

            await wait(wordDelay);

            isTyping = true;
            
            // un-type word
            while(typedWord.length > 0) {
                const firstChar = typedWord.length == word.length;

                typedWord = typedWord.slice(0,-1);
                
                await wait(firstChar ? deleteFirstDelay : deleteDelay);
            }
            isTyping = false;

            await wait(newWordDelay);
        }
    })();
</script>

<span id="typing" class:blink={!isTyping}>{typedWord}</span>

<style lang="sass">
    @keyframes blink
        to
            visibility: hidden

    #typing
        &::after
            content: "|"
            font-weight: bold

        &.blink
            &::after
                animation: blink 1s steps(2, start) infinite



</style>