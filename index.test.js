/**
* @project CookiesManager - https://CodiTheck.github.io/cookies_manager
* @fileoverview Tests the package to prevent upcomming bugs.
* @author Obrymec - obrymecsprinces@gmail.com
* @type {CookiesManager}
* @created 2023-10-16
* @updated 2023-10-21
* @file index.test.js
* @version 0.0.3
*/

// Plugin dependencies.
import {CookieManager} from "./build/cookie.min.js";

// The global todo list.
let todolist = [];
// The `clear` button ref.
const clear = (
  document.querySelector (
    "button.btn-secondary"
  )
);
// The global input ref.
const adderInput = (
  document.querySelector (
    "input.form-control"
  )
);
// The `add` button ref.
const add = (
  document.querySelector (
    "button.btn-primary"
  )
);
// The parent of todo item(s).
const parent = (
  document.querySelector (
    "div.todo-list"
  )
);

/**
 * @description Tracks bootstrap
 *  custom tooltips.
 * @function trackTooltips_
 * @private {Function}
 * @returns {void} void
 */
function trackTooltips_ () {
  // Gets all elements that have
  // `data-bs-toggle` attribute.
  const tooltipTriggerList = (
    document.querySelectorAll (
      "[data-bs-toggle='tooltip']"
    )
  );
  // Tracks all element that
  // have bootstrap custom
  // tooltip.
  [...tooltipTriggerList].map (
    tooltipTriggerEl => (
      new bootstrap.Tooltip (
        tooltipTriggerEl
      )
    )
  );
}

/**
 * @description Enables/Disables
 *  a button.
 * @param {boolean} state The
 *  new button state.
 * @param {Element} ref The
 *  target button reference.
 * @function setVisibility_
 * @private {Function}
 * @returns {void} void
 */
function setVisibility_ (
  state, ref
) {
  // Whether the given state
  // is set to `true`.
  if (state) {
    // Removes `disabled` class
    // from the target button.
    ref.classList.remove (
      "disabled"
    );
  // Otherwise.
  } else {
    // Adds `disabled` class
    // to the target button.
    ref.classList.add (
      "disabled"
    );
  }
}

/**
 * @description Adds a task to
 *  todo list.
 * @private {Function}
 * @function addTask_
 * @returns {void} void
 */
function addTask_ () {
  // The global input value.
  const value = (
    adderInput.value.trim ()
  );
  // Whether the global input
  // is empty.
  if (value.length > 0) {
    // Adds the specified item
    // to todo list.
    todolist.push (value);
    // Clears items graphically.
    parent.innerHTML = '';
    // Clears the global input.
    adderInput.value = '';
    // Re-builds task(s).
    drawTasks_ ();
    // Adds `disabled` class
    // to add button.
    add.classList.add (
      "disabled"
    );
  }
}

/**
 * @description Draws all found
 *  tasks from todo list.
 * @function drawTasks_
 * @private {Function}
 * @returns {void} void
 */
function drawTasks_ () {
  // Drawing all tasks.
  for (
    let index = 0;
    index < todolist.length;
    index++
  ) {
    // Creates an instance
    // of a todo item.
    const item = new TodoItem (
      index
    );
    // Adds the current task
    // to todo list.
    item.build ();
    // Listens the current
    // item interactions.
    item.listenEvents ();
  }
  // Tracks bootstrap tooltips.
  trackTooltips_ ();
  // Sets `clear` button state
  // according to the rest
  // of todo item(s).
  setVisibility_ (
    todolist.length > 0,
    clear
  );
}

// Called when the page loaded
// and ready to use.
window.addEventListener (
  "DOMContentLoaded", function () {
    // Tracks bootstrap tooltips.
    trackTooltips_ ();
    // Draws all available task(s).
    drawTasks_ ();
    // Listens `add` button events.
    add.addEventListener (
      "click", addTask_
    );
    // Listens `clear` button events.
    clear.addEventListener (
      "click", () => {
        // Clears items graphically.
        parent.innerHTML = '';
        // Clears the todo list.
        todolist = [];
        // Re-builds task(s).
        drawTasks_ ();
      }
    );
    // Listens `keydown` event on
    // the global input.
    adderInput.addEventListener (
      "keydown", event => {
        // Whether the `Enter`
        // key is pressed.
        if (event.key === "Enter") {
          // Adds the task given
          // to todo list.
          addTask_ (); 
        }
      }
    );
    // Listens any value mutation
    // on the adder input.
    adderInput.addEventListener (
      "input", () => {
        // Sets `add` button state
        // according to input
        // value.
        setVisibility_ (
          adderInput.value.trim ()
            .length > 0,
          add
        );
      }
    );
  }
);

/**
 * @classdesc Creates a todo item
 *  object instance.
 * @type {TodoItem}
 * @public
 * @class
 * @returns {TodoItem} TodoItem
 */
function TodoItem (pos) {
  // Attributes.
  let item = null;

  /**
   * @description Builds a todo item.
   * @function build
   * @public
   * @returns {String} String
   */
  this.build = () => {
    // Creates a div tag.
    item = (
      document.createElement (
        "div"
      )
    );
    // Sets task's class.
    item.className = "todo-item";
    // Sets task's id.
    item.id = `todo-${pos}`;
    // Sets task html
    // structure.
    item.innerHTML = `
      <!--Text-->
      <span class = "text">
        <!--Label-->
        <span>${todolist[pos]}</span>
        <!--Editable-->
        <input
          data-bs-title = "The new task name."
          class = "form-control hidden"
          data-bs-toggle = "tooltip"
          type = "text"
        />
      </span>
      <!--Options-->
      <span class = "options">
        <!--Modify-->
        <i
          data-bs-title = "Change this task name."
          data-bs-toggle = "tooltip"
          class = "bi bi-pencil"
        ></i>
        <!--Trash-->
        <i
          data-bs-title = "Remove this task."
          data-bs-toggle = "tooltip"
          class = "bi bi-trash"
        ></i>
      </span>
    `;
    // Adds the current task
    // to todo list.
    parent.appendChild (item);
  }

  /**
   * @description Listens interactions
   *  on a todo item.
   * @function listenEvents
   * @public
   * @returns {void} void
   */
  this.listenEvents = () => {
    // The trash icon.
    const trash = (
      item.children[1].children[1]
    );
    // The edit icon.
    const edit = (
      item.children[1].children[0]
    );
    // The input.
    const input = (
      item.children[0].children[1]
    );
    // The text.
    const text = (
      item.children[0].children[0]
    );
    // Listens `trash` event.
    trash.addEventListener (
      "click", () => {
        // Removes also his name
        // from todo list.
        todolist.splice (pos, 1);
        // Clears items graphically.
        parent.innerHTML = '';
        // Re-builds task(s).
        drawTasks_ ();
      }
    );
    // Upgrades todo list.
    const upgrade = () => {
      // Updates todo list.
      todolist[pos] = input.value;
      // Clears items graphically.
      parent.innerHTML = '';
      // Clears input value.
      input.value = '';
      // Re-builds task(s).
      drawTasks_ ();
      // Removes `hidden` class
      // from the active text.
      text.classList.remove (
        "hidden"
      );
      // Removes `hidden` class
      // from edit icon.
      edit.classList.remove (
        "hidden"
      );
      // Adds `hidden` class
      // to input.
      input.classList.add (
        "hidden"
      );
    };
    // Listens `edit` interaction.
    edit.addEventListener (
      "click", () => {
        // Edits input to the
        // active text value.
        input.value = todolist[pos];
        // Removes `hidden`
        // class from input.
        input.classList.remove (
          "hidden"
        );
        // Adds `hidden` class
        // to active text.
        text.classList.add (
          "hidden"
        );
        // Adds `hidden` class
        // to edit icon.
        edit.classList.add (
          "hidden"
        );
        // Listens `blur` event
        // on input.
        input.addEventListener (
          "blur", upgrade
        );
        // Puts the focus to
        // input.
        input.focus ();
        // Listens `keydown`
        // event on input.
        input.addEventListener (
          "keydown", event => {
            // Whether the `Enter`
            // key is pressed.
            if (
              event.key === "Enter"
            ) {
              // Destroys the current
              // focus on the input.
              input.blur ();
            }
          }
        );
      }
    );
  }
}
