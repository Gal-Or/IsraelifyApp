
var station = {
  _id: "5cksxjas89xjsa8xjsa8jxs09",
  name: "Funky Monks",
  type: "playlist",
  tags: ["Funk", "Happy"],
  createdBy: {
    _id: "u101",
    fullname: "Puki Ben David",
    imgUrl: "http://some-photo/",
  },
  likedByUsers: ["{minimal-user}", "{minimal-user}"],
  songs: [
    {
      id: "s1001",
      title: "The Meters - Cissy Strut",
      url: "youtube/song.mp4",
      imgUrl: "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
      addedBy: "{minimal-user}",
      addedAt: 162521765262,
      tags: ["Funk", "Happy", "hip-hop"]
    },
    {
      id: "mUkfiLjooxs",
      title: "The JB's - Pass The Peas",
      url: "youtube/song.mp4",
      imgUrl: "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
      addedBy: {},
      addedAt: 162521765262,
      tags: ["Funk", "Happy", "rock"],
    },
  ],
};

const minimalStation = {
  _id: "5cksxjas89xjsa8xjsa8jxs09",
  name: "Funky Monks",
  imgUrl: "http://some-photo/"
};

const user = {
  _id: "u101",
  fullname: "Puki Ben David",
  username: "puki",
  password: "123",
  email: "Puki@gmail.com",
  gender: "male",
  birthday: 1234567890,
  imgUrl: "http://some-photo/"
};

const minimalUser = {
  _id: "u101",
  fullname: "Puki Ben David",
  imgUrl: "http://some-photo/",
};