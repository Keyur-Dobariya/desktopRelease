/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{js,jsx,html}',
	],
	theme: {
		extend: {},
	},
	corePlugins: {
		// Disable Tailwind's preflight to reduce conflicts with Ant Design
		preflight: false,
	},
	plugins: [],
};
