var InteractiveMap = function () {
  var m = this;

  this.map_string = "";
  this.hashid = "";

  this.election_type = "";
  this.i_tallied_with = "I";
  this.enable_3p = [];
  this.exclude_inactive_races = [];
  this.specialStates = [];
  this.splitVotes = [];
  this.is_historical = false;
  this.states = {};
  this.views = {};
  this.currentView = "I";
  this.isInteractive = true;
  this.enableInteractive = true;
  this.colorMode = 3;
  this.enableTilt = true;
  this.mapstring_cookie_name = "";
  this.color_mode_cookie_name = "";
  this.debug = 0;
  this.default_hashid = "";
  this.default_font_size = 8;
  this.default_line_height = 8.5;
  this.is_mobile = false;

  // COLORS AND VOTE IDENTIFICATION
  this.ratingColors = {
    T: "#c4c4c4", // vote not-assigned CHANGED!!!!!
    R1: "#CF8980", // Tilt R
    R2: "#2c7454", // Lean R CHANGED!!!!!
    R3: "#1c509c", // Likely R CHANGED!!!!!
    R4: "#e2363e", // Safe R CHANGED!!!!!
    R: "#D22532", // R
    D: "#244999", // D
    D4: "#009c3d", // Safe D CHANGED!!!!!
    D3: "#f8ef21", // Likely D CHANGED!!!!!
    D2: "#f36d24", // Lean D CHANGED!!!!!
    D1: "#949BB3", // Tilt D
    I: "#008000", // Independent green
    L: "#FF8000", // Libertarian
    S: "#800080", // purple split
    N: "#DDDDDD", // unpolled gray
    RR: "#FF0000", // Winner R,
    DD: "#0000FF", // Winner R,
    II: "#00BB00", // Winner I,
    O: "#DAA520", // Runoff
    P: "#6C46C2", // Tie (Purple)
  };

  // EQUIVALENCE FOR COLORS

  // T = vote not-assigned                   #c4c4c4
  // R4 = (ALP) Australian Labor Party       #e2363e
  // R3 = (LP) Liberal Party of Australia    #1c509c
  // R2 = (NPA) National Party of Australia  #2c7454
  // D4 = (Greens) Australian Greens         #009c3d
  // D3 = (UAP) United Australia Party       #f8ef21
  // D2 = (ONP) Pauline Hanson's One         #f36d24


  this.mapCodeRatings = {
    0: "T",
    1: "D4",
    2: "R4",
    3: "D3",
    4: "R3",
    5: "D2",
    6: "R2",
    7: "I",
    8: "S",
    9: "N",
    a: "D1",
    b: "R1",
    c: "DD",
    d: "RR",
    e: "II",
    f: "O",
    l: "L",
    p: "P",
  };

  this.ratingMapCodes = {
    T: 0,
    D: 1,
    D4: 1,
    R: 2,
    R4: 2,
    D3: 3,
    R3: 4,
    D2: 5,
    R2: 6,
    D1: "a",
    R1: "b",
    I: 7,
    S: 8,
    N: 9,
    DD: "c",
    RR: "d",
    II: "e",
    O: "f",
    L: "l",
    P: "p",
  };

  // State Positions
  this.statePositions = {
    // AL
    "01x": "-10",
    "01y": "-15",

    // AK
    "02x": "-10",
    "02y": "-15",

    // AZ
    "04x": "-10",
    "04y": "-15",

    // AR
    "05x": "-10",
    "05y": "-10",

    // CA
    "06x": "-20",
    "06y": "-15",

    // CO
    "08x": "-10",
    "08y": "-15",

    // CT
    "09x": "-10",
    "09y": "-15",

    // DE
    "10x": "-10",
    "10y": "-15",

    // FL
    "12x": "-2",
    "12y": "-15",

    // GA
    "13x": "-15",
    "13y": "-15",

    // HI
    "15x": "-15",
    "15y": "-0",

    // ID
    "16x": "-15",
    "16y": "-10",

    // IL
    "17x": "-10",
    "17y": "-15",

    // IN
    "18x": "-10",
    "18y": "-15",

    // IA
    "19x": "-10",
    "19y": "-10",

    // KS
    "20x": "-10",
    "20y": "-10",

    // KY
    "21x": "-0",
    "21y": "-12",

    // LA
    "22x": "-20",
    "22y": "-15",

    // ME
    "23x": "-10",
    "23y": "-10",

    // MD
    "24x": "-10",
    "24y": "-15",

    // MA
    "25x": "-10",
    "25y": "-15",

    // MI
    "26x": "-5",
    "26y": "-0",

    // MN
    "27x": "-15",
    "27y": "-15",

    // MS
    "28x": "-10",
    "28y": "-15",

    // MO
    "29x": "-15",
    "29y": "-15",

    // MT
    "30x": "-10",
    "30y": "-15",

    // NE
    "31x": "-10",
    "31y": "-10",

    // NV
    "32x": "-10",
    "32y": "-15",

    // NH
    "33x": "-10",
    "33y": "-0",

    // NJ
    "34x": "-10",
    "34y": "-15",

    // MN
    "35x": "-10",
    "35y": "-15",

    // NY
    "36x": "-5",
    "36y": "-15",

    // NC
    "37x": "-0",
    "37y": "-10",

    // ND
    "38x": "-10",
    "38y": "-12",

    // OH
    "39x": "-10",
    "39y": "-10",

    // OK
    "40x": "-10",
    "40y": "-10",

    // OR
    "41x": "-10",
    "41y": "-10",

    // PA
    "42x": "-10",
    "42y": "-10",

    // RI
    "44x": "-10",
    "44y": "-15",

    // SC
    "45x": "-10",
    "45y": "-8",

    // SD
    "46x": "-10",
    "46y": "-12",

    // TN
    "47x": "-10",
    "47y": "-8",

    // TX
    "48x": "-10",
    "48y": "-15",

    // UT
    "49x": "-10",
    "49y": "-12",

    // VT
    "50x": "-12",
    "50y": "-15",

    // VA
    "51x": "-5",
    "51y": "-15",

    // WA
    "53x": "-8",
    "53y": "-10",

    // WV
    "54x": "-13",
    "54y": "-5",

    // WI
    "55x": "-10",
    "55y": "-10",

    // WY
    "56x": "-10",
    "56y": "-15",
  };

  /***** MAP METHODS *****/

  /**
   * Initialize and draw the map
   */
  this.init = function () {
    if (this.debug == 1) console.log("m.init()");

    this.buildStates();
    this.generateD3();
    this.addEventListeners();

    $("#loading").remove();
    // $(".wait-loading").css("opacity", 1);
  };

  /**
   * Build the object that holds data for the states/geometry
   */
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
      }
    }
  };

  /**
   * Add event listeners
   */
  this.addEventListeners = function () {};

  /**
   * Reset Map
   */
  this.reset = function () {
    if (this.debug == 1) console.log("m.reset()");

    $("#map-wrapper").attr("map_type_mode", "default");

    if (this.default_hashid) {
      this.hashid = this.default_hashid;
    } else {
      this.hashid = $("select#change_starting_view option:first-child").val();
    }

    if ($("select#change_starting_view").length) {
      $("select#change_starting_view option:first-child").attr(
        "selected",
        "selected"
      );
      $("select#change_starting_view").val(this.hashid).trigger("change");
    }

    this.loadString(this.views[this.hashid].map_string);
    this.removeCookies();
    this.resetCallback();
  };

  /**
   * Callback method after reset
   */
  this.resetCallback = function () {};

  /**
   * Resize the map
   */
  this.resize = function () {
    $("#map svg").remove();
    $("#map_description").css("min-height", "unset");

    this.buildStates();
    this.generateD3();
    this.loadString(this.map_string);

    this.colorMode = this.colorModeUser;
    // this.resetPalette();
    setTimeout(function () {
      $("#palette-chooser #" + m.colorPaletteUser).addClass("selected");
    }, 50);
  };

  /**
   * Return a map_string ie 1122001201...
   */
  this.mapStringify = function () {
    if (this.debug == 1) console.log("m.mapStringify()");

    this.map_string = "";

    for (let st in this.state_order) {
      for (let i in this.seats[this.state_order[st]]) {
        let map_code = this.seats[this.state_order[st]][i].map_code;
        // add the incumbent party
        if (
          map_code == 9 &&
          !this.seats[this.state_order[st]][i].special_election
        ) {
          map_code =
            this.ratingMapCodes[this.seats[this.state_order[st]][i].seat_party];
        }
        if (map_code == undefined) {
          map_code = 9;
        }
        this.map_string += map_code;
      }
    }

    if (this.vp !== undefined) {
      this.map_string += this.vp;
    }

    return this.map_string;
  };

  /**
   * Recalculate electoral votes based on map state
   */
  this.updateElectoralVotes = function (seats = this.seats) {
    if (this.debug == 1) console.log("m.updateElectoralVotes()");

    let t_total = 0;
    let p_total = 0;
    let o_total = 0;
    let i_total = 0;
    let l_total = 0;
    let ii_total = 0;
    let r1_total = 0;
    let r2_total = 0;
    let r3_total = 0;
    let r4_total = 0;
    let rr_total = 0;
    let d1_total = 0;
    let d2_total = 0;
    let d3_total = 0;
    let d4_total = 0;
    let dd_total = 0;
    let d_no_race_total = 0;
    let r_no_race_total = 0;
    let i_no_race_total = 0;
    let n_total = 0; // Number of states not polled

    for (let state_fips_code in seats) {

      // Iterate through seats
      for (let seat_number in seats[state_fips_code]) {
        var map_code = seats[state_fips_code][seat_number].map_code;
        var evotes = parseInt(seats[state_fips_code][seat_number].e_votes);
        if (evotes == undefined || isNaN(evotes)) {
          evotes = 1;
        }

        if (map_code == 1) {
          d4_total += evotes;
        } else if (map_code == 2) {
          r4_total += evotes;
        } else if (map_code == 3) {
          d3_total += evotes;
        } else if (map_code == 4) {
          r3_total += evotes;
        } else if (map_code == 5) {
          d2_total += evotes;
        } else if (map_code == 6) {
          r2_total += evotes;
        } else if (map_code == "a") {
          d1_total += evotes;
        } else if (map_code == "b") {
          r1_total += evotes;
        } else if (map_code == 7) {
          i_total += evotes;
        } else if (map_code == "c") {
          dd_total += evotes;
        } else if (map_code == "d") {
          rr_total += evotes;
        } else if (map_code == "e") {
          ii_total += evotes;
        } else if (map_code == "f") {
          o_total += evotes;
        } else if (map_code == "l") {
          l_total += evotes;
        } else if (map_code == "p") {
          p_total += evotes;
        } else if (map_code == 9) {
          if (seats[state_fips_code][seat_number].seat_party == "D") {
            d_no_race_total += evotes;
          } else if (seats[state_fips_code][seat_number].seat_party == "R") {
            r_no_race_total += evotes;
          } else if (seats[state_fips_code][seat_number].seat_party == "I") {
            i_no_race_total += evotes;
          } else if (seats[state_fips_code][seat_number].seat_party == "L") {
            l_total += evotes;
          } else if (seats[state_fips_code][seat_number].seat_party == "N") {
            n_total += evotes;
          }
        } else if (map_code == 0) {
          t_total += evotes;
        }
      }
    }

    // Calculate totals
    let d_total = d4_total;
    let r_total = r4_total;
    if (!this.is_historical) {
      d_total =
        d_no_race_total + d1_total + d2_total + d3_total + d4_total + dd_total;
      r_total =
        r_no_race_total + r1_total + r2_total + r3_total + r4_total + rr_total;
    }

    if (this.i_tallied_with == "D") {
      d_total += i_total + ii_total + i_no_race_total;
    }
    if (this.exclude_inactive_races.indexOf("party_tally") > -1) {
      d_total -= d_no_race_total;
      r_total -= r_no_race_total;
      i_total -= i_no_race_total;
    }
    if (this.exclude_inactive_races.indexOf("party_counter") > -1) {
      d_no_race_total = 0;
      r_no_race_total = 0;
      i_no_race_total = 0;
      n_total = 0;
    }

    // Calculate single segment width
    let total_votes =
      d_no_race_total +
      d4_total +
      d3_total +
      d2_total +
      d1_total +
      r_no_race_total +
      r4_total +
      r3_total +
      r2_total +
      r1_total +
      i_no_race_total +
      i_total +
      t_total +
      l_total +
      dd_total +
      rr_total +
      ii_total +
      o_total +
      p_total;
    let width = Math.floor($("#ev_bar").width());
    let segment_width = width / total_votes;
    let threshold_width = 6;

    // Calculate all segment widths
    var d_no_race_width = d_no_race_total * segment_width;
    var dd_width = dd_total * segment_width;
    var d4_width = d4_total * segment_width;
    var d3_width = d3_total * segment_width;
    var d2_width = d2_total * segment_width;
    var d1_width = d1_total * segment_width;
    var r_no_race_width = r_no_race_total * segment_width;
    var rr_width = rr_total * segment_width;
    var r4_width = r4_total * segment_width;
    var r3_width = r3_total * segment_width;
    var r2_width = r2_total * segment_width;
    var r1_width = r1_total * segment_width;
    var t_width = t_total * segment_width;
    var n_width = n_total * segment_width;
    var o_width = o_total * segment_width;
    var p_width = p_total * segment_width;
    var l_width = l_total * segment_width;
    var i_width = (i_total + i_no_race_total) * segment_width;
    var ii_width = ii_total * segment_width;

    if (d_no_race_total == 0) {
      $("#d_no_race_color").hide();
    } else {
      $("#d_no_race_color").show();
      $("#d_no_race_ev").html(d_no_race_total);
    }

    if (dd_total == 0) {
      $("#dd_color").hide();
    } else {
      $("#dd_color").show();
      $("#dd_ev").html(dd_width > threshold_width ? dd_total : "&nbsp;");
    }

    if (d4_total == 0) {
      $("#d4_color").hide();
    } else {
      $("#d4_color").show();
      $("#d4_ev").html(d4_width > threshold_width ? d4_total : "&nbsp;");
    }

    if (d3_total == 0) {
      $("#d3_color").hide();
    } else {
      $("#d3_color").show();
      $("#d3_ev").html(d3_width > threshold_width ? d3_total : "&nbsp;");
    }

    if (d2_total == 0) {
      $("#d2_color").hide();
    } else {
      $("#d2_color").show();
      $("#d2_ev").html(d2_width > threshold_width ? d2_total : "&nbsp;");
    }

    if (d1_total == 0) {
      $("#d1_color").hide();
    } else {
      $("#d1_color").show();
      $("#d1_ev").html(d1_width > threshold_width ? d1_total : "&nbsp;");
    }

    if (t_total == 0) {
      $("#t_color").hide();
    } else {
      $("#t_color").show();
      $("#t_ev").html(t_width > threshold_width ? t_total : "&nbsp;");
    }

    if (n_total == 0) {
      $("#n_color").hide();
    } else {
      $("#n_color").show();
      $("#n_ev").html(n_width > threshold_width ? n_total : "&nbsp;");
    }

    if (p_total == 0) {
      $("#p_color").hide();
    } else {
      $("#p_color").show();
      $("#p_ev").html(p_width > threshold_width ? p_total : "&nbsp;");
    }

    if (o_total == 0) {
      $("#o_color").hide();
    } else {
      $("#o_color").show();
      $("#o_ev").html(o_width > threshold_width ? o_total : "&nbsp;");
    }

    if (l_total == 0) {
      $("#l_color").hide();
    } else {
      $("#l_color").show();
      $("#l_ev").html(l_width > threshold_width ? l_total : "&nbsp;");
    }

    if (i_total + i_no_race_total == 0) {
      $("#i_color").hide();
    } else {
      $("#i_color").show();
      $("#i_ev").html(
        i_width > threshold_width ? i_total + i_no_race_total : "&nbsp;"
      );
    }

    if (ii_total == 0) {
      $("#ii_color").hide();
    } else {
      $("#ii_color").show();
      $("#ii_ev").html(ii_width > threshold_width ? ii_total : "&nbsp;");
    }

    if (rr_total == 0) {
      $("#rr_color").hide();
    } else {
      $("#rr_color").show();
      $("#rr_ev").html(rr_width > threshold_width ? rr_total : "&nbsp;");
    }

    if (r4_total == 0) {
      $("#r4_color").hide();
    } else {
      $("#r4_color").show();
      $("#r4_ev").html(r4_width > threshold_width ? r4_total : "&nbsp;");
    }

    if (r3_total == 0) {
      $("#r3_color").hide();
    } else {
      $("#r3_color").show();
      $("#r3_ev").html(r3_width > threshold_width ? r3_total : "&nbsp;");
    }

    if (r2_total == 0) {
      $("#r2_color").hide();
    } else {
      $("#r2_color").show();
      $("#r2_ev").html(r2_width > threshold_width ? r2_total : "&nbsp;");
    }

    if (r1_total == 0) {
      $("#r1_color").hide();
    } else {
      $("#r1_color").show();
      $("#r1_ev").html(r1_width > threshold_width ? r1_total : "&nbsp;");
    }

    if (r_no_race_total == 0) {
      $("#r_no_race_color").hide();
    } else {
      $("#r_no_race_color").show();
      $("#r_no_race_ev").html(r_no_race_total);
    }

    $("#dem_ev").html(d_total);
    $("#rep_ev").html(r_total);

    if (this.currentView != "C") {
      $("#mine_side_d").html(d_total);
      $("#mine_side_r").html(r_total);
      $("#mine_side_i").html(i_total + ii_total + i_no_race_total);
      $("#mine_side_l").html(l_total);
      $("#mine_side_t").html(t_total);
    }

    $("#d_no_race_color").css("width", d_no_race_width + "px");
    $("#dd_color").css("width", dd_width + "px");
    $("#d4_color").css("width", d4_width + "px");
    $("#d3_color").css("width", d3_width + "px");
    $("#d2_color").css("width", d2_width + "px");
    $("#d1_color").css("width", d1_width + "px");
    $("#t_color").css("width", t_width + "px");
    $("#i_color").css("width", i_width + "px");
    $("#ii_color").css("width", ii_width + "px");
    $("#o_color").css("width", o_width + "px");
    $("#p_color").css("width", p_width + "px");
    $("#l_color").css("width", l_width + "px");
    $("#r1_color").css("width", r1_width + "px");
    $("#r2_color").css("width", r2_width + "px");
    $("#r3_color").css("width", r3_width + "px");
    $("#r4_color").css("width", r4_width + "px");
    $("#rr_color").css("width", rr_width + "px");
    $("#r_no_race_color").css("width", r_no_race_width + "px");

    if (this.vp !== undefined) {
      if (r_total == 50 && parseInt(this.vp) == 2) {
        // Republican
        r_total++;
      } else if (d_total == 50 && parseInt(this.vp) == 1) {
        // Democrat
        d_total++;
      }
    }

    // HIDE REDUNDANT COUNTER VALUES
    if (d_total == d4_total && r_total == r4_total) {
      $("#d4_ev, #r4_ev").css("visibility", "hidden");
    } else {
      $("#d4_ev, #r4_ev").css("visibility", "visible");
    }

    if (this.election_type == "presidential") {
      // WINNER FOR PRESIDENTIAL ELECTION NEEDS 270
      if (d_total >= this.majority_needed) {
        $("#score-bar").attr("party_winner", "D");
      } else if (r_total >= this.majority_needed) {
        $("#score-bar").attr("party_winner", "R");
      } else {
        $("#score-bar").attr("party_winner", "T");
      }

      // WINNER FOR HISTORICAL PRESIDENTIAL ELECTIONS
      if (this.is_historical) {
        let arr_keys = [
          "D4",
          "D3",
          "D2",
          "D1",
          "T",
          "I",
          "R1",
          "R2",
          "R3",
          "R4",
        ];
        let arr = [
          d4_total,
          d3_total,
          d2_total,
          d1_total,
          t_total,
          i_total,
          r1_total,
          r2_total,
          r3_total,
          r4_total,
        ];
        for (let i in arr) {
          if (arr[i] >= this.majority_needed) {
            $("#score-bar").attr("party_winner", arr_keys[i]);
          }
        }
      }
    } else {
      // WINNER FOR OTHER ELECTIONS NEEDS HALF THE VOTES
      if (d_total > this.map_string.length / 2) {
        $("#score-bar").attr("party_winner", "D");
      } else if (r_total > this.map_string.length / 2) {
        $("#score-bar").attr("party_winner", "R");
      } else {
        $("#score-bar").attr("party_winner", "T");
      }
    }
  };

  /**
   * Color the map
   */
  this.colorizeMap = function (states = this.states) {
    if (this.debug == 1) console.log("m.colorizeMap()");

    for (let stateID in states) {
      let color = "#DDDDDD";
      let map_code = states[stateID].map_code.toString();
      let hex_color = states[stateID].hex_color;

      if (hex_color) {
        color = hex_color;
        $("#sm_" + stateID).css("background-color", color);
      } else if (map_code.length == 1) {
        color = this.ratingColors[this.mapCodeRatings[map_code]];
        $("#sm_" + stateID).css("background-color", color);
      } else if (map_code.length > 1) {
        let ratings = map_code.split("");
        let rating1 = ratings[0];
        let rating2 = ratings[1];
        let rating3 = ratings[2];
        let rating4 = ratings[3];
        color = this.addStripeFill(
          this.ratingColors[this.mapCodeRatings[rating1]],
          this.ratingColors[this.mapCodeRatings[rating2]],
          this.ratingColors[this.mapCodeRatings[rating3]],
          this.ratingColors[this.mapCodeRatings[rating4]]
        );

        let color_pattern =
          "repeating-linear-gradient(45deg, " +
          "" +
          this.ratingColors[this.mapCodeRatings[rating1]] +
          ", " +
          this.ratingColors[this.mapCodeRatings[rating1]] +
          " 5px, " +
          "" +
          this.ratingColors[this.mapCodeRatings[rating2]] +
          " 5px, " +
          this.ratingColors[this.mapCodeRatings[rating2]] +
          " 10px " +
          "" +
          (this.ratingColors[this.mapCodeRatings[rating3]]
            ? ", " +
              this.ratingColors[this.mapCodeRatings[rating3]] +
              " 10px, " +
              this.ratingColors[this.mapCodeRatings[rating3]] +
              " 15px "
            : "") +
          "" +
          (this.ratingColors[this.mapCodeRatings[rating4]]
            ? ", " +
              this.ratingColors[this.mapCodeRatings[rating4]] +
              " 15px, " +
              this.ratingColors[this.mapCodeRatings[rating4]] +
              " 20px "
            : "") +
          ")";
        $("#sm_" + stateID).css("background", color_pattern);
      }

      $("#" + stateID).attr("fill", color);
      $("#sp_" + stateID + "_1").css("background-color", color);
      $("#sp_" + stateID + "_2").css("background-color", color);

      if ($.inArray(stateID, this.specialStates) > -1) {
        if (this.seats[stateID][0] && this.seats[stateID][0].special_election) {
          color =
            this.ratingColors[
              this.mapCodeRatings[this.seats[stateID][0].map_code]
            ];
        }
        if (this.seats[stateID][1] && this.seats[stateID][1].special_election) {
          color =
            this.ratingColors[
              this.mapCodeRatings[this.seats[stateID][1].map_code]
            ];
        }
        if (this.seats[stateID][2] && this.seats[stateID][2].special_election) {
          color =
            this.ratingColors[
              this.mapCodeRatings[this.seats[stateID][2].map_code]
            ];
        }
        $("#sp_" + stateID).css("background-color", color);
      }
    }

    $("#vp").css(
      "background-color",
      this.ratingColors[this.mapCodeRatings[this.vp]]
    );
    $("#vp").attr("fill", this.ratingColors[this.mapCodeRatings[this.vp]]);
  };

  /**
   * Update map when state is clicked
   * @param stateID
   * @param specialElection
   * @param next
   */
  this.stateClick = function (
    stateID,
    specialElection = false,
    next = undefined
  ) {
    if (this.debug == 1)
      console.log("m.stateClick(" + stateID + ", " + specialElection + ")");

    if (!this.isInteractive) return false;
    if (stateID == "vp" && !this.vp_interactive) return false;
    if (Object.keys(this.splitVotes).indexOf(stateID) > -1) return false;
    if (this.is_historical && this.races[stateID].map_code == "x") {
      return false;
    }

    /*** Handle state tracking ***/
    if (!next) {
      next = this.getNextColor(stateID, specialElection, stateID == "vp");
    }
    var nextColor = next[0];
    var nextState = next[1];

    if (stateID == "vp") {
      this.vp = nextState;
    } else if (
      stateID == "23" &&
      !this.is_historical &&
      this.election_type == "presidential"
    ) {
      this.seats["MX"][0].map_code = String(nextState);
      this.seats["M3"][0].map_code = String(nextState);
      this.seats["M4"][0].map_code = String(nextState);
    } else if (
      stateID == "31" &&
      !this.is_historical &&
      this.election_type == "presidential"
    ) {
      this.seats["NX"][0].map_code = String(nextState);
      this.seats["N3"][0].map_code = String(nextState);
      this.seats["N4"][0].map_code = String(nextState);
      this.seats["N5"][0].map_code = String(nextState);
    } else {
      for (let i in this.seats[stateID]) {
        if (
          this.seats[stateID][i].map_code != "N" &&
          this.seats[stateID][i].map_code != 9
        ) {
          if (specialElection) {
            if (
              this.seats[stateID][i].special_election &&
              $.inArray(stateID, this.specialStates) > -1
            ) {
              this.seats[stateID][i].map_code = String(nextState);
            }
          } else {
            if (
              !this.seats[stateID][i].special_election ||
              $.inArray(stateID, this.specialStates) == -1
            ) {
              this.seats[stateID][i].map_code = String(nextState);
              this.states[stateID].map_code = String(nextState);
            }
          }
        }
      }
    }

    /*** Handle coloring ***/
    if (specialElection) {
      $("#sp_" + stateID).css("background-color", nextColor);
    } else {
      $("#" + stateID).attr("fill", nextColor);
      $("#" + stateID).css("background-color", nextColor);
      $("#sm_" + stateID).css("background-color", nextColor);
      $("#sp_" + stateID + "_1").css("background-color", nextColor);
      $("#sp_" + stateID + "_2").css("background-color", nextColor);
    }

    this.hashid = false;
    this.updateElectoralVotes(this.seats);
    this.mapStringify();
    this.setCookies();
    this.setUserGenerated();

    this.stateClickCallback(stateID);
  };

  /**
   * Callback method after is clicked
   */
  this.stateClickCallback = function (stateID) {};

  /**
   * Set to user-generated mode
   */
  this.setUserGenerated = function () {
    if (this.debug == 1) console.log("m.setUserGenerated()");

    $("#map-wrapper").attr("map_type_mode", "user-generated");
  };

  /**
   * Display the current map title above the map
   * @param hashid
   */

  /**
   * Return the next color from rotation, or the palette
   * @param stateID
   * @param specialElection
   */
  this.getNextColor = function (
    stateID,
    specialElection,
    disablePalette = false
  ) {
    if (this.debug == 1)
      console.log(
        "m.getNextColor(" +
          stateID +
          ", " +
          specialElection +
          ", " +
          disablePalette +
          ")"
      );

    var locked_palette = $("#palette-chooser .palette.selected");

    if (locked_palette.attr("color_value") && !disablePalette) {
      nextColor = this.hexColor(locked_palette.css("backgroundColor"));
      nextState = locked_palette.attr("color_value");
      return [nextColor, nextState];
    }

    var nextColor = this.ratingColors["T"];
    var nextState = 0;
    var key = "T";

    if (stateID == "vp") {
      key = this.mapCodeRatings[this.vp];
    } else {
      key = this.mapCodeRatings[this.states[stateID].map_code];
    }

    if (specialElection) {
      if (this.seats[stateID][0] && this.seats[stateID][0].special_election) {
        key = this.mapCodeRatings[this.seats[stateID][0].map_code];
      }
      if (this.seats[stateID][1] && this.seats[stateID][1].special_election) {
        key = this.mapCodeRatings[this.seats[stateID][1].map_code];
      }
      if (this.seats[stateID][2] && this.seats[stateID][2].special_election) {
        key = this.mapCodeRatings[this.seats[stateID][2].map_code];
      }
    } else if (
      ["presidential", "presidential-simple"].includes(this.election_type) &&
      (stateID == "23" || stateID == "31")
    ) {
      key = this.mapCodeRatings[this.states[stateID].map_code.split("")[0]];
    }

    if (this.colorMode == 1) {
      if (key == "T") {
        nextColor = this.ratingColors["R4"];
        nextState = 2;
      } else if (key == "R1") {
        nextColor = this.ratingColors["R4"];
        nextState = 2;
      } else if (key == "R2") {
        nextColor = this.ratingColors["R4"];
        nextState = 2;
      } else if (key == "R3") {
        nextColor = this.ratingColors["R4"];
        nextState = 2;
      } else if (key == "R4") {
        nextColor = this.ratingColors["D4"];
        nextState = 1;
      } else if (key == "D4") {
        if (this.enable_3p.indexOf(stateID) != -1) {
          nextColor = this.ratingColors["I"];
          nextState = 7;
        } else {
          nextColor = this.ratingColors["T"];
          nextState = 0;
        }
      } else if (key == "D3") {
        if (this.enable_3p.indexOf(stateID) != -1) {
          nextColor = this.ratingColors["I"];
          nextState = 7;
        } else {
          nextColor = this.ratingColors["T"];
          nextState = 0;
        }
      } else if (key == "D2") {
        if (this.enable_3p.indexOf(stateID) != -1) {
          nextColor = this.ratingColors["I"];
          nextState = 7;
        } else {
          nextColor = this.ratingColors["T"];
          nextState = 0;
        }
      } else if (key == "D1") {
        if (this.enable_3p.indexOf(stateID) != -1) {
          nextColor = this.ratingColors["I"];
          nextState = 7;
        } else {
          nextColor = this.ratingColors["T"];
          nextState = 0;
        }
      } else if (key == "I") {
        nextColor = this.ratingColors["T"];
        nextState = 0;
      } else {
        nextColor = this.ratingColors["T"];
        nextState = 0;
      }
    } else if (this.colorMode == 2) {
      if (key == "T") {
        nextColor = this.ratingColors["R2"];
        nextState = 6;
      } else if (key == "R1") {
        nextColor = this.ratingColors["R2"];
        nextState = 6;
      } else if (key == "R2") {
        nextColor = this.ratingColors["R4"];
        nextState = 2;
      } else if (key == "R3") {
        nextColor = this.ratingColors["R4"];
        nextState = 2;
      } else if (key == "R4") {
        nextColor = this.ratingColors["D4"];
        nextState = 1;
      } else if (key == "D4") {
        nextColor = this.ratingColors["D2"];
        nextState = 5;
      } else if (key == "D3") {
        nextColor = this.ratingColors["D2"];
        nextState = 5;
      } else if (key == "D2") {
        if (this.enable_3p.indexOf(stateID) != -1) {
          nextColor = this.ratingColors["I"];
          nextState = 7;
        } else {
          nextColor = this.ratingColors["T"];
          nextState = 0;
        }
      } else if (key == "D1") {
        if (this.enable_3p.indexOf(stateID) != -1) {
          nextColor = this.ratingColors["I"];
          nextState = 7;
        } else {
          nextColor = this.ratingColors["T"];
          nextState = 0;
        }
      } else if (key == "I") {
        nextColor = this.ratingColors["T"];
        nextState = 0;
      } else {
        nextColor = this.ratingColors["T"];
        nextState = 0;
      }
    } else if (this.colorMode == 3) {
      if (key == "T") {
        nextColor = this.ratingColors["R2"];
        nextState = 6;
      } else if (key == "R1") {
        nextColor = this.ratingColors["R2"];
        nextState = 6;
      } else if (key == "R2") {
        nextColor = this.ratingColors["R3"];
        nextState = 4;
      } else if (key == "R3") {
        nextColor = this.ratingColors["R4"];
        nextState = 2;
      } else if (key == "R4") {
        nextColor = this.ratingColors["D4"];
        nextState = 1;
      } else if (key == "D4") {
        nextColor = this.ratingColors["D3"];
        nextState = 3;
      } else if (key == "D3") {
        nextColor = this.ratingColors["D2"];
        nextState = 5;
      } else if (key == "D2") {
        if (this.enable_3p.indexOf(stateID) != -1) {
          nextColor = this.ratingColors["I"];
          nextState = 7;
        } else {
          nextColor = this.ratingColors["T"];
          nextState = 0;
        }
      } else if (key == "D1") {
        if (this.enable_3p.indexOf(stateID) != -1) {
          nextColor = this.ratingColors["I"];
          nextState = 7;
        } else {
          nextColor = this.ratingColors["T"];
          nextState = 0;
        }
      } else if (key == "I") {
        nextColor = this.ratingColors["T"];
        nextState = 0;
      } else {
        nextColor = this.ratingColors["T"];
        nextState = 0;
      }
    } else {
      if (key == "T") {
        nextColor = this.ratingColors["R1"];
        nextState = "b";
      } else if (key == "R1") {
        nextColor = this.ratingColors["R2"];
        nextState = 6;
      } else if (key == "R2") {
        nextColor = this.ratingColors["R3"];
        nextState = 4;
      } else if (key == "R3") {
        nextColor = this.ratingColors["R4"];
        nextState = 2;
      } else if (key == "R4") {
        nextColor = this.ratingColors["D4"];
        nextState = 1;
      } else if (key == "D4") {
        nextColor = this.ratingColors["D3"];
        nextState = 3;
      } else if (key == "D3") {
        nextColor = this.ratingColors["D2"];
        nextState = 5;
      } else if (key == "D2") {
        nextColor = this.ratingColors["D1"];
        nextState = "a";
      } else if (key == "D1") {
        if (this.enable_3p.indexOf(stateID) != -1) {
          nextColor = this.ratingColors["I"];
          nextState = 7;
        } else {
          nextColor = this.ratingColors["T"];
          nextState = 0;
        }
      } else if (key == "I") {
        nextColor = this.ratingColors["I"];
        nextState = 7;
      } else {
        nextColor = this.ratingColors["T"];
        nextState = 0;
      }
    }

    return [nextColor, nextState];
  };

  // generate and draw the D3 map
  this.generateD3 = function (states = this.states) {
    if (this.debug == 1) console.log("m.generateD3()");

    this.width = $("#map").width();
    this.height = this.width * 0.69;
    $("#map").css("height", this.height);

    this.projection = d3.geo
      .mercator()
      .center([138,-28.5])
      .scale(this.width * 1)
      .translate([this.width / 2, this.height / 2]);

    this.path = d3.geo.path().projection(this.projection);

    this.svg = d3
      .select("#map")
      .append("svg")
      .attr("width", "100%")
      .attr("height", this.height)
      .append("g");

    this.svg.append("defs").attr("id", "defs");

    this.svg.call(this.addGlow("mouseOverGlow").rgb("#000").stdDeviation(4));

    var p = this;

    var g = p.svg.append("g");
    g.attr("class", "states")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.layer1).features)
      .enter()
      .append("path")
      .attr("class", function (d) {
        if (p.races.hasOwnProperty(d.properties.STATE)) {
          if (p.is_historical && p.races[d.properties.STATE].map_code == "x") {
            return;
          }
          return "state";
        }
      })
      .attr("d", p.path)
      .attr("id", function (d) {
        return d.properties.STATE;
      })
      .on("click", function (d) {
        if (
          p.currentView != "I" ||
          p.races.hasOwnProperty(d.properties.STATE)
        ) {
          p.stateClick(d.properties.STATE);
        }
      })
      .on("mouseover", function (d) {
        if (
          p.currentView != "I" ||
          p.races.hasOwnProperty(d.properties.STATE)
        ) {
          p.mouseOn(d.properties.STATE, false);
        }
      })
      .on("touchstart", function (d) {
        d3.event.preventDefault();
        p.is_mobile = true;
        if (
          p.currentView != "I" ||
          p.races.hasOwnProperty(d.properties.STATE)
        ) {
          d3.select(this).on("click", null);
          p.touchStartTime = d3.event.timeStamp;
          p.hoverOn(d.properties.STATE, false);
        }
      })
      .on("mouseout", function (d) {
        if (
          p.currentView != "I" ||
          p.races.hasOwnProperty(d.properties.STATE)
        ) {
          p.mouseOff(d.properties.STATE);
        }
      })
      .on("touchend", function (d) {
        d3.event.preventDefault();
        if (
          p.currentView != "I" ||
          p.races.hasOwnProperty(d.properties.STATE)
        ) {
          d3.select(this).on("click", null);
          if (d3.event.timeStamp - m.touchStartTime < 500) {
            if (p.races.hasOwnProperty(d.properties.STATE)) {
              p.stateClick(d.properties.STATE);
              p.hoverOn(d.properties.STATE, false);
            }
          } else {
            p.hoverOff(d.properties.STATE);
          }
        }
      })
      .attr("fill", function (d) {
        return "#DDDDDD";
      });

    p.colorizeMap(states);

    g.selectAll("text")
      .data(topojson.feature(us, us.objects.layer1).features)
      .enter()
      .append("foreignObject")
      .attr("class", function (d) {
        if (p.races.hasOwnProperty(d.properties.STATE)) {
          if (p.is_historical && p.races[d.properties.STATE].map_code == "x") {
            return;
          }
          return "state " + "text_" + d.properties.STATE;
        }
      })
      .attr("id", function (d) {
        return d.properties.STATE + "_text";
      })
      .on("click", function (d) {
        if (
          p.currentView != "I" ||
          p.races.hasOwnProperty(d.properties.STATE)
        ) {
          p.stateClick(d.properties.STATE);
        }
      })
      .on("mouseover", function (d) {
        d3.event.preventDefault();
        if (
          p.currentView != "I" ||
          p.races.hasOwnProperty(d.properties.STATE)
        ) {
          p.mouseOn(d.properties.STATE, false);
        }
      })
      .on("touchstart", function (d) {
        d3.event.preventDefault();
        p.is_mobile = true;
        if (
          p.currentView != "I" ||
          p.races.hasOwnProperty(d.properties.STATE)
        ) {
          d3.select(this).on("click", null);
          p.touchStartTime = d3.event.timeStamp;
          p.hoverOn(d.properties.STATE, false);
        }
      })
      .on("mouseout", function (d) {
        d3.event.preventDefault();
        if (
          p.currentView != "I" ||
          p.races.hasOwnProperty(d.properties.STATE)
        ) {
          p.mouseOff(d.properties.STATE);
        }
      })
      .on("touchend", function (d) {
        d3.event.preventDefault();
        if (
          p.currentView != "I" ||
          p.races.hasOwnProperty(d.properties.STATE)
        ) {
          d3.select(this).on("click", null);
          if (d3.event.timeStamp - m.touchStartTime < 500) {
            if (p.races.hasOwnProperty(d.properties.STATE)) {
              p.stateClick(d.properties.STATE);
              p.hoverOn(d.properties.STATE, false);
            }
          } else {
            p.hoverOff(d.properties.STATE);
          }
        }
      })
      .attr("width", function (d) {
        if ($.inArray(d.properties.STATE, p.smallStates) > -1) {
          return 0;
        }
        let factor = 1;
        let width = 20;
        let full_size = 820;
        if (p.election_type == "presidential-simple") {
          width = 40;
        }
        if (p.width < 520) {
          factor = p.width / full_size + 0.1;
        }
        return width * factor;
      })
      .attr("height", function (d) {
        if ($.inArray(d.properties.STATE, p.smallStates) > -1) {
          return 0;
        }
        let factor = 1;
        let height = 15;
        let full_size = 820;
        if (
          ["presidential", "delegate", "presidential-simple"].indexOf(
            p.election_type
          ) > -1
        ) {
          height = 25;
        }
        if (p.width < 520) {
          factor = p.width / full_size + 0.1;
        }
        return height * factor;
      })
      .attr("x", function (d) {
        let factor = 1;
        let full_size = 820;
        if (p.width < 520) {
          factor = p.width / full_size;
        }
        if (p.election_type == "presidential-simple") {
          factor = factor * 1.75;
        }
        var new_x =
          p.path.centroid(d)[0] +
          parseInt(p.statePositions[d.properties.STATE + "x"]) * factor;
        if (!isNaN(new_x)) {
          return new_x;
        }
      })
      .attr("y", function (d) {
        var new_y =
          p.path.centroid(d)[1] +
          parseInt(p.statePositions[d.properties.STATE + "y"]);
        if (!isNaN(new_y)) {
          if (
            p.width <= 576 &&
            ["presidential", "delegate"].indexOf(p.election_type) > -1
          ) {
            new_y -= 2;
          }
          if (
            p.width <= 576 &&
            ["presidential", "delegate"].indexOf(p.election_type) > -1 &&
            (d.properties.STATE == "33" ||
              d.properties.STATE == "42" ||
              d.properties.STATE == "50")
          ) {
            new_y += 4;
          }
          if (p.width <= 576 && d.properties.STATE != "33") {
            new_y += 4;
          }
          if (p.width <= 400) {
            new_y += 2;
          }
          return new_y;
        }
      })
      .html(function (d) {
        if (p.states[d.properties.STATE] === undefined) {
        } else {
          // SMALL STATES
          $("#sm_" + d.properties.STATE).html(
            '<span class="state_info e_votes">' +
              p.states[d.properties.STATE].e_votes +
              "</span>"
          );

          // if ($.inArray(d.properties.STATE, p.smallStates) == -1 && d.properties.STATE <= 56) {
          // OTHER STATES
          // return '<div class="state_info state_info_' + d.properties.STATE + '">'
          // + p.states[d.properties.STATE].state_abbr
          // + '<span class="e_votes"><br/>'
          // + p.states[d.properties.STATE].e_votes
          // +'</span></div>';
          // }

          if (
            $.inArray(d.properties.STATE, p.smallStates) != -1 &&
            d.properties.STATE <= 56
          ) {
            return (
              '<div class="state_info state_info_' +
              d.properties.STATE +
              '">' +
              p.states[d.properties.STATE].state_abbr +
              '<span class="e_votes"><br/>' +
              p.states[d.properties.STATE].e_votes +
              "</span></div>"
            );
          }
        }
      });

    g.append("path")
      .attr("class", "state-boundaries")
      .datum(
        topojson.mesh(us, us.objects.layer1, function (a, b) {
          return a !== b;
        })
      )
      .attr("d", p.path);

    let full_size = 820;
    let factor = Math.min(p.width / full_size, 1);
    $(".state_info, .map_text, .special_election")
      .css("font-size", factor * p.default_font_size + 0.5 + "pt")
      .css("visibility", "inherit");
    $(".state_info, .map_text, .special_election")
      .css("line-height", factor * p.default_line_height + 0.5 + "pt")
      .css("visibility", "inherit");
    // d3
  };

  /**
   * Fill a region with stripes
   */
  this.addStripeFill = function (color1, color2, color3, color4) {
    var colors = [color1, color2, color3, color4]
      .filter(function (el) {
        return el != null;
      })
      .filter(function (itm, i, a) {
        return i == a.indexOf(itm);
      });

    if (colors.length == 1) {
      return color1;
    }

    var id = "patt_" + color1.replace("#", "") + "_" + color2.replace("#", "");
    var w = 20;
    if (color3) {
      id += "_" + color3.replace("#", "");
      w = 30;
    }
    if (color4) {
      id += "_" + color4.replace("#", "");
      w = 40;
    }
    if (!$("#" + id).length) {
      var pattern = d3
        .select("#defs")
        .append("pattern")
        .attr("id", id)
        .attr("width", w)
        .attr("height", 20)
        .attr("patternUnits", "userSpaceOnUse")
        .attr("patternTransform", "rotate(-35)");

      pattern
        .append("rect")
        .attr("width", 10)
        .attr("height", 20)
        .attr("x", 0)
        .attr("y", 0)
        .attr("fill", color1);

      pattern
        .append("rect")
        .attr("width", 10)
        .attr("height", 20)
        .attr("x", 10)
        .attr("y", 0)
        .attr("fill", color2);

      if (color3) {
        pattern
          .append("rect")
          .attr("width", 10)
          .attr("height", 20)
          .attr("x", 20)
          .attr("y", 0)
          .attr("fill", color3);
      }
      if (color4) {
        pattern
          .append("rect")
          .attr("width", 10)
          .attr("height", 20)
          .attr("x", 30)
          .attr("y", 0)
          .attr("fill", color4);
      }
    }
    return "url(#" + id + ")";
  };

  /**
   * Add a glow around the state path
   */
  this.addGlow = function (url) {
    var stdDeviation = 2,
      rgb = "#000",
      colorMatrix = "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0";

    if (!arguments.length) {
      url = "glow";
    }

    function glow() {
      var filter = d3
        .select("#defs")
        .append("filter")
        .attr("id", url)
        .attr("x", "-10%")
        .attr("y", "-10%")
        .attr("width", "120%")
        .attr("height", "120%");
      filter
        .append("feColorMatrix")
        .attr("type", "matrix")
        .attr("values", colorMatrix);
      filter
        .append("feGaussianBlur")
        .attr("stdDeviation", stdDeviation)
        .attr("result", "coloredBlur");
      var merge = filter.append("feMerge");
      merge.append("feMergeNode").attr("in", "coloredBlur");
      merge.append("feMergeNode").attr("in", "SourceGraphic");
    }

    glow.rgb = function (value) {
      if (!arguments.length) return color;
      rgb = value;
      var color = d3.rgb(value);
      var matrix = "0 0 0 red 0 0 0 0 0 green 0 0 0 0 blue 0 0 0 0.5 0";
      colorMatrix = matrix
        .replace("red", color.r)
        .replace("green", color.g)
        .replace("blue", color.b);

      return glow;
    };

    glow.stdDeviation = function (value) {
      if (!arguments.length) return stdDeviation;
      stdDeviation = value;
      return glow;
    };

    return glow;
  };

  /**
   * Get the hex color from rgb
   */
  this.hexColor = function (colorval) {
    if (colorval == "transparent" || colorval == "rgba(0, 0, 0, 0)") {
      return "";
    }
    let parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    delete parts[0];
    for (var i = 1; i <= 3; ++i) {
      parts[i] = parseInt(parts[i]).toString(16);
      if (parts[i].length == 1) parts[i] = "0" + parts[i];
    }
    let color = "#" + parts.join("");
    return color;
  };

  /**
   * Bind the events
   */
  this.bindMapEvents = function () {
    this.bindPaletteSelector();
    this.bindSpecialStates();

    let desc_height = $("#map_description").height();
    $("#map_description").css("min-height", desc_height);

    $("#comp_races_wrapper tbody tr.toggle-row").hide();
    if (m.toggle_safe_races) {
      $(
        '#comp_races_wrapper tbody tr.toggle-row[election_year="' +
          m.election_year +
          '"]'
      )
        .not('[is_competitive="0"], .filter-message-row, .safe-message-row')
        .show();
    } else {
      $(
        '#comp_races_wrapper tbody tr.toggle-row[election_year="' +
          m.election_year +
          '"]'
      ).show();
    }

    $("#remove_cookie").click(function () {
      m.reset();
    });

    $("#change_starting_view").change(function () {
      var hashid = $(this).val();
      m.hashid = hashid;

      m.loadString(m.views[hashid].map_string);
      $("#starting_view_description").html(m.description);
    });

    $("#map_view_switcher .view_mode").click(function () {
      $("#map-wrapper").attr("map_view_mode", $(this).attr("id"));
    });

    $("#election-details .nav-link").on("click", function (e) {
      if (!$(this).hasClass("unlink")) {
        $("#election-details .nav-link").removeClass("active");
        $(this).addClass("active");
        let year = $(this).text();
        $("#comp_races_wrapper tbody tr.toggle-row").hide();
        $(
          '#comp_races_wrapper tbody tr.toggle-row[election_year="' +
            year +
            '"]'
        ).show();
      }
    });

    this.bindResizeEvent();
  };

  /**
   * Bind the map resize
   */
  this.bindResizeEvent = function () {
    var p = this;
    var width = $(window).width();
    var resizeTimer;
    $(window).on("resize", function (e) {
      if ($(window).width() != width) {
        clearTimeout(resizeTimer);
        width = $(window).width();
        p.colorModeUser = p.colorMode;
        p.colorPaletteUser = $("#palette-chooser .palette.selected").attr("id");
        resizeTimer = setTimeout(function () {
          p.resize();
        }, 200);
      }
    });
  };

  /**
   * Action listeners for the palette
   */
  this.bindPaletteSelector = function () {
    var p = this;
    $(".palette").click(function () {
      if (!$(this).hasClass("selected")) {
        $(".palette").removeClass("selected");
        $(this).addClass("selected");
      } else {
        $(".palette").removeClass("selected");
      }
    });

  };

  /**
   * Action listeners for the special states
   */
  this.bindSpecialStates = function () {
    var p = this;

    $(".sp-full, .sp-half")
      .not(".vp")
      .click(function (e) {
        var fips = $(this).attr("state_fips");
        p.stateClick(fips, $(this).hasClass("sp-split"));
      })
      .on("mouseover touchstart", function (e) {
        if (e.type == "touchstart") {
          p.is_mobile = true;
        }
        var fips = $(this).attr("state_fips");
        p.hoverOn(fips);
      })
      .on("mouseout", function () {
        var fips = $(this).attr("state_fips");
        p.hoverOff(fips);
      });

    $(".special_election")
      .click(function (e) {
        var fips = $(this).attr("state_fips");
        p.stateClick(fips, true);
      })
      .on("mouseover touchstart", function (e) {
        if (e.type == "touchstart") {
          p.is_mobile = true;
        }
        var fips = $(this).attr("state_fips");
        p.hoverOn(fips, true);
      })
      .on("mouseout", function () {
        var fips = $(this).attr("state_fips");
        p.hoverOff(fips);
      });
  };

  /**
   * Mouse on action
   * @param id
   * @param specialElection
   */
  this.mouseOn = function (id, specialElection) {
    if ($("#" + id).hasClass("state") && !this.is_mobile && !!!window.chrome) {
      d3.select(`#${CSS.escape(id)}`).style("filter", "url(#mouseOverGlow)");
      $("#" + id).css("stroke", "#fff");
      $("#" + id)
        .detach()
        .appendTo("g.states");
      $("#" + id + "_text")
        .detach()
        .appendTo("g.states");
    }
    this.hoverOn(id, specialElection);
  };

  /**
   * Mouseoff action
   * @param id
   */
  this.mouseOff = function (id = null) {
    if ($("#" + id).hasClass("state") && !this.is_mobile && !!!window.chrome) {
      d3.select(`#${CSS.escape(id)}`).style("filter", "");
      $("#" + id)
        .detach()
        .prependTo("g.states");
    }
    this.hoverOff(id);
  };

  this.hoverOn = function (id, specialElection) {};

  this.hoverOff = function (id = null) {};
}; // END object
