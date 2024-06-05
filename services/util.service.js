function makeId(length = 5) {
    var txt = ""
    var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, timeout)
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateRandomName() {
    const names = [
        "Jhon",
        "Wick",
        "Strong",
        "Dude",
        "Yep",
        "Hello",
        "World",
        "Power",
        "Goku",
        "Super",
        "Hi",
        "You",
        "Are",
        "Awesome",
    ]
    const famName = [
        "star",
        "kamikaza",
        "family",
        "eat",
        "some",
        "banana",
        "brock",
        "david",
        "gun",
        "walk",
        "talk",
        "car",
        "wing",
        "yang",
        "snow",
        "fire",
    ]
    return (
        names[Math.floor(Math.random() * names.length)] +
        famName[Math.floor(Math.random() * names.length)]
    )
}

export const utilService = {
    makeId,
    getRandomInt,
    debounce,
    generateRandomName,
}
