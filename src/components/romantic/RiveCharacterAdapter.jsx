import { useCallback, useEffect, useRef, useState } from 'react';
import { useRive } from '@rive-app/react-webgl2';

function RiveCharacter({ config, phase, facing, fallback }) {
  const latestPose = useRef({ phase, facing });
  const [riveReady, setRiveReady] = useState(false);
  const [riveFailed, setRiveFailed] = useState(false);
  const applyPose = useCallback((rive, pose) => {
    config.applyPhase(rive, pose.phase, pose.facing);
  }, [config]);
  const onRiveReady = useCallback((rive) => {
    config.onReady?.(rive);
    applyPose(rive, latestPose.current);
    setRiveFailed(false);
    setRiveReady(true);
  }, [applyPose, config]);
  const onLoadError = useCallback((error) => {
    config.onError?.(error);
    setRiveReady(false);
    setRiveFailed(true);
  }, [config]);
  const { rive, RiveComponent } = useRive({
    src: config.src,
    stateMachine: config.stateMachineName,
    autoplay: true,
    autoBind: true,
    onRiveReady,
    onLoadError,
  }, {
    shouldResizeCanvasToContainer: true,
  });

  useEffect(() => {
    const pose = { phase, facing };
    latestPose.current = pose;
    if (rive) applyPose(rive, pose);
  }, [applyPose, facing, phase, rive]);

  return (
    <div className="rive-character-surface" aria-hidden="true">
      {(!riveReady || riveFailed) && <div className="rive-character-fallback">{fallback}</div>}
      <RiveComponent className={riveReady && !riveFailed ? 'rive-character-canvas is-ready' : 'rive-character-canvas'} />
    </div>
  );
}

export default function RiveCharacterAdapter({ config, phase, facing, fallback }) {
  if (
    config?.renderMode === 'svg'
    || !config?.src
    || !config?.stateMachineName
    || typeof config.applyPhase !== 'function'
  ) {
    return fallback;
  }

  return <RiveCharacter config={config} phase={phase} facing={facing} fallback={fallback} />;
}

