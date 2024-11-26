import semverGreaterOrEqual from "semver/functions/gte.js";
export default {
	eleventyComputed: {
		hasDocumentation: (data) => {
			if (!Object.hasOwn(data, "package") || !Object.hasOwn(data, "version"))
				return false;
			if (data.package !== "wpewebkit")
				return false;
			return semverGreaterOrEqual(data.version, '2.23.90');
		},
	},
};
