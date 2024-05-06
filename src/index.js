/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const responses = [
  "May the Force be with you!",
  "The dark side clouds everything.",
  "Do or do not. There is no try.",
  "Fear is the path to the dark side. Fear leads to anger, anger leads to hate, hate leads to suffering."
];

async function fetchRandomCharacter() {
  const randomIndex = Math.floor(Math.random() * 82) + 1;
  const characterData = await fetch(`https://swapi.dev/api/people/${randomIndex}`);
  const characterJson = await characterData.json();
  return characterJson.name;
}

async function handleRequest(request) {
  const characterName = await fetchRandomCharacter();

  const randomIndex = Math.floor(Math.random() * responses.length);
  const randomResponse = responses[randomIndex];

  // Construct the final response with random response and character name
  const finalResponse = `Star Wars' Quote Of The Day: ${randomResponse}\n\nStar Wars' Character Of The Day: ${characterName}`;

  // Set response headers
  const headers = new Headers();
  headers.set('Content-Type', 'text/plain');

  return new Response(finalResponse, {
    headers
  });
}

  

