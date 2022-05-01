const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')

async function load () {
    const res = await fetch('http://localhost:3000/').then(data => data.json())
    res.urls.map((name, url) => addElement(name, url))  
}

load()

function addElement({ name, url }) {
    const li = document.createElement('li')
    const a = document.createElement("a")
    const trash = document.createElement("span")

    a.href = url
    a.innerHTML = name
    a.target = "_blank"

    trash.innerHTML = "x"
    trash.onclick = () => removeElement(trash)

    li.append(a)
    li.append(trash)
    ul.append(li)
}

function removeElement(el) {
    const a = el.parentNode.getElementsByTagName('a')
    const arr = [...a]

    if (confirm('Are you sure?')) {
        el.parentNode.remove()
        fetch(`http://localhost:3000/?name=${ele.innerText}&url=${ele.href}&del=1`)
    }
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    let { value } = input

    if (!value) 
        return alert('Url name and the url address field is required')

    const [name, url] = value.split(",")

    if (!url) 
        return alert('Url address is missing')

    if (!/^http/.test(url)) 
        return alert("Url with wrong format")

    addElement({ name, url })
    await fetch(`http://localhost:3000/?name=${name}&url=${url}`)

    input.value = ""
})