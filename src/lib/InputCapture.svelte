<script lang="ts">
    import { onMount } from "svelte";

    let inputElement: HTMLInputElement;

    type InputData = {
        char: string,
        time?: number // ms
    }

    type InputDataSerialised = [string, number];

    let inputs: InputData[] = [];
    let lastInput: number;

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

            prevInput.time = ev.timeStamp - lastInput;
            lastInput = ev.timeStamp;

            inputs.push({
                char: lastchar
            });

        });
    });
</script>

<div class="container">
    <input bind:this={inputElement} type="text">
    <button on:click={() => console.log(inputs)}>Check</button>
</div>

<style lang="sass">
    
</style>