// Copyright Titanium I.T. LLC.

import Mocha from "mocha";

export async function runMochaAsync(options) {
	await new Promise(async (resolve, reject) => {
		// Mocha leaks listeners. So prior to running Mocha, we save the current sets of listeners.
		// Then after running Mocha, we check again and turn off any new ones.
		const uncaughtExceptionListeners = process.listeners("uncaughtException");
		const unhandledRejectionListeners = process.listeners("unhandledRejection");

		const mocha = new Mocha(options.options);
		options.files.forEach(mocha.addFile.bind(mocha));
		await mocha.loadFilesAsync();
		mocha.run(function(failures) {
			cleanUpListenerLeak("uncaughtException", uncaughtExceptionListeners);
			cleanUpListenerLeak("unhandledRejection", unhandledRejectionListeners);

			if (failures) return reject(new Error("Tests failed"));
			else return resolve();
		});
	});
}

function cleanUpListenerLeak(event, preMochaListeners) {
	const postMochaListeners = process.listeners(event);
	const leakedListeners = postMochaListeners.filter((listener) => !preMochaListeners.includes(listener));
	leakedListeners.forEach(listener => process.off(event, listener));
}