import { DateTime } from "luxon";

class Date {
	static parse(value) {
		let dt = DateTime.fromISO(value);

		if (!dt.isValid) {
			dt = DateTime.fromSQL(value);
		}

		return dt;
	}
}

export default Date;