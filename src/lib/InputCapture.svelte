<script context="module" lang="ts">
    export type PressedCharSerialised = [string, number] | [string];
    export type InputData = PressedCharSerialised[];
</script>

<script lang="ts">
    import { onMount } from "svelte";

    let inputElement: HTMLInputElement;

    type PressedChar = {
        char: string,
        time?: number // ms
    }

    let inputs: PressedChar[] = [];
    let lastInput: number | undefined;

    onMount(() => {
        inputElement.addEventListener("input", (ev) => {
            const prevInput = inputs.at(-1);
            
            const lastchar = inputElement.value.at(-1);
            if(!lastchar) return;
            
            if(!prevInput) { // first input

                inputs.push({
                    char: lastchar
                });

                lastInput = ev.timeStamp;
                return;
            }

            prevInput.time = ev.timeStamp - (lastInput as number);
            lastInput = ev.timeStamp;

            inputs.push({
                char: lastchar
            });

        });
    });
</script>

<div class="container">
    <input bind:this={inputElement} type="text">
    <button on:click={() => console.log(inputs, inputs.map(({char, time}) => [char,time]))}>Check</button>
    <button on:click={() => {inputs = []; lastInput = undefined; inputElement.value = ""}}>Reset</button>
</div>

<style lang="sass">
    
</style>