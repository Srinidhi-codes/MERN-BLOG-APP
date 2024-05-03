import Blog from '../model/Blog.js'

export const getAllBlog = async (req, res) => {
    try {
        const blog = await Blog.find({}).populate("userId", "-password");
        res.status(200).send({
            success: true,
            messge: 'Successfully Fetched All Blogs',
            blog
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("userId", "-password");

        if (!blog) {
            return res.status(404).send({
                success: false,
                message: "Blog not found"
            });
        }
        blog.views += 1; // Increment views count
        await blog.save(); // Save the updated blog

        res.status(200).send({
            success: true,
            message: "Successfully fetched blog by ID",
            blog
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send({
            success: false,
            message: "Internal server error"
        });
    }
};

export const getFeaturedBlog = async (req, res) => {
    try {
        const blog = await Blog.find({ featured: true }.populate("userId", "-password").limit(3));
        res.status(200).send({
            success: true,
            message: 'Successfully fetched Featured Blogs',
            blog
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

export const createBlog = async (req, res, requireSignIn) => {
    try {
        const blog = await Blog.create({ ...req.body, userId: req.user.id })
        res.status(201).send({
            success: true,
            message: "Created Blog Successfully.",
            blog
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

export const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        if (blog.userId.toString() !== req.user.id.toString()) {
            res.status(401).send({
                success: false,
                message: 'You cannot update others Blogs'
            })
        }
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }).populate('userId', '-password')
        res.status(200).send({
            success: true,
            message: "Successfully Updated the Blog",
            updatedBlog
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

export const likeBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        if (blog.likes.includes(req.user.id)) {
            blog.likes = blog.likes.filter((userId) => userId !== req.user.id)
            await blog.save()
            res.status(200).send({
                success: true,
                message: 'Unliked Successfully',
            })
        }
        else {
            blog.likes.push(req.user.id)
            await blog.save()
            res.status(200).send({
                success: true,
                message: 'Liked Successfully',
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).send({
                success: false,
                message: 'Blog not found'
            });
        }

        if (blog.userId.toString() !== req.user.id.toString()) {
            return res.status(401).send({
                success: false,
                message: 'You cannot delete others blogs'
            });
        }

        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) {
            return res.status(404).send({
                success: false,
                message: 'Blog not found'
            });
        }

        res.status(200).send({
            success: true,
            message: 'Successfully deleted blog'
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Internal server error'
        });
    }
};
