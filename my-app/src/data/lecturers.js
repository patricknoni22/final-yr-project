export const lecturersById = {
  james: {
    id: "james",
    name: "Prof. James Wilson",
    department: "Computer Science",
    title: "Professor of Computer Science",
    office: "Room 105, Computing Block",
    rating: "4.8",
    reviews: "128",
    image: require("../../app/(student)/student-img/prof1.png"),
    about:
      "Supports students with programming, final-year projects, algorithms, and academic guidance.",
    dates: [
      { id: "jul-23", day: "THU", date: "23", label: "Thursday, July 23" },
      { id: "jul-24", day: "FRI", date: "24", label: "Friday, July 24" },
      { id: "jul-27", day: "MON", date: "27", label: "Monday, July 27" },
    ],
    slots: ["9:00 AM", "10:30 AM", "12:00 PM", "2:00 PM", "3:30 PM"],
  },
  elena: {
    id: "elena",
    name: "Dr. Elena Rodriguez",
    department: "Engineering",
    title: "Senior Lecturer in Engineering",
    office: "Room 208, Engineering Block",
    rating: "4.8",
    reviews: "96",
    image: require("../../app/(student)/student-img/prof2.png"),
    about:
      "Available for coursework support, research direction, and engineering project consultations.",
    dates: [
      { id: "jul-23", day: "THU", date: "23", label: "Thursday, July 23" },
      { id: "jul-24", day: "FRI", date: "24", label: "Friday, July 24" },
      { id: "jul-28", day: "TUE", date: "28", label: "Tuesday, July 28" },
    ],
    slots: ["10:00 AM", "11:30 AM", "1:00 PM", "3:00 PM"],
  },
  sarah: {
    id: "sarah",
    name: "Prof. Sarah Chen",
    department: "Arts & Design",
    title: "Professor of Arts & Design",
    office: "Studio 3, Arts Building",
    rating: "5.0",
    reviews: "120",
    image: require("../../app/(student)/student-img/prof3.png"),
    about:
      "Helps students develop portfolios, refine project concepts, and prepare for design reviews.",
    dates: [
      { id: "jul-22", day: "WED", date: "22", label: "Wednesday, July 22" },
      { id: "jul-23", day: "THU", date: "23", label: "Thursday, July 23" },
      { id: "jul-27", day: "MON", date: "27", label: "Monday, July 27" },
    ],
    slots: ["9:30 AM", "11:00 AM", "1:30 PM", "3:30 PM"],
  },
};

export const fallbackLecturer = lecturersById.james;
