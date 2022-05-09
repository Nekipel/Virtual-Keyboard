import vocabulary from "./vocabulary.js";

const LANG__NOW = 'en';
let language = localStorage.getItem('language') || LANG__NOW;
let isCapsLocked = false;
let cursorPosition = 0;
let textareaText = '';
const BODY = document.querySelector('body');

function showContent() {
  const content = `<div class="wrapper">
                        <h1>RSS Виртуальная клавиатура</h1>
                        <textarea name="textarea" class="textarea" autofocus></textarea>
                        <div class="keyboard">
                            <div class="row">
                                <div class="key letter symbol" data-i18="backquote" id='Backquote'>\`</div>
                                <div class="key digit" id="Digit1">1</div>
                                <div class="key digit" id="Digit2">2</div>
                                <div class="key digit" id="Digit3">3</div>
                                <div class="key digit" id="Digit4">4</div>
                                <div class="key digit" id="Digit5">5</div>
                                <div class="key digit" id="Digit6">6</div>
                                <div class="key digit" id="Digit7">7</div>
                                <div class="key digit" id="Digit8">8</div>
                                <div class="key digit" id="Digit9">9</div>
                                <div class="key digit" id="Digit0">0</div>
                                <div class="key symbol" id="Minus">-</div>
                                <div class="key symbol" id="Equal">=</div>
                                <div class="key control-key middle backspace" id="Backspace">backspace</div>
                            </div>
                            <div class="row">
                                <div class="key control-key tab" id="Tab">tab</div>
                                <div class="key letter" data-i18="q" id="KeyQ">q</div>
                                <div class="key letter" data-i18="w" id="KeyW">w</div>
                                <div class="key letter" data-i18="e" id="KeyE">e</div>
                                <div class="key letter" data-i18="r" id="KeyR">r</div>
                                <div class="key letter" data-i18="t" id="KeyT">t</div>
                                <div class="key letter" data-i18="y" id="KeyY">y</div>
                                <div class="key letter" data-i18="u" id="KeyU">u</div>
                                <div class="key letter" data-i18="i" id="KeyI">i</div>
                                <div class="key letter" data-i18="o" id="KeyO">o</div>
                                <div class="key letter" data-i18="p" id="KeyP">p</div>
                                <div class="key letter symbol" data-i18="[" id="BracketLeft">[</div>
                                <div class="key letter symbol" data-i18="]" id="BracketRight">]</div>
                                <div class="key symbol" id="Backslash">\\</div>
                                <div class="key control-key del" id="Delete">del</div>
                            </div>
                            <div class="row">
                                <div class="key control-key middle capslock" id="CapsLock">caps lock</div>
                                <div class="key letter" data-i18="a" id="KeyA">a</div>
                                <div class="key letter" data-i18="s" id="KeyS">s</div>
                                <div class="key letter" data-i18="d" id="KeyD">d</div>
                                <div class="key letter" data-i18="f" id="KeyF">f</div>
                                <div class="key letter" data-i18="g" id="KeyG">g</div>
                                <div class="key letter" data-i18="h" id="KeyH">h</div>
                                <div class="key letter" data-i18="j" id="KeyJ">j</div>
                                <div class="key letter" data-i18="k" id="KeyK">k</div>
                                <div class="key letter" data-i18="l" id="KeyL">l</div>
                                <div class="key letter symbol" data-i18=";" id="Semicolon">;</div>
                                <div class="key letter symbol" data-i18="quotes" id="Quote">'</div>
                                <div class="key control-key middle enter" id="Enter">enter</div>
                            </div>
                            <div class="row">
                                <div class="key control-key middle shift" id="ShiftLeft">shift</div>
                                <div class="key letter" data-i18="z" id="KeyZ">z</div>
                                <div class="key letter" data-i18="x" id="KeyX">x</div>
                                <div class="key letter" data-i18="c" id="KeyC">c</div>
                                <div class="key letter" data-i18="v" id="KeyV">v</div>
                                <div class="key letter" data-i18="b" id="KeyB">b</div>
                                <div class="key letter" data-i18="n" id="KeyN">n</div>
                                <div class="key letter" data-i18="m" id="KeyM">m</div>
                                <div class="key letter symbol" data-i18="comma" id="Comma">,</div>
                                <div class="key letter symbol" data-i18="period" id="Period">.</div>
                                <div class="key symbol" data-i18="slash" id="Slash">/</div>
                                <div class="key control-key arrow-up arrow" id="ArrowUp">▲</div>
                                <div class="key control-key middle shift" id="ShiftRight">shift</div>
                            </div>
                            <div class="row">
                                <div class="key control-key" id="ControlLeft">ctrl</div>
                                <div class="key control-key" id="MetaLeft">win</div>
                                <div class="key control-key" id="AltLeft">alt</div>
                                <div class="key big" id="Space"> </div>
                                <div class="key control-key" id="AltRight">alt</div>
                                <div class="key control-key arrow" id="ArrowLeft">◄</div>
                                <div class="key control-key arrow" id="ArrowDown">▼</div>
                                <div class="key control-key arrow" id="ArrowRight">►</div>
                                <div class="key control-key" id="ControlRight">ctrl</div>
                            </div>
                        </div>
                        <div class="addition">
                            <p data-i18="system">keyboard created in windows system</p>
                            <p data-i18="changing">for changing language: next release append this opportunity</p>
                        </div>
                    </div>`;

                    BODY.insertAdjacentHTML('afterbegin', content);
}
showContent();

const DATA_SET = document.querySelectorAll('[data-i18]');
const LETTERS = document.querySelectorAll('.letter');
const controlLeft = document.querySelector('#ControlLeft');
const altLeft = document.querySelector('#AltLeft');
const controlRight = document.querySelector('#ControlRight');
const altRight = document.querySelector('#AltRight');
const textarea = document.querySelector('.textarea');
const keyboard = document.querySelector('.keyboard');

function saveToLocalStorageLanguage() {
    localStorage.setItem('language', language);
}

function getTranslatePageNow() {
    DATA_SET.forEach((element) => {
    element.textContent = vocabulary[language][elem.dataset.i18];
  });
}

function lettersChange() {
  if (isCapsLocked) {
    LETTERS.forEach((x) => {
      const letter = x;
      letter.textContent = letter.textContent.toLowerCase();
    });
  } else if (!isCapsLocked) {
    LETTERS.forEach((x) => {
      const letter = x;
      letter.textContent = letter.textContent.toUpperCase();
    });
  }
}

function deleteLettersFromTextarea() {
    if (cursorPosition > 0) {
    textareaText = textareaText.substring(0, textarea.selectionStart - 1)
    + textareaText.substring(textarea.selectionEnd);
    cursorPosition -= 1;
}
}

function deleteLetterFromTextareaByDel() {
  textareaText = textareaText.substring(0, textarea.selectionStart)
    + textareaText.substring(textarea.selectionEnd + 1);
}

textarea.addEventListener('click', () => {
    cursorPosition = textarea.selectionStart;
});

function enterTextFromTextarea(text) {
    textareaText = textareaText.substring(0, cursorPosition)
    + text
    + textareaText.substring(cursorPosition);
    cursorPosition += text.length;
}

function addNewContentFromTextarea() {
    textarea.textContent = textareaText;
    textarea.selectionStart = cursorPosition;
    textarea.focus();
}

function toUppAndLowerCase(button) {
    if (isCapsLocked) {
        button.classList.remove('capslock-active');
        button.classList.remove('active');
        button.classList.remove('active-background');
    LETTERS.forEach((symbol) => {
        symbol.textContent = symbol.textContent.toLowerCase();
    });
    isCapsLocked = false;
    } else if (!isCapsLocked) {
    LETTERS.forEach((symbol) => {
        symbol.textContent = symbol.textContent.toUpperCase();
    });
    button.classList.add('capslock-active');
    button.classList.add('active');
    button.classList.add('active-background');
    isCapsLocked = true;
    }
}

function changeLanguageFromPage() {
    if (language === 'ru') {
        language = 'en';
    } else if (language === 'en') {
        language = 'ru';
    }
    saveToLocalStorageLanguage();
    if (isCapsLocked) {
        DATA_SET.forEach((el) => {
        el.textContent = vocabulary[language][el.dataset.i18].toUpperCase();
    });
    } else if (!isCapsLocked) {
        DATA_SET.forEach((el) => {
        el.textContent = vocabulary[language][elem.dataset.i18].toLowerCase();
    });
    }
}

function determinePressedKey(button) {
  if (button.classList.contains('key') && !button.classList.contains('control-key')) {
    enterTextFromTextarea(button.textContent);
  }
  if (button.classList.contains('arrow')) {
    enterTextFromTextarea(button.textContent);
  }
  if (button.classList.contains('capslock')) {
    toUppAndLowerCase(button);
  }
  if (button.classList.contains('enter')) {
    enterTextFromTextarea('\n');
  }
  if (button.classList.contains('tab')) {
    enterTextFromTextarea('\t');
  }
  if (button.classList.contains('backspace')) {
    deleteLettersFromTextarea();
  }
  if (button.classList.contains('del')) {
    deleteLetterFromTextareaByDel();
  }
  addNewContentFromTextarea();
}

function pressKey(event) {
    const KEY = document.querySelector(`#${event.code}`);
    if (KEY) {
    if (KEY.classList.contains('key')) {
        event.preventDefault();
    }
    if (KEY.classList.contains('control-key')) {
        KEY.classList.add('active-background');
    }
    KEY.classList.add('active');
    determinePressedKey(KEY);
    }
    if (
    controlLeft.classList.contains('active')
    && altLeft.classList.contains('active')
    ) {
    changeLanguageFromPage();
    }
    if (
    controlRight.classList.contains('active')
    && altRight.classList.contains('active')
    ) {
    changeLanguageFromPage();
    }
    if (
    controlRight.classList.contains('active')
    && altLeft.classList.contains('active')
    ) {
    changeLanguageFromPage();
    }
    if (
    controlLeft.classList.contains('active')
    && altRight.classList.contains('active')
    ) {
    changeLanguageFromPage();
    }
}

function releaseFunctionKey(event) {
    const keyButton = document.querySelector(`#${event.code}`);
    if (keyButton) {
    if (
        keyButton.classList.contains('control-key')
    && !keyButton.classList.contains('capslock')
    ) {
        keyButton.classList.remove('active-background');
    }
    if (!keyButton.classList.contains('capslock')) {
        keyButton.classList.remove('active');
    }
    determineUpKey(keyButton);
    }
}

document.addEventListener('keydown', pressKey);
document.addEventListener('keyup', releaseFunctionKey);


function identifyKey(event) {
    determinePressedKey(event.target);
}

keyboard.addEventListener('click', identifyKey);

getTranslatePageNow();