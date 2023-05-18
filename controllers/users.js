import User from "../models/User";

// READ
export const getUser = async (req, res) => {
  //  we need to get the user with an id
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Get all the user friends related to the id we specified
export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      // We are giong to make multiple API call to the database
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return {
          _id,
          firstName,
          lastName,
          occupation,
          location,
          picturePath,
        };
      }
    );
    res.status(200).json(formattedFriends); // We are now sending this to the frontend.
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


// UPDATE 
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId} = req.params;
        const user = await User.findById(id);   // Grabing the user from the database using await.
        const friend = await User.findById(friendId);

        if (user.friendId.includes(friendId)) {
            user.friends
        }

    } catch (err) {
        res.status(404).json({ message: err.message });
     }
}
