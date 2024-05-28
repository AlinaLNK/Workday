document.addEventListener("DOMContentLoaded", function() {
    const calendarContainer = document.getElementById("calendar");
    const currentMonthElement = document.getElementById("current-month");
    const prevMonthButton = document.getElementById("prev-month");
    const nextMonthButton = document.getElementById("next-month");
    const checkDateInput = document.getElementById("check-date");
    const checkButton = document.getElementById("check-button");
    const resultElement = document.getElementById("result");

    let currentYear = 2024;
    let currentMonth = 4; // Май (месяцы в JavaScript считаются с 0)

    const startDate = new Date("2024-05-25");

    function isWorkday(date) {
        const deltaDays = Math.floor((date - startDate) / (1000 * 60 * 60 * 24));
        const cycleDay = deltaDays % 4;
        return cycleDay === 0 || cycleDay === 1; // Рабочие дни: 0 и 1
    }

    function createCalendar(year, month) {
        calendarContainer.innerHTML = '';
        const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDay = firstDay.getDay() === 0 ? 7 : firstDay.getDay();

        currentMonthElement.textContent = `${monthNames[month]} ${year}`;

        // Create day headers
        const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
        daysOfWeek.forEach(day => {
            const dayHeader = document.createElement("div");
            dayHeader.classList.add("day");
            dayHeader.textContent = day;
            calendarContainer.appendChild(dayHeader);
        });

        // Create blank days for the first week
        for (let i = 1; i < startDay; i++) {
            const blankDay = document.createElement("div");
            blankDay.classList.add("day");
            calendarContainer.appendChild(blankDay);
        }

        // Create days
        for (let i = 1; i <= lastDay.getDate(); i++) {
            const date = new Date(year, month, i);
            const dayElement = document.createElement("div");
            dayElement.classList.add("day");
            dayElement.textContent = i;

            if (isWorkday(date)) {
                dayElement.classList.add("workday");
            } else {
                dayElement.classList.add("non-workday");
            }

            calendarContainer.appendChild(dayElement);
        }
    }

    function updateCalendar() {
        createCalendar(currentYear, currentMonth);
    }

    prevMonthButton.addEventListener("click", () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar();
    });

    nextMonthButton.addEventListener("click", () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar();
    });

    checkButton.addEventListener("click", () => {
        const dateStr = checkDateInput.value;
        if (!dateStr) {
            resultElement.textContent = "Пожалуйста, введите дату.";
            return;
        }
        const checkDate = new Date(dateStr);
        if (isNaN(checkDate.getTime())) {
            resultElement.textContent = "Неверный формат даты.";
            return;
        }
        const workday = isWorkday(checkDate);
        resultElement.textContent = workday ? "Рабочий день" : "Нерабочий день";
    });

    updateCalendar();
});

