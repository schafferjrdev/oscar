import party, { Color } from "party-js";
party.settings.gravity = 250;

export function conffeti(e) {
  party.sparkles(e.currentTarget, {
    count: party.variation.range(20, 30),
    size: party.variation.range(0.2, 0.9),
    color: Color.fromHex("#b4912f"),
    spread: 360,
    speed: party.variation.range(70, 100),
    shapes: ["square", "circle"],
  });
}

export function sparkles(e) {
  party.sparkles(e, {
    count: party.variation.range(15, 25),
    size: party.variation.range(0.3, 0.9),
    color: Color.fromHex("#b4912f"),
    spread: 60,
    speed: party.variation.range(50, 100),
  });
}

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
export const pluralize_word = (number, word) => {
  return number === 1 ? `${word}` : `${word}s`;
};

export const nomination_plural = (nominations) => {
  return nominations > 1 ? `${nominations} indicações` : "1 indicação";
};

export function convertMinutesToTimeObject(minutes) {
  if (typeof minutes !== "number" || minutes < 0) {
    throw new Error("O argumento deve ser um número não negativo.");
  }

  const days = Math.floor(minutes / (24 * 60));
  const remainingMinutes = minutes % (24 * 60);
  const hours = Math.floor(remainingMinutes / 60);
  const finalMinutes = remainingMinutes % 60;

  return {
    days,
    hours,
    minutes: finalMinutes,
  };
}
