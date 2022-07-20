const router = require("express").Router();
const { Post, Comment, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    console.log("blogs", blogs);
    res.render("homepage", {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/dashboard", withAuth, async (req, res) => {
  //router.get('/dashboard', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      
    });

    // Serialize data so the template can read it

    // Pass serialized data and session flag into template

    
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(postData);
    res.render("dashboard", {posts, 
    logged_in: req.session.logged_in,})

    // res.json(posts);
  } catch (error) {
    res.redirect("login");
  
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

router.get("/create-blog", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  // if (req.session.logged_in) {
  //   res.redirect('/profile');
  //   return;
  // }

  res.render("create-blog", {
    logged_in: true,
  });
});

router.get("/edit-blog", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  // if (req.session.logged_in) {
  //   res.redirect('/profile');
  //   return;
  // }

  const blog = {
    id: "id",
    title: "Dummy Title",
    content: "Some Dummy text",
    author: "author",
    date: "1/17/2022",
  };

  res.render("edit-blog", {
    ...blog,
    logged_in: true,
  });
});

// router.get("/blogs/:id", (req, res) => {
//   Post.findByPk(req.params.id)

//     .then((postData) =>
//     res.render("blog-page", {
//       ...postData,
//       logged_in: req.session.logged_in,
//     }))
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });

// });

router.get("/blogs/:id", async (req, res) => {
  const postData = await Post.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  });

  const blog = postData.get({ plain: true });

  res.render("blogpage", {
    ...blog,
    logged_in: req.session.logged_in,
  });
});

module.exports = router;