function justNumbers(event) {
    if(isNaN(event.key) && event.key !== 'Backspace') {
        event.preventDefault();
      }
}