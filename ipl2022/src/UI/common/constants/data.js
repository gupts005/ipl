export const BackGroundImage = "https://wallpaperaccess.com/full/1088620.jpg";

export const EndPoint = "http://localhost:8080";

export const HeaderData = [
  {
    id: "1",
    title: "Match List",
    url: "/match-list",
  },
  {
    id: "2",
    title: "Leader Board",
    url: "/leader-board",
  },
  {
    id: "3",
    title: "My Matches",
    url: "/my-matches",
  },
  {
    id: "4",
    title: "Chat",
    url: "/chat",
  },
  {
    id: "5",
    title: "Profile",
    url: "/profile",
  },
];

export const teamColor = {
  1: "#ff0", //csk
  2: "#2561ae", //dc
  3: "#7300ab", //kkr
  4: "#004f91", //mi
  5: "#ed1f27", //pk
  6: "RGB(37 ,74 ,165)", //rr
  7: "#d5152c", //rcb
  8: "#f7a721", //srh
  //in case if the ids of the above teams changes, default colors will be used
  t1: "pink", //
  t2: "silver", //
};

export const teamFontColor = {
  1: "black", //csk
  2: "#fff", //dc
  3: "#fff", //kkr
  4: "#fff", //mi
  5: "#fff", //pk
  6: "white", //rr
  7: "#fff", //rcb
  8: "black", //srh
  //in case if the ids of the above teams changes, default colors will be used
  t1: "black", //
  t2: "black", //
};

export const borderTop = {
  1: "5px solid #ef9b0f", //csk
  2: "5px solid #4B9CD3", //dc
  3: "5px solid #430064", //kkr
  4: "5px solid blue", //mi
  5: "5px solid #af002a", //pk
  6: "5px solid #1877F2", //rr
  7: "5px solid #800000", //rcb
  8: "5px solid #F05E23", //srh
  //in case if the ids of the above teams changes, default colors will be used
  t1: "pink", //
  t2: "silver", //
};

const userData = JSON.parse(localStorage.getItem("loginState"));
export const Token = {
  headers: { Authorization: `Bearer ${userData?.token}` },
};

