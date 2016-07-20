export const Drafts = new Mongo.Collection('Drafts');

DraftsSchema = new SimpleSchema({
	title: {
		type: String
	},
	text: {
		type: String
	},
	lastUpdated: {
		type: String
	},
	authorId: {
		type: String
	},
	isPublic: {
		type: Boolean
	}
});
Drafts.attachSchema(DraftsSchema);
