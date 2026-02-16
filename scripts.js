const painting = "https://api.artic.edu/api/v1/artworks/16568?fields=title,date_display,artist_display";
const tours = "https://api.artic.edu/api/v1/tours";
//const tours = "https://api.artic.edu/api/v1/tours?limit=2";

document.addEventListener('DOMContentLoaded', () => {
    const btnDescription = document.getElementById("btnDescription");
    const paintingDescription = document.getElementById("paintingDescription");
    const errorMessageDescription = document.getElementById("errMessageDescription");

    btnDescription.addEventListener("click", async() => {
        try{
            const response = await fetch(painting);
            const data = await response.json();
            const paint = data.data;

            paintingDescription.innerHTML = `
                <h4>${paint.title}</h4>
                <p>${paint.date_display}</p>
                <p>${paint.artist_display}</p>
            `;
            paintingDescription.removeAttribute("hidden");
        }

        catch (error) {
            console.error("Painting Error:", error);
            errMessageDescription.textContent = "Loading error";
            paintingDescription.removeAttribute("hidden");
        }
    });

    const btnTour = document.getElementById("btnTour");
    const tourDescription = document.getElementById("tourDescription");
    const errorMessageTour = document.getElementById("errMessageTour");

    btnTour.addEventListener("click", async() => {
        try{
            const response = await fetch(tours);
            const data = await response.json();
            const toursData = data.data;

            if(!toursData || toursData.length === 0) {
            tourDescription.textContent = "No tours found";
          }
          else{
            let html = "";
            toursData.forEach((tour) => {
            html +=`
                <h1>${tour.title}</h1>
                <p>${tour.description}</p>
            `;
          });

            tourDescription.innerHTML = html;
          }
          tourDescription.removeAttribute('hidden');
        }

        catch (error) {
            console.error("Tours Error:", error);
            errMessageTour.textContent = "Loading error";
            tourDescription.removeAttribute("hidden");
            }
    });
});