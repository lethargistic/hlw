<script lang="ts">
    const handlePublish = (e: Event) => {
        if (e instanceof KeyboardEvent && e.key !== 'Enter') {
            return;
        }

        // TODO now: publish
    }
</script>

<div class="full-wrap">
    <div class="inner-wrap">
        <header>
            <div class="icon">
                vlvt
            </div>
            <div class="account">
                account
            </div>
        </header>
        <main>
            <section class="editor-seg">
                <!-- TODO: 間もなく make these random -->
                <input class="font-lexend" type="text" maxlength="32" id="title-input" placeholder="Title goes here...">
                <textarea id="editor-area" placeholder="Write something..."></textarea>
            </section>
            <section class="publish-seg">
                <button class="publish" aria-label="publish" onclick={handlePublish}>
                    Publish
                </button>
                <p>Your link: <span>ewewewe</span></p>
            </section>
        </main>
        <footer>
            © 2026 i consume yuri media to survive
        </footer>
    </div>
</div>

<style>
    .full-wrap {
        display: grid;
        place-items: center;

        & header {
            display: flex;

            & .account {
                margin-left: auto;
            }
        }

        & .inner-wrap {
            max-width: 1024px;
            width: 100%;
            padding: 3rem 0 4rem 0;

            & main {
                & .editor-seg {
                    & #title-input {
                        font-size: 3rem;
                        padding: 2rem 0 0 0;

                        font-weight: 350;

                        text-overflow: ellipsis;
                        overflow-y: auto;
                    }

                    & #editor-area {
                        min-height: 100vh;
                        padding: 2.5rem 0.15rem 0;

                        font-size: 1.5rem;

                        resize: none;
                    }

                    & textarea, input {
                        all: unset;
                        width: 100%;
                        white-space: pre-wrap;
                        overflow-wrap: break-word;
                    }

                    & textarea,input:focus-visible {
                        outline: none !important;
                    }
                }
            }
        }
    }
</style>