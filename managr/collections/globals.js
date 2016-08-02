export const Globals = new Mongo.Collection('Globals');
var GlobalsSchema = new SimpleSchema({
	numberOfWeeks: {
		type: Number
	}
});
Globals.attachSchema(GlobalsSchema);
Globals.numberOfWeeks = function() {
	var global = this.findOne({});
	if (global == undefined) {
		return undefined;
	}
	return global.numberOfWeeks;
}