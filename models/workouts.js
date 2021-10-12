const workouts = [];

module.exports = class Workout {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }

  save() {
    workouts.push(this);
  }

  static fetchAll() {
    return workouts;
  }
}