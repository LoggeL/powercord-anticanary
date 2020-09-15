const { Plugin } = require("powercord/entities");
const { getModule } = require("powercord/webpack");
const { inject, uninject } = require("powercord/injector");

module.exports = class DuckDuckGoSearch extends Plugin {
    async startPlugin() {
        const messageEvents = await getModule(["sendMessage"]);
        inject("anticanary", messageEvents, "sendMessage", (args) => {
            args[1].content = args[1].content.replace(/https:\/\/canary.discordapp.com\/channels\//g, 'https:\/\/discord.com\/channels\/')
            return args;
        }, true);
    }

    pluginWillUnload() {
        uninject("anticanary");
    }
};

// Inspired by Fezalion
