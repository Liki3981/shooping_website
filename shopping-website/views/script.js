function analyzeSentiment(event) { 
	event.preventDefault(); 
	const apiKey = "YOUR_API_KEY"; 
	const text = document.getElementById("review").value; 

	const url = 
`https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&txt=${encodeURIComponent( 
		text 
	)}&lang=en`; 

	fetch(url) 
		.then((response) => { 
			if (response.ok) { 
				return response.json(); 
			} else { 
				throw new Error("Request failed"); 
			} 
		}) 
		.then((data) => { 
			const sentiment = data.score_tag; 
			// console.log(`Text: ${text}`); 
			// console.log(`Sentiment: ${sentiment}`); 
			if (sentiment == "P+") { 
				document.getElementById("result").innerHTML = "Strong Positive"; 
			} 
			if (sentiment == "P") { 
				document.getElementById("result").innerHTML = "Positive"; 
			} 
			if (sentiment == "NEU") { 
				document.getElementById("result").innerHTML = "Neutral"; 
			} 
			if (sentiment == "N") { 
				document.getElementById("result").innerHTML = "Negative"; 
			} 
			if (sentiment == "N+") { 
				document.getElementById("result").innerHTML = "Strong Negative"; 
			} 
			if (sentiment == "NONE") { 
				document.getElementById("result").innerHTML = 
					"Without Polarity"; 
			} 
		}) 
		.catch((error) => { 
			console.error("Error:", error); 
		}); 
} 
