import {Routes} from '@angular/router';
import {DashboardComponent} from "./presentation/layouts/dashboard/dashboard.component";

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'orthography',
        loadComponent: () => import('./presentation/pages/orthography/orthography.component'),
        data: {
          icon: 'fa-solid fa-spell-check',
          title: 'Orthography',
          description: 'Spell checker'
        }
      },
      {
        path: 'pros-cons',
        loadComponent: () => import('./presentation/pages/pros-cons/pros-cons.component'),
        data: {
          icon: 'fa-solid fa-code-compare',
          title: 'Pros & Cons',
          description: 'Compare pros & cons'
        }
      },
      {
        path: 'pros-cons-stream',
        loadComponent: () => import('./presentation/pages/pros-cons-stream/pros-cons-stream.component'),
        data: {
          icon: 'fa-solid fa-water',
          title: 'P&C Stream',
          description: 'Stream of messages'
        }
      },
      {
        path: 'translate',
        loadComponent: () => import('./presentation/pages/translate/translate.component'),
        data: {
          icon: 'fa-solid fa-language',
          title: 'Translate',
          description: 'Translate to other languages'
        }
      },
      {
        path: 'translate-stream',
        loadComponent: () => import('./presentation/pages/translate-stream/translate-stream.component'),
        data: {
          icon: 'fa-solid fa-water',
          title: 'Translate Stream',
          description: 'Translate to other languages'
        }
      },
      {
        path: 'audio-to-text-entry',
        loadComponent: () => import('./presentation/pages/audio-to-text/audio-to-text.component'),
        data: {
          icon: 'fa-solid fa-comment-dots',
          title: 'Audio to text-entry',
          description: 'Convert audio to text-entry'
        }
      },
      {
        path: 'text-entry-to-audio',
        loadComponent: () => import('./presentation/pages/text-to-audio/text-to-audio.component'),
        data: {
          icon: 'fa-solid fa-podcast',
          title: 'Text to audio',
          description: 'Convert text-entry to audio',
        }
      },
      {
        path: 'image-generation',
        loadComponent: () => import('./presentation/pages/image-generation/image-generation.component'),
        data: {
          icon: 'fa-solid fa-image',
          title: 'Images',
          description: 'Generate images'
        }
      },
      {
        path: 'image-tunning',
        loadComponent: () => import('./presentation/pages/image-tunning/image-tunning.component'),
        data: {
          icon: 'fa-solid fa-wand-magic',
          title: 'Edit image',
          description: 'Continue generation'
        }
      },
      {
        path: 'assistant',
        loadComponent: () =>
          import('./presentation/pages/assistant/assistant.component'),
        data: {
          icon: 'fa-solid fa-user',
          title: 'Assistant',
          description: 'Assistant info',
        },
      },
      {
        path: '**',
        redirectTo: 'orthography',
        pathMatch: 'full'
      }
    ]
  }
];
