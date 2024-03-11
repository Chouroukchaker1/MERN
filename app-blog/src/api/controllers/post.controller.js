const slugify = require('slugify');
const db = require('../../database/db.config');
const Post = db.posts;
exports.create=(req,res)=>{
    const{title, content, author, slug, tags } = req.body;
    if(!title || !content || !author || !slug){
        return res.status(400).send({
            message : 'content can not be empty'
        })
    }
    const slugy = slugify(slug, '-');
    const newPost = new Post({
        title: title,
        content: content,
        author: author,
        slug: slug,
        tags: tags
    });
    newPost.save(newPost).then((data)=>{
        res.status(200).send({
            message:'successufully created post'
        })
    }).catch(err=>{
        console.log(err);
    });
}
    exports.findAll=(req,res)=>{
        
            Post.find({}).then((data)=>{
                res.send(data);
            }).catch((err)=>{
                console.log(err);
            });  
    }
//supression par id 
exports.delete =(req, res) => {
    const id = req.params.id;
    if(!id) {
        res.status(400).send({ message: "content is required"});
    
    }
    post.findByIdAndRemove(id).then((data) =>{
      if(!data){
        res.status(404).send({message: "post not found"});
      }
      res.status(200).send({ message:"Post was successful deleted"}); 

    })
};

