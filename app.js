window.onload = () => {
fetch("https://random-word-api.vercel.app/api?words=3&length=6&type=capitalized")
.then((data)=>data.json(), (err) => console.log("no response"))
.then((w) => {
    console.log(w)
    let words = w
    let currentWord = 0
    let incorrect = 0
    let matchTotal= 0
    let wordcontainer = document.querySelector("#word")
    let enterButton = document.querySelector("#submit")
    let input = document.querySelector("#input")
    let hangman = document.querySelector("#hangman")
    
    setWord()
  
    enterButton.addEventListener('click', (e) =>{
        let spans = wordcontainer.childNodes
        let matchFound = false
        if(input.value.toLowerCase() === words[currentWord].toLowerCase()){
            spans.forEach((letter) => {
                letter.classList.remove("display")
            })
            matchFound = true

            setTimeout(() =>{
                currentWord++
                setWord()
                hangman.setAttribute('src', `images/stage0.png`)
            }, 5000)
            
        }
        for(let i = 0; i < words[currentWord].length; i++){
            if(input.value.toLowerCase() === words[currentWord][i].toLowerCase()){
                spans[i].classList.remove("display")
                matchTotal++
                matchFound = true
            }

            }
    

        if(matchTotal === words[currentWord].length){
            setTimeout(() =>{
                currentWord++
                setWord()
            }, 5000)
            
        }

        if(!matchFound){
            hangman.setAttribute('src', `images/stage${++incorrect}.png`)
            
                if(incorrect === 7){
                    alert("You Lose")
                }
        }

        input.value = ""
    })



















    function setWord () {
        wordcontainer.innerHTML = ""
        for(let i = 0; i < words[currentWord].length; i++){
            let span = document.createElement("span")
            span.innerHTML = words[currentWord][i]
            span.setAttribute('class', 'display')
            wordcontainer.appendChild(span)
        }
    }
})




}