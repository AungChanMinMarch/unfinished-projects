function convert(USV_string) {
	return decodeURIComponent(
		JSON.parse('"' + USV_string.replace(/\"/g, '\\"') + '"')
	);
}

export default convert;
