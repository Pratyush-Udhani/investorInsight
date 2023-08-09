const Toggle = () => {
    return(
        <button className="mx-auto flex w-fit gap-5 rounded-lg border border-border bg-button_bg p-2 hover:border-white"
        name="theme-toggle"
        >
            <label className="cursor-pointer text-text_white">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 fill-current stroke-current stroke-2 transition-colors duration-300"
                viewBox="0 0 24 24"
            >
                <path
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                ></path>
            </svg>
            </label>
            <label className="cursor-pointer text-primary">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 fill-current stroke-current transition-colors duration-300"
                viewBox="0 0 20 20"
            >
                <path
                d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                ></path>
            </svg>
            </label>
        </button>
    )
}

export default Toggle
