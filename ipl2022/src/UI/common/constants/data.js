
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

export const TeamColor = {
  1: "#ff0", //csk
  2: "#2561ae", //dc
  3: "#00416a", //gt
  4: "#7300ab", //kkr
  5: "#ace5ee", //lsg
  6: "#004f91", //mi
  7: "#ed1f27", //pk
  8: "RGB(37 ,74 ,165)", //rr
  9: "#d5152c", //rcb
  10: "#f7a721", //srh
  //in case if the ids of the above teams changes, default colors will be used
  t1: "pink", //
  t2: "silver", //
};

export const TeamFontColor = {
  1: "black", //csk
  2: "#fff", //dc
  3: "#fff", //gt
  4: "#fff", //kkr
  5: "black", //lsg
  6: "#fff", //mi
  7: "#fff", //pk
  8: "white", //rr
  9: "#fff", //rcb
  10: "black", //srh
  //in case if the ids of the above teams changes, default colors will be used
  t1: "black", //
  t2: "black", //
};

export const BorderTop = {
  1: "5px solid #ef9b0f", //csk
  2: "5px solid #4B9CD3", //dc
  3: "5px solid #1d2951", //gt
  4: "5px solid #430064", //kkr
  5: "5px solid #9bc4e2", //lsg
  6: "5px solid blue", //mi
  7: "5px solid #af002a", //pk
  8: "5px solid #1877F2", //rr
  9: "5px solid #800000", //rcb
  10: "5px solid #F05E23", //srh
  //in case if the ids of the above teams changes, default colors will be used
  t1: "pink", //
  t2: "silver", //
};

export const TeamShortColor = {
  CSK: "#ff0", //csk
  DC: "#2561ae", //dc
  GT: "#00416a", //gt
  KKR: "#7300ab", //kkr
  LSG: "#ace5ee", //lsg
  MI: "#004f91", //mi
  PBKS: "#ed1f27", //pbks
  RR: "RGB(37 ,74 ,165)", //rr
  RCB: "#d5152c", //rcb
  SRH: "#f7a721", //srh
  //in case if the ids of the above teams changes, default colors will be used
  t1: 'pink', //
  t2: 'silver' //
};

export const TeamShortFontColor = {
  CSK: "black", //csk
  DC: "#fff", //dc
  GT: "#fff", //gt
  KKR: "#fff", //kkr
  LSG: "black", //lsg
  MI: "#fff", //mi
  PBKS: "#fff", //pk
  RR: "white", //rr
  RCB: "#fff", //rcb
  SRH: "black", //srh
  //in case if the ids of the above teams changes, default colors will be used
  t1: 'black', //
  t2: 'black' //
}

export const BorderShortTop = {
  CSK: "5px solid #ef9b0f", //csk
  DC: "5px solid #4B9CD3", //dc
  GT: "5px solid #1d2951", //gt
  KKR: "5px solid #430064", //kkr
  LSG: "5px solid #9bc4e2", //lsg
  MI: "5px solid blue", //mi
  PBKS: "5px solid #af002a", //pk
  RR: "5px solid #1877F2", //rr
  RCB: "5px solid #800000", //rcb
  SRH: "5px solid #F05E23", //srh
  //in case if the ids of the above teams changes, default colors will be used
  t1: 'pink', //
  t2: 'silver' //
};

export const Matches = [
  {
    matchId: 7878,
    tournamentId: 1,
    name: "ffghfh",
    venueId: 1,
    venue: "chennai",
    team1: "Delhi Capitals",
    team1Id: 2,
    team2Id: 5,
    team1Short: "DC",
    team2: "Punjab Kings",
    team2Short: "PBKS",
    team1Logo:
      "https://firebasestorage.googleapis.com/v0/b/sportsgeek-74e1e.appspot.com/o/2fd0a3a7-e51b-459c-b5d6-2efc9200d80f.png?alt=media",
    team2Logo:
      "https://firebasestorage.googleapis.com/v0/b/sportsgeek-74e1e.appspot.com/o/b1c46baa-8ccd-4aea-9d92-8f390c59c8a6.jpeg?alt=media",
    winnerTeamId: 0,
    resultStatus: 0,
    minimumPoints: 10,
    startDatetime: "2021-09-19T11:05:36.000+00:00",
  },
  {
    matchId: 85666,
    tournamentId: 1,
    name: "nmnmjk",
    venueId: 2,
    venue: "mumbai",
    team1: "Kolkata Knight Riders",
    team1Id: 3,
    team2Id: 6,
    team1Short: "KKR",
    team2: "Rajasthan Royals",
    team2Short: "RR",
    team1Logo:
      "https://firebasestorage.googleapis.com/v0/b/sportsgeek-74e1e.appspot.com/o/46c719d9-0282-446d-bd79-d2e4c5f05450.png?alt=media",
    team2Logo:
      "https://firebasestorage.googleapis.com/v0/b/sportsgeek-74e1e.appspot.com/o/0e9cdfda-a829-44c5-864c-c164d8df3bcc.png?alt=media",
    winnerTeamId: 0,
    resultStatus: 0,
    minimumPoints: 10,
    startDatetime: "2021-09-20T11:05:55.000+00:00",
  },
  {
    matchId: 8566,
    tournamentId: 1,
    name: "nmnmjk",
    venueId: 2,
    venue: "mumbai",
    team1: "Kolkata Knight Riders",
    team1Id: 3,
    team2Id: 6,
    team1Short: "KKR",
    team2: "Rajasthan Royals",
    team2Short: "RR",
    team1Logo:
      "https://firebasestorage.googleapis.com/v0/b/sportsgeek-74e1e.appspot.com/o/46c719d9-0282-446d-bd79-d2e4c5f05450.png?alt=media",
    team2Logo:
      "https://firebasestorage.googleapis.com/v0/b/sportsgeek-74e1e.appspot.com/o/0e9cdfda-a829-44c5-864c-c164d8df3bcc.png?alt=media",
    winnerTeamId: 0,
    resultStatus: 0,
    minimumPoints: 10,
    startDatetime: "2021-09-20T11:05:55.000+00:00",
  }
];

export const teamFlags = 'https://firebasestorage.googleapis.com/v0/b/react-128c5.appspot.com/o/team_flags.jpg?alt=media';
export const ipl = 'https://firebasestorage.googleapis.com/v0/b/react-128c5.appspot.com/o/ipl.jpg?alt=media';
export const registration = 'https://firebasestorage.googleapis.com/v0/b/react-128c5.appspot.com/o/register.jpg?alt=media';
export const allteams = 'https://firebasestorage.googleapis.com/v0/b/react-128c5.appspot.com/o/allteams.jpg?alt=media';
export const chennaiWin = 'https://firebasestorage.googleapis.com/v0/b/react-128c5.appspot.com/o/chennaiWon2021.jpg?alt=media';
export const trophy = 'https://firebasestorage.googleapis.com/v0/b/react-128c5.appspot.com/o/trophy.jpg?alt=media';
export const BackGroundImage = "https://firebasestorage.googleapis.com/v0/b/react-128c5.appspot.com/o/stadium.jpg?alt=media";
export const userProfile = 'https://firebasestorage.googleapis.com/v0/b/react-128c5.appspot.com/o/profile-section.jpg?alt=media';
export const otherUser = 'https://firebasestorage.googleapis.com/v0/b/react-128c5.appspot.com/o/otherUser.jpg?alt=media';