var PresidentialMap = function (map_string) {
  InteractiveMap.call(this);

  /***** MAP VARIABLES *****/
  var m = this;

  this.map_string = map_string;
  this.election_type = "presidential";

  // The order of FIPS codes for building map_strings (110021211 etc)

  let stateStrings = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "57",
    "58",
    "59",
    "60",
    "61",
    "62",
    "63",
    "64",
    "65",
    "66",
    "67",
    "68",
    "69",
    "70",
    "71",
    "72",
    "73",
    "74",
    "75",
    "76",
    "77",
    "78",
    "79",
    "80",
    "81",
    "82",
    "83",
    "84",
    "85",
    "86",
    "87",
    "88",
    "89",
    "90",
    "91",
    "92",
    "93",
    "94",
    "95",
    "96",
    "97",
    "98",
    "99",
    "100",
    "101",
    "102",
    "103",
    "104",
    "105",
    "106",
    "107",
    "108",
    "109",
    "110",
    "111",
    "112",
    "113",
    "114",
    "115",
    "116",
    "117",
    "118",
    "119",
    "120",
    "121",
    "122",
    "123",
    "124",
    "125",
    "126",
    "127",
    "128",
    "129",
    "130",
    "131",
    "132",
    "133",
    "134",
    "135",
    "136",
    "137",
    "138",
    "139",
    "140",
    "141",
    "142",
    "143",
    "144",
    "145",
    "146",
    "147",
    "148",
    "149",
    "150",
    "151"
  ];
  
  // state orders
  this.state_order = stateStrings;

  // state order small states
  this.smallStates = stateStrings;

  this.specialStates = [];

  // Override Rating colors
  this.ratingColors["I"] = "#CCAD29";

  // Override State Positions
  this.statePositions["12x"] = "1";
  this.statePositions["13x"] = "-12";
  this.statePositions["33y"] = "-6";
  this.statePositions["45x"] = "-6";
  this.statePositions["47y"] = "-10";
  this.statePositions["42y"] = "-12";


  // initialize and draw the map
  this.init = function () {
    if (this.debug == 1) console.log("m.init()");

    if (
      this.map_string_cookie_name &&
      $("#map-wrapper").attr("map_type_mode") == "default"
    ) {
      var map_string_cookie = getCookie(this.map_string_cookie_name);
      if (map_string_cookie) {
        this.map_string = map_string_cookie;
        this.setUserGenerated();
      }
    }

    this.buildStates();
    // this.generateD3();
    this.loadString(this.map_string);
    this.addEventListeners();

    $("#loading").remove();
    // $(".wait-loading").css("opacity", 1);
    this.resize();
  };

  // add event listeners
  this.addEventListeners = function () {
    this.bindMapEvents();
  };


  // build the object that holds data for the states/geometry
  this.buildStates = function () {
    this.states = {};
    for (let state_fips_code in this.seats) {
      let seats = this.seats[state_fips_code];
      for (let seat_number in seats) {
        let seat = seats[seat_number];
        this.states[state_fips_code] = {
          state_abbr: seat.state_abbr,
          map_code: "9",
          e_votes: 1,
        };
        if (seat.map_code) {
          this.states[state_fips_code].map_code = seat.map_code;
        }
        if (seat.e_votes) {
          this.states[state_fips_code].e_votes = seat.e_votes;
        }
        if (seat.hex_color) {
          this.states[state_fips_code].hex_color = seat.hex_color;
        }
        if (seat.special_election) {
          this.specialStates.push(state_fips_code);

          $("#sp_" + state_fips_code).append(
            '<span class="state_info e_votes">' + seat.e_votes + "</span>"
          );
        }
      }
    }
  };

  // load a map string
  this.loadString = function (map_string) {
    if (this.debug == 1) console.log("m.loadString(" + map_string + ")");

    if (map_string.length == this.state_order.length) {
      var index = 0;

      for (var i = 0; i <= this.state_order.length - 1; i += 1) {
        var state_rating_code = map_string.substr(i, 1);
        var fips = this.state_order[index];

        if (this.races.hasOwnProperty(fips)) {
          this.races[fips].map_code = state_rating_code;
        }
        this.states[fips].map_code = state_rating_code;
        this.seats[fips][0].map_code = state_rating_code;

        index++;
      }

      this.map_string = map_string;
      this.updateElectoralVotes(this.seats);
      this.colorizeMap();

      if (map_string.indexOf("a") > -1 || map_string.indexOf("b") > -1) {
        this.colorMode = 4;
      } else if (map_string.indexOf("3") > -1 || map_string.indexOf("4") > -1) {
        this.colorMode = 3;
      } else if (map_string.indexOf("5") > -1 || map_string.indexOf("6") > -1) {
        this.colorMode = 2;
      } else {
        this.colorMode = 1;
      }
      // this.resetPalette();
    }
  };

  // set the cookies
  this.setCookies = function () {
    if (this.debug == 1) console.log("m.setCookies");
    if (this.map_string_cookie_name)
      setCookie(
        this.map_string_cookie_name,
        this.map_string,
        365,
        this.cookie_path
      );
    if (this.color_mode_cookie_name)
      setCookie(
        this.color_mode_cookie_name,
        this.colorMode,
        365,
        this.cookie_path
      );
  };

  // remove the cookies nd reset the map
  this.removeCookies = function () {
    if (this.debug == 1) console.log("m.removeCookie");
    if (this.map_string_cookie_name)
      deleteCookie(this.map_string_cookie_name, this.cookie_path);
    if (this.color_mode_cookie_name)
      deleteCookie(this.color_mode_cookie_name, this.cookie_path);
  };


  // callback method after is clicked
  this.stateClickCallback = function (stateID) {
    if (this.specialStates.includes(stateID)) {
      for (let index in this.specialStates) {
        let fips = this.specialStates[index];
        this.states[fips].map_code = String(this.seats[fips][0].map_code);
      }
      this.colorizeMap();
    }

    if ($("input#map_string").length) {
      $("input#map_string").val(this.map_string);
    }
  };
};
