import { CHARACTERS, DIALOGS, FALLBACK_ASSETS, ROOMS } from './world-data.js';

const mapStage = document.getElementById('mapStage');
const charactersLayer = document.getElementById('charactersLayer');
const speakerName = document.getElementById('speakerName');
const dialogText = document.getElementById('dialogText');
const menuButtons = [...document.querySelectorAll('.menu-button')];
const brandSub = document.querySelector('.brand-sub');
const logo = document.querySelector('.logo');

let activeRoom = 'living';

function setDialogue(name, lines) {
  speakerName.textContent = name;
  const line = lines[Math.floor(Math.random() * lines.length)];
  dialogText.textContent = line;
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

function createCharacterButton(character) {
  const button = document.createElement('button');
  button.className = 'character';
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
    setDialogue(character.name, DIALOGS[character.id]);
  });

  return button;
}

function renderCharacters() {
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
  applyImageWithFallback(
    logo,
    `${import.meta.env.BASE_URL}assets/logo/deep-sea-lab-logo.png`,
    FALLBACK_ASSETS.logo,
  );
}

applyRoomBackground(ROOMS[activeRoom]);
renderCharacters();
