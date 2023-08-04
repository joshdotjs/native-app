// Keep UI functional (non OOP)

import Track from './Track.js';
import { qs, listeForEvent, setLS, getLS } from './util.js';

// ==============================================

const default_tracks = [
  {
    pattern: [1, 1, 1, 1,    1, 1, 1, 1,    1, 1, 1, 1,   1, 1, 1, 1,], 
    name: 'hi-hat',
    path: './assets/samples/drums/hi-hat.mp3',
    elem: qs('.track-0'),
    enabled: true,
  },
  { 
    pattern: [1, 0, 1, 0,    0, 0, 0, 1,    0, 1, 1, 0,   0, 1, 0, 1,], 
    name: 'kick',
    path: './assets/samples/drums/kick.mp3',
    elem: qs('.track-1'),
    enabled: false,
  },
  { 
    pattern: [0, 0, 0, 0,    1, 0, 0, 0,    0, 0, 0, 0,   1, 0, 0, 0,], 
    name: 'snare',
    path: './assets/samples/drums/snare.mp3',
    elem: qs('.track-2'),
    enabled: true,
  }
];

// ==============================================

let Tracks = [];

const ls_tracks = getLS('tracks');

if (ls_tracks) {
  Tracks = loadTracks(ls_tracks);
} else {
  Tracks = loadTracks(default_tracks);
  setLS('tracks', default_tracks);
}

// ==============================================

listeForEvent('track-change', (event) => {
  console.log('track-change EVENT fired and caught!');
  console.log(event.detail.data.data_key);

  const tracks = Tracks.map(track => track.getData());
  console.log('tracks: ', tracks);

  setLS('tracks', tracks);
});

// ==============================================

const playTracks = (time, index) => {

  Tracks.forEach((track) => {

    if (!track.enabled) return;

    if (track.pattern[index]) 
      track.start(time);
  });
};

// ==============================================

const highlightStep = (index) => {

  const prev_idx = index - 1;
  const is_prev_idx_pos = prev_idx >= 0;

  Tracks.forEach(track => {

    if (!track.enabled) return;

    track.steps[is_prev_idx_pos ? prev_idx : 15].classList.remove('current');
    track.steps[index].classList.add('current');
  });
};

// ==============================================

const resetHighlightedSteps = () => {
  Tracks.forEach(track => {
    track.steps.forEach(step => step.classList.remove('current'));
  });
}

// ==============================================

export { 
  Tracks, playTracks,
  highlightStep, resetHighlightedSteps,
};

// ==============================================

function loadTracks (tracks) {
  return tracks.map((track, idx) => new Track({ 
    pattern: track.pattern, 
    name: track.name,
    path: track.path,
    enabled: track.enabled,
    locked: track.locked,
    elem: qs(`.track-${idx}`),
  }));
};