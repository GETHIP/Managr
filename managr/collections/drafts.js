export const Drafts = new Mongo.Collection('Drafts');

DraftsSchema = new SimpleSchema({
	title: {
		type: String
	},
	text: {
		type: String
	},
	lastModified: {
		type: String
	},
	userId: {
		type: String
	}
});
Drafts.attachSchema(DraftsSchema);