window.onload = () => {
        let words 
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let currentWord = 0
        let incorrect = 0
        let matchTotal= 0
        let wordcontainer = document.querySelector("#word")
        let enterButton = document.querySelector("#submit")
        let input = document.querySelector("#input")
        let hangman = document.querySelector("#hangman")
        fetchWords()
        
        
    
        enterButton.addEventListener('click', (e) =>{
            let value = input.value
            if(value === ""){

            }else{
            let spans = wordcontainer.childNodes
            let matchFound = false
            if(value.toLowerCase() === words[currentWord].toLowerCase()){
                spans.forEach((letter) => {
                    letter.classList.remove("display")
                })
                matchFound = true

                setTimeout(() =>{
                    currentWord++
                    setWord()
                    hangman.setAttribute('src', `images/stage0.png`)
                    alert("all done!")
                }, 5000)
                
            }
            for(let i = 0; i < words[currentWord].length; i++){
                if(value.toLowerCase() === words[currentWord][i].toLowerCase()){
                    spans[i].firstChild.classList.remove("no-display")
                    matchTotal++
                    matchFound = true
                }

                }
        

            if(matchTotal === words[currentWord].length){
                setTimeout(() =>{
                    if(currentWord === 3){
                        fetchWords()
                        hangman.setAttribute('src', `images/stage0.png`)
                        matchTotal = 0
                    }else{
                        currentWord++
                        matchTotal = 0
                        setWord()
                        let keyboard = document.querySelector("#keyboard").childNodes
                        keyboard.forEach((letter) =>{
                            letter.style.color = "Black"
                        })
                        }
                    
                    
                }, 5000)
                
            }

            if(!matchFound){
                hangman.setAttribute('src', `images/stage${++incorrect}.png`)
                if(incorrect === 7){
                    setTimeout(() =>{
                        incorrect = 0
                        alert("You Lose")
                        fetchWords()
                    }, 1000)
                    
                }
                    
            }

            const clicked = document.querySelector(`#${value}`)
            clicked.style.color = "red"
            input.value = ""
        }
        })

        function setKeyboard() {
            let keyboard = document.querySelector("#keyboard")
            for(let i = 0; i < alphabet.length; i++){
                let letter = document.createElement("span")
                letter.setAttribute("id", alphabet[i])
                letter.innerHTML = alphabet[i]
                letter.addEventListener(('click'), (e) =>{
                    input.value = letter.innerText
                    
                })
                keyboard.appendChild(letter)
            }
        }


        function setWord () {
            hangman.setAttribute('src', `images/stage0.png`)
            wordcontainer.innerHTML = ""
            for(let i = 0; i < words[currentWord].length; i++){
                let div = document.createElement("div")
                let span = document.createElement("span")
                span.innerHTML = words[currentWord][i]
                span.setAttribute('class', 'no-display')
                div.appendChild(span)
                wordcontainer.appendChild(div)
            }
            
        }

        function fetchWords(){
            fetch("https://random-word-api.vercel.app/api?words=3&length=6&type=capitalized")
            .then((data)=>data.json(), (err) => console.log("no response"))
            .then((w) => {
                console.log(w)
                words = w
                setWord()
                setKeyboard()
            
        })
        }
    
    



}