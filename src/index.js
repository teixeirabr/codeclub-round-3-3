addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const botScore = request.cf.botManagement.score;
  console.log(botScore); // Log the bot score
  const botDetected = "https://ztlab.net/botdetected";
  const destinationUrl = botScore < 30 ? botDetected : request.url;

  const response = await fetch(destinationUrl, request);

  return response;
}
