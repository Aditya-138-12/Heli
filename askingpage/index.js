/*##########################################################################*/
async function fetchTime() {
    try {
        const response = await fetch('https://worldtimeapi.org/api/timezone/Asia/Kolkata');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        const dateTime = new Date(data.datetime);
        const hours = String(dateTime.getHours()).padStart(2, '0');
        const minutes = String(dateTime.getMinutes()).padStart(2, '0');
        const seconds = String(dateTime.getSeconds()).padStart(2, '0');
        document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
    } catch (error) {
        document.getElementById('clock').textContent = 'Error fetching time';
        console.error('There was a problem with the fetch operation:', error);
    }
}

function startClock() {
    fetchTime();
    setInterval(fetchTime, 1000); // Update time every second
}

startClock();


const draggable = document.getElementById('window');

        draggable.addEventListener('mousedown', function(e) {
            e.preventDefault();

            let shiftX = e.clientX - draggable.getBoundingClientRect().left;
            let shiftY = e.clientY - draggable.getBoundingClientRect().top;

            function moveAt(pageX, pageY) {
                draggable.style.left = pageX - shiftX + 'px';
                draggable.style.top = pageY - shiftY + 'px';
            }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            document.addEventListener('mousemove', onMouseMove);

            draggable.addEventListener('mouseup', function() {
                document.removeEventListener('mousemove', onMouseMove);
                draggable.onmouseup = null;
            });
        });

        draggable.ondragstart = function() {
            return false;
        };
        
document.getElementById("close").addEventListener('click', () => {
	document.getElementById("window").style.display = "none";
});

document.getElementById("superDumbIntelligence-overlay").addEventListener('dblclick', () => {
	document.getElementById("window").style.display = "";
	const ai_text_before = document.getElementById('ai-text');
	fadeInTextWordByWord(ai_text_before);
});

document.addEventListener("mousedown", () => {
	playMousePressSound();
});

function playMousePressSound(){
	const audio = new Audio("images/click.mp3");
	audio.play();
}


function superDumbIntelligence(userSpeechText){
var ai_textt = '';
const url = 'https://adityasaroha456.pythonanywhere.com/groq_example';
let ai_text = '';
const data = {
  query: `${userSpeechText}`
};

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => {
  //console.log('Response:', data['responses']);
  for(let i = 0; i < data['responses'].length - 1; i++){
  	ai_textt += data['responses'][i];
  }
  //console.log(ai_textt);
  
  const windowBody = document.getElementById('window-body');
  const userSpeechTextDisplayDiv = document.getElementById("userSpeechTextDisplayDiv");
  
  const ai_test = document.createElement('div');
  ai_test.classList.add('ai-test');
  ai_test.id = "ai-test";
  
  const ai_logo = document.createElement('span');
  ai_logo.classList.add('ai-logo');
  
  
  const ai_text = document.createElement('p');
  ai_text.classList.add('ai-text');
  ai_text.id = "ai-text";
  ai_text.innerText = ai_textt;
  
  ai_test.appendChild(ai_logo);
  ai_test.appendChild(ai_text);
  windowBody.insertBefore(ai_test, userSpeechTextDisplayDiv);
  fadeInTextWordByWord(ai_text);
  
})
.catch(error => {
  console.error('Error:', error);
});


}


window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;

if (window.SpeechRecognition) {
    recognition = new window.SpeechRecognition();
    recognition.interimResults = true;
    recognition.continuous = true; // Ensure recognition continues until stopped explicitly
    const userSpeechTextDisplayDiv_p = document.getElementById("userSpeechTextDisplayDiv-p");
    const windowBody = document.getElementById('window-body');
    const circle = document.getElementById("circle");
    let userSpeechText = Array();
    // Event listener for speech recognition results
    recognition.addEventListener('result', (e) => {
    	userSpeechText = Array.from(e.results)
    	.map(result => result[0])
    	.map(result => result['transcript'])
    	.join('');
    	userSpeechTextDisplayDiv_p.innerText = '';
    	userSpeechTextDisplayDiv_p.appendChild(circle);
        //console.log(userSpeechText);
        userSpeechTextDisplayDiv_p.append(userSpeechText);
    });

    // Button click event listener
    let btnCounter = 1;
    document.getElementById('speech-Button').addEventListener('click', () => {
        const btn = document.getElementById('speech-Button');
        const userSpeechTextDisplayDiv = document.getElementById("userSpeechTextDisplayDiv");
        const userSpeechTextDisplayDiv_p = document.getElementById("userSpeechTextDisplayDiv-p");
        const circle = document.getElementById("circle");

        if (btnCounter % 2 != 0) {
            // Start animation and display userSpeechTextDisplayDiv
            btn.style.animation = "rot 0.5s forwards";
            userSpeechTextDisplayDiv.style.display = "flex";

            // Start speech recognition
            recognition.start();
        } else {
            // Reverse animation and hide userSpeechTextDisplayDiv
            btn.style.animation = "rot-rev 0.5s forwards";
            userSpeechTextDisplayDiv.style.display = "none";

            // Stop speech recognition
            recognition.stop();
            userSpeechTextDisplayDiv_p.appendChild(circle);
            
            if(userSpeechText.length > 1){
            const magic = userSpeechText;
            userSpeechText = '';
            
            const windowBody = document.getElementById('window-body');
            
            const user_test = document.createElement('div');
            user_test.classList.add('user-test');
            user_test.id = "user-test";
            
            const user_logo = document.createElement('span');
            user_logo.classList.add('user-logo');
            
            const user_text = document.createElement('p');
            user_text.classList.add('user-text');
            user_text.id = "user-text";
            user_text.innerText = magic;
            user_test.appendChild(user_logo);
            user_test.appendChild(user_text);
            windowBody.insertBefore(user_test, userSpeechTextDisplayDiv);
            userSpeechTextDisplayDiv_p.innerText = '';
            userSpeechTextDisplayDiv_p.appendChild(circle);
            superDumbIntelligence(magic);
            
            }
        }

        btnCounter++;
    });
} else {
    console.error("SpeechRecognition API is not supported in this browser.");
}

function fadeInTextWordByWord(element) {
    const text = element.innerText;
    element.innerHTML = '';

    // Split text into words and wrap each word in a span
    const words = text.split(' ').map(word => {
        const span = document.createElement('span');
        span.innerText = word + ' ';
        span.style.opacity = 0;
        return span;
    });

    // Append the spans to the element
    words.forEach(span => element.appendChild(span));

    // Calculate duration and delay based on the number of words
    const totalDuration = 1000; // Total duration of 1 second
    const wordCount = words.length;
    const duration = totalDuration / wordCount;
    const delay = duration;

    // Apply Anime.js animation to each word
    anime.timeline({ loop: false })
        .add({
            targets: words,
            opacity: [0, 1],
            easing: 'easeInOutQuad',
            duration: duration,
            delay: (el, i) => delay * i
        });
}


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB1AcQ8Gx0IBA57bIMv3O51kojxUlsZJEw",
    authDomain: "heli-8370a.firebaseapp.com",
    projectId: "heli-8370a",
    storageBucket: "heli-8370a.appspot.com",
    messagingSenderId: "454703904163",
    appId: "1:454703904163:web:28e75fdc0323889c009616",
    measurementId: "G-J3KZ1KD2JX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Check if user is logged in
onAuthStateChanged(auth, (user) => {
    if (!user) {
        // No user is signed in, redirect to login page
        window.location.href = "https://aditya-138-12.github.io/Heli/site/";
    } else {
        // User is signed in
        console.log("User is signed in:", user);

        // Display user information
        const userInfoDiv = document.getElementById("user-info");
        userInfoDiv.innerHTML = `
            <p>Logged in as: ${user.email}</p>
            <p>User ID: ${user.uid}</p>
        `;
    }
});

// Logout functionality
document.getElementById("logoutBtn").addEventListener("click", () => {
    signOut(auth).then(() => {
        console.log("User signed out");
        window.location.href = "https://aditya-138-12.github.io/Heli/site/";
    }).catch((error) => {
        console.error("Error signing out:", error);
    });
});
