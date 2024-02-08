export function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.style.position = "fixed";
  textArea.style.top = 0;
  textArea.style.left = 0;

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = "2em";
  textArea.style.height = "2em";

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0;

  // Clean up any borders.
  textArea.style.border = "none";
  textArea.style.outline = "none";
  textArea.style.boxShadow = "none";

  // Avoid flash of the white box if rendered for any reason.
  textArea.style.background = "transparent";

  textArea.value = text;

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    console.info("Copying text command was " + msg);
  } catch (err) {
    console.error("Oops, unable to copy");
  }

  document.body.removeChild(textArea);
}

export function detectMob() {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];
  const IE = window.innerWidth <= 800 && window.innerHeight <= 600;
  const others = toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });

  return others || IE;
}

export const detectIOS = () => {
  const toMatch = [/iPhone/i, /iPad/i, /iPod/i];
  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
};

export const pluralize = (number, word) => {
  return number > 1 ? `${number} ${word}s` : `${number} ${word}`;
};

export const nomination_plural = (nominations) => {
  return nominations > 1 ? `${nominations} indicações` : "1 indicação";
};