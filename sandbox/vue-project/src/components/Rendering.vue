<template>
    <div id="renderer">
        <h1>Renderer</h1>
        <div id="wasm-renderer">
        </div>
    </div>
</template>

<script>
export default {
    name: "WasmExample",
    props: {
        example: "",
        autoLoad: false,
    },
    data() {
        return {
            error: "",
            loading: false,
            exampleStarted: false,
        };
    },
    computed: {
        exampleName() {
            return toTitleCase(this.example);
        }
    },
    methods: {
        async loadExample() {
            this.loading = true;
            try {
                const init = await import('@/../wasm/wubengine/wubengine.js');
                init().then(() => console.log("WASM Loaded"));
            } catch (e) {
                // TODO: Figure out a better way to ignore "control flow" errors
                if (`${e}` != "Error: Using exceptions for control flow, don't mind me. This isn't actually an error!") {
                    this.error = `An error occurred loading "${this.example}": ${e}`;
                    console.error(e);
                    this.exampleStarted = false;
                } else {
                    this.exampleStarted = true;
                }
            }
            this.loading = false;
        },
    },
    async mounted() {
        await this.$nextTick()
        if (this.autoLoad) {
            await this.loadExample()
        }
    }
};
</script>

<style>
    #renderer {
        width: 100%;
        height: 100%;

        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
</style>