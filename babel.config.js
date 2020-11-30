module.exports = {
	ignore: [
		"/\/core-js/" // не полифилим либы
	],
	// unambiguous - автоматически определяет модули и скрипты
	sourceType: "module", // Import\export распознаются как модули
	presets: [
		["@babel/preset-env", {
			useBuiltIns: 'usage',
			debug: true,
			corejs: 3,
			// не преобразовывать require в es6 модули?
			// modules: false
		}]
	],
}
