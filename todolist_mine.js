// This class represents a todo item and its associated
// data: the todo title and a flag that shows whether the
// todo item is done.

class Todo {
  static DONE_MARKER = "X";
  static UNDONE_MARKER = " ";

  constructor(title) {
    this.title = title;
    this.done = false;
  }

  toString() {
    let marker = this.isDone() ? Todo.DONE_MARKER : Todo.UNDONE_MARKER;
    return `[${marker}] ${this.title}`;
  }

  markDone() {
    this.done = true;
  }

  markUndone() {
    this.done = false;
  }

  isDone() {
    return this.done;
  }

  getTitle() {
    return this.title;
  }
}

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  add(todoItem) {
    if (!(todoItem instanceof Todo)) {
      throw new TypeError("can only add Todo objects");
    }

    this.todos.push(todoItem);
  }

  size() {
    return this.todos.length;
  }

  first() {
    return this.todos[0];
  }

  last() {
    return this.todos[this.size() - 1];
  }

  itemAt(index) {
    this._validateIndex(index);
    return this.todos[index];
  }

  _validateIndex(index) {
    if (!(index in this.todos)) {
      throw new ReferenceError(`invalid index: ${index}`);
    }
  }

  markDoneAt(index) {
    this.itemAt(index).markDone();
  }

  markUndoneAt(index) {
    this.itemAt(index).markUndone();
  }

  isDone() {
    return this.todos.every(todo => todo.isDone());
  }

  shift() {
    this.todos.shift();
  }

  pop() {
    this.todos.pop();
  }

  removeAt(index) {
    this._validateIndex(index);
    return this.todos.splice(index, 1);
  }

  toString() {
    let title = `---- ${this.title} ----`;
    let list = this.todos.map(todo => todo.toString()).join("\n");
    return `${title}\n${list}`;
  }

  forEach(callback) {
    this.todos.forEach(callback);
  }

  filter(condition) {
    let tempList = new TodoList(this.title);

    this.todos.forEach(ele => {
      if (condition(ele)) {
        tempList.add(ele);
      }
    });

    return tempList;
  }

  findByTitle(title) {
    for (let idx = 0; idx < this.todos.length; idx++) {
      if (this.todos[idx].title === title) {
        return this.todos[idx];
      }
    }
    return undefined;
  }

  allDone() {
    return this.todos.filter(ele => ele.isDone() === true);
  }

  allNoteDone() {
    return this.todos.filter(ele => ele.isNotDone() === true);
  }

  markDone(title) {
    for (let idx = 0; idx < this.todos.length; idx++) {
      if (this.todos[idx].title === title) {
        this.todos[idx].markDone();
      }
    }
  }

  markAllDone() {
    this.forEach(todo => todo.markDone());
  }

  markAllUndone() {
    this.forEach(todo => todo.markUndone());
  }

  toArray() {
    let arr = [];
    this.todos.forEach(ele => {
      arr.push(ele);
    });
    return arr;
  }
}