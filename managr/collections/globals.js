export const Globals = new Mongo.Collection('Globals');
var GlobalsSchema = new SimpleSchema({
	numberOfWeeks: {
		type: Number
	}
});
Globals.attachSchema(GlobalsSchema);