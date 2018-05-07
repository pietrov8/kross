
$(function () {

    $(".slider").owlCarousel();

    $(document).on("click", ".menu-toggle", function (e) {
        $(".nav").slideToggle();
        e.preventDefault();
    });

    $(document).on("click", ".header__search input:submit, .button-search", function (e) {
        $("div.asl_w").toggleClass("open")
    })

    jQuery(".scroll-to").on("click", function (e) {
        var href_to = jQuery(jQuery(this).attr("href"));
        jQuery('html,body').animate({
            scrollTop: href_to.offset().top
        }, 'slow');
        e.preventDefault();
    });



    $(document).on("click", ".news-tab__nav a", function (e) {
        e.preventDefault();
        var href = $(this).attr("href");
        $(".news-tab__content").hide();
        $(href).show()
        $(".news-tab__nav a").removeClass("current");
        $(this).addClass("current")
    })

    $(document).on("click", ".faq__toggle__btn span", function (e) {
        e.preventDefault();
        if ($(this).closest(".faq__toggle").find(".faq__toggle__content").is(":visible")) {
            $(".faq__toggle__btn span").removeClass("current");
            $(".faq__toggle__content").stop().slideUp();
        } else {
            $(".faq__toggle__btn span").removeClass("current");
            $(this).toggleClass("current");
            $(".faq__toggle__content").stop().slideUp();
            $(this).closest(".faq__toggle").find(".faq__toggle__content").stop().slideDown();
        }
    })
    $(document).on("change", ".questionnaire__question input", function (e) {
        $(this).closest("form").find("input[type='submit']").prop("disabled", false)
    })

});

function initMap() {
    var key = '?key=' + 'AIzaSyCfITmYECh5ZLez6emqP0P5qjxRjniDH6s&libraries=places';
    var findMap = document.getElementsByClassName('gmap');
    var scriptUrl = "http://maps.google.com/maps/api/js" + key;




    var loadMap = function(){
        for (var i = findMap.length - 1; i >= 0; i--) {
            var myMap = findMap[i];
            var infowindow = null;

            if ($(window).width() > 1170) {
                var center = new google.maps.LatLng(myMap.getAttribute('data-lat-center'), myMap.getAttribute('data-lon-center'))
            } else {
                var center = new google.maps.LatLng(myMap.getAttribute('data-lat'), myMap.getAttribute('data-lon'))
            }


            var map = new google.maps.Map(myMap, {
                zoom: parseInt(myMap.getAttribute('data-zoom')) || 13,
                center: center,
                disableDefaultUI: false,
                scrollwheel: false,
                styles: [
                    {
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#f5f5f5"
                            }
                        ]
                    },
                    {
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#616161"
                            }
                        ]
                    },
                    {
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "color": "#f5f5f5"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.country",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#8d8e9c"
                            },
                            {
                                "weight": 2
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#eeeeee"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#757575"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#e5e5e5"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#9e9e9e"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#757575"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#dadada"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#616161"
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#9e9e9e"
                            }
                        ]
                    },
                    {
                        "featureType": "transit.line",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#e5e5e5"
                            }
                        ]
                    },
                    {
                        "featureType": "transit.station",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#eeeeee"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#c9c9c9"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#9e9e9e"
                            }
                        ]
                    }
                ]
            });


            if ($(".map-legend").length) {
                // Uzupełnianie mapy markerami
                var markers = window.places_map.markers;
                var markers_table = [];
                // var infowindow = null;
                $.each(markers, function(i, item) {
                    var position = new google.maps.LatLng(item.lat, item.lon);
                    var markerOptions = {
                        id: item.id,
                        map: map,
                        icon: item.markerIcon,
                        position: position,
                        title: item.title,
                        type: item.type,
                        zIndex:1,
                        movies: item.movies,

                        animation: google.maps.Animation.DROP
                    };
                    var gmarker = new google.maps.Marker(markerOptions);
                    var contentString = item.title;

                    var infowindow = new SnazzyInfoWindow({
                        marker: gmarker,
                        content: contentString,
                        closeWhenOthersOpen: true,
                        showCloseButton: false
                    });
                    markers_table.push(gmarker);

                    google.maps.event.addListener(gmarker, "mouseover", function() {
                        this.setOptions({zIndex:30});
                    });
                    google.maps.event.addListener(gmarker, "click", function() {
                        this.setOptions({zIndex:30});
                    });

                    $("[data-filter]").on("change", function () {
                        infowindow.close()
                    })

                });

                // Filtrowanie markerów
                function filter_markers() {
                    $("[data-filter]").each(function () {

                        var category = $(this).attr("data-filter");
                        var visible_marker = $(this).is(":checked");

                        for (var i in markers_table) {
                            if (markers_table[i].type == category || category.length === 0) {
                                if (visible_marker) {
                                    markers_table[i].setVisible(true);
                                } else {
                                    markers_table[i].setVisible(false);
                                }
                            }
                        }

                    })

                }
                filter_markers();

                $("[data-filter]").on("change", function () {
                    filter_markers()
                })
            }

            var input = document.getElementById('search-box');
            var searchBox = new google.maps.places.SearchBox(input);



            map.addListener('bounds_changed', function() {
                searchBox.setBounds(map.getBounds());
            });

            var markers = [];
            searchBox.addListener('places_changed', function() {
                var places = searchBox.getPlaces();
                $(".si-float-wrapper").hide();

                if (places.length == 0) {
                    return;
                }

                // Clear out the old markers.
                markers.forEach(function(marker) {
                    marker.setMap(null);
                });
                markers = [];

                // For each place, get the icon, name and location.
                var bounds = new google.maps.LatLngBounds();
                places.forEach(function(place) {
                    if (!place.geometry) {
                        console.log("Returned place contains no geometry");
                        return;
                    }

                    // Create a marker for each place.
                    markers.push(new google.maps.Marker({
                        map: map,
                        title: place.name,
                        position: place.geometry.location
                    }));

                    if (place.geometry.viewport) {
                        // Only geocodes have viewport.
                        bounds.union(place.geometry.viewport);
                    } else {
                        bounds.extend(place.geometry.location);
                    }
                });
                map.fitBounds(bounds);
            });

            if (input.value.length > 0) {
                var address = $("#search-box").val();
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({'address': address}, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        map.setCenter(results[0].geometry.location);
                        map.setZoom(12);
                        var marker = new google.maps.Marker({
                            map: map,
                            position: results[0].geometry.location
                        });
                        markers.push(marker);
                    } else {

                    }
                });

            }

            $(".reset-map").on("click", function (e) {
                e.preventDefault();
                input.value = "";
                map.setCenter(center);
                map.setZoom(6);
                markers.forEach(function(marker) {
                    marker.setMap(null);
                });
                markers = []
            });



            google.maps.event.addDomListener(window, 'resize', function() {
                if ($(window).width() > 1170) {
                    var center = new google.maps.LatLng(myMap.getAttribute('data-lat-center'), myMap.getAttribute('data-lon-center'))
                } else {
                    var center = new google.maps.LatLng(myMap.getAttribute('data-lat'), myMap.getAttribute('data-lon'))
                }
                map.setCenter(center);
            });
        }
    };
    // $(".header__search input:submit").on("click", function () {
    //     $(".header__search input[type='submit']").trigger("click")
    // })
    // if (findMap.length) {
    //     var s = document.createElement('script');
    //     s.setAttribute('src', scriptUrl);
    //     s.onload = loadMap;
    //     document.body.appendChild(s);
    // }
    loadMap();
}

setTimeout(function () {
    initMap();
}, 100);