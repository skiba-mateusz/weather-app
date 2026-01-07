const { app } = require("@azure/functions");
const axios = require("axios");

app.http("GetWeather", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    const city = request.query.get("city") || "warsaw";
    context.log(`Http function processed request for url "${request.url}"`);

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
      const { data } = await axios.get(url);

      return {
        jsonBody: data,
      };
    } catch (err) {
      context.error(`API request failed: ${err}`);

      return {
        status: 500,
        jsonBody: { error: `Failed to featch weather details: ${err.message}` },
      };
    }
  },
});
