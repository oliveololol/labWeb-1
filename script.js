
"use strict";

console.log("Лабораторна робота №4");

// Завдання 1. Змінні та типи даних


console.group("Завдання 1. Змінні та типи даних");

const stringValue = "JavaScript";
const numberValue = 42;
const booleanValue = true;
const nullValue = null;
const undefinedValue = undefined;
const symbolValue = Symbol("id");
const bigintValue = 12345678901234567890n;

console.log("string:", stringValue, typeof stringValue);
console.log("number:", numberValue, typeof numberValue);
console.log("boolean:", booleanValue, typeof booleanValue);
console.log("null:", nullValue, typeof nullValue);
console.log("undefined:", undefinedValue, typeof undefinedValue);
console.log("symbol:", symbolValue, typeof symbolValue);
console.log("bigint:", bigintValue, typeof bigintValue);

// Явне перетворення типів
console.log("String(123):", String(123));
console.log("String(true):", String(true));

console.log('Number("123"):', Number("123"));
console.log('Number(""):', Number(""));
console.log("Number(true):", Number(true));
console.log("Number(false):", Number(false));
console.log("Number(null):", Number(null));
console.log("Number(undefined):", Number(undefined));

// Falsy та truthy значення
const valuesForBooleanCheck = [
    0,
    "",
    null,
    undefined,
    NaN,
    "0",
    [],
    {},
    "false",
    42,
    -1
];

valuesForBooleanCheck.forEach((value) => {
    console.log(
        "Значення:",
        value,
        "Boolean(value):",
        Boolean(value),
        Boolean(value) ? "truthy" : "falsy"
    );
});

// Шаблонні рядки
const studentName = "Іван";
const studentAge = 20;
const university = "Університет";

console.log(
    `Студент: ${studentName}, вік: ${studentAge}, університет: ${university}`
);

// Різниця між == та ===
console.log('5 == "5":', 5 == "5");
console.log('5 === "5":', 5 === "5");

console.log("0 == false:", 0 == false);
console.log("0 === false:", 0 === false);

console.log("null == undefined:", null == undefined);
console.log("null === undefined:", null === undefined);

console.groupEnd();

// Завдання 2. Умови та логіка

console.group("Завдання 2. Умови та логіка");

function getGrade(score) {
    if (
        typeof score !== "number" ||
        Number.isNaN(score) ||
        score < 0 ||
        score > 100
    ) {
        return "невалідний бал";
    }

    if (score <= 59) {
        return "незадовільно";
    } else if (score <= 74) {
        return "задовільно";
    } else if (score <= 89) {
        return "добре";
    } else {
        return "відмінно";
    }
}

function getSeasonUA(month) {
    switch (month) {
        case 12:
        case 1:
        case 2:
            return "зима";

        case 3:
        case 4:
        case 5:
            return "весна";

        case 6:
        case 7:
        case 8:
            return "літо";

        case 9:
        case 10:
        case 11:
            return "осінь";

        default:
            return "невалідний номер місяця";
    }
}

// Тернарний оператор
const personAge = 19;

const ageStatus =
    personAge >= 18
        ? "повнолітній"
        : "неповнолітній";

// Перевірка getGrade
console.log("getGrade(45):", getGrade(45));
console.log("getGrade(68):", getGrade(68));
console.log("getGrade(82):", getGrade(82));
console.log("getGrade(95):", getGrade(95));
console.log("getGrade(-10):", getGrade(-10));
console.log('getGrade("90"):', getGrade("90"));
console.log("getGrade(120):", getGrade(120));

// Перевірка getSeasonUA
console.log("getSeasonUA(1):", getSeasonUA(1));
console.log("getSeasonUA(4):", getSeasonUA(4));
console.log("getSeasonUA(7):", getSeasonUA(7));
console.log("getSeasonUA(10):", getSeasonUA(10));
console.log("getSeasonUA(15):", getSeasonUA(15));

console.log(`Вік: ${personAge}. Статус: ${ageStatus}`);

console.groupEnd();

// Завдання 3. Масиви

console.group("Завдання 3. Масиви");

const students = [
    {
        name: "Олена Коваленко",
        grade: 87,
        courses: ["JavaScript", "HTML", "CSS"]
    },
    {
        name: "Іван Петренко",
        grade: 95,
        courses: ["JavaScript", "React"]
    },
    {
        name: "Марія Шевченко",
        grade: 72,
        courses: ["HTML", "CSS"]
    },
    {
        name: "Андрій Бондар",
        grade: 58,
        courses: ["JavaScript", "Git"]
    },
    {
        name: "Софія Мельник",
        grade: 91,
        courses: ["Python", "SQL"]
    },
    {
        name: "Максим Ткаченко",
        grade: 80,
        courses: ["JavaScript", "Node.js"]
    }
];

console.log("Початковий масив:");
console.table(students);

// push
students.push({
    name: "Дарина Мороз",
    grade: 76,
    courses: ["HTML", "JavaScript"]
});

console.log("Після push:");
console.table(students);

// pop
const removedLastStudent = students.pop();

console.log("Видалений останній студент:");
console.log(removedLastStudent);

console.log("Після pop:");
console.table(students);

// splice - видалення студента
const removedStudent = students.splice(2, 1);

console.log("Видалений студент:");
console.log(removedStudent);

console.log("Після splice (видалення):");
console.table(students);

// splice - вставка студента
students.splice(2, 0, {
    name: "Вікторія Кравченко",
    grade: 84,
    courses: ["CSS", "JavaScript"]
});

console.log("Після вставки через splice:");
console.table(students);

// find
const excellentStudent = students.find(student => student.grade > 90);

console.log("Перший студент з оцінкою > 90:");
console.log(excellentStudent);

// filter
const jsStudents = students.filter(student =>
    student.courses.includes("JavaScript")
);

console.log("Студенти, що вивчають JavaScript:");
console.table(jsStudents);

// reduce
const averageGrade =
    students.reduce(
        (sum, student) => sum + student.grade,
        0
    ) / students.length;

console.log("Середня оцінка:", averageGrade.toFixed(2));

console.groupEnd();

// Завдання 4. Функції


console.group("Завдання 4. Функції");

// Function Declaration
function rectangleAreaDeclaration(width, height) {
    return width * height;
}

// Function Expression
const rectangleAreaExpression = function (width, height) {
    return width * height;
};

// Arrow Function
const rectangleAreaArrow = (width, height) => width * height;

// Функція-замикання
function createCounter(initialValue = 0) {
    let value = initialValue;

    return {
        increment() {
            value += 1;
            return value;
        },

        decrement() {
            value -= 1;
            return value;
        },

        getValue() {
            return value;
        }
    };
}

// Функція з параметрами за замовчуванням
function createUser(name, role = "student", isActive = true) {
    return {
        name,
        role,
        isActive
    };
}

// Функція з rest-параметрами
const sum = (...numbers) => {
    return numbers.reduce(
        (result, number) => result + number,
        0
    );
};

// Деструктуризація в параметрах
function printStudentInfo({ name, grade, courses }) {
    console.log(`${name} має оцінку ${grade}`);
    console.log(`Курси: ${courses.join(", ")}`);
}

// Перевірка функцій обчислення площі
console.log(
    "Function Declaration:",
    rectangleAreaDeclaration(5, 4)
);

console.log(
    "Function Expression:",
    rectangleAreaExpression(6, 3)
);

console.log(
    "Arrow Function:",
    rectangleAreaArrow(8, 2)
);

// Перевірка замикання
const counter = createCounter();

console.log("increment:", counter.increment());
console.log("increment:", counter.increment());
console.log("decrement:", counter.decrement());
console.log("getValue:", counter.getValue());

// Перевірка параметрів за замовчуванням
console.log(
    "Користувач зі стандартними параметрами:",
    createUser("Іван")
);

console.log(
    "Користувач з усіма параметрами:",
    createUser("Олена", "admin", false)
);

// Перевірка rest-параметрів
console.log("sum(1, 2, 3):", sum(1, 2, 3));
console.log("sum(10, 20):", sum(10, 20));
console.log("sum():", sum());

// Перевірка деструктуризації
printStudentInfo(students[0]);

console.groupEnd();

// Завдання 5. Об'єкти

console.group("Завдання 5. Об'єкти");

const studentProfile = {
    firstName: "Іван",
    lastName: "Ковалов",
    age: 20,
    university: "Університет",
    grades: {
        math: 85,
        physics: 92,
        programming: 96
    },
    isActive: true,

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    },

    getAverageGrade() {
        const gradeValues = Object.values(this.grades);

        if (gradeValues.length === 0) {
            return 0;
        }

        const gradeSum = gradeValues.reduce(
            (sum, grade) => sum + grade,
            0
        );

        return gradeSum / gradeValues.length;
    }
};

// Доступ через крапкову нотацію
console.log("Ім'я:", studentProfile.firstName);
console.log("Вік:", studentProfile.age);

// Доступ через квадратні дужки
console.log("Прізвище:", studentProfile["lastName"]);

// Динамічний ключ
const propertyName = "university";

console.log(
    "Університет:",
    studentProfile[propertyName]
);

// Виклик методів об'єкта
console.log(
    "Повне ім'я:",
    studentProfile.getFullName()
);

console.log(
    "Середня оцінка:",
    studentProfile.getAverageGrade().toFixed(2)
);

// Object.keys()
console.log(
    "Ключі об'єкта:",
    Object.keys(studentProfile)
);

// Object.values()
console.log(
    "Значення об'єкта:",
    Object.values(studentProfile)
);

// Object.entries()
console.log("Пари ключ-значення:");

Object.entries(studentProfile).forEach(([key, value]) => {
    console.log(`${key}:`, value);
});

// Копіювання об'єкта через spread
const studentProfileCopy = {
    ...studentProfile,
    firstName: "Олександр"
};

console.log(
    "Ім'я в оригіналі:",
    studentProfile.firstName
);

console.log(
    "Ім'я в копії:",
    studentProfileCopy.firstName
);

// Optional chaining
const labScore = studentProfile.grades?.lab;

const mentorName =
    studentProfile.mentor?.name ?? "Не призначено";

console.log(
    "Оцінка за лабораторну:",
    labScore
);

console.log(
    "Наставник:",
    mentorName
);

console.groupEnd();

// Завдання 6. Ланцюжки методів масивів


console.group("Завдання 6. Ланцюжки методів масивів");

const products = [
    {
        name: "Ноутбук",
        price: 25000,
        category: "electronics",
        inStock: true,
        quantity: 5
    },
    {
        name: "Смартфон",
        price: 18000,
        category: "electronics",
        inStock: true,
        quantity: 8
    },
    {
        name: "Навушники",
        price: 2500,
        category: "electronics",
        inStock: false,
        quantity: 12
    },
    {
        name: "Монітор",
        price: 9000,
        category: "electronics",
        inStock: true,
        quantity: 4
    },
    {
        name: "Книга JavaScript",
        price: 700,
        category: "books",
        inStock: true,
        quantity: 15
    },
    {
        name: "Зошит",
        price: 80,
        category: "stationery",
        inStock: true,
        quantity: 40
    },
    {
        name: "Ручка",
        price: 25,
        category: "stationery",
        inStock: false,
        quantity: 100
    },
    {
        name: "Настільна лампа",
        price: 1200,
        category: "home",
        inStock: true,
        quantity: 6
    }
];

// filter -> map -> reduce
const totalStockValue = products
    .filter((product) => product.inStock)
    .map((product) => product.price * product.quantity)
    .reduce((total, value) => total + value, 0);

console.log(
    "Загальна вартість товарів у наявності:",
    totalStockValue
);

// filter -> sort -> map
const electronicsNames = products
    .filter((product) => product.category === "electronics")
    .sort((firstProduct, secondProduct) =>
        firstProduct.price - secondProduct.price
    )
    .map((product) => product.name);

console.log(
    "Товари категорії electronics за зростанням ціни:",
    electronicsNames
);

// reduce
const productCountByCategory = products.reduce(
    (result, product) => {
        result[product.category] =
            (result[product.category] ?? 0) + 1;

        return result;
    },
    {}
);

console.log(
    "Кількість товарів у кожній категорії:",
    productCountByCategory
);

// Сортування студентів за оцінкою
const studentsSortedByGrade = [...students].sort(
    (firstStudent, secondStudent) =>
        secondStudent.grade - firstStudent.grade
);

console.log(
    "Студенти за оцінкою від найвищої до найнижчої:"
);

console.table(studentsSortedByGrade);

// Сортування студентів за ім'ям
const studentsSortedByName = [...students].sort(
    (firstStudent, secondStudent) =>
        firstStudent.name.localeCompare(
            secondStudent.name,
            "uk"
        )
);

console.log(
    "Студенти за ім'ям в алфавітному порядку:"
);

console.table(studentsSortedByName);

console.groupEnd();

// Завдання 7. Рядки


console.group("Завдання 7. Рядки");

function capitalize(str) {
    if (typeof str !== "string" || str.length === 0) {
        return "";
    }

    return str.charAt(0).toUpperCase() +
        str.slice(1).toLowerCase();
}

function countWords(str) {
    if (typeof str !== "string") {
        return 0;
    }

    const trimmedString = str.trim();

    if (trimmedString === "") {
        return 0;
    }

    return trimmedString.split(/\s+/).length;
}

function truncate(str, maxLength) {
    if (
        typeof str !== "string" ||
        typeof maxLength !== "number" ||
        maxLength < 0
    ) {
        return "";
    }

    if (str.length <= maxLength) {
        return str;
    }

    return `${str.slice(0, maxLength)}...`;
}

function isValidEmail(email) {
    if (
        typeof email !== "string" ||
        !email.includes("@")
    ) {
        return false;
    }

    const firstAtIndex = email.indexOf("@");
    const lastAtIndex = email.lastIndexOf("@");

    // Перевірка, що символ @ лише один
    if (firstAtIndex !== lastAtIndex) {
        return false;
    }

    // Перед @ має бути хоча б один символ
    if (firstAtIndex === 0) {
        return false;
    }

    const lastDotIndex = email.lastIndexOf(".");

    // Після @ має бути хоча б один символ перед крапкою
    if (lastDotIndex < firstAtIndex + 2) {
        return false;
    }

    // Після останньої крапки має бути мінімум два символи
    if (email.length - lastDotIndex - 1 < 2) {
        return false;
    }

    return true;
}

// Перевірка capitalize
console.log(
    'capitalize("javaScript"):',
    capitalize("javaScript")
);

console.log(
    'capitalize("hello world"):',
    capitalize("hello world")
);

console.log(
    'capitalize(""):',
    capitalize("")
);

// Перевірка countWords
console.log(
    'countWords("JavaScript це круто"):',
    countWords("JavaScript це круто")
);

console.log(
    'countWords("  пробіли між словами  "):',
    countWords("  пробіли між словами  ")
);

console.log(
    'countWords(""):',
    countWords("")
);

// Перевірка truncate
console.log(
    'truncate("Це довгий текст для прикладу", 15):',
    truncate("Це довгий текст для прикладу", 15)
);

console.log(
    'truncate("Короткий", 20):',
    truncate("Короткий", 20)
);

// Перевірка isValidEmail
console.log(
    'isValidEmail("user@example.com"):',
    isValidEmail("user@example.com")
);

console.log(
    'isValidEmail("invalid-email"):',
    isValidEmail("invalid-email")
);

console.log(
    'isValidEmail("@example.com"):',
    isValidEmail("@example.com")
);

console.log(
    'isValidEmail("user@.com"):',
    isValidEmail("user@.com")
);

console.log(
    'isValidEmail("user@@example.com"):',
    isValidEmail("user@@example.com")
);

console.groupEnd();