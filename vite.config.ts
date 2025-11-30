import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

import { resolve } from "path";

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");
const widgetsDir = resolve(root, "widgets");

export default defineConfig({
	plugins: [solidPlugin()],
	resolve: {
		alias: {
			"@": root,
			"@features": resolve(root, "features"),
			"@providers": resolve(root, "providers"),
			"@components": resolve(root, "components"),
		},
	},
	build: {
		target: "esnext",

		outDir,
		rollupOptions: {
			input: {
				"bar.glazewm": resolve(widgetsDir, "bar/glazewm", "index.html"),
			},
		},
	},
	base: "./",
});
