export const slideFromBottom = {
    active: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: "easeInOut"
        }
    },
    hidden: {
        y: 100,
        opacity: 0
    }
}

export const slideFromTop = {
    active: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: "easeInOut"
        }
    },
    hidden: {
        y: -100,
        opacity: 0
    }
}