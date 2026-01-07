export interface ProcessStep {
  id: string;
  icon: 'chat' | 'clipboard' | 'camera' | 'images';
  title: string;
  subtitle: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    id: '1',
    icon: 'chat',
    title: 'Consultation',
    subtitle: 'Understanding Your Space',
    description: 'A brief conversation to understand your space, goals, and visual style.',
  },
  {
    id: '2',
    icon: 'clipboard',
    title: 'Planning & Preparation',
    subtitle: 'Thoughtful Setup',
    description: 'We plan angles, lighting, and timing to ensure every detail is captured beautifully.',
  },
  {
    id: '3',
    icon: 'camera',
    title: 'On-Site Photography',
    subtitle: 'Professional Capture',
    description: 'A calm, efficient shoot focused on composition, light, and architectural detail.',
  },
  {
    id: '4',
    icon: 'images',
    title: 'Refined Delivery',
    subtitle: 'Ready-to-Use Images',
    description: 'Carefully edited, high-resolution images delivered for web, print, and marketing.',
  },
];
