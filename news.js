document.addEventListener('DOMContentLoaded', () => {
    const rssFeedUrl = 'https://www.news-medical.net/?tag=/GLP-1';

    fetchRSSFeed(rssFeedUrl);
});

function fetchRSSFeed(url) {
    fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`)
        .then(response => response.json())
        .then(data => displayRSSFeed(data.items))
        .catch(error => console.error('Error fetching RSS feed:', error));
}

function displayRSSFeed(items) {
    const newsList = document.getElementById('news-list');
    items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <a href="${item.link}" target="_blank">${item.title}</a>
            <p>${item.description}</p>
        `;
        newsList.appendChild(listItem);
    });
}
