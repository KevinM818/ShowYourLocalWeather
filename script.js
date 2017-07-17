$(document).ready(function() {
  var x = navigator.geolocation;

  x.getCurrentPosition(success, error);

  function success(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    lat.toString();
    long.toString();

    function getCurrentWeather() {
      $.ajax({
        type: "GET",
        url:
          "https://api.darksky.net/forecast/6561d3e0bcbe285a2e55465910f309fc/" +
            lat +
            "," +
            long,
        dataType: "jsonp",
        success: function(response) {
          $("#temperature").html(
            "<h2>" +
              Math.floor(response.currently.temperature) +
              "° F" +
              "</h2>"
          );

          var str = response.timezone;
          var location = str.replace(/[/]/g, ", ").replace(/[_]/g, " ");
          $("#location").html("<h2>" + location + "</h2>");

          var tempSwap = true;
          var tempF = response.currently.temperature;
          var tempC = (tempF - 32) * (5 / 9);

          $("button").click(function() {
            if (tempSwap === false) {
              $("button").text("Convert to Fahrenheit");
              $("#temperature").html(
                "<h2>" + Math.floor(tempC) + "° C" + "</h2>"
              );
              tempSwap = true;
            } else {
              $("button").text("Convert to Celsius");
              $("#temperature").html(
                "<h2>" + Math.floor(tempF) + "° F" + "</h2>"
              );
              tempSwap = false;
            }
          });

          switch (response.currently.icon) {
            case "clear-day":
              var icon = new Skycons({ color: "orange" });
              icon.set("icon", Skycons.CLEAR_DAY);
              $("body").css(
                "background-image",
                "url('http://www.zastavki.com/pictures/originals/2014/Nature___Seasons___Spring_Clear_day_in_spring_field_067763_.jpg')"
              );
              break;
            case "clear-night":
              var icon = new Skycons({ color: "white" });
              icon.set("icon", Skycons.CLEAR_NIGHT);
              $("body").css(
                "background-image",
                "url('https://c1.staticflickr.com/8/7417/16173818807_0c03de5441_b.jpg')"
              );
              break;
            case "rain":
              var icon = new Skycons({ color: "grey" });
              icon.set("icon", Skycons.RAIN);
              $("body").css(
                "background-image",
                "url('http://richmondstandard.com/wp-content/uploads/2017/01/rain.1-3.jpg')"
              );
              break;
            case "snow":
              var icon = new Skycons({ color: "white" });
              icon.set("icon", Skycons.SNOW);
              $("body").css(
                "background-image",
                "url('http://assets.atlasobscura.com/article_images/lg/40349/image.jpg')"
              );
              break;
            case "sleet":
              var icon = new Skycons({ color: "white" });
              icon.set("icon", Skycons.SLEET);
              $("body").css(
                "background-image",
                "url('http://userscontent2.emaze.com/images/bbd90de0-8277-425e-968f-17389ac3076e/8f36d322-9e19-4e75-8a90-82e309b1758e.jpg')"
              );
              break;
            case "wind":
              var icon = new Skycons({ color: "black" });
              icon.set("icon", Skycons.WIND);
              $("body").css(
                "background-image",
                "url('http://www.phantomacademy.com/wp-content/uploads/2016/07/windy-drone.jpg')"
              );
              break;
            case "fog":
              var icon = new Skycons({ color: "grey" });
              icon.set("icon", Skycons.FOG);
              $("body").css(
                "background-image",
                "url('https://blog.oup.com/wp-content/uploads/2016/11/1260-fog.jpg')"
              );
              break;
            case "cloudy":
              var icon = new Skycons({ color: "grey" });
              icon.set("icon", Skycons.CLOUDY);
              $("body").css(
                "background-image",
                "url('http://wallpapercave.com/wp/SNh7WLs.jpg')"
              );
              break;
            case "partly-cloudy-day":
              var icon = new Skycons({ color: "orange" });
              icon.set("icon", Skycons.PARTLY_CLOUDY_DAY);
              $("body").css(
                "background-image",
                "url('https://ak2.picdn.net/shutterstock/videos/8917885/thumb/1.jpg?i10c=img.resize(height:160)')"
              );
              break;
            case "partly-cloudy-night":
              var icon = new Skycons({ color: "white" });
              icon.set("icon", Skycons.PARTLY_CLOUDY_NIGHT);
              $("body").css(
                "background-image",
                "url('http://timbrosius.com/wp-content/uploads/2015/07/night-sky-clearing_IMG_0121.jpg')"
              );
              break;
          }

          icon.play();
          $("body").css("background-size", "cover");
          $("body").css("background-position", "center");
          $("body").css("background-repeat", "no-repeat");
          $("body").css("height", "100vh");

          $("#summary").html(response.currently.summary);
          $("#humidity").html("Humidity: " + response.currently.humidity);
          $("#windSpeed").html(
            "Wind Speed: " + response.currently.windSpeed + " mph"
          );
          $("#precipProbability").html(
            "Chance of Preciptation: " +
              response.currently.precipProbability +
              "%"
          );
        }
      });
    }

    getCurrentWeather();
  }

  function error() {
    $(".container").html("<p>Error finding location</p>");
  }
});