export const questionData = [
  // Research & Development
  ...Array.from({ length: 15 }, (_, i) => ({
    section: "Research & Development",
    questionNo: i + 1,
    status: i < 5 ? "reviewed" : "not-reviewed",
  })),

  // Planning
  ...Array.from({ length: 11 }, (_, i) => ({
    section: "Planning",
    questionNo: i + 1,
    status: i < 7 ? "reviewed" : "not-reviewed",
  })),

  // Production
  ...Array.from({ length: 20 }, (_, i) => ({
    section: "Production",
    questionNo: i + 1,
    status: i < 2 ? "reviewed" : "not-reviewed",
  })),

  // Quality
  ...Array.from({ length: 20 }, (_, i) => ({
    section: "Quality",
    questionNo: i + 1,
    status: i < 11 ? "reviewed" : "not-reviewed",
  })),

  // Maintenance
  ...Array.from({ length: 20 }, (_, i) => ({
    section: "Maintenance",
    questionNo: i + 1,
    status: i < 1 ? "reviewed" : "not-reviewed",
  })),

  //hr
  ...Array.from({ length: 20 }, (_, i) => ({
    section: "Hr",
    questionNo: i + 1,
    status: i < 1 ? "reviewed" : "not-reviewed",
  })),
];
