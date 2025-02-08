// Sample local users array
const users = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Doe", email: "jane@example.com" },
    { id: 3, name: "Anushka Wijewickrama", email: "anushka@example.com" }
];

exports.getUser = (req, res) => {
    try {
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Fetching users failed.' });
    }
};

exports.postUser = (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required" });
    }

    const newUser = {
        id: users.length + 1,
        name,
        email
    };

    users.push(newUser);
    res.status(201).json(newUser);
};
exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const userIndex = users.findIndex(user => user.id === parseInt(id));

    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    users[userIndex] = { ...users[userIndex], name, email };
    res.status(200).json(users[userIndex]);

}

exports.deleteUser = (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex(user => user.id === parseInt(id));

    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    users.splice(userIndex, 1);
    res.status(200).json({ message: "User deleted successfully" });

}
exports.getUserById = (req, res) => {
    const { id } = req.params;
    const user = users.filter(user => user.id === parseInt(id));

    if (user === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
}
