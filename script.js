const speakBtn = document.getElementById("speakBtn");
const stopSpeakingBtn = document.getElementById("stopSpeakingBtn");
const transcriptElement = document.getElementById("transcript");
const answerBox = document.getElementById("answerBox");
const answerText = document.getElementById("answerText");
const statusBadge = document.getElementById("statusBadge");
const articleLink = document.getElementById("articleLink");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "en-US";
recognition.interimResults = false;

// Start listening
speakBtn.addEventListener("click", () => {
  recognition.start();
  statusBadge.innerText = "Listening...";
});

// Stop speaking
stopSpeakingBtn.addEventListener("click", () => {
  window.speechSynthesis.cancel();
  statusBadge.innerText = "Stopped Speaking";
});

// On voice result
recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript.toLowerCase();
  transcriptElement.innerHTML = `<strong>You said:</strong> ${transcript}`;
  respondToCommand(transcript);
  statusBadge.innerText = "Processing...";
};

// When recognition ends
recognition.onend = () => {
  statusBadge.innerText = "Idle";
};

function respondToCommand(command) {
  let response = "";
  let link = null;

  if (command.includes("time")) {
    const now = new Date();
    response = `It is currently ${now.toLocaleTimeString()}`;
  } else if (command.includes("date")) {
    const today = new Date();
    response = `Today's date is ${today.toDateString()}`;
  } else if (command.includes("joke")) {
    response = "Why do programmers prefer dark mode? Because light attracts bugs!";
  } else if (command.includes("fact")) {
    response = "Did you know? The first computer virus was created in 1986.";
  } else if (command.includes("open google")) {
    response = "Opening Google...";
    speak(response);
    window.open("https://www.google.com", "_blank");
    resetUIAfterDelay();
    return;
  } else if (command.includes("search for")) {
    const query = command.replace("search for", "").trim();
    response = `Searching for ${query}...`;
    speak(response);
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
    resetUIAfterDelay();
    return;
  } else if (command.includes("albert einstein")) {
    response = "Albert Einstein was a theoretical physicist who developed the theory of relativity.";
    link = "https://en.wikipedia.org/wiki/Albert_Einstein";
  } else {
    fetchWikipediaSummary(command);
    return;
  }

  speak(response);
  answerText.innerText = response;
  answerBox.style.display = "block";

  if (link) {
    articleLink.href = link;
    articleLink.style.display = "inline";
  } else {
    articleLink.style.display = "none";
  }
}

// Speak text aloud
function speak(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.pitch = 1;
  utterance.rate = 1;
  synth.speak(utterance);
}

// Reset UI after external actions like opening Google
function resetUIAfterDelay() {
  setTimeout(() => {
    answerBox.style.display = "none";
    answerText.innerText = "";
    articleLink.style.display = "none";
    transcriptElement.innerText = "Say something...";
    statusBadge.innerText = "Idle";
  }, 3000);
}

// Fetch a short summary from Wikipedia
async function fetchWikipediaSummary(query) {
  const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Not found");

    const data = await response.json();

    if (data.extract) {
      speak(data.extract);
      answerText.innerText = data.extract;
      answerBox.style.display = "block";

      if (data.content_urls?.desktop?.page) {
        articleLink.href = data.content_urls.desktop.page;
        articleLink.style.display = "inline";
      } else {
        articleLink.style.display = "none";
      }
    } else {
      fetchGoogleSnippet(query);
    }
  } catch (error) {
    fetchGoogleSnippet(query);
  }
}

// ✅ Fetch Google Snippet via Serper.dev API
async function fetchGoogleSnippet(query) {
  const apiKey = "2960767a7ee1bb51e77b5d9291ceb13e10822d43"; // 🔐 Replace with your Serper.dev API key

  try {
    const response = await fetch("https://google.serper.dev/search", {
      method: "POST",
      headers: {
        "X-API-KEY": apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ q: query })
    });

    const data = await response.json();

    if (data?.organic?.length > 0) {
      const snippet = data.organic[0].snippet || "Here's what I found on Google.";
      const link = data.organic[0].link;

      speak(snippet);
      answerText.innerText = snippet;
      articleLink.href = link;
      articleLink.style.display = "inline";
      answerBox.style.display = "block";
    } else {
      fallbackToGoogleLink(query);
    }
  } catch (error) {
    fallbackToGoogleLink(query);
  }
}

// Final fallback if both Wikipedia and Serper fail
function fallbackToGoogleLink(query) {
  const msg = "I couldn't find an exact answer, but here's what I found on Google.";
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

  speak(msg);
  answerText.innerText = msg;
  articleLink.href = searchUrl;
  articleLink.style.display = "inline";
  answerBox.style.display = "block";
}

// Update date and time
function updateTime() {
  const now = new Date();
  document.getElementById("currentTime").innerText = now.toLocaleTimeString();
  document.getElementById("currentDate").innerText = now.toDateString();
}
setInterval(updateTime, 1000);
updateTime();

// Enable quick command clicks
document.querySelectorAll(".command").forEach(cmd => {
  cmd.addEventListener("click", () => {
    respondToCommand(cmd.getAttribute("data-command"));
  });
});
