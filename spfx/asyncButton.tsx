
async function handleAsyncCall() {
    await doThings...
}

return (
    <button
        type="button"
        onClick={() => {
            void handleAsyncCall();
        }}
    ></button>
)