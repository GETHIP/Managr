Template.blogContent.helpers({
      publicPosts: function(){
        //Returns Posts by Jim for non-logins
        return BlogPostCollection.find(authorId: {$eq: 1}); //Set ID to Jim's Id (Always Public Posts)
      },
      //Returns all Blog Posts
      allPosts: function(){
        return BlogPostsCollection.find();
      }
});
