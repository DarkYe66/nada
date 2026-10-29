import characterRiveUrl from '../assets/images/28195-53259-character-builder.riv?url';

const MACHINE = 'State Machine 1';
const VIEW_MODEL = 'ViewModel1';

function setBoolean(rive, name, value) {
  const boundProperty = rive.viewModelInstance?.boolean?.(name);
  if (boundProperty) {
    boundProperty.value = value;
    return;
  }

  const numericProperty = rive.viewModelInstance?.number?.(name);
  if (numericProperty) numericProperty.value = value ? 1 : 0;
}

function fireTrigger(rive, name) {
  const boundProperty = rive.viewModelInstance?.trigger?.(name);
  boundProperty?.trigger();
}

function applyCharacterPhase(rive, phase) {
  setBoolean(rive, 'idle', !['walk', 'blow_kiss'].includes(phase));

  if (phase === 'blow_kiss') fireTrigger(rive, 'move arm');
  if (phase === 'happy') fireTrigger(rive, 'Blink Eyes');
}

export const riveCharacterConfig = {
  src: characterRiveUrl,
  stateMachineName: MACHINE,
  renderMode: 'svg',
  mouthAnchor: { x: 0.51, y: 0.33 },
  onReady(rive) {
    const viewModel = rive.viewModelByName(VIEW_MODEL);
    const instance = rive.viewModelInstance ?? viewModel?.defaultInstance() ?? viewModel?.instance();
    if (instance && !rive.viewModelInstance) rive.bindViewModelInstance(instance);
  },
  applyPhase: applyCharacterPhase,
};

