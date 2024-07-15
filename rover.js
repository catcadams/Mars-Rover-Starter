class Rover {
  // Write code here!
  constructor(position) {
    (this.position = position),
      (this.mode = "NORMAL"),
      (this.generatorWatts = 110);
  }
  receiveMessage(message) {
    const messageReceived = {
      message: message.name,
      results: [],
    };

    for (let index = 0; index < message.commands.length; index++) {
      let command = message.commands[index].commandType;
      if (command === "MOVE") {
        const move = {
          completed: true,
        };
        messageReceived.results.push(move);
        if (this.mode === "NORMAL") {
          this.position = message.commands[index].value;
          move.completed = true;
        } else {
          move.completed = false;
        }
        console.log("move completed" + move.completed);
      }
      if (command === "STATUS_CHECK") {
        const statusCheck = {
          completed: true,
          roverStatus: {
            mode: this.mode,
            generatorWatts: this.generatorWatts,
            position: this.position,
          },
        };
        messageReceived.results.push(statusCheck);
      }
      if (command === "MODE_CHANGE") {
        const modeChange = {
          completed: true,
        };
        messageReceived.results.push(modeChange);
        if (!message.commands[index].value) {
          modeChange.completed = false;
        }
        if (message.commands[index].value) {
          this.mode = message.commands[index].value;
        }
      }
    }

    return messageReceived;
  }
}

module.exports = Rover;
