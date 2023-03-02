const ham = document.getElementById("ham")
const hammenu = document.getElementById("hammenu")
const icon = document.getElementById("icon")
const nav = document.getElementById("nav")
let content = false
ham.addEventListener("click",()=>{
    console.log("you have click");
    if(content == false){
        console.log("content avse");
        hammenu.innerHTML = `<div class="nav4">
                                <ul>
                                    <li><a href="/" class="link">Home</a></li>
                                    <li><a href="/service" class="link">Service</a></li>
                                    <li><a href="/about" class="link">About</a></li>
                                    <li><a href="/contact" class="link">Contact</a></li>
                                    
                                </ul>
                            </div>`

    content = true
    icon.classList.remove("fa-bars")
    icon.classList.add("fa-xmark")
    // nav.style.display = "none"
    }
    else if(content == true){
        console.log("centent jase");
        hammenu.innerHTML = ` `
        content = false
        icon.classList.remove("fa-xmark")
        icon.classList.add("fa-bars")
    }
    
})