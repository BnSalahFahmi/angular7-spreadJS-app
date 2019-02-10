import {
    animate, AnimationMetadata, AnimationStateMetadata, AnimationTransitionMetadata, group, keyframes, query, sequence,
    style,
    transition
  } from '@angular/animations';
  
  export const contextTransitions: (AnimationStateMetadata | AnimationTransitionMetadata)[] = [
    transition('* => *', [
      query(':enter', style({ opacity: 0, position: 'absolute', height: '100px', width: '200px' }), { optional: true }),
      query(':leave', style({ position: 'absolute', height: '100px', width: '200px' }), { optional: true }),
      sequence([
        query(
          ':leave',
          [
            animate(`2000ms cubic-bezier(.22,.43,.57,.85)`, style({ opacity: 0, transform: 'scale(0.9)' }))
          ],
          { optional: true }
        ),
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'scale(0.9)' }),
            animate(`2000ms cubic-bezier(.22,.43,.57,.85)`)
          ],
          { optional: true }
        ),
      ])
    ])
  ];
  