// public/script.js
const sseDataElement = document.getElementById('sse-data');

const eventSource = new EventSource('http://127.0.0.1:3000/sse');

eventSource.onmessage = (event) => {
  // Update the HTML element with the received data
  sseDataElement.innerHTML = event.data;
};

eventSource.onerror = (error) => {
  console.error('EventSource failed:', error);
};
