/* eslint-disable no-console */
const Peek = require("peek");
const { program } = require("commander");
const chalk = require("chalk");

const CHALK_COLORS = ["red", "green", "blue", "magenta", "cyan", "gray"];

function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function main() {
	program
		.version("0.0.1")
		.option(
			"--signaling-url <url>",
			"URL of the signaling service",
			process.env.PEEK_SIGNALING_URL
		)
		.requiredOption("-s, --subscriptions <service...>", "services to subscribe to")
		.option("--secret <password>", "shared secret", process.env.PEEK_SECRET)
		.option("-t, --topic-prefix <prefix>", "filter messages by this topic prefix", null);
	program.parse();

	const opts = program.opts();
	if (!opts.signalingUrl) {
		console.error("signaling url is required");
		process.exit(1);
	}
	if (!opts.secret) {
		console.error("secret is required");
		process.exit(1);
	}

	const serviceColors = {};
	opts.subscriptions.forEach((s) => {
		serviceColors[s] = CHALK_COLORS[Math.floor(Math.random() * CHALK_COLORS.length)];
	});

	const peek = Peek.createConsumer({
		...opts,
	});
	console.log(`Service, Timestamp, Topic, Message`);
	peek.on("message", (message) => {
		const colored = chalk[serviceColors[message.service]];
		const bgColored = chalk[`bg${capitalize(serviceColors[message.service])}`].black.bold;

		console.log(
			[
				bgColored(message.service),
				colored(message.timestamp),
				`'${colored(message.topic)}'`,
				`'${colored(message.message)}'`,
			].join(", ")
		);
	});
	process.on("exit", () => {
		peek.close();
	});
}
main();
