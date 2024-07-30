const apiUrl = 'https://api.openbrewerydb.org/breweries';
const searchInput = document.getElementById('searchInput');
const breweriesList = document.getElementById('breweriesList');

async function fetchBreweries() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const breweries = await response.json();
    return breweries;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

function displayBreweries(breweries) {
  breweriesList.innerHTML = ''; 
  breweries.forEach(brewery => {
    const breweryCard = document.createElement('div');
    breweryCard.classList.add('brewery-card');

    // Brewery name and type
    const nameType = document.createElement('h2');
    nameType.textContent = `${brewery.name} - ${brewery.brewery_type}`;
    breweryCard.appendChild(nameType);

    // Brewery address
    const address = document.createElement('p');
    address.textContent = `Address: ${brewery.street}, ${brewery.city}, ${brewery.state} ${brewery.postal_code}`;
    breweryCard.appendChild(address);

    // Brewery website URL
    if (brewery.website_url) {
      const website = document.createElement('p');
      const websiteLink = document.createElement('a');
      websiteLink.href = brewery.website_url;
      websiteLink.textContent = 'Go to Website';
      websiteLink.target = '_blank';
      website.appendChild(websiteLink);
      breweryCard.appendChild(website);
    }

    // Brewery phone number
    if (brewery.phone) {
      const phone = document.createElement('p');
      phone.textContent = `Phone: ${brewery.phone}`;
      breweryCard.appendChild(phone);
    }

    breweriesList.appendChild(breweryCard);
  });
}

function filterBreweries(breweries, query) {
  return breweries.filter(brewery =>
    brewery.name.toLowerCase().includes(query.toLowerCase())
  );
}

async function main() {
  const breweries = await fetchBreweries();
  displayBreweries(breweries);

  searchInput.addEventListener('input', function() {
    const query = this.value.trim();
    const filteredBreweries = filterBreweries(breweries, query);
    displayBreweries(filteredBreweries);
  });
}

main();
