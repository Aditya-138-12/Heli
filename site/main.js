import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
		import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
		import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
		// TODO: Add SDKs for Firebase products that you want to use
		// https://firebase.google.com/docs/web/setup#available-libraries
		
		// Your web app's Firebase configuration
		// For Firebase JS SDK v7.20.0 and later, measurementId is optional
		const firebaseConfig = {
		apiKey: "AIzaSyB1AcQ8Gx0IBA57bIMv3O51kojxUlsZJEw",
		authDomain: "[heli-8370a.firebaseapp.com](http://heli-8370a.firebaseapp.com/)",
		projectId: "heli-8370a",
		storageBucket: "[heli-8370a.appspot.com](http://heli-8370a.appspot.com/)",
		messagingSenderId: "454703904163",
		appId: "1:454703904163:web:28e75fdc0323889c009616",
		measurementId: "G-J3KZ1KD2JX"
		};
		
		// Initialize Firebase
		const app = initializeApp(firebaseConfig);
		const analytics = getAnalytics(app);
		console.log(app);
		let email;
		let password;
		let Lemail;
		let Lpassword;
		document.getElementById("signUpBtn").addEventListener("click", () => {

		email = document.getElementById("alternateSignUpDivEmail").value;
		password = document.getElementById("alternateSignUpDivPassword").value;

		//console.log(userEmail, userPassword);

		const auth = getAuth();
		createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
		// Signed up 
		const user = userCredential.user;
		// ...
		})
		.catch((error) => {
		const errorCode = error.code;
		const errorMessage = error.message;
		// ..
		});
		});
		document.getElementById("signInBtn").addEventListener("click", () => {

		Lemail = document.getElementById("alternateSignUpDivEmail").value;
		Lpassword = document.getElementById("alternateSignUpDivPassword").value;

		const auth = getAuth();
		signInWithEmailAndPassword(auth, Lemail, Lpassword)
  		.then((userCredential) => {
    // Signed in 
    		const user = userCredential.user;
			console.log(user);
			window.location.href = "https://aditya-138-12.github.io/Heli/askingpage/";
    // ...
  		})
  		.catch((error) => {
    	const errorCode = error.code;
    	const errorMessage = error.message;
  		});
		});
