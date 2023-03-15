const commandLine = document.querySelector('#input');
const outputArea = document.querySelector('.output-container');
const commandHistory = [];
let historyIndex = 0;

commandLine.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') {
    if (historyIndex < commandHistory.length) {
      historyIndex++;
    }
    commandLine.value = commandHistory[commandHistory.length - historyIndex] || '';
  }
  else if (e.key === 'ArrowDown') {
    if (historyIndex > 1) {
      historyIndex--;
    }
    commandLine.value = commandHistory[commandHistory.length - historyIndex] || '';
  }
  else if (e.key === 'Enter') {
    const command = commandLine.value.trim();
    commandHistory.push(command);
    historyIndex = 0;

    if (command === 'clear'){
      outputArea.innerHTML = '';
      commandLine.value = '';
      return;
    }

    const prompt = document.createElement('span');
    prompt.classList.add('prompt');
    prompt.textContent = '$ ';

    const commandText = document.createElement('span');
    commandText.classList.add('command');
    commandText.textContent = command;

    const output = document.createElement('div');
    output.classList.add('output');

    const outputText = document.createElement('pre');
    outputText.classList.add('output-text');

    // commands handling
    switch (command) {
      case 'exit':
        if (confirm("Close Window?")) {
          window.close();
        }
        break;
      case 'quit':
        if (confirm("Close Window?")) {
          window.close();
        }
        break;
      case 'help':
        outputText.textContent = `List of available commands:
        clear - Clear the terminal screen
        help - Display this help text
        echo - Display a message
        `;
        break;
      default:
        if (command.startsWith('echo ')) {
          const message = command.slice(5);
          outputText.textContent = message;
        } else {
          outputText.textContent = `Unrecognized command: ${command}`;
        }
    }

    output.appendChild(prompt);
    output.appendChild(commandText);
    outputArea.appendChild(output);
    outputArea.appendChild(outputText);
    commandLine.value = '';

    // scroll to the bottom of the output area
    outputArea.scrollTop = outputArea.scrollHeight;
  }
});

commandLine.focus();
