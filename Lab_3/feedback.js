class User {
  constructor(lastName, firstName, age, education, purpose, date, time) {
    this.lastName = lastName;
    this.firstName = firstName;
    this.age = age;
    this.education = education;
    this.purpose = purpose; // "претензія" або "побажання"
    this.date = new Date(`${date}T${time}`);
  }

  get fullName() {
    return `${this.lastName} ${this.firstName}`;
  }
}

// 1. Створення користувачів
let users = [
  new User("Іваненко", "Олег", 25, "Вища", "претензія", "2025-03-12", "10:30"),
  new User(
    "Петренко",
    "Марія",
    30,
    "Середня",
    "побажання",
    "2025-03-15",
    "15:00"
  ),
  new User("Сидоренко", "Анна", 27, "Вища", "претензія", "2025-03-20", "19:45"),
  new User(
    "Коваль",
    "Ірина",
    22,
    "Середня",
    "побажання",
    "2025-02-18",
    "11:20"
  ),
  new User(
    "Шевченко",
    "Богдан",
    35,
    "Вища",
    "претензія",
    "2025-03-10",
    "09:10"
  ),
  new User(
    "Мельник",
    "Катерина",
    29,
    "Середня спеціальна",
    "побажання",
    "2025-03-25",
    "14:40"
  ),
  new User(
    "Ткаченко",
    "Андрій",
    40,
    "Вища",
    "претензія",
    "2025-02-12",
    "13:15"
  ),
  new User(
    "Кравчук",
    "Оксана",
    33,
    "Середня",
    "побажання",
    "2025-03-05",
    "17:30"
  ),
  new User("Лисенко", "Ігор", 28, "Вища", "претензія", "2025-03-22", "20:00"),
  new User(
    "Гнатюк",
    "Світлана",
    25,
    "Середня спеціальна",
    "побажання",
    "2025-03-28",
    "08:50"
  ),
];

// 2. Перелік користувачів за місяцем і моментом часу
function usersByMonthAndTime(users, month, timeStr) {
  let [hours, minutes] = timeStr.split(":").map(Number);
  return users.filter(
    (u) =>
      u.date.getMonth() + 1 === month &&
      (u.date.getHours() > hours ||
        (u.date.getHours() === hours && u.date.getMinutes() >= minutes))
  );
}

console.log("Звернулись у березні після 12:00:");
console.log(usersByMonthAndTime(users, 3, "12:00").map((u) => u.fullName));

// 3. Середній вік і пошук співпадінь
function averageAge(users) {
  let avg = users.reduce((sum, u) => sum + u.age, 0) / users.length;
  let found = users.filter((u) => u.age === Math.round(avg));
  return { avg, found };
}
let avgData = averageAge(users);
console.log("Середній вік:", avgData.avg);
if (avgData.found.length > 0) {
  avgData.found.forEach((u) =>
    console.log(`Освіта користувача ${u.fullName}: ${u.education}`)
  );
}

// 4. Класифікація користувачів
function classifyUsers(users) {
  let classes = {
    "з претензією у робочий час": 0,
    "з побажанням у робочий час": 0,
    Інші: 0,
  };

  users.forEach((u) => {
    let hour = u.date.getHours();
    let inWorkHours = hour >= 9 && hour < 18;

    if (u.purpose === "претензія" && inWorkHours) {
      classes["з претензією у робочий час"]++;
    } else if (u.purpose === "побажання" && inWorkHours) {
      classes["з побажанням у робочий час"]++;
    } else {
      classes["Інші"]++;
    }
  });

  return classes;
}
console.log("Кількість користувачів за класами:", classifyUsers(users));

// 5. Сортування
function sortByAgeDesc(users) {
  return [...users].sort((a, b) => b.age - a.age);
}
function sortByName(users) {
  return [...users].sort((a, b) => a.lastName.localeCompare(b.lastName));
}

console.log("Сортування за віком (спадання):");
console.log(sortByAgeDesc(users).map((u) => `${u.fullName}, ${u.age}`));

console.log("Сортування за алфавітом:");
console.log(sortByName(users).map((u) => u.fullName));
