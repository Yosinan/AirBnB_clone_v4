$('document').ready(() => {
	amenity_filt = {};
	$('.popover :checkbox').change(function () {
		amenity_id = this.getAttribute('data-id');
		amenity_name = this.getAttribute('data-name');
		if (this.checked) {
			amenity_filt[amenity_name] = amenity_id;
		}else {
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
});
