/* Magic Mirror
 * Module: MMM-UptimeRobot-Modern
 *
 * Originally by Simon Crnko
 * Modernized by kaczmar986
 * MIT Licensed.
 */

Module.register("MMM-UptimeRobot-Modern", {
  defaults: {
    updateInterval: 60000,
    retryDelay: 5000,
    useIcons: false,
    useColors: false,
    maximumEntries: 10,
    statuses: "0-1-2-8-9",
    animationSpeed: 1000
  },

  requiresVersion: "2.1.0",

  start: function () {
    this.dataRequest = null;
    this.loaded = false;

    if (this.config.api_key) {
      this.getData();
      // Note: We don't need a setInterval here for getData because
      // the node_helper.js handles the scheduling of new fetches.
    }
  },

  getStyles: function () {
    // 1. Updated to your new CSS filename
    // 2. Switched Font-Awesome to the version included with MagicMirror
    return ["MMM-UptimeRobot-Modern.css", "font-awesome.css"];
  },

  getData: function () {
    this.sendSocketNotification("uptimerobot-getData", this.config);
  },

  createWrapper: function (textToTranslate) {
    var wrapperDataNotification = document.createElement("div");
    wrapperDataNotification.innerHTML = this.translate(textToTranslate);
    return wrapperDataNotification;
  },

  getTranslations: function () {
    return {
      en: "translations/en.json",
      es: "translations/es.json",
      de: "translations/de.json",
      pl: "translations/pl.json",
      sv: "translations/sv.json",
      fr: "translations/fr.json"
    };
  },

  processData: function (data) {
    this.dataRequest = data;
    this.loaded = true;
    this.updateDom(this.config.animationSpeed);
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === "uptimerobot-processData") {
      this.processData(payload);
    }
  },

  setStatus: function (statusObject, statusForTranslate, statusClass, status) {
    if (!this.config.useIcons) {
      statusObject.innerHTML = this.translate(statusForTranslate);
    } else {
      statusObject.className = statusClass;
    }

    statusObject.classList.add(status);

    if (this.config.useColors) {
      statusObject.classList.add("colored");
    }
  },

  getStatusTest: function (statusValue) {
    var status = document.createElement("td");
    switch (statusValue) {
      case 0:
        this.setStatus(status, "PAUSED", "fa fa-pause-circle-o", "paused");
        break;
      case 1:
        this.setStatus(status, "NOTCHECKEDYET", "fa fa-retweet", "not-checked-yet");
        break;
      case 2:
        this.setStatus(status, "ONLINE", "fa fa-arrow-circle-up", "online");
        break;
      case 8:
        this.setStatus(status, "SEEMSDOWN", "fa fa-chevron-circle-down", "seems-down");
        break;
      case 9:
        this.setStatus(status, "DOWN", "fa fa-arrow-circle-down", "offline");
        break;
      default:
        status.innerHTML = "";
    }
    return status;
  },

  getDom: function () {
    var self = this;
    var wrapper = document.createElement("div");
    // Add a class name to the wrapper so CSS can target it specifically
    wrapper.className = "MMM-UptimeRobot-Modern";

    if (this.dataRequest && this.dataRequest.monitors) {
      var innerTable = document.createElement("table");
      innerTable.className = "small";

      this.dataRequest.monitors.forEach(function (element) {
        var tableLine = document.createElement("tr");

        var lineCell = document.createElement("td");
        lineCell.className = "friendlyName";
        lineCell.innerHTML = element.friendly_name;
        tableLine.appendChild(lineCell);

        tableLine.appendChild(self.getStatusTest(element.status));
        innerTable.appendChild(tableLine);
      });

      wrapper.appendChild(innerTable);
    } else if (!this.config.api_key) {
      wrapper.appendChild(this.createWrapper("MISSING_API_KEY"));
    } else {
      wrapper.className = "dimmed light small";
      wrapper.appendChild(this.createWrapper("LOADING"));
    }

    return wrapper;
  }
});
