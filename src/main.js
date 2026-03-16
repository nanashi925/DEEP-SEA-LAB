const mapStage = document.getElementById('mapStage');
const statusText = document.getElementById('statusText');
const menuButtons = [...document.querySelectorAll('.menu-button')];
const frames = [...document.querySelectorAll('.frame')];

const ROOM_BACKGROUNDS = {
  living: '/assets/maps/living-room.png',
  control: '/assets/maps/control-room.png',
};

let activeRoom = 'living';

function updateRoom(room) {
  activeRoom = room;
  mapStage.style.backgroundImage = `url(${ROOM_BACKGROUNDS[room]})`;
  mapStage.setAttribute('aria-label', `深海ラボ ${room === 'living' ? '生活区' : '制御室'} 背景`);

  menuButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.room === room);
  });

  statusText.textContent = `${room === 'living' ? '生活区' : '制御室'}を表示中。A/B/C枠のタップ反応を確認できます。`;
}

function tapFrame(frame) {
  frames.forEach((item) => item.classList.remove('is-tapped'));
  frame.classList.add('is-tapped');

  const char = frame.dataset.character;
  statusText.textContent = `研究員${char}枠をタップ。将来ここにキャラ表示と会話反応を接続します。`;
}

menuButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const room = button.dataset.room;
    if (!ROOM_BACKGROUNDS[room] || room === activeRoom) return;
    updateRoom(room);
  });
});

frames.forEach((frame) => {
  frame.addEventListener('click', () => tapFrame(frame));
});

updateRoom(activeRoom);
