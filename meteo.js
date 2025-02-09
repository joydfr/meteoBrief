// Fonction pour charger les données météorologiques depuis l'API OpenWeather
const fetchWeather = () => {
    // Je charge le fichier de configuration contenant la ville et le pays
    fetch('conf.json')
        .then(response => response.json())
        .then(conf => {
            // je construis l'url de mon api avec avec les paramètres de configuration city pour la ville et country pour être plus précis dans mes recherches 
            // j'utilise units=metric pour Celsius, lang=fr pour français
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${conf.city},${conf.country}&units=metric&lang=fr&appid=${env.API_KEY}`;
            // je requête l'API OpenWeather pour obtenir les données météo
            fetch(url)
                .then(response => response.json())
                .then((data) => {
                    console.log(data);
                    // Je mets à jour du nom de la ville dans l'interface grâce à l'id dans mon html
                    const spanName = document.getElementById('city');
                    spanName.innerText = data.name;

                    // je récupère la date et l'heure j'utilise Date.now et un toLocaleString pour gérer l'affichage 
                    const elementDate = document.getElementById('date');
                    const timestamp = Date.now();
                    const dateAvecOffset = new Date(timestamp);
                    elementDate.innerText = dateAvecOffset.toLocaleString();

                    // je récupère la description qui est dans un array je lui indique que je souhaite l'index zéro pour récupère la description
                    const elementDescription = document.getElementById('description');
                    elementDescription.innerText = data.weather[0].description;

                    // je récupère la temperature et utilise Math.round pour arrondir et interpole pour ajouter mon °c
                    const temperature = Math.round(data.main.temp);
                    document.getElementById('temperature').textContent = `${temperature}°C`;

                    // je récupère l'icon et la place dans mon url et indique que l'utilisation de urlIcon pour la src
                    const elementIcon = document.querySelector('#icon');
                    const icon = data.weather[0].icon;
                    const urlIcon = `https://openweathermap.org/img/w/${icon}.png`;
                    elementIcon.src = urlIcon;
                });
        });
};
// j'appele la fonction au chargement
fetchWeather();

// Je rafraîchis la météo toutes les heures
const forOneHour = 3600000;
setInterval(fetchWeather, forOneHour);
