$('document').ready(() => {
	amenity_filt = {};
	$('.popover :checkbox').change(function () {
		amenity_id = this.getAttribute('data-id');
		amenity_name = this.getAttribute('data-name');
		if (this.checked) {
			amenity_filt[amenity_name] = amenity_id;
		} else {
			delete amenity_filt[amenity_name];
		}
		$('.amenities h4').text(Object.keys(amenities).sort().join(', '));
	});

	$.getJSON('http://127.0.0.1:5001/api/v1/status', (data) => {
		if (data.status === 'OK') {
			$('div#api_status').addClass('available');
		}else {
			$('div#api_status').removeClass('available');
		}
	});

	//Fetch places
	$.post({
		url: 'http://0.0.0.0:5001/api/v1/places_search/',
		data: JSON.stringify({}),
		headers: {
			'Content-Type': 'application/json'
		},
		success: (data) => {
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
});
