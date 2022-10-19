const User = require("../models/UserModel");
module.exports.addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const moviesArrayLiked = likedMovies.find(({ id }) => id === data.id);
      if (!moviesArrayLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data],
          },
          { new: true }
        );
      } else return res.json({ msg: "Movie Already added to the liked list." });
    } else await User.create({ email, likedMovies: [data] });
    return res.json({ msg: "Movie added successfully" });
  } catch (err) {
    return res.json({ msg: "Error adding movie,please try again later!" });
  }
};

module.exports.getLikedMovies = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (user) {
      res.json({ msg: "success", movies: user.likedMovies });
    } else {
      return res.json({ msg: "User Not Found!" });
    }
  } catch (err) {
    return res.json({ msg: "Error fetching movie,please try again!" });
  }
};

module.exports.removeLikedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieIndex = likedMovies.findIndex(({ id }) => id === movieId);
      if (!movieIndex) {
        res.status(400).send({ msg: "Movie not found" });
      }
        likedMovies.splice(movieIndex,1);
      
        await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies
          },
          { new: true }
        );
      
        return res.json({ msg: "Movie Deleted", movies: likedMovies });
    }
    
  } catch (err) {
    console.log(err)
    return res.json({ msg: "Error deleting videos!" });
  }
};
