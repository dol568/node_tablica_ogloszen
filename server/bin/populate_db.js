const container = require("../container");

const db = container.resolve("dataSource");

const users = [
  {
    _id: "662dcc93c1aec99477a6302a",
    name: {
      first: "Sarah",
      last: "String",
    },
    password: "123",
    email: "sarah@gmail.com",
    address: {
      street: ["1234 Main St"],
      city: "Springfield",
      state: "IL",
      zip: 62704,
    },
  },
  {
    _id: "662dcc93c1aec99477a6302b",
    name: {
      first: "Colin",
      last: "Ihrig",
    },
    password: "123",
    email: "colin@gmail.com",
    address: {
      street: ["11 Wall Street"],
      city: "New York",
      state: "NY",
      zip: 10118,
    },
  },
  {
    _id: "662dcc93c1aec99477a6302c",
    name: {
      first: "Adam",
      last: "Bretz",
    },
    password: "123",
    email: "adam@gmail.com",
    address: {
      street: ["46 18th St"],
      city: "Pittsburgh",
      state: "PA",
      zip: 15222,
    },
  },
];

const advertisements = [
  {
    _id: "665dcc93c1aec99477a6302b",
    title: "Limited Time: 50% Off Sale Ends Tonight at Midnight",
    category: "shopping",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempor felis vitae est ornare elementum. Donec condimentum, odio at commodo molestie, sapien libero iaculis leo, eu dictum nisi neque ultrices nisl. Suspendisse potenti. Suspendisse a viverra augue. Vivamus tincidunt malesuada elit, eget volutpat tellus mattis id. Proin felis augue, iaculis vitae elit ut, euismod commodo ex. Proin pharetra rutrum tellus eget sollicitudin. Nunc faucibus vulputate malesuada. Praesent vitae neque semper, consectetur massa id, vulputate turpis. Donec vehicula ex ut pharetra luctus. Maecenas eu libero at metus sodales blandit. Ut accumsan lorem a ligula fringilla ornare. Sed semper posuere ante, eu fringilla urna maximus vel. Quisque libero arcu, euismod vel risus at, finibus gravida metus. Morbi porta ex massa, vel bibendum nunc rhoncus eget. Vestibulum in neque laoreet leo congue egestas.",
    tags: ["chalk", "avenue", "distance", "copper", "interactive", "lunchroom", "hallway", "america"],
    price: 250.99,
    ratingsAverage: 1,
    ratingsQuantity: 1,
    createdAt: new Date("2024-01-11"),
    updatedAt: new Date("2024-01-12"),
    _author: "662dcc93c1aec99477a6302a",
  },
  {
    _id: "666dcc93c1aec99477a6302b",
    title: "Want to Save Time on Laundry? Try Our Pickup Service",
    category: "service",
    content:
      "Vestibulum faucibus eleifend metus, sed pharetra nunc vulputate vitae. In egestas turpis sit amet molestie aliquet. Sed tellus risus, congue interdum nunc vitae, varius placerat urna. Etiam vitae volutpat nisl. Aliquam fringilla quam lacus, sit amet tempor metus varius quis. Etiam sed faucibus felis, rutrum molestie felis. Suspendisse id velit maximus, ultricies tellus sed, vestibulum ex. Mauris enim quam, tincidunt eget massa sit amet, bibendum venenatis nisi. Cras dictum, tellus non sollicitudin pharetra, justo est sodales erat, ut efficitur sapien nulla vel augue. Duis tincidunt enim gravida ante rutrum, eget accumsan odio aliquam. Vivamus dictum cursus arcu sed consectetur. Duis vehicula leo vestibulum tempus ultricies. Pellentesque iaculis at orci eu cursus. Mauris iaculis hendrerit nulla sed malesuada. In consequat sem vel vehicula dapibus. Donec non purus vel velit sollicitudin fermentum ut suscipit arcu.",
    price: 200,
    tags: ["turkey", "fireman", "rhinoceros", "mandolin", "cracker", "bomb", "hovercraft", "chalk"],
    ratingsAverage: 3,
    ratingsQuantity: 1,
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-02-16"),
    _author: "662dcc93c1aec99477a6302b",
  },
  {
    _id: "667dcc93c1aec99477a6302b",
    title: "Want to Learn Spanish Fast? Try Our App Risk-Free",
    category: "education",
    content:
      "Sed at diam non dolor ornare ultrices in non lacus. Sed pulvinar tellus posuere, faucibus metus vitae, accumsan nisi. Nunc vestibulum, elit a aliquam convallis, erat tortor viverra risus, quis pulvinar dui nunc sed nisl. Phasellus sodales odio sem, nec malesuada ex lobortis eu. Curabitur pretium risus nec felis maximus, sed imperdiet dui pharetra. Fusce faucibus volutpat orci, eu imperdiet ligula ornare at. Maecenas in consectetur justo, nec pellentesque nisi. Aenean laoreet nulla eu nibh rhoncus porttitor. Suspendisse laoreet bibendum fringilla. Etiam eget nunc turpis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas ac imperdiet ipsum. Phasellus semper purus leo, at rhoncus ante rutrum id. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    price: 300.5,
    tags: ["watch", "speedboat", "zoo", "authority", "coach", "gasoline", "side", "author"],
    createdAt: new Date("2024-03-25"),
    updatedAt: new Date("2024-03-26"),
    _author: "662dcc93c1aec99477a6302c",
  },
];

const comments = [
  {
    _id: "665dcc94c1aec99477a6302b",
    rating: 1,
    content: "varius placerat urna. Etiam vitae volutpat nisl.",
    createdAt: new Date("2024-04-11"),
    updatedAt: new Date("2024-04-12"),
    _advertisement: "665dcc93c1aec99477a6302b",
    _author: "662dcc93c1aec99477a6302b",
  },
  {
    _id: "666dcc95c1aec99477a6302b",
    content: "Sed pharetra nunc vulputate vitae. In egestas turpis.",
    rating: 3,
    createdAt: new Date("2024-04-15"),
    updatedAt: new Date("2024-04-16"),
    _advertisement: "666dcc93c1aec99477a6302b",
    _author: "662dcc93c1aec99477a6302a",
  },
];

(async () => {
  try {
    await db.connect();
    await db.populate(users, advertisements, comments);
    await db.close();
    console.log("Database population completed successfully");
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
})();
