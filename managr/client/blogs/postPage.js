import { Posts } from '../../collections/blogPosts.js';

Template.postPage.helpers({
      blogPost: function(){
        var blogId = FlowRouter.getParam("blog_id");
        return Posts.findOne({_id: blogId});
      }
});
