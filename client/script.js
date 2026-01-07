const weatherForm = document.querySelector("#weather-form");
const output = document.querySelector("#output");

weatherForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const dataObj = Object.fromEntries(formData.entries());

  try {
    const res = await fetch(`/api/GetWeather?city=${dataObj.city}`);
    const data = await res.json();

    if (!res.ok) {
      output.textContent = data.error;
      return;
    }

    output.textContent = `${data.name}: ${data.main.temp} ℃`;
  } catch (err) {
    output.textContent = err;
  }
});
