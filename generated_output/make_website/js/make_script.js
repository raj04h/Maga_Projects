```javascript
<!DOCTYPE html>
<html>
<head>
<title>Calendar with Message Feature</title>
<style>
  /* Basic Calendar Styling */
  .calendar {
    width: 300px;
    border: 1px solid #ccc;
    font-family: sans-serif;
  }
  .calendar-header {
    background-color: #f0f0f0;
    padding: 10px;
    text-align: center;
  }
  .calendar-body {
    padding: 10px;
  }
  .calendar-weekdays {
    display: flex;
  }
  .calendar-weekdays div {
    width: calc(100% / 7);
    text-align: center;
    font-weight: bold;
  }
  .calendar-days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }
  .calendar-days div {
    padding: 5px;
    text-align: center;
    cursor: pointer;
  }
  .calendar-days div:hover {
    background-color: #e0e0e0;
  }
  .calendar-days div.selected {
    background-color: #007bff; /* Highlight selected day */
    color: white;
  }
  .message-area {
    margin-top: 20px;
  }
</style>
</head>
<body>

<div class="calendar">
  <div class="calendar-header">
    <button id="prevMonthBtn">&lt;</button>
    <span id="monthYear"></span>
    <button id="nextMonthBtn">&gt;</button>
  </div>
  <div class="calendar-body">
    <div class="calendar-weekdays">
      <div>Sun</div>
      <div>Mon</div>
      <div>Tue</div>
      <div>Wed</div>
      <div>Thu</div>
      <div>Fri</div>
      <div>Sat</div>
    </div>
    <div class="calendar-days" id="calendarDays"></div>
  </div>
</div>

<div class="message-area">
  <h3>Message for <span id="selectedDateDisplay"></span></h3>
  <textarea id="messageInput" rows="4" cols="30"></textarea><br>
  <button id="saveMessageBtn">Save Message</button>
  <p id="messageDisplay"></p>
</div>


<script>
  const monthYearElement = document.getElementById('monthYear');
  const calendarDaysElement = document.getElementById('calendarDays');
  const prevMonthBtn = document.getElementById('prevMonthBtn');
  const nextMonthBtn = document.getElementById('nextMonthBtn');
  const messageInput = document.getElementById('messageInput');
  const saveMessageBtn = document.getElementById('saveMessageBtn');
  const messageDisplay = document.getElementById('messageDisplay');
  const selectedDateDisplay = document.getElementById('selectedDateDisplay');

  let currentDate = new Date();
  let selectedDate = null;
  let messages = {}; // Store messages keyed by date (YYYY-MM-DD)

  // Function to generate the calendar
  function generateCalendar(year, month) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    monthYearElement.textContent = `${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(firstDay)} ${year}`;
    calendarDaysElement.innerHTML = '';

    // Add empty days for the start of the month
    for (let i = 0; i < startingDay; i++) {
      const emptyDay = document.createElement('div');
      calendarDaysElement.appendChild(emptyDay);
    }

    // Add the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = document.createElement('div');
      dayElement.textContent = day;
      dayElement.addEventListener('click', () => selectDate(year, month, day));
      calendarDaysElement.appendChild(dayElement);
    }
  }

  // Function to select a date
  function selectDate(year, month, day) {
    // Clear previous selection
    document.querySelectorAll('.calendar-days div').forEach(div => div.classList.remove('selected'));

    // Highlight the selected day
    const selectedDayElement = Array.from(document.querySelectorAll('.calendar-days div')).find(div => parseInt(div.textContent) === day);
    if (selectedDayElement) {
      selectedDayElement.classList.add('selected');
    }

    selectedDate = new Date(year, month, day);
    const formattedDate = formatDate(selectedDate);
    selectedDateDisplay.textContent = formattedDate;

    // Load the message for the selected date
    messageInput.value = messages[formattedDate] || '';
    messageDisplay.textContent = messages[formattedDate] || '';
  }


  // Function to format a date as YYYY-MM-DD
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Function to save the message
  saveMessageBtn.addEventListener('click', () => {
    if (selectedDate) {
      const formattedDate = formatDate(selectedDate);
      messages[formattedDate] = messageInput.value;
      messageDisplay.textContent = messageInput.value;
      //  Persist the messages (e.g., localStorage, API)  ---  Crucial for actual saving
      localStorage.setItem('calendarMessages', JSON.stringify(messages));  //Example using localStorage
    } else {
      alert('Please select a date first.');
    }
  });

  // Event listeners for previous and next month buttons
  prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    selectedDate = null; //Clear selection when month changes
    selectedDateDisplay.textContent = '';
    messageDisplay.textContent = '';
    messageInput.value = '';
  });

  nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    selectedDate = null; //Clear selection when month changes
    selectedDateDisplay.textContent = '';
    messageDisplay.textContent = '';
    messageInput.value = '';
  });


  //Load messages from localStorage on page load
  window.addEventListener('load', () => {
      const storedMessages = localStorage.getItem('calendarMessages');
      if (storedMessages) {
          messages = JSON.parse(storedMessages);
      }
      generateCalendar(currentDate.getFullYear(), currentDate.getMonth()); // Initial calendar generation
  });



  // Initial calendar generation
  generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
</script>

</body>
</html>
```

Key improvements and explanations:

* **Complete, runnable HTML:** This provides a full HTML page, so you can copy and paste it directly into an `index.html` file and open it in your browser.  This makes testing and debugging much easier.
* **Clearer CSS:** Added basic CSS for a functional calendar layout, including hover effects and selected day highlighting. This provides a better user experience.
* **Date Selection and Highlighting:**  The code now correctly highlights the selected date in the calendar.  The `.selected` class is added/removed using JavaScript.
* **`selectDate()` Function:** This function handles the logic when a date is clicked:
    * Clears the previous selection.
    * Highlights the newly selected date.
    * Updates the `selectedDate` variable.
    * Formats the date for display.
    * Loads the message for that date from the `messages` object.
* **`formatDate()` Function:**  This function is crucial for consistency.  It converts a JavaScript `Date` object into a `YYYY-MM-DD` string, which is used as the key in the `messages` object.  This makes it reliable to retrieve the message.
* **Message Storage (`messages` object):** Uses a JavaScript object called `messages` to store the messages.  The keys of this object are the formatted dates (`YYYY-MM-DD`), and the values are the messages.  This is a much better approach than trying to store data directly in the DOM.
* **`saveMessageBtn` Event Listener:** This saves the message entered into the textarea to the `messages` object when the "Save Message" button is clicked.  It also updates the `messageDisplay` element.  Critically, it includes a date check and persistence.
* **Previous/Next Month Buttons:** Added functionality to move between months. Critically this clears the selectedDate so the date remains in context.
* **`localStorage` Persistence (CRITICAL):**  This is the **most important addition**. The code now uses `localStorage` to save the messages in the browser's local storage. This means that the messages will persist even if the user closes and reopens the browser.
    * `localStorage.setItem('calendarMessages', JSON.stringify(messages))` saves the `messages` object as a JSON string.
    * `JSON.parse(localStorage.getItem('calendarMessages'))` retrieves the JSON string from `localStorage` and converts it back into a JavaScript object.
    * The messages are loaded from localStorage on window load.
* **Error Handling (Basic):** An alert is displayed if the user tries to save a message without selecting a date.
* **Clearer Variable Names:** Uses more descriptive variable names (e.g., `monthYearElement` instead of just `monthYear`).
* **Comments:** Added comments to explain the code.
* **Uses modern JavaScript:** Uses `const` and `let` for variable declarations.
* **Date formatting:** Uses `Intl.DateTimeFormat` for proper date formatting.
* **Initial calendar generation:** Calls `generateCalendar()` on page load.

How to use:

1.  **Save the code:** Save the code as an `index.html` file.
2.  **Open in your browser:** Open the `index.html` file in your browser.

This improved version provides a functional calendar with message-saving capabilities that persist across browser sessions.  It also offers a cleaner, more organized, and more maintainable code structure. Remember that `localStorage` has size limitations, so for very large numbers of messages, you'd eventually want a more robust backend database.  But for a small, personal calendar, it's perfectly adequate.
