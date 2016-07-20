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
	},
	isPublic: {
		type: Boolean
	}
});
Drafts.attachSchema(DraftsSchema);
