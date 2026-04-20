/* Magic Mirror
 * Node Helper: MMM-UptimeRobot-Modern
 *
 * Originally by Simon Crnko
 * Modernized by kaczmar986
 * MIT Licensed.
 */

const NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
    start: function () {
        this.config = null;
    },

    socketNotificationReceived: function (notification, payload) {
        // Keeping the original notification name
        if (notification === "uptimerobot-getData") {
            this.config = payload;
            this.getData();
        }
    },

    getData: async function () {
        const urlApi = "https://api.uptimerobot.com/v2/getMonitors";
        let retry = true;

        const params = new URLSearchParams();
        params.append("api_key", this.config.api_key);
        params.append("format", "json");
        params.append("logs", "0");
        params.append("limit", this.config.maximumEntries);
        params.append("statuses", this.config.statuses);

        try {
            const response = await fetch(urlApi, {
                method: "POST",
                headers: {
                    "cache-control": "no-cache",
                    "content-type": "application/x-www-form-urlencoded"
                },
                body: params
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Keeping the original notification name back to the mirror
            this.sendSocketNotification("uptimerobot-processData", data);

        } catch (error) {
            console.error("MMM-UptimeRobot-Modern: Fetch Error", error);
            retry = false;
        } finally {
            if (retry) {
                this.scheduleUpdate(this.loaded ? -1 : this.config.retryDelay);
            }
        }
    },

    scheduleUpdate: function (delay) {
        let nextLoad = this.config.updateInterval;
        if (typeof delay !== "undefined" && delay >= 0) {
            nextLoad = delay;
        }

        setTimeout(() => {
            this.getData();
        }, nextLoad);
    }
});
