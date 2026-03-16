// MERGE-SAFE ENTRY: keep imports single-line and unique
import { CHARACTERS, DIALOGS, FALLBACK_ASSETS, ROOMS, SPEECH_STYLES } from './world-data.js';

const mapStage = document.getElementById('mapStage');
const charactersLayer = document.getElementById('charactersLayer');
const speakerName = document.getElementById('speakerName');
const dialogText = document.getElementById('dialogText');
const menuButtons = [...document.querySelectorAll('.menu-button')];
const brandSub = document.querySelector('.brand-sub');
const logo = document.querySelector('.logo');

const baseUrl = import.meta?.env?.BASE_URL ?? '/';

let activeRoom = 'living';
let activeBubble = null;
let bubbleTimer = null;
const lastSpeechByCharacter = new Map();

const randomItem = (items) => (items.length ? items[Math.floor(Math.random() * items.length)] : '');

function setDialogue(name, lines) {
  speakerName.textContent = name;
  dialogText.textContent = randomItem(lines);
}

function applyImageWithFallback(img, primarySrc, fallbackSrc) {
  let switched = false;

  img.src = primarySrc;
  img.addEventListener('error', () => {
    if (switched) return;
    switched = true;
    img.src = fallbackSrc;
  });
}

function applyRoomBackground(room) {
  const candidate = new Image();
  candidate.onload = () => {
    mapStage.style.backgroundImage = `url(${room.background})`;
  };
  candidate.onerror = () => {
    mapStage.style.backgroundImage = `url(${room.fallbackBackground})`;
  };
  candidate.src = room.background;
}

function clearBubble() {
  if (bubbleTimer) {
    clearTimeout(bubbleTimer);
    bubbleTimer = null;
  }

  if (activeBubble) {
    activeBubble.remove();
    activeBubble = null;
  }
}

function chooseSpeech(characterId, lines) {
  if (lines.length <= 1) return lines[0] ?? '';

  const lastLine = lastSpeechByCharacter.get(characterId);
  const pool = lines.filter((line) => line !== lastLine);
  const nextLine = randomItem(pool.length > 0 ? pool : lines);
  lastSpeechByCharacter.set(characterId, nextLine);
  return nextLine;
}

function speechPositionClass(leftPercentRaw) {
  const left = Number.parseFloat(leftPercentRaw);
  if (Number.isNaN(left)) return 'speech-anchor-center';
  if (left < 28) return 'speech-anchor-left';
  if (left > 72) return 'speech-anchor-right';
  return 'speech-anchor-center';
}

function showSpeechBubble(hostButton, character, line) {
  clearBubble();

  const style = SPEECH_STYLES[character.id];
  const bubble = document.createElement('div');
  bubble.className = `speech-bubble ${speechPositionClass(character.position.left)}`;
  bubble.dataset.characterId = character.id;
  bubble.style.setProperty('--bubble-bg', style?.bubble ?? '#1d2f54');
  bubble.style.setProperty('--bubble-text', style?.text ?? '#eaf4ff');
  bubble.textContent = line;

  hostButton.appendChild(bubble);
  activeBubble = bubble;

  bubbleTimer = setTimeout(clearBubble, 3200);
}

function createCharacterButton(character) {
  const button = document.createElement('button');
  button.className = `character character-${character.id}`;
  button.dataset.characterId = character.id;
  button.style.left = character.position.left;
  button.style.top = character.position.top;
  button.setAttribute('aria-label', `${character.name}と話す`);

  const sprite = document.createElement('img');
  sprite.alt = `${character.name}のドット絵`;
  sprite.className = 'character-sprite';
  applyImageWithFallback(sprite, character.sprite, character.fallbackSprite);
  button.appendChild(sprite);

  const label = document.createElement('span');
  label.className = 'character-label glass-panel';
  label.textContent = character.name;
  button.appendChild(label);

  button.addEventListener('click', () => {
    const speechLine = chooseSpeech(character.id, character.speech ?? DIALOGS[character.id]);
    showSpeechBubble(button, character, speechLine);
    setDialogue(character.name, DIALOGS[character.id]);
  });

  return button;
}

function renderCharacters() {
  clearBubble();
  charactersLayer.innerHTML = '';

  CHARACTERS[activeRoom].forEach((character) => {
    charactersLayer.appendChild(createCharacterButton(character));
  });
}

function setActiveMenu(targetRoom) {
  menuButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.room === targetRoom);
  });
}

function switchRoom(targetRoom) {
  if (targetRoom === activeRoom || !ROOMS[targetRoom]) return;

  mapStage.classList.add('is-switching');

  setTimeout(() => {
    activeRoom = targetRoom;
    applyRoomBackground(ROOMS[activeRoom]);
    mapStage.setAttribute('aria-label', ROOMS[activeRoom].ariaLabel);
    brandSub.textContent = ROOMS[activeRoom].label;
    renderCharacters();
    setActiveMenu(activeRoom);
    setDialogue('オペレーター', [ROOMS[activeRoom].enterMessage]);

    requestAnimationFrame(() => {
      mapStage.classList.remove('is-switching');
    });
  }, 220);
}

menuButtons.forEach((button) => {
  button.addEventListener('click', () => switchRoom(button.dataset.room));
});

if (logo) {
  applyImageWithFallback(logo, `${baseUrl}assets/logo/deep-sea-lab-logo.png`, FALLBACK_ASSETS.logo);
}

applyRoomBackground(ROOMS[activeRoom]);
renderCharacters();
