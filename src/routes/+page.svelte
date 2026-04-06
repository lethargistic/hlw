<script lang="ts">
    const handlePublish = (e: Event) => {
        if (e instanceof KeyboardEvent && e.key !== 'Enter') {
            return;
        }


    }
</script>

<header>
    <div class="icon">

    </div>
    <div class="account">

    </div>
</header>
<main>
    <div class="main-wrap">
        <section class="editor-seg">
        <textarea maxlength="32" id="title-area">
        e
        </textarea>
            <textarea id="editor-area">
        aaa
        </textarea>
        </section>
        <section class="output-seg">
            <button class="publish" aria-label="publish" onclick={}>

            </button>
            <p>Your link: <span>ewewewe</span></p>
        </section>
    </div>
</main>

<style>
    main {
        display: grid;
        place-items: center;

        & .main-wrap {
            max-width: 1024px;
            width: 100%;

            margin: 4rem 0 0 0;

            & #title-area {
                font-size: 2rem;

                overflow-y: auto;
            }

            & #editor-area {
                min-height: 100vh;
            }

            & textarea {
                all: unset;

                width: 100%;
                height: 100%;
            }

            & textarea:focus-visible {
                outline: none !important;
            }
        }
    }
</style>