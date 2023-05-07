$('document').ready(() => {
  const amenityFilt = {};
  const cities = {};
  const states = {};
  $('.popover :checkbox').change(function () {
    const amenityId = this.getAttribute('data-id');
    const amenityName = this.getAttribute('data-name');
    if (this.checked) {
      amenityFilt[amenityName] = amenityId;
    } else {
      delete amenityFilt[amenityName];
    }
    $('.amenities h4').text(Object.keys(amenityFilt).sort().join(', '));
  });
  // check the status of the api
  $.getJSON('http://127.0.0.1:5001/api/v1/status', (data) => {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
  $('.filters button').bind('click', searchPlaces);

  // Fetch places
  function searchPlaces () {
    $.post({
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      data: JSON.stringify({ amenities: Object.values(amenityFilt), states: Object.values(states), cities: Object.values(cities) }),
      headers: {
        'Content-Type': 'application/json'
      },
      success: (data) => {
        $('section.places').empty();
        data.forEach(place => $('section.places').append(
      `<article>
        <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">$${place.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
            <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
        </div>
        <div class="description">
          ${place.description}
        </div>
      </article>`
        ));
      },
      dataType: 'json'
    });
  }
});
