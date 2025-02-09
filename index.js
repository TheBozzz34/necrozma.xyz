document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('https://necrozma.xyz/api/scrobbles/sansman68?limit=5');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const scrobbles = await response.json();
        renderScrobbles(scrobbles);
    } catch (error) {
        console.error('Error fetching scrobbles:', error);
    }
});

const scrobbles = [];

function renderScrobbles(data) {
    const widget = document.getElementById('scrobble-widget');
    widget.innerHTML = ''; // Clear existing content

    
    data.forEach(scrobble => {
        const scrobbleElement = document.createElement('div');
        scrobbleElement.className = 'scrobble';

        const albumArt = document.createElement('img');
        albumArt.src = scrobble.image.find(img => img.size === 'extralarge')?.['#text'] || '';
        albumArt.alt = `${scrobble.artist['#text']} album art`;

        const details = document.createElement('div');
        details.className = 'scrobble-details';

        const trackLink = document.createElement('a');
        trackLink.href = scrobble.url;
        trackLink.target = '_blank';
        trackLink.textContent = scrobble.name;

        const artist = document.createElement('span');
        artist.textContent = scrobble.artist['#text'];

        const album = document.createElement('span');
        album.textContent = scrobble.album['#text'];

       /*
        if (scrobble['@attr'] && scrobble['@attr'].nowplaying === "true") {
            const recordIcon = document.createElement('div');
            recordIcon.className = 'record-icon';
            scrobbleElement.appendChild(recordIcon);
        }
*/

        details.appendChild(trackLink);
        details.appendChild(artist);
        details.appendChild(album);

        scrobbleElement.appendChild(albumArt);
        scrobbleElement.appendChild(details);
        widget.appendChild(scrobbleElement);
    });
}
