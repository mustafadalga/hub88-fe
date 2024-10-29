// resource: https://cssloaders.github.io
export default function Loader() {
    return (
        <section className="fixed inset-0 flex items-center justify-center h-screen w-screen  bg-black/75"  aria-label="Loading...">
            <span
                className="w-12 h-12 border-4 border-solid border-white border-b-indigo-500 rounded-full animate-rotation"></span>
        </section>
    );
};
